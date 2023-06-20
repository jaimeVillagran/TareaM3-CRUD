import { ITaskDocument } from '@task/interfaces/ITaskDocument';

import mongoose, {Model, model, Schema } from 'mongoose';

const taskSchema: Schema = new Schema({
    _id: { type: String, required: true },
    authId: { type: mongoose.Schema.Types.ObjectId, ref:'Auth'},
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const TaskModel: Model<ITaskDocument> = model<ITaskDocument>('Task', taskSchema);
export { TaskModel };
