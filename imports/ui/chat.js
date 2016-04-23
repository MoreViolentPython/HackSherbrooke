import { Template } from 'meteor/templating';
import { Messages } from '../api/messages.js';

import './chat.html';

Template.chat.helpers({
  messages() {
    return Messages.find({});
  },
});

Template.input.events({
  'submit .new-message'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    Messages.insert({
      username: 'Username',
      text,
      createdAt: new Date(),
    });

    target.text.value = '';
  },
});
