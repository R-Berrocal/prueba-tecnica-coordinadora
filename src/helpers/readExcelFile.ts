import xlsxPopulate from 'xlsx-populate';
import { ILoadEvent } from '../interfaces/loadEvent';

export const readExcelFile = async (filePath: string) => {
  try {
    // Cargar el archivo Excel
    const workbook = await xlsxPopulate.fromFileAsync(filePath);

    // Acceder a la primera hoja del libro
    const sheet = workbook.sheet(0);

    // Leer los datos de la hoja
    const data = sheet?.usedRange()?.value();
    if (!data) {
      return [];
    }
    console.log(data);
    return parseEvents(data);
  } catch (error) {
    console.error('Error al leer el archivo Excel:', error);
    throw error;
  }
};

const parseEvents = (data: any[]) => {
  //Obtener las columnas
  const columns = data[0];

  // Crear un array para almacenar los datos del evento
  const events: ILoadEvent[] = [];

  // Iterar sobre las filas de datos, comenzando desde la segunda fila
  for (let i = 1; i < data.length; i++) {
    // Crear un objeto para almacenar los datos del evento
    const event: any = {};
    // Iterar sobre las columnas
    for (let j = 0; j < columns.length; j++) {
      // Asignar el valor de la celda a la propiedad correspondiente del objeto
      event[columns[j]] = data[i][j];
    }
    events.push(event as ILoadEvent);
  }

  return events;
};
