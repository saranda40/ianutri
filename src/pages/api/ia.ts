// src/pages/api/analisis.ts
import { type APIContext } from "astro";
import "dotenv/config";

export async function GET({ request }: APIContext) {
  const url = new URL(request.url);
  const params = url.searchParams;
  console.log("Parámetros recibidos:", params.toString());
  const nombre = params.get("nombre") || "No proporcionado";
  const edad = params.get("edad") || "No especificada";
  const peso = parseFloat(params.get("peso") || "0");
  const altura = parseFloat(params.get("altura") || "0");
  const genero = params.get("genero") || "No especificado";
  const enfermedades = params.get("enfermedades") || "Ninguna declarada";
  const tratamiento = params.get("tratamiento") || "No";
  const email = params.get("email") || "No proporcionado";

  let imcTexto = "No calculado";
  if (peso > 0 && altura > 0) {
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    imcTexto = imc.toFixed(2);
  }

  const prompt = `Analiza los siguientes datos de un paciente y sugiere una alimentación saludable:
- Nombre: ${nombre}
- Edad: ${edad}
- Peso: ${peso} kg
- Altura: ${altura} cm
- Género: ${genero}
- Enfermedades: ${enfermedades}
- En tratamiento: ${tratamiento}
- IMC calculado: ${imcTexto}

Entrega una breve evaluación de salud general, indícale según su estatura y edad su pes ideal, posibles riesgos, y una pauta alimentaria saludable.
Recuérdale consultar con su médico regularmente.
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "Eres un nutricionista que analiza datos de pacientes y recomienda alimentación.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const analysis = data?.choices?.[0]?.message?.content || "Respuesta inesperada de la IA.";

    return new Response(
      JSON.stringify({
        nombre,
        edad,
        peso,
        altura,
        genero,
        enfermedades,
        tratamiento,
        email,
        imc: imcTexto,
        ia: analysis,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Ocurrió un error al conectar con la IA.",
      }),
      { status: 500 }
    );
  }
}
