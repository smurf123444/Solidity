(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{36:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n(10),r=n.n(c),s=n(5),a=n(6),o=n(8),l=n(7),d=n(9),p=n.p+"static/media/governor-spinner.ebda823e.gif",j=(n(36),n(2)),h=function(){return Object(j.jsx)("div",{className:"loader-container",children:Object(j.jsx)("img",{className:"loader-spinner",src:p,alt:""})})},g=function(e){Object(o.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"componentDidUpdate",value:function(e){this.props.location.pathname!==e.location.pathname&&this.pageDidChange()}},{key:"pageDidChange",value:function(){window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),n}(i.Component),m=Object(d.d)(g),O=n.p+"static/media/governor-plain.fdaa96e4.png",u=n(43),b=n(44),x=n(45),v=n(46),A={to:"https://governordao.org/gaas",title:"Solutions"},f=[{to:"https://mine.governordao.org/",title:"Liquidity Mine"},{to:"https://swap.governordao.org/",title:"Swap"},{to:"https://airdrop.governordao.org/",title:"Airdrop"}],w=[{to:"https://governordao.org/media",title:"Media"},{to:"https://gdao.network/",title:"Forum"},{to:"/",title:"Litepaper"},{to:"https://governor.social/",title:"Archive"}],k=[{to:"https://t.me/GovernorProject",title:"Telegram"},{to:"https://discord.gg/5UKw3BC",title:"Discord"},{to:"https://twitter.com/Governor_DAO",title:"Twitter"}],y=(n(38),function(e){Object(o.a)(n,e);var t=Object(l.a)(n);function n(e){var i;return Object(s.a)(this,n),(i=t.call(this,e)).onResize=function(){i.setState({isLarge:window.innerWidth>=992,isMedium:window.innerWidth>=768&&window.innerWidth<992,isSmall:window.innerWidth<768})},i.onToggleDrawer=function(){i.setState((function(e){return{isExpanded:!e.isExpanded}}))},i.onToggleAccordion=function(e){i.state.isItemOpen===e?i.setState({isItemOpen:null}):i.setState({isItemOpen:e})},i.getAccordion=function(e,t){var n=e[0].toUpperCase()+e.substring(1);return Object(j.jsxs)("div",{className:"accordion-container",children:[Object(j.jsxs)("div",{className:"accordion-toggle",onClick:function(){return i.onToggleAccordion(e)},children:[n,i.state.isItemOpen===e?Object(j.jsx)(u.a,{}):Object(j.jsx)(b.a,{})]}),Object(j.jsx)("div",{className:"accordion-menu ".concat(i.state.isItemOpen===e?"expanded":""),children:t.map((function(e,t){return Object(j.jsx)("a",{href:e.to,onClick:function(){i.setState({isExpanded:null,isItemOpen:null}),"Litepaper"===e.title&&window.open("https://governordao.org/papers/GDAO-Litepaper.pdf","_blank")},children:e.title},t)}))})]})},i.scrollTo=function(e){return Object(j.jsx)("div",{className:"menu-item",onClick:function(){var t;i.setState({isExpanded:null,isItemOpen:null}),null===(t=document.getElementById(e.to))||void 0===t||t.scrollIntoView({behavior:"smooth"})},children:e.title})},i.getLink=function(e){return Object(j.jsx)("a",{href:e.to,className:"menu-item",onClick:function(){i.setState({isExpanded:null,isItemOpen:null})},children:e.title})},i.state={isSmall:null,isMedium:null,isLarge:null,isExpanded:null,isItemOpen:null},i}return Object(a.a)(n,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.onResize),this.onResize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onResize())}},{key:"render",value:function(){var e=this,t=function(){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{className:"xs-nav-toggle",onClick:e.onToggleDrawer,children:e.state.isExpanded?Object(j.jsx)(v.a,{}):Object(j.jsx)(x.a,{})}),Object(j.jsxs)("div",{className:"xs-nav-menu ".concat(e.state.isExpanded?"expanded":""),children:[e.getLink(A),e.getAccordion("applications",f),e.getAccordion("resources",w),e.getAccordion("social",k)]})]})},n=function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"lg-nav-menu",children:[e.getLink(A),e.getAccordion("applications",f),e.getAccordion("resources",w),e.getAccordion("social",k)]})})};return Object(j.jsx)("div",{className:"header-container",children:Object(j.jsxs)("div",{className:"header-content",children:[Object(j.jsxs)("a",{href:"https://governordao.org",className:"logo-container",children:[Object(j.jsx)("div",{className:"logo-img",children:Object(j.jsx)("img",{src:O,alt:"logo"})}),Object(j.jsx)("div",{className:"logo-title",children:"Decentralife"})]}),this.state.isSmall||this.state.isMedium?Object(j.jsx)(t,{}):Object(j.jsx)(n,{})]})})}}]),n}(i.Component)),S=n.p+"static/media/aragon.89569502.png",D=[["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAyCAYAAACXpx/YAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzBDRTYwMDQyMkU3MTFFQjk4NThEMDE5MEIxMzI1QTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzBDRTYwMDMyMkU3MTFFQjk4NThEMDE5MEIxMzI1QTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNzVDM0JDQUE5Q0YxMUVBQUE0REU5QjM2ODA5NEU0MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNzVDM0JDQkE5Q0YxMUVBQUE0REU5QjM2ODA5NEU0MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpKmlKMAABD9SURBVHja7FwLdBTVGf5nZjebBEIIDwGptPIQq4ivWlSKtaW2IkLFZ63iEdQcFEoBLYpare0RFRWhqFVTrVq11hcoKFhAoSJaXyAIUkEUVECeCSEJyc7O9PvvvTM7Ozu7mSUJtmXvOV8yc+fOvbvz3f9576xm2zY5RXvpQyJdAyJEtgXgmsXXcVxQSGSgvq5GXtM0eZOl2rntPecJOhsVN6DVFvR7M2n6e+I+TZfj8H8+1/Vkf4RjK05UW+N8KoxrqDaAwfcast7z2dNKaUeiZa/T8Fn3U2VJGVl87wFS5syZ4x631Lc+FwR8QIb2PMg5DjgD5LyL+heAfmCG8mX/lOYl2KZLIIkfQNqeBanHCslLxTBcextteIr9MP/4/2cItkdCYpeDvMegPoOITYVuDIZEL8KNc4FBad256jpfmloiuTXXhJhKG8x2kIaCjOdwHN3H8U9XWCPVOq0SttnMq/D9TzA7NCxZsSKi+jrpTOnGBjg9T+DCEDTosG8fQfsQjhxss7VDKBQTDlZ9fXIy5UtLE6w8YyG5tvSki1qDhL0gowFutzESqrkVVO5oTIDxaNY5hRhH3dppde+g7nZgpjAUFuoSIDfe4GlrK6LzpWVssCCWYhSN3QJiX8SDP13VSUlmiJDFqsG1KSCuByR6PNpuExPBiKwB8cMxAbiuXtUtQd3PhTetaTPdcRImJowp+ZQToBwHz+P/JVnDoXzJVYKVpJLdmiLRsSDkKjhGXWVsaw/FhYX4Px0nsylagB5sSY6Mf2tBzjTgL8AJOF8g7+OpBLJ4AtjWIimYLLEJ3MdQ93OdrV0OksdSJHKU+kCIpenXAI/5eJ6ypkqwpZWB0EmQ2nXArZC+rm7yQpaBwEvAa6g/y1XbTLaQZlGqgAW+nr8AFrkqmsnliSESJBRFXTkmwUcYu0KQG0GfSXAsDQ9d/wBtLw0t0fx5DnCPXPc9kEnUqmQ9iJ2Mk05udiq4/AhgFbsUbRTRRsBDtZN2V9Szl9wg7a3Map2Nexpw74NkRI8kdsgzg0Mw1g7/dscMAmsFnhjo3+BJlCdYld1Vk2lPZVvhyUYjXonMVk5SRL+Hh3temrrnwtJqutIqCXAngfYZNMB0Mgq2SRIjjQBtIgWH4bPdIjpTcyYFTG4DnMA178nhDqA0ZXaCE+YeqtxFtGMLlOwOqUJZ9RqGLxYOxPHAMyJFSdrwFO+XD3nS7EV4ZdZ77hFlGTAOztm3Mc442P2vAGockS8F4bof+EoduhJ9uoJGLl9MO9t0yEuwWwzNFpLLEldZCaI34/92GbqwFLiLCllxLPA4sBw9jnCJ1FVcy9LrT55Iaa4DOZDkSE+gHJgHEuOCRO+iRBK271wiEpOf8/3XSIfzZhqRA5rgSHqmipQqJLmStBv+Uk2NTW1Kn6KCWE+Q3y9k30eDlEeEdBLdD8xG/5vSvXVMCtPJa4jx96K+AuAVqJOpoChK0Whypcqn/X0eIlFZF6KVS2nEiiW0tX1n0m0rT3BSgn02l0+lRGtUW30PJOR9QZiVGANGeoQcoy/wAHA+MIwtfaqZtpJLkpYgfTD+XAMCTxUssvbgpUpGJOqEcH7pV583JrJs7d55lQxIb9wo+CYJ5vRtvBk0rN2UlF52gr31lnUEHJf38aCniTjYTlyOYSfias9GxvhcxLC6PhOqtiZdAjWlOPQzwcb1ODnJq0wEoQ11kugoCIzF2MnCZ7JbpTprKMUlRJvW0cDPV9PO0g5B5HIc3SfD56wFPhNxvlwE+TqgTVt1LdbId8YHJtg3OgHY4an/K3BPFi44tGzjEa8d6vkdE4LLtcAF+0awvJZwM04a7J9Qo2YFpG6kIrp3khTxdz3O7wABD6N9Ql7TgvQrS/YEXOsn7bTfRGvSm2ei4/CME4poI1qTFuPyOaS8AV60YVmZQrtvZXlI/YGLFUF/BK7zXWdiTwwpPLx40h041lPHx2+IiCO9zKL0JdSLgJ/5+shUuM3rSltmjIOzg8MP8qlIokegZg8nyxwBT/lTYCOOyyFdvTAhHmLfXHq7BvkI/CXAa8N/h3T3c3dsBEI5WBGRTNkCTTIJZI+UmS87aZ85dbp5A7XdU0lxbpteNoUkBx3RtcBb6tiNM4SPEK6sAL4fUD83oO4KYLCv7mngKaBLDhr5T34NlSrBmhGyH9uTAHFJexSkPio7sRMiZCmIyTDL8cBJLFpcJFKPnMrMbSHhS+Be4D5I7x43oaLrydz49s00YPEsslBnQhvpjWe8VitVyiR+BzjYd52ldQlwfJbc/btpfoUs7ZXaHOWTKo7bnlGaiwv7Mg/57mXzcKE6RhhD29TD01S/hs8cVKnPBhtFk5Tk56ii/aqQC68osZ0zeWxeLEjwA09QUbF84EY0mVkim2PjiZDiPjn6CRsFqZYNJ0+TTku8Xi5Z+hxo2riGum3bSLuLS8OQy+VGlaRxnKJzgDt9avw44Cbg90qC/eV8ZSczlQcBXlzxbmzghNBPgX8ALwfcM8RzfIki1PbY2m6e648BYz3JhXaZJVgPSzBJ6XSkh9TmPAiuIJU9XkstQpB9KSYE1J12+D4QexcmyAO4Py7mJ6c4OUPVEE8Nmbg0YNJ3OZSePOJEGrlyCX3dtlMY57ON5ziu1OIrwCdAJ8+1W4A/ALsC+mgd4rsMVVLY1lP3iDIBvX1tb1JawSmmgtdM+J1Dr7e+OUuiI+tWm0LPlhupdpnIQkhrUYn0YFuXQnILnVWi0ZgIH6uVpcPdXHRWCJv7OY5HCdWlGzMwXlzkreuq8VWABkgvfDyK6EcAOkAC/FU4jDqyP+0pbEVRngyNl6AZzer27ID6U5Se8Jf6EOOYSoq9patyxLzlbTWRclkgiuWQ6MhaKl317GStWJQTnA92tsrabGyvQvUYtOudo41dBcxAH3/GfQlhyhP10gyIHR6W0hjGeeohfAX8JOVrM6kgtybWiorgccdpX3cS0VLgI5/DwiHP4oC2zwHVlPpl2YHc4Gv3T+D2AM/cGzgOauFMVmBZJOJYTZvtLhx490Unvc4rUDc2hwSIU1aKkEQQa0sS+avu3SNz15aT5jQuEM6ZTiep+5an6WDWLAijDNskq+nLhO/6CD4kg4rsG3BvaYY+2QFiU3WWr75G2d3Klia40HP8GjAVhL3sSq1QvY4kaQ6x5cBEtDk49KhyJ84KMXFEmOUsKepyjNrdUhUbiK8MDWrM/o1ydiiLLXKTJlrzJK/MJmi7bGV+AMG1KoZt6Vy00Gmsnn4rCNZUpoydJWddVTpWMLw0GpfG43qXHLfUfChVlfZ0ihbgfnnyIIYVS4sRoV7vlLnskNLoxNLNU/yaaHsGG7giQEVXZeizj4gI0ktH5U0PbmmC++OhL3UTCLzEJ4i15PfizXVEV+PilfCSO+es8jQmTHs24y4LVsscUkVd29ktpxE0jZppk54ekKRY4w/8PRmrtSH7fSXLtTMCYuZmJljXl8qUYENyn5Wwf3o7PLwxuAaptQ/KcYwlwsZqINbZi+UnmCWPx2SHKpLiGFXlTLC7i7NJz2VqQPizMEPbViH7fNxjx7NlohbmMGFyJLihQXqijp3V9YOEKiabyW2XY9/wGjU4Z/YLxM61Rp50ZYCUccaLQyyOccMmXLIRHK5sDqgbTXKTn3+Sbs0Q84ZJf7LnP9xXVwE8rEIjb2FVfVjLEMzZIUkEgnxtNNTwhPAz1BUZhBLaXfg/R1orLRlLaxneCOQ6Jr+4DTRHpexrX2yppudK8GkqSVCiFgaYiKD17ouzSCunFD/22WZNefmbPanJFGOkJhGn464HJnuu9VKSfGXzE6yJ4BsD2yy1xbl1ZcML1G4D5idttiE3DzgZL9tmr/sqJSUfq1ThMplqTMhJwIkTtsWNE2VnJji0fh6vkK0M88S0QanKaRnuO1URPC/g2pmKXC63qfOTPddHCQEJTmM2geBY0UqK15cJ54o8ifzshVdH7sbDXegmhcU22piXWJ4sExS5zurIocqx4M3tU4jfdOAQSWTCTOngZR8/tg8qOhfdz6nSSwPCl7B9rFS57eN99TMC7DknOHb6+uatye0DYmOjkcxWlouRgjLOBFGsWEqf40W7L3WrnDOfW9ZsnA9UJC10hYqX6Zw3Hmy7O8Ah16cq+xS09MUP4V/As8AAGY0XK5WOL5M5tZl+je/B543BYbOCJ0cYz5/zw9eoHHEQuWHTYxUqy+UtnB0bmyE9OiyAm1UBSRN/vqEsvAQnzGo8qBJ3mY+TDbxyY8a9anwW2kzH+IuSoQnJRIiztUamMvuqoD6s132ugGU9D8mdhn6WUMPejVlCn3Q9zA5iWUeqalVK7at3UpVYE05pNoJ8qy2evqqU97q+kXTt+dT4a7emkr55lLqUuCDLPbOVsLTxTUj/wvZg5exZasKtzS1VaTurQJoki1Ut76SIN6xCFVSJ9kXm3iLJPnhg2x4ConnHx2W4NxIyRj0HJJ8DkivIiHaWS40hHSd2Ert0p1ePOYVGvfww7Wrd1r9sOL+JJq1eaZqWKnNDtJmXa0CfLFL1JtWwqeJhloSi1u2gvsdRQfExgnSOV71vMXB7lnihKsVbBXUk3yAcBZJ6kGnOgCYwhTYIBfMKkZ8VvxmSA3jF6XsDacPB3amMs2KUf3XFQ7Dpg3oxjIk2413w0CfgfBlIexGtf5Dy8NjmcRzNy3qs1tmjjag9zaRtFLbHsnpSIn4nEE8fywex3GerXSYBG+2Ty4seGHJ8kDv3hNOotGpbcyw6/B8RnEiUyJfCgqDy0ZKAoSD/DRy8ouyaNPQsuZyN2r4FPuHXRDXVyjVRv5LDL4xr+kQQDYmO3wHUKmkNQFxqEt23N0vTnbpDknUesFapgTk97se0ttt3qaR2d57gpAQn7gZ5dUnpDUAq8YNA1hRIdBc3RBI2T5dLffwaTPUuqTZrdkvpkvEu2/HrKGH1wqS5HWRWiUV9L4RjZyd/Ysnxkg3xkddj3HvkJAiQfn7tpmNXWnD0ACqtrswT7CnXQGp64MFPxYOvlVKbUZo/wnE5CO2Eh79a7l/eK9U020Lx2icIifM7SbUA1HYdrtfWSlst1Syn+SYJGx23JlPcrAJIIpHMaDmvpdg279ocBxJ74J6/iS1CQZ+P61nFIxI40F8dT3f3NZF9uRoP81A8xCnihTRHMqSKXgnpuRjXj0LbCiG2YuMdS57lTU4cLdWz7kheG4roRyVz3nFPVo83eCduUOlCfmuwUu65Ug4b0Tqcl8OTZ4mfLj95I1t/nNWwvA0OyumKv5xcvxYPCvYSqttMvEkJ+0Kc9wWeTL42YiupsZ1z2GR9NZhZjv9LRBrOpstxvA51K/j39DAJBrgvsvGEcF4et2zO5vxOEm3dSrw2bcYvA3phslWIwfI/sdSEVGUw2VtlZseWm91s5TEbyjZa7h5puWVHM/p4pk1/EcBrKVNpiMJsknuw5gspLYwoya7nF3phuPUb3feKvQmVfGlmglOcMFvaVV6QlytDR+LPeVCJvwCBvXMcWxJt03yRvTKMmRQr3ComDnvilie/nP8Nlv1AsKUkVywiKMkljX9S4eYsycPGtAOX03BfD0yWt+AcbRXv94pk3x7KM9tSNjhja/W7Vcnn/gSktzXs59WkRzbJ94qNkBBv5C/FvUPFr+/IvU1BOzbzZb8RHCymvOVzqtguq+u/AmlfyJ9SyPQSmyB2MdoOdm10UD48X74pgjMW3qVwL6SvJ8gbAxLXphItjl/FNV4xOZWyb0DLl/9Cgh3p4yTyfSD6MJA5Gqr4E+BNHA9CHf/w6Nz8Y99/5T8CDAAEqKv4XZ6wsQAAAABJRU5ErkJggg==","dextools","https://www.dextools.io/app/uniswap/pair-explorer/0x4d184bf6f805ee839517164d301f0c4e5d25c374"],[n.p+"static/media/coingecko.4bc28e65.webp","coingecko","https://www.coingecko.com/en/coins/governor-dao"],[n.p+"static/media/uniswap.8c5b56ae.png","uniswap","https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x515d7e9d75e2b76db60f8a051cd890eba23286bc"]],J=n(26),L=n.n(J),I=(n(39),function(e){Object(o.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){return Object(j.jsx)("div",{className:"footer-bar",children:Object(j.jsxs)("div",{className:"footer-container",children:[Object(j.jsxs)("div",{className:"upper",children:[Object(j.jsxs)("div",{className:"navigation",children:[Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("div",{className:"header",children:"Applications"}),Object(j.jsx)("a",{href:"https://mine.governordao.org/",children:"Liquidity Mine"}),Object(j.jsx)("a",{href:"https://swap.governordao.org/",children:"Swap"}),Object(j.jsx)("a",{href:"https://airdrop.governordao.org/",children:"Airdrop"})]}),Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("div",{className:"header",children:"Social"}),Object(j.jsx)("a",{href:"https://t.me/GovernorProject",children:"Telegram"}),Object(j.jsx)("a",{href:"https://discord.gg/5UKw3BC",children:"Discord"}),Object(j.jsx)("a",{href:"https://twitter.com/Governor_DAO",children:"Twitter"})]}),Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("div",{className:"header",children:"Resources"}),Object(j.jsx)("a",{href:"https://governordao.org/media",children:"Media"}),Object(j.jsx)("a",{href:"https://gdao.network/",children:"Forum"}),Object(j.jsx)("a",{href:"/",onClick:function(){return window.open("https://governordao.org/papers/GDAO-Litepaper.pdf","_blank")},children:"Litepaper"}),Object(j.jsx)("a",{href:"https://governor.social/",children:"Archive"})]}),Object(j.jsx)("div",{className:"item",children:Object(j.jsx)("img",{src:S,draggable:!1,alt:"",onClick:function(){return window.open("https://aragon.org/","_blank")}})})]}),Object(j.jsxs)("div",{className:"media",children:[Object(j.jsx)("div",{className:"header",children:"Find us"}),Object(j.jsxs)("div",{className:"items",children:[D.map((function(e){return Object(j.jsx)("a",{href:e[2],target:"_blank",rel:"noopener noreferrer",children:Object(j.jsx)("img",{src:e[0],alt:e[1]})},e[1])})),Object(j.jsx)("a",{className:"powered-by",href:"https://aragon.org/",target:"_blank",rel:"noopener noreferrer",children:Object(j.jsx)("img",{src:S,alt:""})})]})]})]}),Object(j.jsxs)("div",{className:"bottom",children:[Object(j.jsx)("a",{href:"https://governordao.org",children:Object(j.jsx)("img",{src:O,alt:"",className:"logo"})}),Object(j.jsx)("div",{className:"footer-typer-container",children:Object(j.jsx)(L.a,{text:["Governance_as_a_Service.","We_Are_One._We_Are_All.","Governor_DAO_Rises."],cursorRenderer:function(e){return Object(j.jsx)("span",{className:"footer-typer-cursor",children:e})},displayTextRenderer:function(e,t){return Object(j.jsx)("div",{className:"footer-typer-text",children:e.split("").map((function(e,t){return Object(j.jsx)("span",{children:"_"!==e?e:Object(j.jsx)("span",{className:"typer-text-space"})},t)}))})}})})]})]})})}}]),n}(i.Component)),M=Object(i.lazy)((function(){return Promise.all([n.e(2),n.e(4)]).then(n.bind(null,545))})),E=function(e){Object(o.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){return Object(j.jsx)(d.a,{children:Object(j.jsx)(i.Suspense,{fallback:Object(j.jsx)(h,{}),children:Object(j.jsxs)(m,{children:[Object(j.jsx)(y,{}),Object(j.jsx)(d.c,{children:Object(j.jsx)(d.b,{exact:!0,path:"/",component:M})}),Object(j.jsx)(I,{})]})})})}}]),n}(i.Component),U=n(22),V=function(e){var t=e.closeToast;return Object(j.jsx)(v.a,{size:20,onClick:t})},C=function(e){Object(o.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(U.a,{position:"bottom-right",autoClose:3e3,closeButton:Object(j.jsx)(V,{}),pauseOnFocusLoss:!1,draggable:!0,draggablePercent:25}),Object(j.jsx)(E,{})]})}}]),n}(i.Component);n(40),n(41);r.a.render(Object(j.jsx)(C,{}),document.getElementById("root"))}},[[42,1,3]]]);
//# sourceMappingURL=main.029d7425.chunk.js.map