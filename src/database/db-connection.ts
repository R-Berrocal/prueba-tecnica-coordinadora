import { Sequelize } from 'sequelize';
import { drawLogger } from '../utils/drawLogger';

const db = new Sequelize(
  process.env.DATABASE_NAME ?? '',
  process.env.DATABASE_USER ?? '',
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: +process.env.DATABASE_PORT!,
  }
);
export const dbConnection = async () => {
  try {
    await db.authenticate();
    if (process.env.NODE_ENV === 'dev') {
      await db.sync({ alter: true });
    }
    drawLogger(2, 'Connection has been established succesfully');
  } catch (error: any) {
    throw new Error(error);
  }
};

export default db;
