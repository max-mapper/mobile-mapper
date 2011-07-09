var geo = function() {
  
  function getPosition() {
    var dfd = $.Deferred();
    navigator.geolocation.getCurrentPosition(
      function(position) { dfd.resolve(position) },
      function(error) { dfd.resolve({coords: {latitude: 37.7749295, longitude: -122.4194155}}) }
    )
    return dfd.promise();
  }
  
  function putMap(coords) {
    var options = {
      buttonCallback: "cbMapCallback",
      height: 420,
      offsetTop: 44,
      diameter: 1000,
      lat: coords.latitude,
      lon: coords.longitude
    };
    
    setTimeout(function() { geo.locked = false; }, 1000);
    geo.locked = true;
  	window.plugins.mapKit.showMap();
  	window.plugins.mapKit.setMapData(options);
  	window.plugins.mapKit.addMapPins(app.mapPins);
  }

  function putPins(pins) {
    app.mapPins = [];
    $.each(pins, function(i, pin) {
      app.mapPins.push({ 
        lat: pin.latitude,
        lon: pin.longitude,
        title: pin.name,
        pinColor: "purple", 
        index:0,
        selected:false
      })
    })
		if (app.mapPins.length > 0) window.plugins.mapKit.addMapPins(app.mapPins);        	
  }
  
  function deleteMap() {
    window.plugins.mapKit.hideMap();
  }
  
  function getBBOX(location) {
    return [location.lon - (location.deltaX / 2),
            location.lat - (location.deltaY / 2),
            location.lon + (location.deltaX / 2),
            location.lat + (location.deltaY / 2)].join(",");
  }
  
  function onMapMove(lat, lon, deltaY, deltaX) {
    if (geo.locked) return;
    
    app.lastLocation = {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      deltaY: parseFloat(deltaY),
      deltaX: parseFloat(deltaX)
    }

    app.lastLocation.bbox = getBBOX(app.lastLocation);
    
    window.plugins.mapKit.clearMapPins();
    couch.get("http://open211.org/api/services?bbox=" + app.lastLocation.bbox).then(function(results) {
      putPins(results.rows.map(function(row) {
        return row.value;
      }));
    })
    
  }

  return {
    getPosition: getPosition,
    putMap: putMap,
    putPins: putPins,
    deleteMap: deleteMap,
    onMapMove: onMapMove
  };
  
}();