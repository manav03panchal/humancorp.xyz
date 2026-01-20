import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import styles from './AmbientAudio.module.css';

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const disposables = useRef<Tone.ToneAudioNode[]>([]);
  const intervals = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Peaceful pentatonic - no tension
  const notes = ['C3', 'E3', 'G3', 'A3', 'C4', 'E4', 'G4', 'A4', 'C5'];

  const initAudio = async () => {
    if (isInitialized) return;
    await Tone.start();
    setIsInitialized(true);
  };

  const startAmbient = () => {
    // Lush reverb
    const reverb = new Tone.Reverb({
      decay: 12,
      wet: 0.75,
      preDelay: 0.3
    }).toDestination();
    disposables.current.push(reverb);

    // Gentle delay for space
    const delay = new Tone.FeedbackDelay({
      delayTime: 1.2,
      feedback: 0.3,
      wet: 0.25
    }).connect(reverb);
    disposables.current.push(delay);

    // Soft filter
    const filter = new Tone.Filter({
      frequency: 2000,
      type: 'lowpass',
      rolloff: -12
    }).connect(delay);
    disposables.current.push(filter);

    // Piano-like synth (soft FM piano)
    const piano = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 3,
      modulationIndex: 1,
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.01,
        decay: 3,
        sustain: 0.1,
        release: 4
      },
      modulation: { type: 'triangle' },
      modulationEnvelope: {
        attack: 0.01,
        decay: 0.5,
        sustain: 0.2,
        release: 2
      },
      volume: -28
    }).connect(filter);
    disposables.current.push(piano);

    // Soft pad underneath
    const pad = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 4,
        decay: 2,
        sustain: 0.5,
        release: 8
      },
      volume: -38
    }).connect(reverb);
    disposables.current.push(pad);

    let playing = true;

    // Piano plays sparse, gentle notes
    const playPiano = () => {
      if (!playing) return;

      // Pick 1-2 notes
      const numNotes = Math.random() > 0.6 ? 2 : 1;
      const selectedNotes: string[] = [];

      for (let i = 0; i < numNotes; i++) {
        const note = notes[Math.floor(Math.random() * notes.length)];
        if (!selectedNotes.includes(note)) {
          selectedNotes.push(note);
        }
      }

      piano.triggerAttackRelease(selectedNotes, 2);

      // Next note in 3-8 seconds
      const nextDelay = (3 + Math.random() * 5) * 1000;
      const timeout = setTimeout(playPiano, nextDelay);
      intervals.current.push(timeout);
    };

    // Pad plays long drones
    const playPad = () => {
      if (!playing) return;

      // Root notes for pad
      const padNotes = ['C2', 'G2', 'C3'];
      const note = padNotes[Math.floor(Math.random() * padNotes.length)];

      pad.triggerAttackRelease(note, 15);

      // Next pad in 12-20 seconds
      const nextDelay = (12 + Math.random() * 8) * 1000;
      const timeout = setTimeout(playPad, nextDelay);
      intervals.current.push(timeout);
    };

    // Start with slight delays
    const pianoStart = setTimeout(playPiano, 1000);
    const padStart = setTimeout(playPad, 500);
    intervals.current.push(pianoStart, padStart);

    // Store cleanup flag
    disposables.current.push({ dispose: () => { playing = false; } } as Tone.ToneAudioNode);
  };

  const stopAmbient = () => {
    intervals.current.forEach(clearTimeout);
    intervals.current = [];
    disposables.current.forEach(node => node.dispose());
    disposables.current = [];
  };

  const togglePlay = async () => {
    if (!isInitialized) {
      await initAudio();
    }

    if (isPlaying) {
      stopAmbient();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying && isInitialized) {
      startAmbient();
    }
  }, [isPlaying, isInitialized]);

  useEffect(() => {
    return () => {
      stopAmbient();
    };
  }, []);

  return (
    <button
      className={styles.audioBtn}
      onClick={togglePlay}
      title={isPlaying ? 'Mute' : 'Play ambient'}
    >
      {isPlaying ? 'Sound On' : 'Sound Off'}
    </button>
  );
}
