Date.prototype.namaBulan=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];Date.prototype.namaHari=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];function _ajax(url,method,data){var url=url.replace(/(.)\/\//,'$1/');var method=method=='get'?'get':'post';var data=data|[];return $.ajax({type:method,url:url,data:data,dataType:'json',}).fail(function(xhr,err,msg){})}function addZero(i){if(i<10){i="0"+i;}return i;}function getArticleDate(d){var d=new Date(d);if(isNaN(d.valueOf()))return'';var hari=d.namaHari[d.getDay()];var bulan=d.namaBulan[d.getMonth()];return hari+', '+d.getDate()+' '+bulan.slice(0,3)+' '+d.getFullYear()+' '+addZero(d.getHours())+':'+addZero(d.getMinutes())+' WIB';}function getArticleType(type){if(type)return type.replace('dev','').toUpperCase();}function getArticleLayout(layout){var index=parseInt(layout);if(index<2)index=0;var layouts=['default','news','photo','video','pasangmata','male','majalah','fem'];return _.get(layouts,index,'default');}function stripTags(text){text=$('<textarea/>').html(text).text();var div1=document.createElement('div');div1.innerHTML=text;var div2=document.createElement('div');div2.innerHTML=div1.textContent||div1.innerText;var strText=div2.textContent||div2.innerText;if(strText=='undefined')strText='';return strText;}function getEmagzDownloadUrl(strSite,strDate,strUrl,strPass){var arrDate=strDate.split(' ');var arrDateTime=arrDate[0].split('/');var strEncFile=CryptoJS.MD5(arrDateTime[0]+'/'+strUrl+strPass);var strDownloadUrl=strSite+'/cb/'+strEncFile+'/'+arrDateTime[0]+'/'+strUrl;return strDownloadUrl;}function setImage(){imgSrc=arguments[0];imgTitle=arguments[1];imgRatio=arguments[2];imgQs=arguments[3];imgClass=arguments[4];imgOpt=arguments[5];var title=imgTitle.replace(/\'/g,"");title=title.replace(/\"/g,"");title=stripTags(title);if(typeof imgQs=='undefined')imgQs='';if(typeof imgClass=='undefined')imgClass='';if(typeof imgOpt=='undefined')imgOpt='';var src=imgSrc;if(imgSrc){src=src.replace(/\/content\//gi,'/customthumb/');src=src.replace(/\/tv\//gi,"/customtv/");}if(strpos(imgSrc,'/visual/')!==false){if(imgRatio!=''){var regex=/.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;var pathName=regex.exec(src)[1];var fileName=pathName.split('/').pop();var fileExt=fileName.split('.').pop();var arrSrc=src.split('_');if(arrSrc.length>1){src=arrSrc[0]+'_'+imgRatio+'.'+fileExt;}else{var srcTemp=tok(src,'?');src=srcTemp.replace('.'+fileExt,'_')+imgRatio+'.'+fileExt;}}}if(imgQs!=''){var srcTemp=tok(src,'?');src=srcTemp+imgQs;}return'<img onerror="this.src = \'images/default-43.gif?w=200\'" src="'+src+'" alt="'+title+'" title="'+title+'" class="'+imgClass+'" '+imgOpt+'/>';}function strpos(haystack,needle,offset){var i=(haystack+'').indexOf(needle,(offset||0));return i===-1?false:i;}function isURL(str){var pattern=new RegExp('^(https?:\/\/)?'+'((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+'((\d{1,3}\.){3}\d{1,3}))'+'(\:\d+)?(\/[-a-z\d%_.~+]*)*'+'(\?[;&a-z\d%_.~+=-]*)?'+'(\#[-a-z\d_]*)?$','i');if(!pattern.test(str)){alert("Please enter a valid URL.");return false;}else{return true;}}function tok(s,chars,rtl){var n,i=chars.length;rtl=true===rtl;while(i--){n=s.indexOf(chars[i]);s=n<0?s:rtl?s.substr(++n):s.substr(0,n);}return s;}function eq(left,right,opts){if(left==right)return opts.fn(this)
return opts.inverse(this);}Handlebars.registerHelper('eq',eq);Handlebars.registerHelper('getArticleType',getArticleType);Handlebars.registerHelper('getArticleLayout',getArticleLayout);Handlebars.registerHelper('getArticleDate',getArticleDate);Handlebars.registerHelper('getArticleDate',getArticleDate);Handlebars.registerHelper('stripTags',stripTags);Handlebars.registerHelper('getEmagzDownloadUrl',getEmagzDownloadUrl);Handlebars.registerHelper('setImage',setImage);var ApiDate={set:function(d){var olddate=LASTDATE;var d=new Date(d);if(isNaN(d.valueOf())){return;}LASTDATE=d;},get:function(){var d=LASTDATE
menit=d.getMinutes();detik=d.getSeconds();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+menit+':'+detik;}}
var Template=new function(){var _tpl={};return function(name){if(!_.has(_tpl,name)){var source=$('#'+name+'-template').html();_tpl[name]=Handlebars.compile(source);}return _tpl[name];}}
var Nf={onNext:false,run:function(){Nf.listen();$(document).scroll(Nf.scrollHandler);Nf.scrollHandler();$('#notif-container > a').click(Nf.notifClick);$(function(){Newsfeed.Ads=$('.newsfeed-ads');})},scrollHandler:function(e){if(Newsfeed.count>2)return;var pos=$(document).scrollTop(),nf=$('#newsfeed-container'),wh=$(window).height(),nfh=nf.height(),nft=nf.offset().top,target=nft+nfh-wh+50;;if(pos>target){Nf.next();}},listen:function(){if(window.WebSocket){var ws=new WebSocket('wss://push.detik.com/ws/wpnewsfeed_2');ws.onopen=function(){};ws.onmessage=function(me){if(me.data){var d=JSON.parse(me.data)
if(typeof d.type!='undefined'){if(d.type=='breakingnews'&&d.status=='on'){setTimeout(function(){window.location='//www.detik.com/';},10000);}else if(d.type=='breakingnews'&&d.status=='off'){setTimeout(function(){window.location='//www.detik.com/';},10000);}}else{if(!$('#a'+d.id).length){Notif.set(d.count).reload();Notif.target='newsfeed-anchor';}}}}}},reload:function(){return _ajax('//apis.detik.com/v1/newsfeed?limit=60&page=1').done(function(resp){if(resp.success){Headline.set(resp.data.headline).reload();Newsfeed.set(resp.data.nonheadline).reload();if(Newsfeed.Ads){setTimeout(function(){var nPos={0:4,1:12,2:19}
Newsfeed.Ads.each(function(i,v){var ths=$(this)
var index=nPos[i]
var id=ths.find('ins').attr('id')
var arg=id.split('_').slice(0,-1).join('_');var indexObj=$('#newsfeed-container li:eq('+parseInt(index)+')')
indexObj.after('<li class="newsfeed-ads"><div id="center ads" class="c_ads"><ins id="'+id+'"></ins></div></li>')
indexObj.html(OA_show(arg,id))})
$(document.body).trigger('sticky_kit:recalc')},2000)}}})},notifClick:function(e){e.preventDefault();dtkAds.ga().reload([],false);location.reload(true);$('html, body').animate({scrollTop:parseInt($(".headline").offset().top)},500);Nf.reload().done(function(resp){Newsfeed.reset();Notif.count=0;Notif.set(0).reload();$(".lqd").imgLiquid();})},next:function(){if(Nf.onNext)return true;Nf.onNext=true;var freeze=(Newsfeed.page-1)*Newsfeed.nextTotal+1;if(Newsfeed.page==1){dtkAds.gaEvent('GA WP New Detikcom 2015','Newsfeed / NHL','List Berita 1',1)}else if(Newsfeed.page==2){dtkAds.gaEvent('GA WP New Detikcom 2015','Newsfeed / NHL','List Berita 2',1)}else if(Newsfeed.page==3){dtkAds.gaEvent('GA WP New Detikcom 2015','Newsfeed / NHL','List Berita 3',1)}$('#newsfeed-more-news').show();$('.more-trigger').hide();return _ajax('//apis.detik.com/v1/newsfeed?limit='+Newsfeed.nextTotal+'&lt='+ApiDate.get()).done(function(resp){if(resp.success&&!_.isEmpty(resp.data.nonheadline)){Newsfeed.count++;Newsfeed.append(resp.data.nonheadline);Newsfeed.lastDate=resp.lastDate;Newsfeed.page++;$(document.body).trigger('sticky_kit:recalc');dtkAds.ga().reload(['skinnerkanan','skinnerkiri','showcaseleft1_sticky','showcaseright1_sticky'],false);}}).always(function(){Nf.onNext=false;$('#newsfeed-more-news').hide();if(Newsfeed.count>2){$('.more-trigger').show().click(function(){$('#newsfeed-more-news').remove();window.location.replace("//news.detik.com/indeks");});}})}}
var Headline={data:[],set:function(data){Headline.data=data;if(data&&data.related_story&&$.isArray(data.related_story))Headline.data.terkait=data.related_story.slice(0,2);return Headline;},reload:function(){var tpl=Template('headline'),html=tpl(Headline.data);$('#headline-container').html(html);}}
var Notif={count:0,target:'newsfeed-anchor',docTitle:document.title,set:function(count){Notif.count+=count;return Notif;},reload:function(){var nc=$('#notif-container');if(Notif.count>0){nc.show();nc.find('.count').html(Notif.count);document.title='('+Notif.count+') '+Notif.docTitle;}else{nc.hide();document.title=Notif.docTitle;}},}
var Newsfeed={Ads:null,count:0,page:2,nextTotal:40,lastDate:STRLASTDATE,data:[],reset:function(){Newsfeed.count=0;Newsfeed.page=1;},set:function(data){Newsfeed.data=data;return Newsfeed;},reload:function(){var html=Newsfeed.renderTemplate(Newsfeed.data);html.push(Template('newsfeed-more-news')([]))
Newsfeed.reset();$('#newsfeed-container').html(html.join(''));$('#newsfeed-container').show();$(document.body).trigger('sticky_kit:recalc');},renderTemplate:function(data){var lastData=data.slice(-1).pop();ApiDate.set(lastData.date_published);return data.map(function(item,key){var layout=getArticleLayout(item.layout);var name='newsfeed-default';var loop=key+1
var html,ads=_.toArray(Newsfeed.Ads);var widget=parseInt(item.widget);if(!_.isNaN(widget)&&widget>0){if(layout=='default')layout='special-article';name='newsfeed-'+layout;}html=Template(name)(item);return html;})},append:function(data){var html=Newsfeed.renderTemplate(data);$(html).find('a').click(function(e){shareBox.addShare(this);e.preventDefault();});$('#newsfeed-more-news').before(html.join(''));if(Newsfeed.page==2){}else if(Newsfeed.page==3){}if(Newsfeed.count>2){$('.more-trigger').show();}$(document.body).trigger('sticky_kit:recalc');}}
Nf.run();var allAds=advs={};$(function(){$('ins').each(function(i,v){var obj=$(v);var id=obj.attr('id');var arg=id.split('_').slice(0,-1).join('_');var parent=$(v).parent();var close=parent.find('span');obj.prev('script').remove();var obj={obj:obj,id:id,arg:arg,parent:parent,close:close,isClosed:false,hasFrame:obj.find('iframe').length};if(!obj.hasFrame)advs[arg]=obj;allAds[arg]=obj;});});function closeAds(scr,checkClose){var ads={};if(!scr.length){ads=allAds;}else{$.each(scr,function(i,v){ads[v]=allAds[v];});}$.each(ads,function(i,v){if(v&&v.hasFrame)try{v.parent.hide();v.parent.find('ins').empty();var btn_close=v.parent.find('span');$(btn_close).hide().off();}catch(e){}});}var spcjs=$('#spcjs').attr('src');function reloadAds(scr,checkClose){$('#spcjs').remove();$('head').append('<script src="'+spcjs+'" id="spcjs" crossorigin="anonymous"></script>');var ads={};if(!scr.length){ads=allAds;}else{$.each(scr,function(i,v){ads[v]=allAds[v];});}$.each(ads,function(i,v){if(i=='topframe'){$("[data-sticky_column]").trigger("sticky_kit:detach");$("[data-sticky_column]").stick_in_parent({parent:"[data-sticky_parent]",inner_scrolling:false,offset_top:95,spacer:false});$('.top_banner_bar#top_banner').css('cssText','height:55px !important;');}try{if(v.hasFrame)v.parent.html(OA_show(v.arg,v.id)).show();(function(that){var the_close=that.close;$(the_close).click(function(){closePerAds(this);}).show();})(v);}catch(e){}});}function closePerAds(elm){$(elm).parent().hide();$(elm).parent().find('ins').empty();$(elm).parent().find('div').hide();$(elm).hide().off();}var dtkAds={docTitle:document.title,reload:function(scr,checkClose){closeAds(scr,checkClose);reloadAds(scr,checkClose);return dtkAds;},ga:function(){try{ga('nTrack.send','pageview',{'page':'/','title':dtkAds.docTitle+' -- more'});ga('send','pageview',{'page':'/','title':dtkAds.docTitle+' -- more'});_gaq.push(['_setAccount','UA-891770-5'],['_set','title',dtkAds.docTitle+' -- more'],['_trackPageview']);_gaq.push(['_setAccount','UA-891770-118'],['_set','title',dtkAds.docTitle+' -- more'],['_trackPageview']);_gaq.push(['_setAccount','UA-891770-59'],['_set','title',dtkAds.docTitle+' -- more'],['_trackPageview']);}catch(e){}return dtkAds;},gaEvent:function(category,action,label,count){try{ga('nTrack.send','event',category,action,label,count);ga('send','event',category,action,label,count);_gaq.push(['_setAccount','UA-891770-5'],['_trackEvent',category,action,label]);_gaq.push(['_setAccount','UA-891770-118'],['_trackEvent',category,action,label]);_gaq.push(['_setAccount','UA-891770-59'],['_trackEvent',category,action,label]);}catch(e){}return dtkAds;},nativeAdsCB:function(r,index,impression){if(r.success){$('#newsfeed-container li:eq('+parseInt(index)+')').before(r.code);if(typeof(impression)!='undefined'){var imgImprs=$('<img/>').attr({src:impression,width:'1px',height:'1px'}).css({width:'1px',height:'1px'});$('#newsfeed-container li:eq('+parseInt(index)+')').append(imgImprs);}}},nativeAd:function(index,label){var the_div=document.createElement('div')
the_div.id=label+'_container'
$('#newsfeed-container li:eq('+parseInt(index)+')').before(the_div)
var the_div_child=document.createElement('div')
the_div_child.id=label
$('#'+label+'_container').html(the_div_child)
the_ad=OA_output[label]
$('#'+label+'_container').append($(the_ad))
googletag.cmd.push(function(){googletag.display(label)})},nativeAds:function(index,key){var slctr=$('#newsfeed-container li:eq('+parseInt(index)+')')
if($('#'+key).length)return false
$.getJSON('http://n208adserv.com/ads-api-v3?key='+key+'&format=jsonp&callback=?',function(r){if(r.success){slctr.before(r.code)
slctr.attr('id',key)}});}}
$(function(){$(document.body).trigger('sticky_kit:recalc');$(window).bind('load',function(){$(document.body).trigger('sticky_kit:recalc');});$('body').on('heightchange',function(e){$(document.body).trigger('sticky_kit:recalc');});$("a").click(function(event){var category=$(this).data('category');if(category){var action=$(this).data('action');var label=$(this).data('label');dtkAds.gaEvent(category,action,label,1);}});});window.onload=function(){$.getJSON('//tv.detik.com/statuslive/wpnewsfeed_2',function(data){if(data){console.log(data);if(data.status=="on"){$.get("//www.detik.com/breakingnews",function(html){$('.box_hl_new').replaceWith(html);});}}});}