export interface AppState {
  name: string;
  currentIndex: number;
  answers: {
    fase1_aprendizaje: string;
    fase2_comportamiento: string;
    fase3_evaluacion: string;
  };
  isLocked: boolean;
}

const STORAGE_KEY = "ins_apollo13_state_v2";

const initialState: AppState = {
  name: "",
  currentIndex: 0, 
  answers: {
    fase1_aprendizaje: "",
    fase2_comportamiento: "",
    fase3_evaluacion: "",
  },
  isLocked: false,
};

export function loadState(): AppState {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error loading state", e);
  }
  return initialState;
}

export function saveState(state: AppState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Error saving state", e);
  }
}

export function clearState() {
  sessionStorage.removeItem(STORAGE_KEY);
}
