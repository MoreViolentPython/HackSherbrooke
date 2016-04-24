import { Template } from 'meteor/templating';

import './register.html';

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var usernameVar = event.target.registerUsername.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
            username: usernameVar,
            password: passwordVar
        });
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