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
    
    setTimeout(function() { app.locked = false; }, 1000);
    app.locked = true;
  	window.plugins.mapKit.showMap();
  	window.plugins.mapKit.setMapData(options);
  	window.plugins.mapKit.setMapPins(app.mapPins);
  }

  function putPin(coords) {
    if (app.locked) return;
    setTimeout(function() { app.locked = false; }, 100);
    app.locked = true;
		app.mapPins = [{ 
      lat: coords.latitude,
      lon: coords.longitude,
      title: "Nitobi HQ",
      pinColor: "purple", 
      index:0,
      selected:false
    }]
		window.plugins.mapKit.setMapPins(app.mapPins);        	
  }
  
  function deleteMap() {
    window.plugins.mapKit.hideMap();
  }
  
  function onMapMove(lat, lon) {
    if (app.locked) return;
    putPin({latitude: lat, longitude: lon});
  }

  return {
    getPosition: getPosition,
    putMap: putMap,
    putPin: putPin,
    deleteMap: deleteMap,
    onMapMove: onMapMove
  };
  
}();