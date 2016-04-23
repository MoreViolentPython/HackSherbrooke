import { Template } from 'meteor/templating';
import { Events } from '../api/events.js';

import './swipe.html'

var nbSkip = 0;

Template.swipe.helpers({
   events() {
     return Events.find({});
   },
   name(){
   	var options = { "skip" : nbSkip }
   	nbSkip = nbSkip + 1;
   	console.log(Events.findOne({}, options).CODEID);
   	//return Events.findOne({}, options).CODEID;
   	return Events.findOne({}, options).CODEID;
   },
});

Template.buttons.events({
  "click #like": function (e) {
    e.preventDefault();
    console.log('like');
  },
  "click #dislike": function (e) {
    e.preventDefault();
    console.log('dislike');
  }
});