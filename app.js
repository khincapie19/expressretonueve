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
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true,
    useUnifiedTopology: true });

var schema = mongoose.Schema({
  name: String,
  count: { type: Number, default: 1 }
});

var Visitor = mongoose.model('Visitor', schema);

app.get('/', async(req,res) => {
  let name = req.query.name;
  let visitors = await Visitor.find({ name: name });

  if ( visitors.length > 0) {
    await Visitor.updateOne({ _id: visitors[0]._id }, { $set: { count: visitors[0].count + 1 } });
  } else {
    await Visitor.create({ name: name }, function(err) {
      if (err) return console.error(err);
    });
  }
  Visitor.findOne({ name: name }, function(err, visitor) {
    if (err) return console.error(err);
    console.log( visitor)
    })
  })

});

app.listen(3000, () => console.log('Listening on port 3000!'));
