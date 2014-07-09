/*
 Route360° JavaScript API 0.1-dev (23fbb9d), a JS library for leaflet maps. http://route360.net
 (c) 2014 Henning Hollburg and Daniel Gerber, (c) 2014 Motion Intelligence GmbH
*/
!function(t){function e(){var e=t.r360;i.noConflict=function(){return t.r360=e,this},t.r360=i}var i={version:"0.1-dev"};"object"==typeof module&&"object"==typeof module.exports?module.exports=i:"function"==typeof define&&define.amd?define(i):e(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),i=this,o=function(){},n=function(){return i.apply(this instanceof o&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return o.prototype=this.prototype,n.prototype=new o,n}),i.config={serviceUrl:"http://localhost:8080/api/",serviceUrl:"http://144.76.246.52:8080/api/",serviceVersion:"v1",pathSerializer:"compact",maxRoutingTime:3600,bikeSpeed:15,bikeUphill:20,bikeDownhill:-10,walkSpeed:5,walkUphill:10,walkDownhill:0,travelTimes:[300,600,900,1200,1500,1800],travelType:"walk",defaultTravelTimeControlOptions:{travelTimes:[{time:300,color:"#006837"},{time:600,color:"#39B54A"},{time:900,color:"#8CC63F"},{time:1200,color:"#F7931E"},{time:1500,color:"#F15A24"},{time:1800,color:"#C1272D"},{time:5400,color:"#C1272D"},{time:7200,color:"#C1272D"}],position:"topright",label:"travel time",initValue:30},routeTypes:[{routeType:102,color:"#006837"},{routeType:400,color:"#156ab8"},{routeType:900,color:"red"},{routeType:700,color:"#A3007C"},{routeType:1e3,color:"blue"},{routeType:109,color:"#006F35"},{routeType:100,color:"red"},{routeType:1,color:"red"}],defaultPlaceAutoCompleteOptions:{serviceUrl:"http://geocode.route360.net:8983/solr/select?",position:"topleft",reset:!1,reverse:!1,placeholder:"Select source",maxRows:5,width:300},defaultRadioOptions:{position:"topright"},defaultPolygonLayerOptions:{opacity:.4,strokeWidth:15},i18n:{language:"de",departure:{en:"Departure",de:"Abfahrt"},line:{en:"Line",de:"Linie"},arrival:{en:"Arrival",de:"Ankunft"},from:{en:"From",de:"Von"},to:{en:"To",de:"Nach"},travelTime:{en:"Travel time",de:"Reisezeit"},totalTime:{en:"Total time",de:"Gesamtzeit"},distance:{en:"Distance",de:"Distanz"},wait:{en:"Please wait!",de:"Bitte warten!"},elevation:{en:"Elevation",de:"Höhenunterschied"},timeFormat:{en:"a.m.",de:"Uhr"},reset:{en:"Reset input",de:"Eingeben löschen"},reverse:{en:"Switch source and target",de:"Start und Ziel tauschen"},noRouteFound:{en:"No route found!",de:"Keine Route gefunden!"},monthNames:{de:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]},dayNames:{de:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]},dayNamesMin:{de:["So","Mo","Di","Mi","Do","Fr","Sa"]},get:function(t){var e;return _.each(_.keys(i.config.i18n),function(o){t==o&&(e=i.config.i18n[t][i.config.i18n.language])}),e}}},i.Util={getTimeInSeconds:function(){var t=new Date;return 3600*t.getHours()+60*t.getMinutes()+t.getSeconds()},getHoursAndMinutesInSeconds:function(){var t=new Date;return 3600*t.getHours()+60*t.getMinutes()},getCurrentDate:function(){var t=new Date,e=t.getFullYear(),i=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,o=t.getDate()<10?"0"+t.getDate():t.getDate();return e+""+i+o},getTimeFormat:function(t){var e=i.config.i18n;return"en"==e.language&&t>=43200?"p.m.":e.get("timeFormat")},secondsToHoursAndMinutes:function(t){var e=(t/60).toFixed(0),i=Math.floor(e/60);e-=60*i;var o="";return 0!=i&&(o+=i+"h "),o+=e+"min"},secondsToTimeOfDay:function(t){var e=Math.floor(t/3600),i=Math.floor(t/60)-60*e;return t=t-3600*e-60*i,e+":"+("0"+i).slice(-2)+":"+("0"+t).slice(-2)},generateId:function(t){var e="",i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return _.each(_.range(t?t:10),function(){e+=i.charAt(Math.floor(Math.random()*i.length))}),e},parseLatLonArray:function(t){var e=new Array;return _.each(t,function(t){e.push(L.latLng(t[0],t[1]))}),e},routeToLeafletPolylines:function(t,e){var o=[];return _.each(t.getSegments(),function(n,r){if("TRANSFER"!=n.getType()){var a={};a.color=n.getColor();var s={};s.weight=7,s.color="white",(0==r||r==t.getLength()-1)&&(a.dashArray="1, 8");var l=L.polyline(n.getPoints(),s),p=L.polyline(n.getPoints(),a),u=i.config.i18n,h=u.language,g="";"undefined"!=typeof n.getWarning()&&(g="<tr><td colspan='3'><b>"+n.getWarning()+"</b></td></tr>");var d=L.popup({autoPan:!1});if(d.setContent(n.isTransit()?"<table style='width:400px; color:#07456b'>                         <tr>                             <td>"+u.line[h]+": <b>"+n.routeShortName+"</b></td>                             <td>"+u.from[h]+": <b>"+n.getStartName()+"</b></td>                             <td>"+u.departure[h]+": <b>"+i.Util.secondsToTimeOfDay(n.getDepartureTime())+"</b></td>                             <td>"+u.to[h]+": <b>"+n.getEndName()+"</b></td>                         </tr>                         <tr>                             <td>"+u.arrival[h]+": <b>"+i.Util.secondsToTimeOfDay(n.getArrivalTime())+"</b></td>                             <td>"+u.travelTime[h]+": <b>"+i.Util.secondsToHoursAndMinutes(n.getTravelTime())+"</b></td>                             <td>"+u.totalTime[h]+": <b>"+i.Util.secondsToHoursAndMinutes(t.getTravelTime())+"</b></td>                         </tr>                         <div id='chart' style='width:250px; height:100px'></div>                         "+g+"                     </table>":"<table style='width:400px; color:#07456b'>                         <tr>                             <td>"+u.travelTime[h]+": <b>"+i.Util.secondsToHoursAndMinutes(n.getTravelTime())+"</b></td>                             <td>"+u.distance[h]+": <b>"+n.getLength()+"km</b></td>                             <td>"+u.elevation[h]+": <b>"+n.getElevationGain()+"m</b></td></tr>                             <td>"+u.totalTime[h]+": <b>"+i.Util.secondsToHoursAndMinutes(t.getTravelTime())+"</b></td>                         </tr>                         "+g+"                     </table>                     <div id='chart' style='width:250px; height:100px'></div>"),e.addPopup){var c=_.has(e,"popup")?e.popup:d;p.bindPopup(c),l.bindPopup(c)}o.push([l,p])}}),o},parsePolygons:function(t){if(t.error)return errorMessage;var e=Array();return _.each(t,function(t){var o={id:t.id,polygons:[]};_.each(t.polygons,function(t){var e=i.polygon();e.setTravelTime(t.travelTime),e.setColor(_.findWhere(i.config.defaultTravelTimeControlOptions.travelTimes,{time:e.getTravelTime()}).color),e.setOuterBoundary(i.Util.parseLatLonArray(t.outerBoundary)),e.setBoundingBox(),_.each(t.innerBoundary,function(t){e.addInnerBoundary(i.Util.parseLatLonArray(t))}),o.polygons.push(e)}),e.push(o)}),e},parseRoutes:function(t){var e=new Array;return _.each(t.routes,function(t){var o=i.route(t.travelTime);_.each(t.segments,function(t){o.addRouteSegment(i.routeSegment(t))}),e.push(o)}),e}},i.TravelOptions=function(){this.sources=[],this.targets=[],this.service,this.bikeSpeed=15,this.bikeUphill=20,this.bikeDownhill=-10,this.walkSpeed=5,this.walkUphill=10,this.walkDownhill=0,this.travelTimes=[300,600,900,1200,1500,1800],this.travelType="walk",this.time=i.Util.getTimeInSeconds(),this.date=i.Util.getCurrentDate(),this.errors=[],this.pathSerializer=i.config.pathSerializer,this.maxRoutingTime=i.config.maxRoutingTime,this.waitControl,this.isValidPolygonServiceOptions=function(){return this.errors=[],"[object Array]"===Object.prototype.toString.call(this.getSources())?0==this.getSources().length?this.getErrors().push("Sources do not contain any points!"):_.each(this.getSources(),function(t){"undefined"===t.getLatLng().lat&&this.getErrors().push("Sources contains source with undefined latitude!"),"undefined"===t.getLatLng().lng&&this.getErrors().push("Sources contains source with undefined longitude!")}):this.getErrors().push("Sources are not of type array!"),_.contains(["bike","transit","walk","car"],this.getTravelType())?"car"==this.getTravelType()||("bike"==this.getTravelType()?((this.getBikeUphill()<0||this.getBikeDownhill()>0||this.getBikeUphill()<-this.getBikeDownhill())&&this.getErrors().push("Uphill cycle speed has to be larger then 0. Downhill cycle speed has to be smaller then 0.                         Absolute value of downhill cycle speed needs to be smaller then uphill cycle speed."),this.getBikeSpeed()<=0&&this.getErrors().push("Bike speed needs to be larger then 0.")):"walk"==this.getTravelType()?((this.getWalkUphill()<0||this.getWalkDownhill()>0||this.getWalkUphill()<-this.getWalkDownhill())&&this.getErrors().push("Uphill walking speed has to be larger then 0. Downhill walking speed has to be smaller then 0.                         Absolute value of downhill walking speed needs to be smaller then uphill walking speed."),this.getWalkSpeed()<=0&&this.getErrors().push("Walk speed needs to be larger then 0.")):"transit"==this.getTravelType()&&(this.getTime()<0&&this.getErrors().push("Start time for transit routing needs to larger than 0: "+this.getTime()),8!=this.getDate().length&&this.getErrors().push("Date has to have format YYYYMMDD: "+this.getDate()))):this.getErrors().push("Not supported travel type given: "+this.getTravelType()),"[object Array]"!==Object.prototype.toString.call(this.getTravelTimes())?this.getErrors().push("Travel times have to be an array!"):_.reject(this.getTravelTimes(),function(t){return"number"==typeof t}).length>0&&this.getErrors().push("Travel times contain non number entries: "+this.getTravelTimes()),0==this.errors.length},this.isValidRouteServiceOptions=function(){return this.isValidPolygonServiceOptions(),"[object Array]"===Object.prototype.toString.call(this.getTargets())?0==this.getTargets().length?this.getErrors().push("Sources do not contain any points!"):_.each(this.getTargets(),function(t){"undefined"===t.getLatLng().lat&&this.getErrors().push("Targets contains target with undefined latitude!"),"undefined"===t.getLatLng().lng&&this.getErrors().push("Targets contains target with undefined longitude!")}):this.getErrors().push("Targets are not of type array!"),_.contains(["travelTime","compact","detailed"],this.getPathSerializer())||this.getErrors().push("Path serializer not supported: "+this.getPathSerializer()),0==this.errors.length},this.isValidTimeServiceOptions=function(){return this.isValidRouteServiceOptions(),_.contains(["travelTime","compact","detailed"],this.getPathSerializer())||this.getErrors().push("Path serializer not supported: "+this.getPathSerializer()),0==this.errors.length},this.getErrors=function(){return this.errors},this.getSources=function(){return this.sources},this.addSource=function(t){this.sources.push(t)},this.addTarget=function(t){this.targets.push(t)},this.getTargets=function(){return this.targets},this.getBikeSpeed=function(){return this.bikeSpeed},this.getBikeUphill=function(){return this.bikeUphill},this.getBikeDownhill=function(){return this.bikeDownhill},this.getWalkSpeed=function(){return this.walkSpeed},this.getWalkUphill=function(){return this.walkUphill},this.getWalkDownhill=function(){return this.walkDownhill},this.getTravelTimes=function(){return this.travelTimes},this.getTravelType=function(){return this.travelType},this.getTime=function(){return this.time},this.getDate=function(){return this.date},this.getWaitControl=function(){return this.waitControl},this.getService=function(){return this.service},this.getPathSerializer=function(){return this.pathSerializer},this.getMaxRoutingTime=function(){return this.maxRoutingTime},this.setMaxRoutingTime=function(t){this.maxRoutingTime=t},this.setPathSerializer=function(t){this.pathSerializer=t},this.setService=function(t){this.service=t},this.setSources=function(t){this.sources=t},this.setTargets=function(t){this.targets=t},this.setBikeSpeed=function(t){this.bikeSpeed=t},this.setBikeUphill=function(t){this.bikeUphill=t},this.setBikeDownhill=function(t){this.bikeDownhill=t},this.setWalkSpeed=function(t){this.walkSpeed=t},this.setWalkUphill=function(t){this.walkUphill=t},this.setWalkDownhill=function(t){this.walkDownhill=t},this.setTravelTimes=function(t){this.travelTimes=t},this.setTravelType=function(t){this.travelType=t},this.setTime=function(t){this.time=t},this.setDate=function(t){this.date=t},this.setWaitControl=function(t){this.waitControl=t}},i.travelOptions=function(){return new i.TravelOptions},i.PolygonService={getTravelTimePolygons:function(t,e){if(t.isValidPolygonServiceOptions()){t.getWaitControl()&&t.getWaitControl().show();var o={polygon:{values:t.getTravelTimes()},sources:[]};_.each(t.getSources(),function(e){var i={id:_.has(e,"id")?e.id:e.getLatLng().lat+";"+e.getLatLng().lng,lat:e.getLatLng().lat,lon:e.getLatLng().lng,tm:{}};i.tm[t.getTravelType()]={},"transit"==t.getTravelType()&&(i.tm.transit.frame={time:t.getTime(),date:t.getDate()}),"bike"==t.getTravelType()&&(i.tm.bike={speed:t.getBikeSpeed(),uphill:t.getBikeUphill(),downhill:t.getBikeDownhill()}),"walk"==t.getTravelType()&&(i.tm.walk={speed:t.getWalkSpeed(),uphill:t.getWalkUphill(),downhill:t.getWalkDownhill()}),o.sources.push(i)}),$.getJSON(i.config.serviceUrl+i.config.serviceVersion+"/polygon?cfg="+encodeURIComponent(JSON.stringify(o))+"&cb=?&key="+i.config.serviceKey,function(o){t.getWaitControl()&&t.getWaitControl().hide(),e(i.Util.parsePolygons(o))})}else alert("Travel options are not valid!"),console.log(t.getErrors())}},i.RouteService={getRoutes:function(t,e){if(t.isValidRouteServiceOptions()){t.getWaitControl()&&t.getWaitControl().show();var o={sources:[],targets:[],pathSerializer:t.getPathSerializer()};_.each(t.getSources(),function(e){var i={id:_.has(e,"id")?e.id:e.getLatLng().lat+";"+e.getLatLng().lng,lat:e.getLatLng().lat,lon:e.getLatLng().lng,tm:{}};i.tm[t.getTravelType()]={},"transit"==t.getTravelType()&&(i.tm.transit.frame={time:t.getTime(),date:t.getDate()}),"bike"==t.getTravelType()&&(i.tm.bike={speed:t.getBikeSpeed(),uphill:t.getBikeUphill(),downhill:t.getBikeDownhill()}),"walk"==t.getTravelType()&&(i.tm.walk={speed:t.getWalkSpeed(),uphill:t.getWalkUphill(),downhill:t.getWalkDownhill()}),o.sources.push(i)}),o.targets=[],_.each(t.getTargets(),function(t){var e={};e.id=_.has(t,"id")?t.id:t.getLatLng().lat+";"+t.getLatLng().lng,e.lat=t.getLatLng().lat,e.lon=t.getLatLng().lng,o.targets.push(e)}),$.getJSON(i.config.serviceUrl+i.config.serviceVersion+"/route?cfg="+encodeURIComponent(JSON.stringify(o))+"&cb=?&key="+i.config.serviceKey,function(o){t.getWaitControl()&&t.getWaitControl().hide(),e(i.Util.parseRoutes(o))})}else alert("Travel options are not valid!"),console.log(t.getErrors())}},i.TimeService={getRouteTime:function(t,e){if(t.isValidTimeServiceOptions()){t.getWaitControl()&&t.getWaitControl().show();var o={sources:[],targets:[],pathSerializer:t.getPathSerializer(),maxRoutingTime:t.getMaxRoutingTime()};_.each(t.getSources(),function(e){var i={id:_.has(e,"id")?e.id:e.getLatLng().lat+";"+e.getLatLng().lng,lat:e.getLatLng().lat,lon:e.getLatLng().lng,tm:{}};i.tm[t.getTravelType()]={},"transit"==t.getTravelType()&&(i.tm.transit.frame={time:t.getTime(),date:t.getDate()}),"bike"==t.getTravelType()&&(i.tm.bike={speed:t.getBikeSpeed(),uphill:t.getBikeUphill(),downhill:t.getBikeDownhill()}),"walk"==t.getTravelType()&&(i.tm.walk={speed:t.getWalkSpeed(),uphill:t.getWalkUphill(),downhill:t.getWalkDownhill()}),o.sources.push(i)}),_.each(t.getTargets(),function(t){var e={};e.id=_.has(t,"id")?t.id:t.getLatLng().lat+";"+t.getLatLng().lng,e.lat=t.getLatLng().lat,e.lon=t.getLatLng().lng,o.targets.push(e)}),$.ajax({url:i.config.serviceUrl+i.config.serviceVersion+"/time?key="+i.config.serviceKey,type:"POST",data:JSON.stringify(o),contentType:"application/json",dataType:"json",success:function(i){t.getWaitControl()&&t.getWaitControl().hide(),e(i)},error:function(t,e,i){console.log(t.status),console.log(i)}})}else alert("Travel options are not valid!"),console.log(t.getErrors())}},i.placeAutoCompleteControl=function(t){return new i.PlaceAutoCompleteControl(t)},i.PlaceAutoCompleteControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(i.config.defaultPlaceAutoCompleteOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"country")&&(this.options.country=t.country),_.has(t,"reset")&&(this.options.reset=t.reset),_.has(t,"reverse")&&(this.options.reverse=t.reverse),_.has(t,"placeholder")&&(this.options.placeholder=t.placeholder),_.has(t,"width")&&(this.options.width=t.width),_.has(t,"maxRows")&&(this.options.maxRows=t.maxRows))},onAdd:function(t){var e=this,o="",n=L.DomUtil.create("div",this._container);e.options.map=t;var r=$(t._container).attr("id");t.on("resize",this.onResize.bind(this));var a=i.config.i18n,s=this.options.width;e.options.reset&&(s+=44),e.options.reverse&&(s+=37);var l='style="width:'+s+'px;"';return e.options.input='<div class="input-group autocomplete" '+l+'>                 <input id="autocomplete-'+r+'" style="color: black;width:'+s+'"                 type="text" class="form-control" placeholder="'+this.options.placeholder+'" onclick="this.select()">',e.options.reset&&(e.options.input+='<span class="input-group-btn">                     <button class="btn btn-autocomplete" onclick="this.onReset()" type="button" title="'+a.get("reset")+'"><i class="fa fa-times"></i></button>                 </span>'),e.options.reverse&&(this.options.input+='<span class="input-group-btn">                     <button class="btn btn-autocomplete" onclick="this.onReverse()" type="button" title="'+a.get("reverse")+'"><i class="fa fa-arrows-v"></i></button>                 </span>'),e.options.input+="</div>",$(n).append(e.options.input),L.DomEvent.disableClickPropagation(n),_.has(e.options,"country")&&(o+=" AND country:"+e.options.country),$(n).find("#autocomplete-"+r).autocomplete({source:function(t,i){e.source=this;for(var n=t.term.split(" "),r=new Array,a="",s="",l=0;l<n.length;l++)-1!=n[l].search(".*[0-9].*")?r.push(n[l]):a+=n[l]+" ";if(r.length>0){s+=" OR ";for(var p=0;p<r.length;p++){var u="(postcode : "+r[p]+" OR housenumber : "+r[p]+" OR street : "+r[p]+") ";s+=u}}$.ajax({url:e.options.serviceUrl,dataType:"jsonp",jsonp:"json.wrf",async:!1,data:{wt:"json",indent:!0,rows:e.options.maxRows,qt:"en",q:"("+a+s+")"+o},success:function(o){var n=new Array;i($.map(o.response.docs,function(i){if("boundary"!=i.osm_key){var o=i.coordinate.split(","),r={},a=[],s=[];return r.name=i.name,r.city=i.city,r.street=i.street,r.housenumber=i.housenumber,r.country=i.country,r.postalCode=i.postcode,r.name&&a.push(r.name),r.city&&a.push(r.city),r.street&&s.push(r.street),r.housenumber&&s.push(r.housenumber),r.postalCode&&s.push(r.postalCode),r.city&&s.push(r.city),!_.has(e.options,"country")&&r.country&&s.push(r.country),_.each(n,function(t){t==""+a.join()+s.join()}),n.push(""+a.join()+s.join()),{label:a.join(", "),value:a.join(", "),firstRow:a.join(", "),secondRow:s.join(" "),term:t.term,latlng:new L.LatLng(o[0],o[1])}}}))}})},minLength:2,select:function(t,i){e.options.value=i.item,e.options.onSelect(i.item)}}).data("ui-autocomplete")._renderItem=function(t,e){function i(t){return t.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}var o="<a><span class='address-row1'>"+e.firstRow+"</span><br/><span class='address-row2'>  "+e.secondRow+"</span></a>",n=e.term?(""+o).replace(new RegExp(i(e.term),"gi"),"<strong>$&</strong>"):o;return $("<li>").append(n).appendTo(t)},this.onResize(),n},onReset:function(t){var e=this;$(e.options.resetButton).click(t),$(e.options.resetButton).click(function(){$(e.options.input).val("")})},onReverse:function(t){$(this.options.reverseButton).click(t)},onResize:function(){var t=this;$(t.options.input).css(this.options.map.getSize().x<550?{width:"45px"}:{width:""})},onSelect:function(t){var e=this;e.options.onSelect=t},setFieldValue:function(t){$(this.options.input).val(t)},getFieldValue:function(){return $(this.options.input).val()},getValue:function(){return this.options.value}}),i.TravelStartDateControl=L.Control.extend({options:{position:"topright",dateFormat:"yy-mm-dd",minDate:0},initialize:function(t){L.Util.setOptions(this,t)},onChange:function(t){this.options.onChange=t},onAdd:function(t){var e=this;e.options.map=t;var o=L.DomUtil.create("div","startDatePicker",this._container);e.datepicker=$("<div/>"),$(o).append(e.datepicker);var n={onSelect:function(){e.options.onChange(e.getValue())},firstDay:1},r=i.config.i18n;return"en"!=r.language&&(n.monthNames=r.monthNames[r.language],n.dayNames=r.dayNames[r.language],n.dayNamesMin=r.dayNamesMin[r.language]),$(e.datepicker).datepicker(n),L.DomEvent.disableClickPropagation(o),o},getValue:function(){var t=this,e=$(t.datepicker).datepicker({dateFormat:"dd-mm-yy"}).val(),i=e.split("/"),o=i[2]+""+i[0]+i[1];return o}}),i.travelStartDateControl=function(){return new i.TravelStartDateControl},i.TravelStartTimeControl=L.Control.extend({options:{position:"topright",range:!1,min:0,max:86400,step:600,initValue:28800,value:0},initialize:function(t){this.options.value=i.Util.getHoursAndMinutesInSeconds(),L.Util.setOptions(this,t)},onSlideStop:function(t){this.options.slideStop=t},minToString:function(t){t/=60;var e=Math.floor(t/60),i=t-60*e;return e>24&&(e-=24),10>e&&(e="0"+e),10>i&&(i="0"+i),0==i&&(i="00"),e+":"+i},onAdd:function(t){var e=this;e.options.map=t,e.options.mapId=$(t._container).attr("id"),t.on("resize",this.onResize.bind(this));var o=L.DomUtil.create("div","startTimeSlider",this._container);return e.miBox=$("<div/>",{"class":"mi-box"}),e.startTimeInfo=$("<div/>"),e.label=$("<span/>"),e.slider=$("<div/>"),$(o).append(e.miBox.append(e.startTimeInfo.append(e.label)).append(e.slider)),$(e.label).text(i.config.i18n.get("departure")+": "+e.minToString(this.options.value)+" "+i.Util.getTimeFormat(e.options.value)),$(e.slider).slider({range:e.options.range,value:e.options.value,min:e.options.min,max:e.options.max,step:e.options.step,slide:function(t,o){$(e.label).text(i.config.i18n.get("departure")+": "+e.minToString(o.value)+" "+i.Util.getTimeFormat(o.value)),e.options.value=o.value},stop:function(t,i){e.options.slideStop(i.value)}}),this.onResize(),L.DomEvent.disableClickPropagation(o),o},onResize:function(){this.options.map.getSize().x<550?(this.removeAndAddClass(this.miBox,"leaflet-traveltime-slider-container-max","leaflet-traveltime-slider-container-min"),this.removeAndAddClass(this.startTimeInfo,"travel-time-info-max","travel-time-info-min"),this.removeAndAddClass(this.slider,"leaflet-traveltime-slider-max","leaflet-traveltime-slider-min")):(this.removeAndAddClass(this.miBox,"leaflet-traveltime-slider-container-min","leaflet-traveltime-slider-container-max"),this.removeAndAddClass(this.startTimeInfo,"travel-time-info-min","travel-time-info-max"),this.removeAndAddClass(this.slider,"leaflet-traveltime-slider-min","leaflet-traveltime-slider-max"))},removeAndAddClass:function(t,e,i){$(t).addClass(i),$(t).removeClass(e)},getValue:function(){return this.options.value}}),i.travelStartTimeControl=function(){return new i.TravelStartTimeControl},i.TravelTimeControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(i.config.defaultTravelTimeControlOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"initValue")&&(this.options.initValue=t.initValue),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"travelTimes")&&(this.options.travelTimes=t.travelTimes),_.has(t,"icon")&&(this.options.icon=t.icon)),this.options.maxValue=_.max(this.options.travelTimes,function(t){return t.time}).time/60,this.options.step=(this.options.travelTimes[1].time-this.options.travelTimes[0].time)/60},onAdd:function(t){var e=this;this.options.map=t,t.on("resize",this.onResize.bind(this));for(var i="",o=100/this.options.travelTimes.length,n=0;n<this.options.travelTimes.length;n++)0==n?i+='<div style="position: absolute; top: 0; bottom: 0; left: '+n*o+"%; right: "+(100-(n+1)*o)+"%; background-color: "+this.options.travelTimes[n].color+'; -moz-border-top-left-radius: 8px;-webkit-border-radius-topleft: 8px; border-top-left-radius: 8px; -moz-border-bottom-left-radius: 8px;-webkit-border-radius-bottomleft: 8px; border-bottom-left-radius: 8px;"></div>':n<this.options.travelTimes.length-1?i+='<div style="position: absolute; top: 0; bottom: 0; left: '+n*o+"%; right: "+(100-(n+1)*o)+"%; background-color: "+this.options.travelTimes[n].color+';"></div>':n==this.options.travelTimes.length-1&&(i+='<div style="position: absolute; top: 0; bottom: 0; left: '+n*o+"%; right: "+(100-(n+1)*o)+"%; background-color: "+this.options.travelTimes[n].color+'; -moz-border-top-right-radius: 8px;-webkit-border-radius-topright: 8px; border-top-right-radius: 8px; -moz-border-bottom-right-radius: 8px;-webkit-border-radius-bottomright: 8px; border-bottom-right-radius: 8px;"></div>');this.options.sliderContainer=L.DomUtil.create("div",this._container),this.options.miBox=$("<div/>",{"class":"mi-box"}),this.options.travelTimeInfo=$("<div/>"),this.options.travelTimeSlider=$("<div/>",{"class":"no-border"}).append(i);var r=$("<div/>",{"class":"ui-slider-handle"});this.options.labelSpan=$("<span/>",{text:this.options.label+" "}),"undefined"!=this.options.icon&&(this.options.iconHTML=$("<img/>",{src:this.options.icon})),this.options.travelTimeSpan=$("<span/>",{text:this.options.initValue});var a=$("<span/>",{text:"min"});return $(this.options.sliderContainer).append(this.options.miBox),this.options.miBox.append(this.options.travelTimeInfo),this.options.miBox.append(this.options.travelTimeSlider),this.options.travelTimeSlider.append(r),this.options.travelTimeInfo.append(this.options.iconHTML).append(this.options.labelSpan).append(this.options.travelTimeSpan).append(a),$(this.options.travelTimeSlider).slider({range:!1,value:e.options.initValue,min:0,max:e.options.maxValue,step:e.options.step,slide:function(t,i){return 0==i.value?!1:void $(e.options.travelTimeSpan).text(i.value)},stop:function(t,i){for(var o=new Array,n=0;n<i.value;n+=e.options.step)o.push(e.options.travelTimes[n/e.options.step]);e.options.onSlideStop(o)}}),this.onResize(),L.DomEvent.disableClickPropagation(this.options.sliderContainer),this.options.sliderContainer},onResize:function(){this.options.map.getSize().x<550?(this.removeAndAddClass(this.options.miBox,"leaflet-traveltime-slider-container-max","leaflet-traveltime-slider-container-min"),this.removeAndAddClass(this.options.travelTimeInfo,"travel-time-info-max","travel-time-info-min"),this.removeAndAddClass(this.options.travelTimeSlider,"leaflet-traveltime-slider-max","leaflet-traveltime-slider-min")):(this.removeAndAddClass(this.options.miBox,"leaflet-traveltime-slider-container-min","leaflet-traveltime-slider-container-max"),this.removeAndAddClass(this.options.travelTimeInfo,"travel-time-info-min","travel-time-info-max"),this.removeAndAddClass(this.options.travelTimeSlider,"leaflet-traveltime-slider-min","leaflet-traveltime-slider-max"))},removeAndAddClass:function(t,e,i){$(t).addClass(i),$(t).removeClass(e)},onSlideStop:function(t){var e=this.options;e.onSlideStop=t},getValues:function(){for(var t=this.options,e=new Array,i=0;i<$(this.options.travelTimeSlider).slider("value");i+=t.step)e.push(t.travelTimes[i/t.step].time);return e}}),i.travelTimeControl=function(t){return new i.TravelTimeControl(t)},i.waitControl=function(t){return new L.Control.WaitControl(t)},L.Control.WaitControl=L.Control.extend({options:{position:"topleft"},initialize:function(t){L.Util.setOptions(this,t)},onAdd:function(t){this.options.map=t,this.options.mapId=$(t._container).attr("id"),console.log(this.options.mapId);var e=L.DomUtil.create("div","leaflet-control-wait");return $(e).append('<div id="wait-control-'+this.options.mapId+'" class="mi-box waitControl">                 <i class="fa fa-spinner fa-spin"></i> '+i.config.i18n.get("wait")+"            </div>"),e},show:function(){$("#wait-control-"+this.options.mapId).show()},hide:function(){$("#wait-control-"+this.options.mapId).hide()}}),i.RadioButtonControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(i.config.defaultRadioOptions)),"undefined"!=typeof t&&("undefined"!=typeof t.position&&(this.options.position=t.position),"undefined"!=typeof t.buttons?this.options.buttons=t.buttons:alert("No buttons supplied!"))},onAdd:function(t){var e=this;this.options.map=t;var i=L.DomUtil.create("div",this._container);return this.options.input=this.getRadioButtonHTML(),$(i).append(this.options.input),$(this.options.input).buttonset({}).change(function(){e.options.checked=$("input[name='r360_radiobuttongroup_"+e.options.buttonGroupId+"']:checked").attr("key"),e.options.onChange(e.options.checked)}),$(this.options.input).each(function(){$(this).tooltip({position:{my:"center top+10",at:"center bottom",using:function(t,e){$(this).css(t),$("<div>").addClass("arrow top").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}})}),L.DomEvent.addListener(i,"click",L.DomEvent.stopPropagation),i},onChange:function(t){this.options.onChange=t},getValue:function(){return this.options.checked},getRadioButtonHTML:function(){var t=this;t.options.buttonGroupId=i.Util.generateId(5);var e=$("<div/>",{id:t.options.buttonGroupId});return _.each(t.options.buttons,function(o){var n=i.Util.generateId(),r=$("<input/>",{type:"radio",id:"r360_"+n,value:o.key,key:o.key,name:"r360_radiobuttongroup_"+t.options.buttonGroupId}),a=$("<label/>",{"for":"r360_"+n,text:o.label});o.checked&&(t.options.checked=o.key,r.attr({checked:"checked"})),"undefined"!=typeof o.tooltip&&a.attr({title:o.tooltip}),e.append(r),e.append(a)}),e}}),i.radioButtonControl=function(t){return new i.RadioButtonControl(t)},i.Polygon=function(t,e){var i=this;i.topRight=new L.latLng(-90,-180),i.bottomLeft=new L.latLng(90,180),i.centerPoint=new L.latLng(0,0),i.travelTime=t,i.color,i.outerBoundary=e,i.innerBoundaries=new Array,i.setOuterBoundary=function(t){i.outerBoundary=t},i.addInnerBoundary=function(t){i.innerBoundaries.push(t)},i.getBoundingBox=function(){return new L.LatLngBounds(this._bottomLeft,this._topRight)},i.setBoundingBox=function(){_.each(this.outerBoundary,function(t){t.lat>i.topRight.lat&&(i.topRight.lat=t.lat),t.lat<i.bottomLeft.lat&&(i.bottomLeft.lat=t.lat),t.lng>i.topRight.lng&&(i.topRight.lng=t.lng),t.lng<i.bottomLeft.lng&&(i.bottomLeft.lng=t.lng)}),i.centerPoint.lat=i.topRight.lat-i.bottomLeft.lat,i.centerPoint.lon=i.topRight.lon-i.bottomLeft.lon},i.getCenterPoint=function(){return i.centerPoint},i.getColor=function(){return i.color},i.setTravelTime=function(t){i.travelTime=t},i.getTravelTime=function(){return i.travelTime},i.setColor=function(t){i.color=t}},i.polygon=function(t,e){return new i.Polygon(t,e)},i.MultiPolygon=function(){var t=this;t._topRight=new L.latLng(-90,-180),t._bottomLeft=new L.latLng(90,180),t.travelTime,t.color,t.polygons=new Array,t.addPolygon=function(e){t.polygons.push(e)},t.setColor=function(e){t.color=e},t.getColor=function(){return t.color},t.getTravelTime=function(){return t.travelTime},t.setTravelTime=function(e){t.travelTime=e},t.getBoundingBox=function(){return new L.LatLngBounds(t._bottomLeft,t._topRight)},t.setBoundingBox=function(){_.each(t.polygons,function(e){e._topRight.lat>t._topRight.lat&&(t._topRight.lat=e._topRight.lat),e._bottomLeft.lat<t._bottomLeft.lat&&(t._bottomLeft.lat=e._bottomLeft.lat),e._topRight.lng>t._topRight.lng&&(t._topRight.lng=e._topRight.lng),e._bottomLeft.lng<t._bottomLeft.lng&&(t._bottomLeft.lng=e._bottomLeft.lng)})}},i.multiPolygon=function(){return new i.MultiPolygon},i.RouteSegment=function(t){var e=this;e.polyLine=L.polyline([]),e.color="#07456b",e.points=t.points,e.type=t.type,e.routeType=t.routeType,e.travelTime=t.travelTime,e.length=t.length,e.warning=t.warning,e.elevationGain=t.elevationGain,e.errorMessage,e.transitSegment=!1,_.each(t.points,function(t){e.polyLine.addLatLng(t)}),t.isTransit&&(e.color=_.findWhere(i.config.routeTypes,{routeType:t.routeType}).color,e.transitSegment=!0,e.routeShortName=t.routeShortName,e.startname=t.startname,e.endname=t.endname,e.departureTime=t.departureTime,e.arrivalTime=t.arrivalTime,e.tripHeadSign=t.tripHeadSign),e.getPoints=function(){return e.points
},e.getType=function(){return e.type},e.getColor=function(){return e.color},e.getTravelTime=function(){return e.travelTime},e.getLength=function(){return e.length},e.getRouteShortName=function(){return e.routeShortName},e.getStartName=function(){return e.startname},e.getEndName=function(){return e.endname},e.getDepartureTime=function(){return e.departureTime},e.getArrivalTime=function(){return e.arrivalTime},e.getTripHeadSign=function(){return e.tripHeadSign},e.getWarning=function(){return e.warning},e.getElevationGain=function(){return e.elevationGain},e.isTransit=function(){return e.transitSegment}},i.routeSegment=function(t){return new i.RouteSegment(t)},i.Route=function(t){var e=this;e.travelTime=t,e.routeSegments=new Array,e.addRouteSegment=function(t){e.routeSegments.push(t)},e.setTravelTime=function(t){e.travelTime=t},e.getLength=function(){return e.routeSegments.length},e.getSegments=function(){return e.routeSegments},e.getTravelTime=function(){return e.travelTime}},i.route=function(t){return new i.Route(t)},i.Route360PolygonLayer=L.Class.extend({initialize:function(t){this.opacity=i.config.defaultPolygonLayerOptions.opacity,this.strokeWidth=i.config.defaultPolygonLayerOptions.strokeWidth,"undefined"!=typeof t&&("undefined"!=typeof t.opacity&&(this.opacity=t.opacity),"undefined"!=typeof t.strokeWidth&&(this.strokeWidth=t.strokeWidth)),this._multiPolygons=new Array},getBoundingBox:function(){return new L.LatLngBounds(this._bottomLeft,this._topRight)},onAdd:function(t){this._map=t,this._el=L.DomUtil.create("div","my-custom-layer-"+$(t._container).attr("id")+" leaflet-zoom-hide"),$(this._el).css({opacity:this.opacity}),$(this._el).attr("id","canvas"+$(this._map._container).attr("id")),this._map.getPanes().overlayPane.appendChild(this._el),this._map.on("viewreset",this._reset,this),this._reset()},addLayer:function(t){var e=this;e._resetBoundingBox(),e._multiPolygons=new Array,_.each(t,function(t){console.log(t),_.each(t.polygons,function(t){e._updateBoundingBox(t.outerBoundary),e._addPolygonToMultiPolygon(t)}),console.log(e._multiPolygons),e._multiPolygons.sort(function(t,e){return e.getTravelTime()-t.getTravelTime()}),e._reset()})},_addPolygonToMultiPolygon:function(t){var e=_.filter(this._multiPolygons,function(e){return e.getTravelTime()==t.travelTime});if(e.length>0)e[0].addPolygon(t);else{var o=new i.multiPolygon;o.setTravelTime(t.travelTime),o.addPolygon(t),o.setColor(t.getColor()),this._multiPolygons.push(o)}},_resetBoundingBox:function(){this._latlng=new L.LatLng(-180,90),this._topRight=new L.latLng(-90,-180),this._bottomLeft=new L.latLng(90,180)},_updateBoundingBox:function(t){var e=this;_.each(t,function(t){t.lat>e._topRight.lat?e._topRight.lat=t.lat:t.lat<e._bottomLeft.lat&&(e._bottomLeft.lat=t.lat),t.lng>e._topRight.lng?e._topRight.lng=t.lng:t.lng<e._bottomLeft.lng&&(e._bottomLeft.lng=t.lng)}),e._latlng.lat<e._topRight.lat&&(e._latlng.lat=e._topRight.lat),e._latlng.lng>e._bottomLeft.lng&&(e._latlng.lng=e._bottomLeft.lng)},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._el),t.off("viewreset",this._reset,this)},_buildString:function(t,e,i){return t+=i+e.x+" "+e.y},_createSVGData:function(t){var e=this;pathData="";var i=this._map.latLngToLayerPoint(t[0]);return pathData=this._buildString(pathData,i,"M"),_.each(t,function(t){t=e._map.latLngToLayerPoint(t),pathData=e._buildString(pathData,t,"L")}),pathData+="z "},clearLayers:function(){$("#canvas"+$(this._map._container).attr("id")).empty(),this.initialize()},_reset:function(){var t=this;if(this._multiPolygons.length>0){var e=this._map.latLngToLayerPoint(this._latlng),i=100;e.x-=i,e.y-=i,L.DomUtil.setPosition(this._el,e),-1!=navigator.appVersion.indexOf("MSIE 9.")&&$("#canvas"+$(this._map._container).attr("id")).css("transform","translate("+e.x+"px, "+e.y+"px)"),-1!=navigator.appVersion.indexOf("MSIE 8.")&&$("#canvas"+$(this._map._container).attr("id")).css({position:"absolute"}),$("#canvas"+$(this._map._container).attr("id")).empty();for(var o,n,r=this._map.latLngToLayerPoint(this._bottomLeft),a=this._map.latLngToLayerPoint(this._topRight),s=Raphael("canvas"+$(this._map._container).attr("id"),a.x-r.x+2*i,r.y-a.y+2*i),l=s.set(),p="",u=0;u<this._multiPolygons.length;u++){o=this._multiPolygons[u],p="";for(var h=0;h<o.polygons.length;h++){n=o.polygons[h],p+=this._createSVGData(n.outerBoundary);for(var g=0;g<n.innerBoundaries.length;g++)p+=this._createSVGData(n.innerBoundaries[g])}if(-1!=navigator.appVersion.indexOf("MSIE 8.")&&u<this._multiPolygons.length-1)for(var d=0;d<this._multiPolygons[u+1].polygons.length;d++){var c=this._multiPolygons[u+1].polygons[d];p+=this._createSVGData(c.outerBoundary)}var m=o.getColor(),f=s.path(p).attr({fill:m,stroke:m,"stroke-width":t.strokeWidth,"stroke-linejoin":"round","stroke-linecap":"round","fill-rule":"evenodd"}).attr({opacity:"0"}).animate({opacity:"1"},n.travelTime/3);f.translate(-1*(r.x-i),-1*(a.y-i)),l.push(f)}-1!=navigator.appVersion.indexOf("MSIE 8.")&&$("shape").each(function(){$(this).css({filter:"alpha(opacity="+100*t.opacity+")"})})}}}),i.route360PolygonLayer=function(){return new i.Route360PolygonLayer}}(window,document);