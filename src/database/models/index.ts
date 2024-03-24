import User from './user';
import Event from './events';
import EventRegistrations from './eventRegistrations';
import Location from './location';

User.hasMany(Event, {
  foreignKey: 'organizerId',
  as: 'events',
});

Event.belongsTo(User, {
  foreignKey: 'organizerId',
  as: 'organizer',
});

User.belongsToMany(Event, {
  through: EventRegistrations,
  foreignKey: 'userId',
  as: 'eventsRegistered',
});

Event.belongsToMany(User, {
  through: EventRegistrations,
  foreignKey: 'eventId',
  as: 'assistants',
});

Event.hasMany(Location, {
  foreignKey: 'eventId',
  as: 'location',
});

Location.belongsTo(Event, {
  foreignKey: 'eventId',
  as: 'event',
});

export { User, Event, EventRegistrations, Location };
