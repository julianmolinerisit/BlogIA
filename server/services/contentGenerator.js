// // services/contentGenerator.js
// const axios = require('axios');

// const generatePostContent = async (title) => {
//   try {
//     const response = await axios.post('https://api.openai.com/v1/completions', {
//       model: 'text-davinci-003',  // O el modelo que prefieras
//       prompt: `Escribe una publicación para un blog con el título: ${title}`,
//       max_tokens: 500,
//     }, {
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     return response.data.choices[0].text.trim();
//   } catch (error) {
//     console.error('Error generando contenido:', error);
//     throw new Error('No se pudo generar el contenido del post');
//   }
// };

// module.exports = { generatePostContent };
