import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { configSwagger } from '../config/config.swagger';

const router = express.Router();

router.use('/', serve);
router.get('/', setup(swaggerJSDoc(configSwagger)));

export default router;
