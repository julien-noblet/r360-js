function htmlControlExample(){

    // add the map and set the initial center to berlin
    var map = L.map('map-htmlControlExample', {zoomControl : false}).setView([52.51, 13.37], 13);

    // attribution to give credit to OSM map data and VBB for public transportation 
    var attribution ="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors | ÖPNV Daten © <a href='http://www.vbb.de/de/index.html' target='_blank'>VBB</a> | developed by <a href='http://www.route360.net/de/' target='_blank'>Route360°</a>";

    // initialising the base map. To change the base map just change following
    // lines as described by cloudmade, mapbox etc..
    // note that mapbox is a paided service
    L.tileLayer('http://a.tiles.mapbox.com/v3/mi.h220d1ec/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: attribution
    }).addTo(map);

    // set the service key, this is a demo key
    // please contact us and request your own key
    r360.config.serviceKey = 'iWJUcDfMWTzVDL69EWCG';

    // create a marker and but dont add it to the map yet
    var marker;

    // create the layer to add the polygons
    var cpl = r360.route360PolygonLayer();
    // add it to the map
    map.addLayer(cpl);

    // create an auto complete control and set it to return only german cities, streets etc. 
    var placeAutoComplete = r360.placeAutoCompleteControl({
        country : "Deutschland", placeholder : 'Select start!', 
        reset : true , image : 'lib/leaflet/images/marker-icon-red.png'});

    var htmlControl = r360.htmlControl({ classes : "html-control" });

    // add the controls to the map
    map.addControl(placeAutoComplete);
    map.addControl(htmlControl);
    map.addControl(L.control.zoom({ position : 'topright' }));

    // needs to be set AFTER added to the map
    htmlControl.setHtml(
        '<h1>A want to eat your brainzz..</h1>\
         <p>Or maybe better some kittens: <img src="http://placekitten.com/330/400">');

    // define what happens if someone clicks an item in the autocomplete
    placeAutoComplete.onSelect(function(item){

        // if the source marker is on the map already, move it to the new position
        if ( map.hasLayer(marker) ) marker.setLatLng(item.latlng);
        // otherwise add it
        else marker = L.marker(item.latlng).addTo(map);
        // and show the polygons for the new source
        showPolygons();
    });

    // helper function to encapsulate the show polygon action
    function showPolygons(){

        // you need to define some options for the polygon service
        // for more travel options check out the other tutorials
        var travelOptions = r360.travelOptions();
        // we only have one source which is the marker we just added
        travelOptions.addSource(marker);
        // we want to have polygons for 5 to 30 minutes
        travelOptions.setTravelTimes([300, 600,900, 1200, 1500, 1800]);

        // call the service
        r360.PolygonService.getTravelTimePolygons(travelOptions, function(polygons){
            
            // in case there are already polygons on the map/layer
            cpl.clearLayers();

            // add the returned polygons to the polygon layer 
            cpl.addLayer(polygons);
            
            // zoom the map to fit the polygons perfectly
            map.fitBounds(cpl.getBoundingBox());
        });
    };
}