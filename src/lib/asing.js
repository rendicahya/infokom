// Istilah asing (bahasa Inggris) di dokumen LED/matriks ditampilkan miring.
// Daftar dikumpulkan dari isi dokumen; frasa panjang didahulukan agar tidak terpotong.
// Akronim (SWOT, OBE, ACM, …) dan kata serapan baku KBBI (data, digital, internet, web, platform, audit, virtual) tidak dimiringkan.
const ISTILAH = [
  // Sains Data: daftar topik berbahasa Inggris utuh
  'Applied Statistical and mathematical topics including inference, modeling, linear algebra, probability, and optimization',
  'Visualization and communication of the knowledge obtained from the data',
  'Data ethics including legitimate use and algorithmic fairness',
  'Governance including privacy, security, and stewardship',
  'Advanced data science coursework that provides depth',
  'Computing including data structures and algorithms',
  'Data acquisition and representativeness',
  'Model development and deployment',
  'Data preparation and integration',
  'Data management',
  'Data analysis',
  // frasa
  'general-purpose programming language',
  'Software Development and Management',
  'Internet of Things',
  'Business Intelligence',
  'Root-Cause Analysis',
  'Mission Differentiation',
  'outcome-based education',
  'case-based learning',
  'problem-based learning',
  'requirement specification',
  'hard competence',
  'proof techniques',
  'scientific vision',
  'baseline indicator',
  'capstone project',
  'software product',
  'major projects',
  'data mining',
  'key actors',
  'key persons',
  'task force',
  // kata tunggal
  'outcome-based', 'outcome', 'stakeholders?', 'intangible', 'tangible', 'strengths?', 'weakness(?:es)?',
  'opportunit(?:y|ies)', 'threats?', 'feasible', 'idea', 'baseline', 'Culture', 'Relevance', 'Accountability',
  'Enterprise', 'e-learning', 'monitoring', 'client-server', 'routing', 'switching', 'malware', 'mobile', 'game',
  'software', 'frameworks?', 'tools', 'runtime', 'grammar', 'soft',
];

// Batas kata: bukan huruf/angka/tanda hubung, supaya "idea" tidak cocok di "idealisme".
// "Tool" pada "Tool-tool" ditangani khusus.
const pola = ISTILAH.map((s) => s.replace(/ /g, '\\s+')).join('|');
const RE = new RegExp(`(?<![\\p{L}\\d-])(?:${pola}|tool(?=-tool))(?![\\p{L}\\d]|-(?!tool))`, 'giu');

const em = (teks) => teks.replace(RE, '<em>$&</em>');

/** Memiringkan istilah asing di HTML; teks di dalam tag dan di dalam em/i/code/pre dilewati. */
export function miringkanHtml(html) {
  let lewati = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((bagian) => {
      if (bagian.startsWith('<')) {
        const m = /^<(\/?)(em|i|code|pre)\b/i.exec(bagian);
        if (m) lewati += m[1] ? -1 : 1;
        return bagian;
      }
      return lewati > 0 ? bagian : em(bagian);
    })
    .join('');
}

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Untuk teks polos (judul): di-escape dulu, lalu istilah asingnya dimiringkan. */
export const asing = (teks) => em(esc(teks));
