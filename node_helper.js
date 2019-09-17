'use strict'

var NodeHelper = require("node_helper");
const exec = require('child_process').exec;
const fs = require('fs');
const path = require("path");
const request = require('request')

module.exports = NodeHelper.create({
  start: function() {
    this.config = null
  },

  getList: function() {
    var query = this.config.URL;
    request(query, { json: true }, (err, res, data) => { // it's better preformated json url
    	if (err) {
		console.log("[Remote Shopping] Erreur: ", err)
	}

    	if (data.length > 0) {
		this.sendSocketNotification("REFRESHED", data);
    	} else {
		data = '{ "Liste Vide !" }';
		this.sendSocketNotification("REFRESHED", data);
	}
	console.log("[Remote Shopping] Liste: " + data)
    });

    var timer = setTimeout(()=>{
      this.getList()
    }, this.config.scanInterval)
  },

  socketNotificationReceived: function(noti, payload) {
    if (noti == "START") {
      this.job(payload)
    }
  },

  job: function(config) {
    this.config = config
    this.getList()
  },

})
