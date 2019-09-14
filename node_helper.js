'use strict'

var NodeHelper = require("node_helper");
const exec = require('child_process').exec;
const fs = require('fs');
const path = require("path");

module.exports = NodeHelper.create({
  start: function() {
    this.config = null
  },

  getList: function() {
    exec("cd " + path.resolve(__dirname, "./temp/") + " && rm " + path.resolve(__dirname, "./temp/") + "/" + this.config.SCRIPT + "* && wget " + this.config.URL + this.config.SCRIPT);
    var res = fs.readFileSync(path.resolve(__dirname, "./temp/" + this.config.SCRIPT),'utf8');
    console.log("[SHOPPING] List: " + res);
    var data = res.split(',', res.length-1);

    if (data.length > 0) {
	this.sendSocketNotification("REFRESHED", data);
    }

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
