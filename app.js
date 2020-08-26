//Modificar schema para:
//Agregar llave adicional de count con default
//Eliminar la propiedad de Date
// Agregar default anonimo en name
// Recibir el nombre
// Revisar si el nombre existe, si el nombre existe aumentarle 1 a count
// Si no existe crear el nuevo documento
// Mostrar la tabla en la raiz del documento
// tablas dinamicas html

const express = require('express');
var mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true,
    useUnifiedTopology: true });

var schema = mongoose.Schema({
  name: { type: String, default: "Anónimo" },
  count: { type: Number, default: 1 }
});

var Visitor = mongoose.model('Visitor', schema);

app.get('/', async(req,res) => {
  let name = req.query.name;
  let visitor = await Visitor.findOne({ name: name });

  if (visitor) {
    await Visitor.updateOne({ _id: visitor._id }, { $set: { count: visitor.count + 1 } });
  } else {
    await Visitor.create({ name: name });
  }

  let visitors = await Visitor.find({});

  let headers = `
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Visits</th>
      </tr>
    </thead>
  `

  let content = ``;

  for(let i = 0; i < visitors.length; i++){
    const visitor = visitors[i];

    let row = `
      <tr>
        <td>${visitor["_id"]}</td>
        <td>${visitor.name}</td>
        <td>${visitor.count}</td>
      </tr>
    `;

    content += row
  }

  res.send(`<table>${headers}<tbody>${content}</tbody></table>`);
});


app.listen(3000, () => console.log('Listening on port 3000!'));
