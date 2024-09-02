// const { OpenAI } = require('openai');
// const Post = require('./models/Post'); // Asegúrate de que la ruta sea correcta
// require('dotenv').config();

// // Configura OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Asegúrate de agregar tu clave API en .env
// });

// // Función para generar un post usando OpenAI
// const generatePost = async () => {
//   try {
//     // Solicita una generación de texto a OpenAI
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo', // Actualiza al modelo más reciente
//       messages: [
//         {
//           role: 'system',
//           content: 'Eres un asistente que escribe publicaciones para un blog.',
//         },
//         {
//           role: 'user',
//           content: 'Genera un post interesante para un blog.',
//         },
//       ],
//       max_tokens: 150, // Ajusta el número de tokens según tus necesidades
//     });

//     const postContent = response.choices[0].message.content.trim();
    
//     // Crea un nuevo post en la base de datos
//     const post = new Post({
//       title: 'Post Generado Automáticamente',
//       content: postContent,
//       author: '64c4567b8f4e4d2b8a8b8b8b', // Asegúrate de usar un ID de autor válido
//     });

//     await post.save();
//     console.log('Post generado y guardado exitosamente');
//   } catch (error) {
//     console.error('Error al generar el post:', error);
//   }
// };

// // Ejecutar inmediatamente al iniciar
// generatePost();

// // Configura un cron job para ejecutar generatePost cada 24 horas
// const CronJob = require('cron').CronJob;
// const job = new CronJob('0 0 * * *', generatePost); // Ejecuta todos los días a medianoche

// job.start();
