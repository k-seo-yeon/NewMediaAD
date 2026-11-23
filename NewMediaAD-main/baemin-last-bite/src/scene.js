export const menus=[
 {name:'국물떡볶이',price:14000,stock:'#bb4227',bite:'#ffae55',left:'빨간 양념',last:'마지막 떡 한 조각',shape:'rice'},
 {name:'해물짬뽕',price:11000,stock:'#a54220',bite:'#ffdb85',left:'짬뽕 국물',last:'마지막 면 한 젓가락',shape:'noodle'},
 {name:'간장찜닭',price:18000,stock:'#794124',bite:'#d78b42',left:'간장 양념',last:'마지막 닭 한 점',shape:'chicken'}
];
function piece(m,x,y){
 const form=m.shape==='rice'?'<rect x="-20" y="-7" width="40" height="14" rx="7" transform="rotate(-24)"/>':m.shape==='noodle'?'<path d="M-18 -8q6 22 12 0t12 0t12 0 M-19 -3q7 22 13 0t12 0t12 0" fill="none" stroke="currentColor" stroke-width="4"/>':'<path d="M-17 -6q8 -15 23 -7l13 12q2 15 -16 16l-18 -5q-7 -7 -2 -16"/>';
 return '<g transform="translate('+x+' '+y+')" fill="'+m.bite+'" color="'+m.bite+'">'+form+'</g>';
}
export function scene(m,stage,route,step){
 const done=stage==='after'&&step===(route==='bowl'?2:3);
 const bag=stage==='after'&&route==='bowl'&&step===1;
 const clean=route==='single'&&step>=2;
 const food=stage==='menu'?[[104,85],[147,74],[178,92],[121,109],[157,113]]:stage==='bite'?[[140,94]]:[];
 const bowl='<ellipse cx="140" cy="117" rx="82" ry="39" fill="#85664e" opacity=".17"/><path d="M49 90q14 62 91 62t91 -62" fill="'+(route==='single'?'#dadbd5':'#a9bbb9')+'"/><ellipse cx="140" cy="90" rx="91" ry="50" fill="#fff8e6"/><ellipse cx="140" cy="90" rx="81" ry="41" fill="'+(clean?'#eeeae0':m.stock)+'"/>'+food.map(([x,y])=>piece(m,x,y)).join('')+(stage==='after'&&!clean?'<path d="M93 81q20 -16 58 -12m-38 40q29 10 49 -1" fill="none" stroke="#ffdb9b" opacity=".45" stroke-width="3"/>':'');
 return '<svg aria-hidden="true" viewBox="0 0 280 180"><defs><pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M18 0H0V18" fill="none" stroke="#dac5a7"/></pattern></defs><rect width="280" height="180" fill="#f7e6c9"/><rect width="280" height="180" fill="url(#grid)"/>'+(done?'<path d="M112 92l18 17 40 -43" stroke="#07877c" stroke-width="9" fill="none" stroke-linecap="round"/>':bag?'<path d="M105 65q-8 -36 8 -36l27 33 21 -32q20 -3 10 36l22 68q-53 22 -107 0z" fill="#4ba89c"/><path d="M105 68l65 -2" stroke="#146960" stroke-width="6"/>':bowl)+'</svg>';
}
