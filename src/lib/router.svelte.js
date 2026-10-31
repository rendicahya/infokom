// Router berbasis hash agar aman di GitHub Pages: #/<jenjang>/<halaman>/<param>?<query>
function parse() {
  const [path, q = ''] = location.hash.replace(/^#\/?/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  return {
    jenjang: parts[0] || null,
    page: parts[1] || null,
    param: parts[2] || null,
    query: Object.fromEntries(new URLSearchParams(q)),
  };
}

export const route = $state(parse());

window.addEventListener('hashchange', () => {
  Object.assign(route, parse());
  window.scrollTo(0, 0);
});

export const href = (...parts) => '#/' + parts.filter((p) => p != null && p !== '').join('/');
