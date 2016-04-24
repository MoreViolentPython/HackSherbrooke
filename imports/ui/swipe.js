import { Template } from 'meteor/templating';
import { Events } from '../api/events.js';

import './swipe.html'

Session.setDefault("counter", 0);
var events;
Template.swipe.helpers({
   event(index) {
      events = Events.find({}).fetch();
      return events[index];
   },
   counter(){
   	return Session.get("counter");
   },
});

Template.buttons.events({
  "click #like": function (e, template) {
    e.preventDefault();
    window.location.href = '/chat?id=' + Session.get("counter");
    console.log('like');
  },
  "click #dislike": function (e) {
    Session.set("counter", Session.get("counter") + 1);
    e.preventDefault();
    console.log('dislike');

  }
});