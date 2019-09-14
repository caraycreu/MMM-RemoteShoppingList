//
// MMM-RemoteShoppingList
//

Module.register("MMM-RemoteShoppingList", {
  defaults: {
    scanInterval: 1000*60*10,
    URL: "http://www.exemple.com/",
    SCRIPT: "message.php"
  },

  getStyles: function() {
    return ["MMM-RemoteShoppingList.css"]
  },

  start: function() {
    this.sendSocketNotification("START", this.config)
  },

  getDom: function() {
    var wrapper = document.createElement("ul")
    wrapper.id = "GSL_WRAPPER"
    var loading = document.createElement("div")
    loading.id = "GSL_LOADING"
    loading.innerHTML = "loading..."
    wrapper.appendChild(loading)
    return wrapper
  },

  socketNotificationReceived: function(noti, payload) {
    if (noti == "REFRESHED") {
      this.drawItems(payload)
    }
  },

  drawItems: function(items) {
    var wrapper = document.getElementById("GSL_WRAPPER");
    wrapper.innerHTML = "";
    if (items.length > 0) {
      items.forEach(item => {
	console.log("item : " + item);
        var d = document.createElement("li");
        d.className = "GSL_ITEM";

        var v = document.createElement("div");
        v.innerHTML = item;

        var title = document.createElement("span");
        title.innerHTML = item;
        d.appendChild(title);

        wrapper.appendChild(d);
      })
    }

  }
})
