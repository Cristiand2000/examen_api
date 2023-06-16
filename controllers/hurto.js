const { response } = require('express');
const Hurtos = require('../models/hurto');

const hurtoGet = async (req, res = response) => {
  try {
    const hurtos = await Hurtos.find();
    res.json({ hurtos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los hurtos' });
  }
};

const hurtoPost = async (req, res = response) => {
  const body = req.body;
  let mensaje = '';

  try {
    const nuevoHurto = new Hurtos(body);
    await nuevoHurto.save();
    mensaje = 'La inserción se efectuó exitosamente';
  } catch (error) {
    if (error.name === 'ValidationError') {
      mensaje = Object.values(error.errors).map((val) => val.message);
    } else {
      mensaje = 'Se presentaron problemas en la inserción';
    }
  }

  res.json({ msg: mensaje });
};

const hurtoPut = async (req, res) => {
    const { _id, direccion, latitud, longitud, descripcion } = req.body;
    let mensaje = '';
  
    try {
      const hurto = await Hurtos.findOneAndUpdate(
        { _id: _id },
        { direccion, latitud, longitud, descripcion },
        { new: true }
      );
  
      if (hurto) {
        mensaje = 'La modificación se efectuó exitosamente';
      } else {
        mensaje = 'No se encontró el hurto especificado';
      }
    } catch (error) {
      mensaje = 'Se presentaron problemas en la modificación';
    }
  
    res.json({ msg: mensaje });
  };
  

const hurtoDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = '';

  try {
    const resultado = await Hurtos.deleteOne({ _id });
    if (resultado.deletedCount > 0) {
      mensaje = 'La eliminación se efectuó exitosamente';
    } else {
      mensaje = 'No se encontró el hurto especificado';
    }
  } catch (error) {
    mensaje = 'Se presentaron problemas en la eliminación';
  }

  res.json({ msg: mensaje });
};

module.exports = {
  hurtoGet,
  hurtoPost,
  hurtoPut,
  hurtoDelete
};
