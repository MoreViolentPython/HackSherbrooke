import { Template } from 'meteor/templating';
import { EventsSherbrooke } from '../api/events.js';
import { EventsQuebec } from '../api/events.js';

import './swipe.html'

var classifier = require('classifier');
var bayes = new classifier.Bayesian();

Session.setDefault("counter", 0);
Session.setDefault("prediction", "");

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
   }
});

Template.buttons.events({
  "click #like": function (e, template) {
    e.preventDefault();
    window.location.href = '/chat?id=' + Session.get("counter");
    bayes.train(events[Session.get("counter")].DESCRIP, "like");
    console.log('like');
  },
  "click #dislike": function (e) {
    Session.set("counter", Session.get("counter") + 1);
    e.preventDefault();
    bayes.train(events[Session.get("counter")].DESCRIP, "dislike");
    console.log('dislike');
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
      Session.set("counter", 0);
    }
});