import type { APIRoute } from 'astro';

import { obtenerAnalisisIA } from './ia';
import { calcularIMC } from './ia';
import { EnviarEmail } from './enviaremail';
import type { DatosPaciente } from './ia';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const datosPaciente: DatosPaciente = {
      nombre: data.nombre,
      edad: data.edad,
      peso: data.Peso,
      altura: data.altura,
      genero: data.genero,
      enfermedades: data.enfermedades ? data.enfermedades: 'Ninguna declarada',
      tratamiento: data.tratamiento ? 'sí' : 'no',
      imcTexto: calcularIMC(data.peso, data.altura)
    };

    const resultadoIA = await obtenerAnalisisIA(datosPaciente);
    const Correo = await EnviarEmail(data.email, 'Resultado de Análisis IA', resultadoIA);

    // Armar query string para redirigir a resultados.astro
    const queryString = new URLSearchParams({
      nombre: data.nombre,
      edad: data.edad,
      peso: data.peso,
      altura: data.altura,
      genero: data.genero,
      enfermedades: data.enfermedades,
      tratamiento: data.tratamiento ? 'sí' : 'no',
      email: data.email,
      analisis: resultadoIA,
      imc: calcularIMC(data.peso, data.altura),
      correo: Correo,
    }).toString();

    return new Response(JSON.stringify({ redirectTo: `/resultados?${queryString}` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return new Response(JSON.stringify({ message: 'Error inesperado del servidor.' + error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};