const { Schema, model } = require('mongoose');

const HurtoSchema = Schema({
  direccion: {
    type: String,
    required: [true, 'La direccion es requerida'],
  },
  latitud: {
    type: String,
    required: [true, 'La latitud  es requerida'],
},
  longitud: {
    type: String,
    required: [true, 'El campo longitud es requerido'],
  },
  descripcion: {
    type: String,
    required: [true, 'El campo descripcion es requerido']
  },
  fecha: {
    type: String,
    required: [true, 'El campo fecha es requerido']
  },
});

module.exports = model('Hurto', HurtoSchema);
