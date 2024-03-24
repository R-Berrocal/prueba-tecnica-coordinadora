import { DataTypes } from 'sequelize';
import db from '../db-connection';
import { LocationTypes } from '../../interfaces';

const Locations = db.define<LocationTypes>(
  'locations',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'locations',
  }
);

export default Locations;
