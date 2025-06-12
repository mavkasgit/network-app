import mongoose from 'mongoose';

const textSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Обновляем updatedAt при каждом сохранении
textSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Создаем модель только если она еще не существует
export const Text = mongoose.models.Text || mongoose.model('Text', textSchema); 