import path from 'path';

export const configSwagger = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'GESTION DE EVENTOS',
      description: 'API-RESTFUL - GESTION DE EVENTOS',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
  },
  apis: [`${path.join(__dirname, '../controllers/*.{ts,js}')}`],
};
