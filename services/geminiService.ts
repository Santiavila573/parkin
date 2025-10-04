import OpenAI from 'openai';
import { KnowledgeBase, AnalysisResult, PhaseName } from '../types';

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

export const analyzeSymptoms = async (userInput: string, kb: KnowledgeBase): Promise<AnalysisResult> => {
    const prompt = `
      Actúa como un asistente experto en la enfermedad de Parkinson. Tu única fuente de conocimiento es el JSON proporcionado al final de este prompt. No uses conocimiento externo.
      Tu tarea es analizar la descripción de los síntomas del usuario, compararla con la base de conocimiento, y devolver un análisis estructurado.

      USER INPUT: "${userInput}"

      INSTRUCCIONES:
      1.  **Detectar Síntomas**: Lee el input del usuario e identifica qué síntomas de la lista 'symptoms' en el JSON coinciden. Se flexible con el lenguaje del usuario. Lista los síntomas que encuentres con su nombre y severidad exactos del JSON. Si no encuentras ninguno, deja la lista vacía.
      2.  **Estimar Fase**: Basado en los síntomas detectados y sus fases asociadas en el JSON, determina la fase más probable ('prodromica', 'temprana', 'intermedia', 'avanzada'). Si hay síntomas de múltiples fases, elige la más avanzada. Si no se detectan síntomas, la fase es 'desconocida'.
      3.  **Alerta Médica**: Si alguno de los síntomas detectados tiene una severidad 'alta' en el JSON, establece 'medicalAlert' en true y en 'alertReason' explica brevemente por qué (ej. "Detectada posible disfagia, un síntoma grave."). Si no, 'medicalAlert' es false y 'alertReason' es una cadena vacía.
      4.  **Generar Preguntas de Seguimiento**: Basado en los síntomas mencionados por el usuario, crea 3 preguntas de seguimiento relevantes y concisas para ayudar a obtener más información. Por ejemplo, si el usuario menciona un temblor, podrías preguntar sobre rigidez o cambios en la escritura.

      Devuelve tu análisis estrictamente en JSON. No incluyas ninguna explicación adicional fuera del JSON.

      BASE DE CONOCIMIENTO (JSON):
      ${JSON.stringify(kb)}
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const resultText = response.choices[0].message.content?.trim() || '{}';
        const parsedResult = JSON.parse(resultText) as Omit<AnalysisResult, 'recommendations'> & { estimatedPhase: PhaseName };

        // Get a list of phases that have defined recommendations from the knowledge base.
        const availablePhases = Object.keys(kb.recommendations);

        // Determine the final phase. If the phase returned by the AI is not in our knowledge base,
        // default to 'desconocida' to prevent errors.
        const finalPhase: PhaseName = availablePhases.includes(parsedResult.estimatedPhase)
            ? parsedResult.estimatedPhase
            : 'desconocida';

        // Safely get the recommendations. Since 'desconocida' is now in the KB, this will always return a valid object.
        const recommendations = kb.recommendations[finalPhase];

        return {
            ...parsedResult,
            estimatedPhase: finalPhase,
            recommendations: recommendations,
        };

    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return {
            detectedSymptoms: [],
            estimatedPhase: 'desconocida',
            recommendations: kb.recommendations['desconocida'], // This is now safe.
            medicalAlert: true,
            alertReason: "Hubo un error al procesar la solicitud. Por favor, intente de nuevo o consulte a un médico.",
            followUpQuestions: [],
        };
    }
};