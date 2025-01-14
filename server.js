const { MongoClient } = require('mongodb');
const cors = require('cors');
const express = require('express');

const app = express();
const port = 5000; // Elige un puerto para tu servidor

app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://gabrielsoler:VU5IxsNoAmQXJXqN@cluster0.5birw.mongodb.net/Emily_bot?retryWrites=true&w=majority";

/*---------------------------------------
      OBTENCION DE LA DATA
---------------------------------------*/
app.get('/data', async (req, res) => {
  const client = new MongoClient(uri);
  const { id } = req.query;
  console.log(id);

  try {
    await client.connect();
    const database = client.db('Emily_bot');
    const collection = database.collection('informes');

    const informes = await collection.find({ id }).toArray();
    console.log(informes);

    res.status(200).json(informes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener informes');
  } finally {
    await client.close();
  }
});


/*---------------------------------------------
  RECOPILACION DE LA DATA PARA EL INFORME
---------------------------------------------*/
//obtener data
app.get('/informes', async (req, res) => {
  const client = new MongoClient(uri);
  const { id } = req.query;
  console.log("informe id", id);

  try {
    await client.connect();
    const database = client.db('Emily_bot');
    const collection = database.collection('informes');

    const informes = await collection.find({ id }).toArray();
    console.log("informe info", informes);

    res.status(200).json(informes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener informes');
  } finally {
    await client.close();
  }
});

// Endpoint para guardar el informe
app.post('/guardar', async (req, res) => {
  console.log('Entramos al servidor');
  const client = new MongoClient(uri);

  try {
    // Obtener los datos del cuerpo de la solicitud
    const { id, analisis, transcripcion, calificacion } = req.body;

    // Validación de datos
    if (!id || !analisis || !transcripcion || typeof calificacion !== 'number') {
      return res.status(400).json({
        error: 'Datos inválidos. Asegúrate de enviar id, analisis, transcripcion y calificacion.',
      });
    }

    // Conectar a la base de datos
    await client.connect();
    const database = client.db('Emily_bot');
    const collection = database.collection('analisis'); // Nombre de la colección

    // Insertar el documento en la colección
    const nuevoAnalisis = { id, analisis, transcripcion, calificacion };
    const result = await collection.insertOne(nuevoAnalisis);

    res.status(201).json({
      message: 'Informe guardado exitosamente',
      data: { id: result.insertedId, ...nuevoAnalisis },
    });
  } catch (error) {
    console.error('Error al guardar en MongoDB:', error);
    res.status(500).json({ error: 'Error al guardar el informe', details: error.message });
  } finally {
    await client.close(); // Asegurarse de cerrar la conexión
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});