
export interface Symptom {
  name: string;
  description: string;
  severity: 'leve' | 'media' | 'alta';
  phases: PhaseName[];
}

export type PhaseName = 'prodromica' | 'temprana' | 'intermedia' | 'avanzada' | 'desconocida';

export interface Recommendation {
  dieta: string;
  ejercicio: string;
  sueno: string;
  terapias_complementarias: string;
}

export interface KnowledgeBase {
  symptoms: Symptom[];
  recommendations: Record<PhaseName, Recommendation>;
}

export interface AnalysisResult {
  detectedSymptoms: { name: string; severity: 'leve' | 'media' | 'alta' }[];
  estimatedPhase: PhaseName;
  recommendations: Recommendation;
  medicalAlert: boolean;
  alertReason: string;
  followUpQuestions: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'loading';
  content?: string;
  analysis?: AnalysisResult;
}

export interface DiaryEntry {
    date: string;
    symptoms: string[];
    symptomCount: number;
}
