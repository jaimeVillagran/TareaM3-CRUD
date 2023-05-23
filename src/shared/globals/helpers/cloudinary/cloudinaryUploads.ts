//Abstraccion de la lógica para subir a cloudinary

import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Response } from 'express';

export function uploads(
  //necestia 1 obligatorio y 3 opcionales
  file: string, //base 64 con public_id, para procesar la cadena, y no el archivo completo y sobrecargar la DB
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  // Podria salir bien, salir mal, o devolver undefined si no paso nada.
  return new Promise(resolve => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {//manera de manejar el error sin reject
        if (error) {
          resolve(error);
        }
        resolve(result);
      }
    );
  });
}
