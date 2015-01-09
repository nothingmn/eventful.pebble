var utils = function() {
  this.stripHtml = function(s) {
    return s.replace(/<(?:.|\n)*?>/gm, '').replace("&nbsp;", ' ').replace("&amp;", '&');
  };
  
  this.formatDistance = function(distance, unit) {
    if(unit == "K") {
      if(distance < 1) {
        return Math.round((distance * 1000),2) + "m";
      } else {
        return Math.round(distance, 2) + "km";
      }
    }
  };
  //http://www.geodatasource.com/developers/javascript
  this.distance = function (lat1, lon1, lat2, lon2, unit) {
    if(typeof unit == 'undefined') unit = "K";
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
//       var radlon1 = Math.PI * lon1/180;
//       var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344; }
    if (unit=="N") { dist = dist * 0.8684; }
    return dist;
  };
};

this.exports = utils;