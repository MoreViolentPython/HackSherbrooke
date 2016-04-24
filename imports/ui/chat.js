import { Template } from 'meteor/templating';
import { Messages } from '../api/messages.js';
import { EventsSherbrooke } from '../api/events.js';
import { EventsQuebec } from '../api/events.js';

import './chat.html';

var getQueryParameters = function(str) {
  return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
}

var activiteId = getQueryParameters().id;

Template.chat.helpers({
  messages() {
    return Messages.find({activiteId: activiteId});
  },
  event() {
    var category = getQueryParameters().ville;
    var events;
    if (category == "quebec") {
      events = EventsQuebec.find({}).fetch();
    } else if (category == "sherbrooke") {
      events = EventsSherbrooke.find({}).fetch();
    }
    return events[activiteId];
  }
});

Template.input.events({
  'submit .new-message'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    Messages.insert({
      username: Meteor.user().username,
      activiteId: activiteId,
      text,
      createdAt: new Date(),
    });

    target.text.value = '';
  },
});
