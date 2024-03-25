import { DataTypes } from 'sequelize';
import db from '../db-connection';
import { EventRegistrationsTypes } from '../../interfaces';

const EventRegistrations = db.define<EventRegistrationsTypes>(
  'event_registrations',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'event_registrations',
  }
);

export default EventRegistrations;
