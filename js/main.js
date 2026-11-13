const root = new URL('../', import.meta.url);
export const path = value => new URL(value, root).href;
export const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export async function loadData() {
  const responses = await Promise.all(['styles','categories'].map(name => fetch(path(`data/${name}.json`))));
  if (responses.some(response => !response.ok)) throw new Error('無法取得展覽資料');
  const [styles, categories] = await Promise.all(responses.map(response => response.json()));
  return {styles, categories};
}
export const styleLink = id => path(`pages/style.html?id=${encodeURIComponent(id)}`);
export function card(style) {
  return `<article class="card"><a href="${styleLink(style.id)}"><div class="art"><img src="${path(style.image)}" alt="${escape(style.imageAlt)}" loading="lazy"></div><div class="meta"><span>${escape(style.englishName.toUpperCase())}</span><span>${escape(style.period)}</span></div><h3>${escape(style.name)} ↗</h3><p>${escape(style.summary)}</p></a></article>`;
}
export function showError(element) {
  if (element) element.innerHTML = `<div class="error"><h2>暫時無法載入展覽。</h2><p>請確認網路連線後重新整理。若以本機檔案開啟，請改用 HTTP 伺服器或正式網站網址。</p><a class="arrow-link" href="${path('pages/exhibitions.html')}">返回展覽列表 ↗</a></div>`;
}
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); menu.focus();
  }
});
document.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) {
    const replacement = document.createElement('p'); replacement.className = 'empty';
    replacement.textContent = `圖片暫時無法顯示：${event.target.alt}`; event.target.replaceWith(replacement);
  }
}, true);
const page = document.body.dataset.page;
if (page === 'home') {
  loadData().then(({styles,categories}) => {
    document.querySelector('.count').textContent = String(styles.length).padStart(2, '0');
    document.querySelector('#featured').innerHTML = styles.slice(1,4).map(card).join('');
    document.querySelector('#categories').innerHTML = categories.map((category,index) => `<a class="category-row" href="${path(`pages/exhibitions.html?category=${category.id}`)}"><span>0${index+1}</span><div><strong>${escape(category.name)}</strong><small> / ${escape(category.englishName)}</small></div><span class="category-description">${escape(category.description)}</span><span>↗</span></a>`).join('');
  }).catch(() => {showError(document.querySelector('#featured')); showError(document.querySelector('#categories'));});
} else if (['exhibitions','style','timeline'].includes(page)) {
  import(`./${{exhibitions:'exhibitions',style:'style-detail',timeline:'timeline'}[page]}.js`).then(module => module.render()).catch(() => showError(document.querySelector('#exhibitions, #style-content, #timeline')));
}
