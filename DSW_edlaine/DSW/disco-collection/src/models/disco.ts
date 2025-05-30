import mongoose, { Schema, Document } from 'mongoose';

export interface IDisco extends Document {
  titulo: string;
  artista: string;
  ano: number;
  genero: string;
  formato: 'Vinil' | 'CD';
  preco: number;
}

const DiscoSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  ano: { type: Number, required: true },
  genero: { type: String, required: true },
  formato: { type: String, enum: ['Vinil', 'CD'], required: true },
  preco: { type: Number, required: true }
});

export default mongoose.model<IDisco>('Disco', DiscoSchema);