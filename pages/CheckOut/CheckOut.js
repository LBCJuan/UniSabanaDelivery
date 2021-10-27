Page({
  data: {
    scale: 10,
    longitude: -74.033465,
    latitude: 4.861040,
    'show-location':true,
    // Add a ground overlay. Feature added in v10.1.35.
    'ground-overlays':[{
        'include-points':[{// Upper-right
            latitude: 39.935029,
            longitude: 116.384377,
          },{// Lower-left
            latitude: 39.939577,
            longitude: 116.388331,
          }],
        image:'/image/groundoverlay.png',
        alpha:0.75,
        zIndex:0,
    }],
    // Add a tile overlay. It is a feature added in v10.1.35.
    'tile-overlay':{
      url:'http://xixi.fullspeed.cn/public/map',
      type:0,
      tileWidth:256,
      tileHeight:256,
      zIndex:1,
    },
    markers:[{},{}],
    'include-points':[{},{}],
    // New overview logic added in v10.1.35.
    'include-padding':{left:0, right:0, top:0, bottom:0},
    polyline: [{},{}],
    circles: [{},{}],
    controls: [{},{}],
    polygon: [{},{}],
    'include-padding':{},
    // Support settings at map initialization. It is a feature added in v10.1.50.
    setting:{
        // Gesture
        gestureEnable:0/1,
        // Scale
        showScale:0/1,
        // Compass
        showCompass:0/1,
        // Tilt gestures with both hands
        tiltGesturesEnabled:0/1,
        // Show or hide traffic
        trafficEnabled:0/1,                     
        // Map POI
        showMapText:0/1, 
        // Map logo position
        logoPosition:{centerX:150, centerY:90},                       
    },
  },
  onLoad() {

  },
  onReady() {
    this.mapCtx = my.createMapContext('map');
  }
});
