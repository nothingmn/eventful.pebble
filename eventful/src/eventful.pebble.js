var eventful = require("eventful");
var UI = require('ui');
var u = require('utils');
var utils = new u();



var eventfulPebble = function() {
  this.waiterCard = new UI.Card({
      title:'eventful',
      subtitle:'please wait...',
  });
  this.main = function main() {    
    console.log('in main');
    
    this.waiterCard.show();    
    var self = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      self.position = position;
      eventful.categories(self, self.handleCategories, self.handleError);      
    }, this.handleError);
    
  };
  
  this.handleCategories = function handleCategories(self, ajax, raw, parsed) {    
    console.log('in handleCategories');
    var menuItems = [];
    for(var cat in parsed.category) {
      var title = utils.stripHtml(parsed.category[cat].name);
      menuItems.push({title:title, id:parsed.category[cat].id, self:self});
    }
    self.catMenu = new UI.Menu({
      sections: [{
        title: 'select a category',
        items: menuItems
      }],
    });      
    self.catMenu.on('select', self.selectCategory);
    self.catMenu.show();
    self.waiterCard.hide();
  };
  this.selectCategory = function selectCategory(e) {
    var id = e.item.id;
    var self = e.item.self;
    console.log('Selected:'+ id);
    self.waiterCard.show();
    eventful.events(
      id, 
      self.getPosition(), 
      10, 
      50, 
      self, 
      self.showEvents, 
      self.handleError
    );
    
  };
  this.showEvents = function showEvents(context, ajax, raw, data) {
    console.log('show events!' + raw);
    var menuItems = [];
        
    for(var event in data.events) {
      for(var e in data.events[event]) {
          var actualEvent = data.events[event][e];
          var title = actualEvent.title;
          if(title.length>20) title = title.substr(0,20);
          var subtitle = new Date(actualEvent.start_time);
          menuItems.push({title:title, subtitle:subtitle, context:context, event:actualEvent});  
      }
    }
    
     context.eventsMenu = new UI.Menu({
      sections: [{
        title: 'select an event',
        items: menuItems
      }],
    });      
    context.eventsMenu.on('select', context.selectEvent);
    context.eventsMenu.show();
    context.waiterCard.hide();
  };
  this.selectEvent = function selectEvent(e) {
    e.item.context.waiterCard.show();
    var event = e.item.event;    
    console.log('selected event!' + event.city_name);
    var menuItems = [];
    
    var distance = utils.distance(e.item.context.position.coords.latitude, e.item.context.position.coords.longitude, event.latitude, event.longitude, "K");
    var formatted = utils.formatDistance(distance, "K");   
    menuItems.push({title:event.venue_name, subtitle:event.venue_address});  
    menuItems.push({title:"date", subtitle:e.item.subtitle});  
    menuItems.push({title:"distance", subtitle:formatted});  
    
     e.item.context.eventMenu = new UI.Menu({
      sections: [{
        title: e.item.title,
        items: menuItems
      }],
    });      
    //e.item.context.eventMenu.on('select', context.selectEvent);
    e.item.context.eventMenu.show();
    e.item.context.waiterCard.hide();
  };
  this.getPosition = function getPosition() {
    return this.position.coords.latitude + "," + this.position.coords.longitude;
  };
  this.handleError = function handleError(eventful, error) {
    console.log("error:" + error);
  };
};


this.exports = eventfulPebble;  


