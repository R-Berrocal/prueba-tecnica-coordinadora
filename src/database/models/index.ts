import User from './user';
import Event from './events';
import EventRegistrations from './eventRegistrations';

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

// EventRegistrations.belongsTo(Event, {
//   foreignKey: 'eventId',
//   as: 'event',
// });

// EventRegistrations.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'user',
// });

export { User, Event, EventRegistrations };
