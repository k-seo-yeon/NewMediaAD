import {menus,scene} from './scene.js';
const app=document.querySelector('#app');
let page='menu',index=0,route='',choice='',step=0,fork=false;
const price=m=>m.price.toLocaleString('ko-KR')+'원';
const button=(act,label,cls='cta',disabled=false)=>'<button data-act="'+act+'" class="'+cls+'" '+(disabled?'disabled':'')+'>'+label+'</button>';
const routes={bowl:'그릇에 담아 받기',single:'일회용기에 받기'};
function render(){
 const m=menus[index];
 let title='',body='',foot='';
 if(page==='menu'){
  title='배민배달';body='<section><small>상도동 · 분식과 한 끼</small><h1>오늘 뭐 드실래요?</h1><h2>인기 메뉴</h2>'+menus.map((item,i)=>button('menu'+i,scene(item,'menu','',0)+'<span><b>'+item.name+'</b><br>'+price(item)+'</span>','item '+(i===index?'on':''))).join('')+'</section>';
  foot=button('cart',price(m)+' 담고 장바구니 보기');
 }else if(page==='cart'){
  title='장바구니';body='<section><h2>'+m.name+' 1개</h2><b>'+price(m)+'</b></section><section class="divider"><label><input id="fork" type="checkbox" '+(fork?'checked':'')+'> 일회용 수저·포크 받기</label><h2>어떻게 받으실래요?</h2>'+button('preview','<small>배민 체험 광고</small><strong>마지막 한 입, 그다음은?</strong>'+m.name+' 다 먹은 내 식탁 미리 보기　›','ad')+Object.entries(routes).map(([id,name])=>button('pick-'+id,(choice===id?'●':'○')+'　'+name,'option '+(choice===id?'on':''))).join('')+'</section>';
  foot=button('order',price(m)+' 주문 체험하기','cta',!choice)+button('menu','메뉴 다시 고르기','ghost');
 }else if(page==='bite'){
  title='내 식탁 미리 보기';body='<section><span class="tag">'+m.name+' · 마지막 한 입</span><h1>'+m.last+'이 남았어요.</h1><p>그릇 속 음식을 눌러 마지막 한 입을 드세요.</p>'+button('finish',scene(m,'bite','',0),'art')+'</section>';
  foot=button('finish','마지막 한 입 먹기');
 }else if(page==='routes'){
  title='내 식탁 미리 보기';body='<section><span class="tag">'+m.name+' · 식사 직후</span><h1>다 먹었다. 이제 뭐 하지?</h1><div class="art">'+scene(m,'after','',0)+'</div><p>'+m.left+'이 남은 식탁이에요. 어떤 용기로 받았을 때의 뒷정리를 체험할까요?</p></section>';
  foot=button('try-single','일회용기로 받았다면')+button('try-bowl','그릇으로 받았다면','ghost');
 }else if(page==='after'){
  title='내 식탁 미리 보기';
  const tasks=route==='bowl'?['그릇을 회수 봉투에 담기','봉투를 문 앞에 두기']:[m.left+' 비우기','용기 안쪽 씻기','분리배출하기'];
  const done=step===tasks.length;
  const captions=route==='bowl'?['그릇은 씻을 필요가 없어요. 음식이 담겨 왔던 그릇을 봉투에 넣어 주세요.','봉투를 문 앞에 두면 회수를 맡길 수 있어요.']:[m.left+'이 용기 안에 남아 있어요.','내용물을 비웠지만 용기 안쪽에 양념이 묻어 있어요.','깨끗해진 용기를 분리배출해 주세요.'];
  body='<section><span class="tag">'+m.name+' · '+routes[route]+'</span><h1>'+(done?(route==='bowl'?'문 앞에 두고, 식사 끝.':'씻고 버려야, 식사 끝.'):'마지막 한 입 다음 장면')+'</h1><div class="progress">'+tasks.map((_,i)=>'<i class="'+(i<step?'filled':'')+'"></i>').join('')+'</div><div class="art">'+scene(m,'after',route,step)+'</div><p class="caption">'+(done?(route==='bowl'?'오늘 내 손으로 씻은 용기 0개.':'남은 양념을 비우고 용기를 씻어 분리배출했어요.'):captions[step])+'</p></section>';
  foot=done?button('apply','이 용기로 장바구니에 적용')+button('compare','다른 용기의 다음 장면 보기','ghost'):button('task',tasks[step]);
 }else{
  title='주문 내역';body='<section class="receipt"><small>모의 주문 완료</small><h1>'+m.name+'</h1><p>'+routes[choice]+'</p><b>'+price(m)+'</b></section>';foot=button('reset','처음부터 다시 체험');
 }
 if(['bite','routes','after'].includes(page))foot+=button('cart','미리 보기 닫기','ghost');
 app.innerHTML='<header>'+title+'<small>배달의민족 · 수업용 프로토타입</small></header>'+body+'<footer>'+foot+'</footer>';
 app.querySelector('#fork')?.addEventListener('change',e=>fork=e.target.checked);
}
app.addEventListener('click',e=>{
 const action=e.target.closest('[data-act]')?.dataset.act;
 if(!action)return;
 if(/^menu\d$/.test(action)){index=Number(action.slice(4));choice='';}
 else if(action==='preview')page='bite';
 else if(action==='finish')page='routes';
 else if(action.startsWith('try-')){route=action.slice(4);page='after';step=0;}
 else if(action==='task')step++;
 else if(action==='compare'){route=route==='bowl'?'single':'bowl';step=0;}
 else if(action==='apply'){choice=route;page='cart';}
 else if(action.startsWith('pick-'))choice=action.slice(5);
 else if(action==='reset'){page='menu';index=0;choice='';fork=false;}
 else page=action;
 render();
});
render();
