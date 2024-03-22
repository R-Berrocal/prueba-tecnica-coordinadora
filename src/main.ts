import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import indexRouter from './routes';
import { drawLogger } from './utils/drawLogger';
import { dbConnection } from './database/db-connection';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
  })
);
app.use('/api', indexRouter);

app.listen(port, () => {
  dbConnection();
  drawLogger(2, `Server running on port ${port}`);
});
