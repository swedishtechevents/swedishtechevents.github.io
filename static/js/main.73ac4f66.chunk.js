(this["webpackJsonp@swedishtechevents/swedishtechevents.github.io"]=this["webpackJsonp@swedishtechevents/swedishtechevents.github.io"]||[]).push([[0],{14:function(e,t,a){e.exports=a(25)},22:function(e,t,a){},25:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(2),s=a.n(c),l=(a(19),a(20),a(21),a(22),function(e){var t=e.title,a=e.subtitle;return r.a.createElement("header",{className:"header section"},r.a.createElement("div",{className:"has-text-centered"},r.a.createElement("h1",{className:"title"},t),r.a.createElement("p",{className:"subtitle"},a)))}),i=a(7),o=a(8),m=a(12),h=a(9),u=a(13),d=a(4),p=a.n(d),f=a(11),v=function(e){var t=e.label,a=e.onChange,n=e.options,c=e.placeholder,s=e.value,l=n.filter((function(e){return e.value===s})).pop();return r.a.createElement(f.a,{"aria-label":t,placeholder:c,value:l,onChange:function(e){return a(e?e.value:null)},isSearchable:!0,isClearable:!0,options:n})},E=function(e){var t=e.event;return r.a.createElement("div",{className:"column is-half",key:t.link},r.a.createElement("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:"card"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h3",{className:"card-header-title"},t.title)),r.a.createElement("div",{className:"card-content"},r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"tags has-addons"},r.a.createElement("span",{className:"tag is-link is-medium"},r.a.createElement("span",{className:"fa fa-calendar","aria-hidden":"true"})),r.a.createElement("time",{className:"tag is-light is-medium",dateTime:p()("{YYYY}-{Mo}-{DD}",{padMonth:!0}).render(new Date(t.date))},p()("{DD} {MMMM} {YYYY}, {H}:{mm}",{padMonth:!0,padHours:!0}).render(new Date(t.date))),"\xa0",r.a.createElement("span",{className:"tag is-link is-medium"},r.a.createElement("span",{className:"fa fa-building"})),r.a.createElement("span",{className:"tag is-light is-medium"},t.city),!t.free&&r.a.createElement("div",null,"\xa0",r.a.createElement("span",{className:"tag is-link is-medium"},r.a.createElement("i",{className:"fa fa-dollar"})),r.a.createElement("span",{className:"tag is-light is-medium"},"Fee"))),r.a.createElement("div",null,t.description||"")))))},g=function(e){var t="?";for(var a in e)t+=a+"="+(e[a]?e[a]:"")+"&";return t.slice(0,-1)},y=function(e){var t={};return e.forEach((function(e){"object"!==typeof e||t[e.link]||(t[e.link]=e)})),Object.values(t)},w=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={city:"",month:0,events:[],search:""},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=decodeURIComponent(window.location.search.toLowerCase()),a=/city=(.*?)(?:&|$)/.exec(t)||[],n=/month=(\w+)/.exec(t)||[],r=/search=(.*?)$/.exec(t)||[];this.setState({city:a.length>1?a[1]:"",month:n.length>1?n[1]:"",search:r.length>1?r[1]:""}),fetch("https://swedishtechevents.com/api/events.json").then((function(e){return e.json()})).then((function(t){e.setState({events:y(t)})}))}},{key:"render",value:function(){var e=this;if(!this.state.events.length)return[r.a.createElement("h2",{key:"upcomming-events1",className:"title is-3"},"Upcoming events"),r.a.createElement("p",{key:"loading"},"Loading events...")];var t=this.state,a=t.city,n=t.month,c=t.search,s=new Date,l=this.state.events.filter((function(e){return!(e.date<+s)&&!!e.title})),i=l=(l=l.sort((function(e,t){return e.date-t.date}))).map((function(e){return e.city=e.city.replace(/\d+(\s|)\d+/,"").trim(),e.city=e.city.toLowerCase().replace(/^(.)|\s(.)/g,(function(e){return e.toUpperCase()})),e}));n&&!isNaN(n)&&(i=i.filter((function(e){return parseInt(n,10)===new Date(e.date).getMonth()+1}))),a&&a.length&&"null"!==a.toLowerCase()&&(i=i.filter((function(e){return e.city.toLowerCase()===a.toLowerCase()}))),c.length&&(i=i.filter((function(e){return-1!==e.title.trim().toLowerCase().indexOf(c)||-1!==(""+e.description).trim().toLowerCase().indexOf(c)}))),i=i.sort((function(e,t){return e.date-t.date}));var o=Array.from(new Set(l.map((function(e){return p()("{MMMM}-{Mo}").render(new Date(e.date))})))).map((function(e){return{label:e.split("-")[0],value:e.split("-")[1]}})),m=Array.from(new Set(l.map((function(e){return e.city})))).sort((function(e,t){return e.localeCompare(t)})).filter((function(e){return e})).map((function(e){return{label:e,value:e.toLowerCase()}}));return[r.a.createElement("h2",{key:"upcomming-events2",className:"title is-3"},"Upcoming events (",i.length,")"),r.a.createElement("strong",{key:"filters"},"Filters"),r.a.createElement("div",{className:"columns",key:"columns-1"},r.a.createElement("div",{className:"column"},r.a.createElement(v,{label:"Month",key:"months",options:o,placeholder:"Select month...",value:n,onChange:function(t){e.setState({month:parseInt(t,10)}),e.props.history.push({pathname:"/",search:g({month:t,city:a,search:c})})}})),r.a.createElement("div",{className:"column"},r.a.createElement(v,{label:"City",key:"cities",options:m,placeholder:"Select city...",value:a,onChange:function(t){e.setState({city:t}),e.props.history.push({pathname:"/",search:g({month:n,city:t,search:c})})}})),r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"search"},r.a.createElement("label",{htmlFor:"search",className:"visually-hidden"},"Search"),r.a.createElement("div",{className:"search-control"},r.a.createElement("div",{className:"search-input"},r.a.createElement("input",{id:"search",type:"search","aria-label":"Search",placeholder:"Search...",defaultValue:c,onChange:function(t){e.setState({search:t.target.value}),e.props.history.push({pathname:"/",search:g({month:n,city:a,search:t.target.value})})}})))))),r.a.createElement("div",{className:"columns is-multiline","aria-live":"polite",key:"columns-2"},i.map((function(t){return r.a.createElement(E,{key:t.link,event:t,renderFee:e.renderFee})})))]}}]),t}(r.a.Component),b=function(e){e.children;return r.a.createElement("footer",{className:"section"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"content has-text-centered"},r.a.createElement("p",null,"Created by"," ",r.a.createElement("a",{href:"https://twitter.com/frozzare",rel:"noopener noreferrer",target:"_blank"},"@frozzare")," ","and"," ",r.a.createElement("a",{href:"https://twitter.com/kolombiken",rel:"noopener noreferrer",target:"_blank"},"@kolombiken")),r.a.createElement("p",null,r.a.createElement("a",{href:"https://github.com/swedishtechevents",rel:"noopener noreferrer",target:"_blank"},"Source code"),"\xa0 - \xa0",r.a.createElement("a",{href:"https://twitter.com/swetechevents",rel:"noopener noreferrer",target:"_blank"},"@swetechevents")),r.a.createElement("p",null,"\xa9 ",(new Date).getFullYear()))))};s.a.render(r.a.createElement((function(e){return r.a.createElement("div",null,r.a.createElement(l,{title:"Swedish Tech Events",subtitle:"Events for developers, technologists, and other geeks in Sweden"}),r.a.createElement("main",{className:"section"},r.a.createElement("div",{className:"container"},r.a.createElement("p",null,"Events are fetched from"," ",r.a.createElement("a",{href:"https://www.meetup.com/"},"meetup.com")," and"," ",r.a.createElement("a",{href:"https://www.eventbrite.com/"},"eventbrite.com")," that is categorized with tech and from our GitHub every hour."," ",r.a.createElement("a",{href:"https://github.com/swedishtechevents/events/issues/new",rel:"noopener noreferrer",target:"_blank"},"Missing your event? Submit it!")),r.a.createElement("br",null),r.a.createElement(w,{history:e.history}))),r.a.createElement(b,null))}),{history:a(26).createBrowserHistory()}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.73ac4f66.chunk.js.map