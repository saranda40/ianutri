
export interface DatosPaciente {
  nombre: string;
  edad: number;
  peso: number;
  altura: number;
  genero: string;
  enfermedades: string;
  tratamiento: string;
  imcTexto: string;
}

interface GroqResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
}

// Función para calcular el IMC
export function calcularIMC(peso: number, altura: number): string {
  if (peso > 0 && altura > 0) {
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    return imc.toFixed(2);
  }
  return "No calculado";
}

// Función para llamar a la IA y obtener el análisis
export async function obtenerAnalisisIA(datos: DatosPaciente): Promise<string> {
  const imcTexto = calcularIMC(datos.peso, datos.altura);

  const prompt = `Analiza los siguientes datos de un paciente y sugiere una alimentación saludable:
- Nombre: ${datos.nombre}
- Edad: ${datos.edad}
- Peso: ${datos.peso} kg
- Altura: ${datos.altura} cm
- Género: ${datos.genero}
- Enfermedades: ${datos.enfermedades}
- En tratamiento: ${datos.tratamiento}
- IMC calculado: ${datos.imcTexto}

Entrega una breve evaluación de salud general, calcula cuál debería ser su peso ideal, posibles riesgos, y una pauta alimentaria saludable.
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
            content:
              "Eres un nutricionista que analiza datos de pacientes y recomienda alimentación.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = (await response.json()) as GroqResponse;

    if (
      data.choices &&
      data.choices.length > 0 &&
      data.choices[0].message?.content
    ) {
      return data.choices[0].message.content;
    } else {
      return "La respuesta de la IA fue inesperada.";
    }
  } catch (error) {
    console.error("Error al consultar Groq:", error);
    return "Error al conectar con la IA.";
  }
}
