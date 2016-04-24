import { Template } from 'meteor/templating';
import { EventsSherbrooke } from '../api/events.js';
import { EventsQuebec } from '../api/events.js';
import { EventsGatineau } from '../api/events.js';

import './swipe.html'

var classifier = require('classifier');
var bayes = new classifier.Bayesian();
var geo = {
  sherbrooke: {
    lat: 45.411224,
    lng: -71.880756
  },
  quebec: {
    lat: 46.828333,
    lng: -71.206692
  },
  gatineau: {
    lat: 45.504436,
    lng: -75.691761
  }
}

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
        } else if (category == "gatineau") {
            events = EventsGatineau.find({}).fetch();
        }
        //Session.set("prediction", bayes.classify(events[Session.get("counter")].DESCRIP));
        return events[index];
    },
    counter(){
        return Session.get("counter");
    },
    prediction(){
        return Session.get("prediction");
    },
    sherbrooke(){
        if (category == "sherbrooke") {
            return true;
        } else {
            return false;
        }
    },
    quebec(){
        if (category == "quebec") {
            return true;
        } else {
            return false;
        }
    },
    gatineau(){
        if (category == "gatineau") {
            return true;
        } else {
            return false;
        }
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
    //bayes.train(events[Session.get("counter")].DESCRIP, "like");
  },
  "click #dislike": function (e) {
    Session.set("counter", Session.get("counter") + 1);
    e.preventDefault();
    //bayes.train(events[Session.get("counter")].DESCRIP, "dislike");
  }
});

Template.categories.events({
    "change #category-select": function (event, template) {

      category = $(event.currentTarget).val();
      Session.set("counter", 100);
      Session.set("counter", 0);

      var selectedCategorie = $("#category-select").val()
      var cityLatLng = {lat: geo[selectedCategorie].lat, lng: geo[selectedCategorie].lng};
      GoogleMaps.maps.eventMap.instance.setCenter(
        new google.maps.LatLng(cityLatLng.lat, cityLatLng.lng)
      );

      var marker = new google.maps.Marker({
        position: cityLatLng,
        map: GoogleMaps.maps.eventMap.instance,
      });

    }
});