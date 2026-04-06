// Utility to simulate radio transmissions using Web Speech API
export const playRadioVoice = (text: string) => {
  if (!('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a Spanish voice, preferably male/deep for "Houston"
  const voices = window.speechSynthesis.getVoices();
  const esVoices = voices.filter(v => v.lang.startsWith('es'));
  
  if (esVoices.length > 0) {
    // Try to pick a specific one if available, otherwise the first Spanish one
    utterance.voice = esVoices.find(v => v.name.includes('Google') || v.name.includes('Male')) || esVoices[0];
  }

  // Adjust to sound more like a radio transmission (slightly faster, lower pitch)
  utterance.rate = 1.1;
  utterance.pitch = 0.8;
  utterance.volume = 0.9;

  // Play a short "beep" before speaking
  playBeep(800, 100, 'sine');
  
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 150);

  utterance.onend = () => {
    // Play end beep
    playBeep(600, 150, 'square');
  };
};

const playBeep = (frequency: number, duration: number, type: OscillatorType) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (e) {
    console.log("Audio context not allowed yet");
  }
};
