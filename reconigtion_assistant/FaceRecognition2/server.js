const express = require('express');
const { spawn } = require('child_process');
const { Pool } = require('pg');
const fs = require('fs');  // Importar el módulo de File System
const app = express();
const port = 5000;
const cors = require('cors');
const http = require('http')
const multer = require('multer');
const { Server } = require('socket.io');

const OpenAI = require('openai');
// Configuración de multer para almacenar el archivo en una carpeta específica
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Especifica la ruta donde guardarás los archivos
      cb(null, 'uploads/'); // Asegúrate de que la carpeta 'uploads' exista
    },
    filename: (req, file, cb) => {
      // Guardar el archivo con el nombre proporcionado en el frontend (nombre del empleado)
      cb(null, file.originalname);
    },
  });

  const client = new OpenAI({
    apiKey: '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'
  })


  
  
  
// Middleware para manejar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// Configuración de PostgreSQL
const pool = new Pool({
    user: 'project_AII',
    host: 'localhost',
    database: 'database_assistant',
    password: '12345',
    port: 5432,
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Permitir todas las conexiones
    methods: ["GET", "POST"]
  }
});


// Función asíncrona para ejecutar un proceso de Python
const runPythonProcess = (script, args = []) => {
    return new Promise((resolve, reject) => {
        const process = spawn('python', [script, ...args]);

        process.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        process.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });
    });
};

// Ruta para crear un nuevo empleado y actualizar el modelo
app.post('/employees', async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).send('El nombre del empleado es requerido.');
    }

    try {
        // Guardar el nombre en la base de datos
        const query = 'INSERT INTO empleados (nombre) VALUES ($1) RETURNING id';
        const result = await pool.query(query, [nombre]);

        const employeeId = result.rows[0].id;

        // Ejecutar el script de Python para capturar las fotos, pasando el ID del empleado
        await runPythonProcess('capture.py', [employeeId]);

        console.log('Fotos capturadas correctamente.');

        // Actualizar el modelo con las nuevas imágenes disponibles
        await runPythonProcess('train_model.py', []);

        console.log('Modelo actualizado correctamente.');
        res.status(200).send(`Empleado con ID ${employeeId} registrado y modelo actualizado correctamente.`);

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error al registrar el empleado o actualizar el modelo.');
    }
});
app.get('/getEmployeeName/:id', async (req, res) => {
    const employee_id = req.params.id;
    try {
        const result = await pool.query('SELECT nombre FROM empleados WHERE id = $1', [employee_id]);
        if (result.rows.length > 0) {
            res.json({ nombre: result.rows[0].nombre });
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (err) {
        console.error('Error consultando la base de datos', err);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});
app.post('/reconocimiento', async (req, res) => {
    // Ejecutar el script de Python para el reconocimiento facial
    const pythonProcess = spawn('python', ['reconocimiento.py']);

    let output = '';
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString().trim();  // Capturar la salida del script de Python
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error en el script de Python: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
        console.log(`Proceso de Python finalizado con código ${code}`);

        if (code === 0 && output && output !== "None") {
            // El ID del empleado reconocido está en la variable "output"
            const employeeId = parseInt(output);

            try {

                    // Validar si employee_id es un número entero válido
                    if (isNaN(employeeId) || !Number.isInteger(Number(employeeId))) {
                                console.error('Error: employee_id no es un número válido.');
                                 return res.status(400).json({ message: 'Empleado no esta Registrado' });
                            }

                // Consultar el nombre del empleado en la base de datos usando el ID
                const query = 'SELECT nombre FROM empleados WHERE id = $1';
                const result = await pool.query(query, [employeeId]);

                if (result.rows.length > 0) {
                    const employeeName = result.rows[0].nombre;
                    res.json({ message: 'Empleado reconocido', employeeId: employeeId, employeeName: employeeName });
                } else {
                    res.json({ message: 'Empleado no encontrado', employeeId: employeeId });
                }
            } catch (err) {
                console.error('Error en la consulta a la base de datos:', err);
                res.status(500).json({ error: 'Error en la base de datos' });
            }
        } else {
            res.json({ message: 'No se reconoció a ningún empleado' });
        }
    });
});

// Ruta que recibe el ID del empleado reconocido
app.post('/api/empleado-reconocido', (req, res) => {
    const employeeId = req.body.employeeId;
      console.log(employeeId)
    // Consulta en la base de datos
    const query = 'SELECT name FROM employed WHERE id = $1';
    pool.query(query, [employeeId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al consultar la base de datos.' });
      }
  
      const employeeName = result.rows[0]?.name || 'Desconocido';
      console.log(`Empleado reconocido: ${employeeName}`);
      // Enviar una señal al frontend usando websockets
      io.emit('empleado-reconocido', { employeeId, employeeName });
  
      res.status(200).json({ message: 'Empleado reconocido', employeeName });
    });
  });
  
// Configurar eventos de conexión de Socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });



const trabajos = {
  
    "Chapear": "Control Manual",
    "Chapiar": "Control Manual",
    "Fumigar": "Control Químico",
    "Fumigación": "Control Químico",
    "Quitar bejucos": "Desembejucado",
    "Desbejucar": "Desembejucado",
    "Recolectar granos": "Graneado",
    "Cortar el café": "Cosecha",
    "Pizcar": "Cosecha",
    "Quitar granos malos": "Repele y Pepena",
    "Revisar el café": "Repele y Pepena",
    "Cortar la cerca": "Corte de cerca para escuela",
    "Recibir y pesar café": "Recibido y Pesaje",
    "Separar el café bueno": "Clasificación",
    "Quitar la pulpa": "Despulpa",
    "Limpiar las máquinas": "Limpieza Equipo",
    "Lavar el café pergamino": "Lavado Pergamino Húmedo",
    "Guardar el café": "Alojar",
    "Secar el café": "Secado",
    "Empacar el café": "Empacado",
    "Reparar el beneficio": "Mantenimiento Beneficio",
    "Construir presa en el río": "Hechura Presa Princip Rio Ocos",
    "Reparar tomas de agua": "Mantenimiento Tomas de Agua",
    "Secar semillas": "Secado en Patio",
    "Mover semillas a las zarandas": "Traslado a Zarandas",
    "Secar semillas en zarandas": "Secado en Zarandas",
    "Llevar semillas a clasificación": "Traslado Área de Clasificación",
    "Preseleccionar semillas": "Preselección",
    "Seleccionar semillas": "Selección",
    "Revisar y seleccionar nuevamente": "Reselección",
    "Probar germinación de semillas": "Pruebas de Germinación",
    "Quitar plantas viejas": "Eliminación Plantas",
    "Sacar varas de café": "Sacado Varas de Café Recapadas",
    "Hacer leña del café": "Hechura de Leña de Café",
    "Marcar y poner estacas": "Trazo y Estaqueado",
    "Hacer hoyos y sembrar": "Ahoyado y Siembra",
    "Control de plagas con trampas": "Elaboración de trampas",
    "Instalación de trampas para broca": "Colocado Trampas Broca",
    "Inspección de trampas en campo": "Revisión Trampas en Campo",
    "Mantenimiento de trampas para broca": "Mantenimiento Trampas Broca",
    "Aplicación de fertilizantes o enmiendas al suelo": "Aplicaciones al Suelo",
    "Plantación de cultivos": "Siembra",
    "Poda para dar forma a las plantas": "Poda de Formación",
    "Eliminación de brotes o hijuelos": "Deshije",
    "Retiro de sombra de los cultivos": "Eliminación de Sombra",
    "Poda para regular el crecimiento": "Poda de Regulación",
    "Preparación de hoyos para siembra": "Ahoyado",
    "Aplicación de nutrientes a las hojas": "Nutrición Foliar",
    "Aplicación de nutrientes al suelo": "Nutrición al Suelo"
  
  
};
const lotes = {
  
    "Lote Conilon I": "Conilon I",
    "Lote Conilon II": "Conilon II",
    "Lote Conilon III": "Conilon III",
    "Lote Robusta Criollo": "Robusta Criollo",
    "Lote Paraneima": "Paraneima",
    "Lote Sarchimor": "Sarchirmor",
    "Lote Anacafé 14": "Anacafé 14",
    "Lote Aguacate": "Aguacate",
    "Lote Robusta Tropical": "Robusta Tropical",
    "Lote Robusta ICP": "Robusta ICP",
    "Lote Jardines Clonales": "Jardines Clonales",
    "Lote Robusta FRT": "Robusta FRT"
  
  
}

// Función para corregir los términos usando la lista de trabajos
function corregirTerminosLocales(transcript) {
  let textoCorregido = transcript.toLowerCase();
  for (let termino in trabajos) {
    const regex = new RegExp(`\\b${termino}\\b`, 'gi');
    textoCorregido = textoCorregido.replace(regex, trabajos[termino]);
  }
  return textoCorregido;
}

app.post('/corregir-texto', async (req, res) => {
 /*
const { transcript } = req.body;

try {
  // Usar OpenAI GPT para corrección avanzada
  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
          Te proporcionamos una lista de actividades técnicas utilizadas en el trabajo. 
          Lo que diga el empleado debe corregirse usando estos términos técnicos. 
          Si el empleado utiliza un término no técnico o una expresión coloquial, 
          debes reemplazarlo por la actividad técnica correcta según la lista proporcionada.
          Aquí está la lista de actividades técnicas: ${JSON.stringify(trabajos)}.

          Si el empleado menciona expresiones como "hoy hice", "hoy realicé", "hoy hize", o cualquier variación, debes ignorar estas expresiones y devolver solamente el nombre de la actividad técnica correcta.

          Ejemplos:
          - Si el empleado dice "Hoy hice chapear", debes responder con "control de maleza".
          - Si el empleado dice "Hoy realicé el colocado trampas broca", debes responder con "instalación de trampas para broca".
          
          Solo debes devolver el nombre de la actividad técnica, sin repetir las expresiones iniciales como "hoy hice" o "hoy realicé".
        `,
      },
      {
        role: 'user',
        content: transcript,
      },
    ],
  });

  // Obtener el texto corregido
  const correctedText = response.choices[0].message.content;

  // Buscar subactividad y obtener el id_activity relacionado
  const queryFindSubActivity = 'SELECT * FROM sub_activities WHERE name_sub_activity = $1';
  pool.query(queryFindSubActivity, [correctedText], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al consultar la base de datos.' });
    }
    if (result.rows.length > 0) {
      const subActivity = result.rows[0];
      const id_activity = subActivity.id_actividad;

      // Buscar actividad relacionada con id_activity
      const queryFindActivity = 'SELECT * FROM activities WHERE id = $1';
      pool.query(queryFindActivity, [id_activity], (err, activityResult) => {
        if (err) {
          return res.status(500).json({ message: 'Error al consultar la base de datos.' });
        }
        if (activityResult.rows.length > 0) {
          const activity = activityResult.rows[0];
          console.log(subActivity,activity,correctedText)
          return res.json({ correctedText, subActivity: subActivity.id, activity: activity.id });
        } else {
          return res.json({ correctedText, subActivity: subActivity });
        }
      });
    } else {
      return res.json({ correctedText });
    }
  });

  // Imprimir el texto corregido
  console.log("Texto corregido:", correctedText);

} catch (error) {
  console.error('Error al procesar el texto:', error);
  return res.status(500).send('Error al procesar el texto.');
}*/
const { transcript } = req.body;

try {
  // Usar OpenAI GPT para corrección avanzada
  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
          Te proporcionamos una lista de actividades técnicas utilizadas en el trabajo. 
          Lo que diga el empleado debe corregirse usando estos términos técnicos. 
          Si el empleado utiliza un término no técnico o una expresión coloquial, 
          debes reemplazarlo por la actividad técnica correcta según la lista proporcionada.
          Aquí está la lista de actividades técnicas: ${JSON.stringify(trabajos)}.

          Si el empleado menciona expresiones como "hoy hice", "hoy realicé", "hoy hize", o cualquier variación, debes ignorar estas expresiones y devolver solamente el nombre de la actividad técnica correcta.

          Ejemplos:
          - Si el empleado dice "Hoy hice chapear", debes responder con "control de maleza".
          - Si el empleado dice "Hoy realicé el colocado trampas broca", debes responder con "instalación de trampas para broca".
          
          Solo debes devolver el nombre de la actividad técnica, sin repetir las expresiones iniciales como "hoy hice" o "hoy realicé".
        `,
      },
      {
        role: 'user',
        content: transcript,
      },
    ],
  });

  // Obtener el texto corregido
  const correctedText = response.choices[0].message.content.trim();

  // Buscar subactividad y obtener el id_activity relacionado
  const queryFindSubActivity = 'SELECT * FROM sub_activities WHERE name_sub_activity = $1';
  pool.query(queryFindSubActivity, [correctedText], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al consultar la base de datos.' });
    }
    if (result.rows.length > 0) {
      const subActivity = result.rows[0];
      const id_activity = subActivity.id_actividad;

      // Buscar actividad relacionada con id_activity
      const queryFindActivity = 'SELECT * FROM activities WHERE id = $1';
      pool.query(queryFindActivity, [id_activity], (err, activityResult) => {
        if (err) {
          return res.status(500).json({ message: 'Error al consultar la base de datos.' });
        }
        if (activityResult.rows.length > 0) {
          const activity = activityResult.rows[0];
          console.log(subActivity, activity, correctedText);
          return res.json({ correctedText, subActivity: subActivity.id, activity: activity.id });
        } else {
          return res.status(404).json({ error: 'Actividad no encontrada en la base de datos.' });
        }
      });
    } else {
      return res.status(404).json({ error: 'No se pudo reconocer la actividad.' });
    }
  });

} catch (error) {
  console.error('Error al procesar el texto:', error);
  return res.status(500).send('Error al procesar el texto.');
}
})
/*
app.post('/api/corregir-lote',async(req,res)=>{
  try{
    const {transcript} = req.body;
    const response = await client.chat.completions.create({
       model: 'gpt-4',
  messages: [
    {
      role: 'system',
      content: `
        Te proporcionamos una lista de lotes utilizados en el trabajo. 
        Lo que diga el empleado debe corregirse usando los nombres correctos de los lotes. 
        Si el empleado utiliza un término no técnico o una expresión coloquial, 
        debes reemplazarlo por el nombre del lote correcto según la lista proporcionada.
        Aquí está la lista de nombres correctos de los lotes: ${JSON.stringify(lotes)}.

        Si el empleado menciona expresiones como "hoy trabajé en", "hoy realicé", "hoy estuve en", 
        "hoy trabajé en el lote", o cualquier variación,
        debes ignorar estas expresiones y devolver solamente el nombre del lote, sin agregar "Lote" antes.

        Ejemplos:
        - Si el empleado dice "Hoy trabajé en Conilon I", debes responder con "Conilon I".
        - Si el empleado dice "Hoy realicé el trabajo en Aguacate", debes responder con "Aguacate".
        - Si el empleado dice "Hoy trabajé en el lote Conilon II", debes responder con "Conilon II".
        
        Solo debes devolver el nombre del lote correcto, sin repetir las expresiones iniciales como "hoy trabajé", "hoy realicé" o "hoy trabajé en el lote".
      `,
    },
    {
      role: 'user',
      content: transcript, // La entrada del empleado
    },
  ],
    })

    const correctedLot = response.choices[0].message.content;
    console.log("Lote corregido:", correctedLot);
    const queryFindLote = 'SELECT * FROM lots WHERE name_lots = $1';
    pool.query(queryFindLote, [correctedLot], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al consultar la base de datos.' });
      }
      if (result.rows.length > 0) {
        const lote = result.rows[0];  // Asegúrate de que el campo se llama 'name_lots' en tu base de datos
        console.log(lote);
        return res.status(200).json({ name_lots: lote.name_lots, id: lote.id });
      } else {
        return res.status(404).json({ message: 'Lote no encontrado' });
      }
    });
    
  }catch(error){
      return res.status(500).send('Error al procesar el texto.');
  }
})
  */
app.post('/api/corregir-lote', async (req, res) => {
  try {
    const { transcript } = req.body;

    // Usar OpenAI GPT para corrección avanzada
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `
            Te proporcionamos una lista de lotes utilizados en el trabajo. 
            Lo que diga el empleado debe corregirse usando los nombres correctos de los lotes. 
            Si el empleado utiliza un término no técnico o una expresión coloquial, 
            debes reemplazarlo por el nombre del lote correcto según la lista proporcionada.
            Aquí está la lista de nombres correctos de los lotes: ${JSON.stringify(lotes)}.

            Si el empleado menciona expresiones como "hoy trabajé en", "hoy realicé", "hoy estuve en", 
            "hoy trabajé en el lote", o cualquier variación,
            debes ignorar estas expresiones y devolver solamente el nombre del lote, sin agregar "Lote" antes.

            Ejemplos:
            - Si el empleado dice "Hoy trabajé en Conilon I", debes responder con "Conilon I".
            - Si el empleado dice "Hoy realicé el trabajo en Aguacate", debes responder con "Aguacate".
            - Si el empleado dice "Hoy trabajé en el lote Conilon II", debes responder con "Conilon II".
            
            Solo debes devolver el nombre del lote correcto, sin repetir las expresiones iniciales como "hoy trabajé", "hoy realicé" o "hoy trabajé en el lote".
          `,
        },
        {
          role: 'user',
          content: transcript,
        },
      ],
    });

    // Obtener el texto corregido
    const correctedLot = response.choices[0].message.content.trim();
    console.log("Lote corregido:", correctedLot);

    // Buscar el lote en la base de datos
    const queryFindLote = 'SELECT * FROM lots WHERE name_lots = $1';
    pool.query(queryFindLote, [correctedLot], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al consultar la base de datos.' });
      }
      if (result.rows.length > 0) {
        const lote = result.rows[0];
        console.log(lote);
        return res.status(200).json({ name_lots: lote.name_lots, id: lote.id });
      } else {
        return res.status(404).json({ error: 'Lote no encontrado. Por favor, intenta nuevamente.' });
      }
    });

  } catch (error) {
    console.error('Error al procesar el texto:', error);
    return res.status(500).json({ error: 'Error al procesar el texto. Por favor, intenta nuevamente.' });
  }
});

const obtenerFechaActual = () => {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
  const anio = fecha.getFullYear();

  return `${anio}-${mes}-${dia}`;
};
app.post('/register-activity',async(req,res)=>{
  try{
      const {employeeId,activityId,subActivityId,lotId} = req.body;
      console.log(employeeId,activityId,subActivityId,lotId)
      const date = obtenerFechaActual();
      const query = 'INSERT INTO employees_activities(date, employee_id, lot_id, activity_id, sub_activity_id) VALUES($1, $2, $3, $4, $5)';
      pool.query(query,[date,employeeId,lotId,activityId,subActivityId],(err,result)=>{
        if(err){
          return res.status(500).json("dont save the Employees' activities");
        }
        return res.status(200).json("Employees' activities saved");
      })
  }catch(error){
    return res.status(500).json("error ")
  }
})
app.post('/detener-reconocimiento', (req, res) => {
  if (pythonProcess) {
    pythonProcess.kill(); // Detener el proceso de Python
    pythonProcess = null; // Limpiar la referencia
    res.status(200).send('Reconocimiento facial detenido correctamente.');
  } else {
    res.status(400).send('No hay ningún proceso de reconocimiento facial en ejecución.');
  }
});
let pythonProcess; // Variable para almacenar el proceso de Python

app.post('/iniciar-reconocimiento', (req, res) => {
  // Iniciar el script de reconocimiento facial
  if (!pythonProcess) { // Verificar si no hay un proceso en ejecución
    pythonProcess = spawn('python', ['reconocimiento.py']);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Proceso de reconocimiento facial cerrado con código ${code}`);
      pythonProcess = null; // Limpiar la referencia al proceso al terminar
    });

    res.status(200).send('Reconocimiento facial iniciado correctamente.');
  } else {
    res.status(400).send('El reconocimiento facial ya está en ejecución.');
  }
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
