import { Template } from 'meteor/templating';

import './login.html';

Template.loginForm.events({
    'submit form': function(event){
        event.preventDefault();
        var usernameVar = event.target.loginUsername.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(usernameVar, passwordVar);
        //window.location.href = '/selection';
    }
});

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.dashboard.onCreated(function() {
  window.location.href = '/selection';
});