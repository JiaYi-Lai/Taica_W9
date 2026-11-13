import {loadData,styleLink,path,escape} from './main.js';
export async function render() {
  const {styles}=await loadData();
  document.querySelector('#timeline').innerHTML = [...styles].filter(style=>Number.isFinite(style.startYear)).sort((a,b)=>a.startYear-b.startYear).map(style=>`<article class="timeline-item"><span class="year">${style.startYear}${style.id==='art-nouveau'?' ≈':''}</span><div><p class="eyebrow">${escape(style.period)} / ${escape(style.englishName)}</p><h2><a href="${styleLink(style.id)}">${escape(style.name)} ↗</a></h2><p>${escape(style.summary)}</p></div><a href="${styleLink(style.id)}"><img loading="lazy" src="${path(style.image)}" alt="${escape(style.imageAlt)}"></a></article>`).join('');
}
