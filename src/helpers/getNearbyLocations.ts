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
    const radiusInGrads = metersToDegrees(radius);
    const response = await mapboxClient
      .reverseGeocode({
        query: [longitude, latitude],
        limit: 10, // Limitar el número de resultados
        types: ['poi'], // Limitar a puntos de interés
        bbox: [
          longitude - radiusInGrads,
          latitude - radiusInGrads,
          longitude + radiusInGrads,
          latitude + radiusInGrads,
        ], // Limitar el area de busqueda
      })
      .send();

    return response.body.features.map((item) => ({
      text: item.text,
      placeName: item.place_name,
      coordinates: item.center,
      category: item.properties.category,
    }));
  } catch (error: any) {
    throw new ErrorObject(
      'Error al obtener ubicaciones cercanas:',
      error.message
    );
  }
};

// Convertir metros a grados
const metersToDegrees = (meters: number) => {
  return meters / 111000; // 1 grado de longitud ~ 111000 metros (aproximadamente)
};
