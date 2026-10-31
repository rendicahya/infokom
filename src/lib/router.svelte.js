// Router berbasis hash agar aman di GitHub Pages: #/<jenjang>/<halaman>/<param>
function parse() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  return { jenjang: parts[0] || null, page: parts[1] || null, param: parts[2] || null };
}

export const route = $state(parse());

window.addEventListener('hashchange', () => {
  Object.assign(route, parse());
  window.scrollTo(0, 0);
});

export const href = (...parts) => '#/' + parts.filter((p) => p != null && p !== '').join('/');
