import {loadData,card,escape} from './main.js';
export async function render() {
  const {styles,categories} = await loadData();
  const params = new URLSearchParams(location.search);
  let selected = categories.some(category => category.id === params.get('category')) ? params.get('category') : 'all';
  const filters = document.querySelector('#filters');
  const input = document.querySelector('#search');
  input.value = params.get('q') || '';
  filters.innerHTML = [{id:'all',name:'全部展覽'},...categories].map(category => `<button type="button" data-category="${category.id}" aria-pressed="${selected===category.id}">${escape(category.name)}</button>`).join('');
  function update() {
    const query = input.value.trim().toLocaleLowerCase();
    const results = styles.filter(style => (selected==='all'||style.category===selected) && [style.name,style.englishName,...style.tags].join(' ').toLocaleLowerCase().includes(query));
    document.querySelector('#exhibitions').innerHTML = results.length ? results.map(card).join('') : `<div class="empty"><h2>${selected==='digital-future'&&!query?'本展區策展中。':'沒有符合的展覽。'}</h2><p>試試其他分類或搜尋詞，探索目前收錄的風格。</p></div>`;
    document.querySelector('#result-count').textContent = `${String(results.length).padStart(2,'0')} 個展覽 / 圖像皆為原創風格示意`;
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.category===selected)));
    const url = new URL(location.href); url.search = '';
    if(selected!=='all') url.searchParams.set('category',selected);
    if(query) url.searchParams.set('q',input.value.trim());
    history.replaceState(null,'',url);
  }
  filters.addEventListener('click',event => {const button=event.target.closest('button');if(button){selected=button.dataset.category;update();}});
  input.addEventListener('input',update); update();
}
