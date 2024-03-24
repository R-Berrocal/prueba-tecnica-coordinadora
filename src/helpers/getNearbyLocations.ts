import mapbox from '@mapbox/mapbox-sdk/services/geocoding';
import { ErrorObject } from './error';
const mapBoxToken = process.env.MAPBOX_ACCESS_TOKEN ?? '';
const mapboxClient = mapbox({ accessToken: mapBoxToken });

export const getNearbyLocations = async (
  latitude: number,
  longitude: number,
  radius: number
) => {
  try {
    const response = await mapboxClient
      .reverseGeocode({
        query: [longitude, latitude],
        limit: 10, // Limitar el número de resultados
        types: ['poi'], // Limitar a puntos de interés
      })
      .send();

    return response.body;
  } catch (error: any) {
    throw new ErrorObject(
      'Error al obtener ubicaciones cercanas:',
      error.message
    );
  }
};
