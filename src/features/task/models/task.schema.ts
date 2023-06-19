//Se importa las clases Schema, model y Document del paquete mongoose.
import { Schema, model, Document } from 'mongoose';

//Se define una interfaz para el documento Tarea.
// La interfaz define las propiedades que estarán disponibles en los documentos de Tarea.
export interface Task {
  _id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

//Se crea un alias de tipo para el documento Task.
// El alias de tipo garantiza que los documentos de tarea sean compatibles con la interfaz de documentos de Mongoose.
export type TaskDocument = Task & Document;

//Se crea un esquema para el documento Tarea.
//El objeto Schema define las propiedades y los tipos de datos del documento Task
const taskSchema = new Schema<TaskDocument>({
  //cadena que identifica al usuario que creó la tarea
  userId: { type: Schema.Types.ObjectId, required: true },
  //cadena que representa el título de la tarea.
  title: { type: String, required: true },
//cadena que representa el título de la tarea.
  description: { type: String, required: true },
  //booleano que indica si la tarea está completada.
  completed: { type: Boolean, default: false },
  //Fecha que representa la fecha y hora en que se creó la tarea.
  createdAt: { type: Date, default: Date.now },
});

//código también exporta un modelo por defecto para el documento Tarea. Este modelo
// se puede utilizar para crear, leer, actualizar y eliminar documentos de tarea de una base de datos MongoDB.
//
export default model<TaskDocument>('Task', taskSchema);

