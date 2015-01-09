var ajax = require('ajax');

var eventful = {
  url : "http://api.eventful.com/json",
  app_key : "8WN3b5PKstr79jP7",  
  categories : function(context, success, fail) {
    var base = this;
    console.log('in categories');
    var URL = base.url + "/categories/list?app_key=" + base.app_key;
    console.log(URL);    
    ajax(
      {
        context : context,
        url: URL,
        type: 'application/json',
        method: 'GET',
      },
      function(data) {
        // Success!
        console.log("Successfully grabbed categories!" + data);          
        if(success) success(context, this, data, JSON.parse(data));
      },
      function(error) {
        // Failure!
        console.log('Failed to get categories' + error);        
        if(fail) fail(context, this, error);
      }
    );
  },
  events : function(category, location, page_size, within, context, success, fail) {
    var base = this;
    console.log('in events');
    var URL = base.url + "/events/search?location="+location+"&app_key="+base.app_key+"&page_size="+page_size+"&within="+within+"&category="+category+"&sort_order=date&date=Future";
    console.log(URL);    
    ajax(
      {
        context : context,
        url: URL,
        type: 'application/json',
        method: 'GET',
      },
      function(data) {
        // Success!
        console.log("Successfully grabbed categories!" + data);          
        if(success) success(context, this, data, JSON.parse(data));
      },
      function(error) {
        // Failure!
        console.log('Failed to get categories' + error);        
        if(fail) fail(context, this, error);
      }
    );
  }
};


this.exports = eventful;  