import type { APIRoute } from 'astro';


export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Armar query string para redirigir a resultados.astro
    const queryString = new URLSearchParams({
      nombre: data.nombre,
      edad: data.edad,
      peso: data.peso,
      altura: data.altura,
      genero: data.genero,
      enfermedades: data.enfermedades,
      tratamiento: data.tratamiento ? 'sí' : 'no',
      email: data.email
    }).toString();

    return new Response(JSON.stringify({ redirectTo: `/resultados?${queryString}` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return new Response(JSON.stringify({ message: 'Error inesperado del servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function generarAnalisis(prompt: string): Promise<string> {
  console.log('Prompt recibido:', prompt);
  let analisis = 'No se pudo generar el análisis.';

  try {
  

  } catch (error) {
    console.error("Error al llamar a OpenAI:", error);
  }

  return analisis;
}
