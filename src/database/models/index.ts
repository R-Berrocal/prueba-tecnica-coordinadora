import User from './user';
import Event from './events';

User.hasMany(Event, {
  foreignKey: 'organizerId',
  as: 'events',
});

Event.belongsTo(User, {
  foreignKey: 'organizerId',
  as: 'organizer',
});

export { User, Event };
