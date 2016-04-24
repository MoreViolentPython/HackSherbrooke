import { Template } from 'meteor/templating';
import { Events } from '../api/events.js';

import './selection.html';

Session.setDefault("chosenCategories", []);

Template.selection.events({
    'click .vignette': function(event, template) {
        template.$('.vignette[data-id="'+this.id+'"]').toggleClass("checked");

        var chosenCategories = Session.get("chosenCategories");
        var indexOfCategorie = _.indexOf(chosenCategories, this.name)
        if (-1 === indexOfCategorie) {
             chosenCategories.push(this.name);
        } else {
            chosenCategories.splice(indexOfCategorie, 1);
        }

        Session.set("chosenCategories", chosenCategories);
    }
});

Template.selection.helpers({
    events() {
        return Events.find({});
    },
    categories() {
        var categories = [
            "Activités physiques",
            "Camps de jour",
            "Vélo",
            "Pêche",
            "Sports",
            "Festivals et fêtes populaires",
            "Spectacles",
            "Soupers-bénéfice",
            "Ateliers"
        ];
        return categories
    },
    categories_chunks() {
        var categories = [
            {
                chunk: [
                    {
                        id: 1,
                        name: "Activités physiques"
                    },
                    {
                        id: 2,
                        name: "Camps de jour"
                    },
                    {
                        id: 3,
                        name: "Vélo"
                    }
                ]
            },
            {
                chunk: [
                    {
                        id: 4,
                        name: "Pêche"
                    },
                    {
                        id: 5,
                        name: "Festivals et fêtes populaires"
                    },
                    {
                        id: 6,
                        name: "Spectacles"
                    }
                ]
            },
            {
                chunk: [
                    {
                        id: 7,
                        name: "Expositions et salons"
                    },
                    {
                        id: 8,
                        name: "Sports"
                    },
                    {
                        id: 9,
                        name: "Ateliers"
                    }
                ]
            }

        ];
        return categories
    },
    chosenCategories: function () {
        return Session.get("chosenCategories");
    }
});

Template.selectionButtons.events({
    "click .next": function (e) {
        e.preventDefault();
        Router.go('/swipe?categories=' + Session.get("chosenCategories"));
        console.log('next');
    }
})