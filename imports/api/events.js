import { Mongo } from 'meteor/mongo';

export const EventsSherbrooke = new Mongo.Collection('eventsSherbrooke');
export const EventsQuebec = new Mongo.Collection('eventsQuebec');
export const EventsGatineau = new Mongo.Collection('eventsGatineau');