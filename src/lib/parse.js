// Parser untuk file Matriks Penilaian dan Instrumen LED (format .md di root repo).

export const TAHAP = ['Penetapan', 'Pelaksanaan', 'Evaluasi', 'Pengendalian', 'Peningkatan'];
export const JENIS = { I: 'Input', P: 'Proses', O: 'Output' };

const num = (s) => parseFloat(String(s).replace(',', '.'));

function kriteriaIdFromHeading(h) {
  if (/^Kondisi Eksternal/i.test(h)) return 'profil';
  const m = h.match(/^Kriteria (\d)/);
  return m ? 'k' + m[1] : null;
}

// "1.2.B" | "1.2 A" | "1.1" | "6.1." | "A" -> { kode, kriteriaNo, tahapNo, huruf }
function normalizeKode(raw, kriteriaId) {
  let s = raw.trim().replace(/\.$/, '');
  if (kriteriaId === 'profil') return { kode: s, kriteriaNo: 0, tahapNo: 0, huruf: s };
  const m = s.match(/^(\d)\.(\d)(?:[.\s]*([A-D]))?$/);
  if (!m) return { kode: s, kriteriaNo: 0, tahapNo: 0, huruf: '' };
  const [, k, t, h] = m;
  // Beberapa butir di Matriks Magister tidak menulis huruf "A" (mis. "1.1"); kriteria 1–5 selalu berhuruf.
  const huruf = h || (+k <= 5 ? 'A' : '');
  return { kode: huruf ? `${k}.${t} ${huruf}` : `${k}.${t}`, kriteriaNo: +k, tahapNo: +t, huruf };
}

const SKOR_HEADINGS = {
  'Sangat Baik (skor 4)': 4,
  'Baik (skor 3)': 3,
  'Cukup (skor 2)': 2,
  'Kurang (skor 1)': 1,
};

/** Mengurai Matriks Penilaian menjadi daftar butir dan tabel suplemen dari Rekap Hasil Hitung. */
export function parseMatriks(md) {
  const lines = md.split(/\r?\n/);
  const butir = [];
  const suplemenRekap = [];
  let kriteriaId = null;
  let cur = null;
  let section = null;
  let buf = [];
  let inRekap = false;

  const flush = () => {
    if (!cur || !section) return;
    const text = buf.join('\n').trim();
    if (section === 'elemen') cur.elemen = text;
    else if (section === 'deskriptor') {
      const m = text.match(/\n*Syarat Unggul[^:]*:\s*(.+)$/m);
      if (m) {
        cur.syaratUnggul = m[1].trim();
        cur.deskriptor = text.replace(m[0], '').trim();
      } else cur.deskriptor = text;
    } else cur.rubrik[section] = text;
    buf = [];
  };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flush();
      section = null;
      const h = line.slice(3).trim();
      if (h.startsWith('Rekap Hasil Hitung')) {
        inRekap = true;
        cur = null;
        continue;
      }
      kriteriaId = kriteriaIdFromHeading(h);
      continue;
    }
    if (inRekap) {
      const m = line.match(/^\|\s*([^|*][^|]*?)\s*\|\s*([\d,]+)\s*\|$/);
      if (m && !/^-+$/.test(m[1])) suplemenRekap.push({ nama: m[1], bobot: num(m[2]) });
      if (/^### /.test(line) && suplemenRekap.length) inRekap = 'done';
      if (inRekap === 'done') break;
      continue;
    }
    const bm = line.match(/^### Butir (\d+) \(No\. Butir ([^)]+)\)/);
    if (bm) {
      flush();
      section = null;
      const k = normalizeKode(bm[2], kriteriaId);
      cur = {
        no: +bm[1],
        kodeAsli: bm[2].trim(),
        ...k,
        kriteria: kriteriaId,
        jenis: null,
        bobot: 0,
        elemen: '',
        deskriptor: '',
        syaratUnggul: '',
        rubrik: {},
      };
      // Matriks Magister: butir 6.6–6.8 adalah Suplemen (D1–D3 di Instrumen LED).
      if (k.kriteriaNo === 6 && k.tahapNo >= 6) {
        cur.kriteria = 'suplemen';
        cur.kode = 'D' + (k.tahapNo - 5);
        cur.suplemenIndex = k.tahapNo - 6;
      }
      butir.push(cur);
      continue;
    }
    if (!cur) continue;
    const jm = line.match(/^- \*\*Jenis:\*\* .*\(([IPO])\)/);
    if (jm) { cur.jenis = jm[1]; continue; }
    const wm = line.match(/^- \*\*Bobot \(dari 400\):\*\* ([\d,]+)/);
    if (wm) { cur.bobot = num(wm[1]); continue; }
    const hm = line.match(/^#### (.+)$/);
    if (hm) {
      flush();
      const h = hm[1].trim();
      if (h.startsWith('Elemen')) section = 'elemen';
      else if (h.startsWith('Deskriptor')) section = 'deskriptor';
      else if (h in SKOR_HEADINGS) section = SKOR_HEADINGS[h];
      else section = null;
      continue;
    }
    if (section) buf.push(line);
  }
  flush();
  return { butir, suplemenRekap };
}

/** Memecah markdown menjadi pohon berdasarkan heading. */
export function splitSections(md) {
  const root = { level: 0, title: '', body: [], children: [] };
  const stack = [root];
  for (const line of md.split(/\r?\n/)) {
    const m = line.match(/^(#{1,6}) (.+)$/);
    if (m) {
      const node = { level: m[1].length, title: m[2].trim(), body: [], children: [] };
      while (stack.at(-1).level >= node.level) stack.pop();
      stack.at(-1).children.push(node);
      stack.push(node);
    } else stack.at(-1).body.push(line);
  }
  const finish = (n) => {
    n.body = n.body.join('\n').trim();
    n.children.forEach(finish);
  };
  finish(root);
  return root;
}

/** Seluruh isi section (termasuk sub-heading) sebagai markdown. */
export function sectionMarkdown(node, baseLevel = node.level) {
  let out = node.body ? node.body + '\n\n' : '';
  for (const c of node.children) {
    const lvl = Math.min(6, c.level - baseLevel + 2);
    out += '#'.repeat(lvl) + ' ' + c.title + '\n\n' + sectionMarkdown(c, baseLevel);
  }
  return out;
}

const find = (node, re) => node.children.find((c) => re.test(c.title));

// Paragraf yang diawali "A. ", "B. ", ... dalam satu sub-tahap.
function splitLettered(body) {
  const paras = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const intro = [];
  const items = {};
  for (const p of paras) {
    const m = p.match(/^([A-D])\.\s+([\s\S]+)$/);
    if (m) items[m[1]] = m[2];
    else if (!Object.keys(items).length) intro.push(p);
  }
  return { intro: intro.join('\n\n'), items };
}

/** Mengurai Instrumen LED: bagian konseptual, struktur, dan panduan per kriteria/butir. */
export function parseLED(md) {
  const root = splitSections(md);
  const bagian1 = find(root, /^BAGIAN KESATU/);
  const bagian2 = find(root, /^BAGIAN KEDUA/);
  const pendahuluan = find(bagian2, /^I\. PENDAHULUAN/);
  const led = find(bagian2, /^II\. LAPORAN EVALUASI DIRI/);
  const kondisiEksternal = find(led, /^A\. KONDISI EKSTERNAL/);
  const profil = find(led, /^B\. PROFIL/);
  const kriteriaNode = find(led, /^C\. KRITERIA/);
  const suplemenNode = find(led, /^D\. SUPLEMEN/);
  const penutup = find(led, /PENUTUP$/);

  const kriteria = kriteriaNode.children.map((c, i) => ({
    no: i + 1,
    judul: c.title.replace(/^C\.\d\s*/, ''),
    intro: c.body,
    // Urutan sub-heading = tahap 1..5 (di Instrumen Sarjana, C.2 ditulis "1.x" sehingga tidak bisa dicocokkan dari nomornya).
    tahap: c.children.map((t, j) => ({ no: j + 1, judul: t.title, ...splitLettered(t.body) })),
  }));

  let suplemen = null;
  if (suplemenNode) {
    if (suplemenNode.children.length) {
      // Sarjana: satu daftar 1–4 per bidang.
      suplemen = {
        intro: suplemenNode.body,
        bidang: suplemenNode.children.map((b) => ({
          nama: b.title.replace(/^BIDANG\s+/i, ''),
          items: b.body
            .split(/\n(?=\d+\.\s)/)
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => {
              const [first, ...rest] = s.split('\n');
              return { judul: first.replace(/^\d+\.\s*/, ''), isi: rest.join('\n').trim() };
            }),
        })),
      };
    } else {
      // Magister: paragraf D1., D2., D3.
      const paras = suplemenNode.body.split(/\n\s*\n/).map((p) => p.trim());
      suplemen = {
        intro: paras.filter((p) => !/^D\d\./.test(p)).join('\n\n'),
        bidang: [
          {
            nama: 'Semua bidang',
            items: paras
              .filter((p) => /^D\d\./.test(p))
              .map((p) => ({ judul: p.match(/^(D\d)\./)[1], isi: p.replace(/^D\d\.\s*/, '') })),
          },
        ],
      };
    }
  }

  return {
    bagian1,
    bagian2,
    pendahuluan,
    kondisiEksternal,
    profil,
    kriteriaIntro: kriteriaNode.body,
    kriteria,
    suplemen,
    penutup,
  };
}

/** Teks panduan LED yang relevan untuk satu butir. */
export function panduanUntukButir(led, b) {
  if (b.kriteria === 'profil') {
    const node = b.huruf === 'A' ? led.kondisiEksternal : led.profil;
    return { judul: node.title, intro: sectionMarkdown(node), item: '' };
  }
  if (b.kriteria === 'suplemen') {
    if (!led.suplemen) return null;
    return {
      judul: 'D. Suplemen Program Studi',
      intro: led.suplemen.intro,
      suplemen: led.suplemen.bidang.map((bd) => ({ nama: bd.nama, item: bd.items[b.suplemenIndex] })).filter((x) => x.item),
    };
  }
  const k = led.kriteria[b.kriteriaNo - 1];
  const t = k?.tahap[b.tahapNo - 1];
  if (!t) return null;
  return {
    judul: `C.${k.no} ${k.judul} — ${t.judul}`,
    intro: t.intro,
    item: b.huruf ? t.items[b.huruf] || '' : '',
  };
}
