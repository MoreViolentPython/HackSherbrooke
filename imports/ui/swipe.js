import { Template } from 'meteor/templating';
import { EventsSherbrooke } from '../api/events.js';
import { EventsQuebec } from '../api/events.js';

import './swipe.html'

var classifier = require('classifier');
var bayes = new classifier.Bayesian();

Session.setDefault("counter", 0);
Session.setDefault("prediction", "");

if (Meteor.isClient) {
    Meteor.startup(function() {
        GoogleMaps.load();
    });
}

Template.swipe.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('eventMap', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
});

var events;
var category = "sherbrooke";
Template.swipe.helpers({
    event(index) {
        if (category == "quebec") {
            events = EventsQuebec.find({}).fetch();
        } else if (category == "sherbrooke") {
            events = EventsSherbrooke.find({}).fetch();
        }
        Session.set("prediction", bayes.classify(events[Session.get("counter")].DESCRIP));
        return events[index];
    },
    counter(){
        return Session.get("counter");
    },
    prediction(){
        return Session.get("prediction");
    },
    eventMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(45.4010, -71.8824),
                zoom: 8
            };
        }
    },
});

Template.buttons.events({
  "click #like": function (e, template) {
    e.preventDefault();
    window.location.href = '/chat?id=' + Session.get("counter") + '&ville=' + category;
    bayes.train(events[Session.get("counter")].DESCRIP, "like");
  },
  "click #dislike": function (e) {
    Session.set("counter", Session.get("counter") + 1);
    e.preventDefault();
    bayes.train(events[Session.get("counter")].DESCRIP, "dislike");
  }
});

Template.categories.helpers({
    categories: function(){
        return ["quebec", "sherbrooke"];
    }
});

Template.categories.events({
    "change #category-select": function (event, template) {
      category = $(event.currentTarget).val();
      Session.set("counter", 100);
      Session.set("counter", 0);
    }
});