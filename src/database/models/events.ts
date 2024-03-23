import { DataTypes } from 'sequelize';
import db from '../db-connection';
import { EventTypes } from '../../interfaces';

const Event = db.define<EventTypes>(
  'event',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    condition: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    organizerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'event',
  }
);

export default Event;
