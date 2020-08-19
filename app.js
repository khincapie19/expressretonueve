//Modificar schema para:
//Agregar llave adicional de count con default
//Eliminar la propiedad de Date
// Agregar default anonimo en name
// Recibir el nombre
// Revisar si el nombre existe, si el nombre existe aumentarle 1 a count
// Si no existe crear el nuevo documento
// Mostrar la tabla en la raiz del documento


const express = require('express');
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
  //_id:  { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
  name: { type: String, default: 'Anónimo'},
  count: { type: Number, default: 1 }
});

var Visitor = mongoose.model('Visitor', schema);

const app = express();

app.get('/', (req,res) => {
  Visitor.find({name: name}), function(err) {
    return count ++
  }
  Visitor.create({ name: name }, function(err) {
    if (err) return console.error(err);
  });

  res.send(`<h1>El visitante fue almacenado con éxito</h1>`);
});

app.listen(3000, () => console.log('Listening on port 3000!'));
