import React, { useState } from 'react';
import './WellnessTools.css';

const WellnessTools = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [moodEntry, setMoodEntry] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingActive, setBreathingActive] = useState(false);

  const moodOptions = [
    { emoji: '😊', label: 'Happy', color: '#48bb78' },
    { emoji: '😐', label: 'Neutral', color: '#ed8936' },
    { emoji: '😔', label: 'Sad', color: '#4299e1' },
    { emoji: '😰', label: 'Anxious', color: '#e53e3e' },
    { emoji: '😴', label: 'Tired', color: '#805ad5' }
  ];

  const breathingExercises = [
    {
      name: "4-7-8 Breathing",
      description: "Inhale for 4, hold for 7, exhale for 8",
      pattern: { inhale: 4, hold: 7, exhale: 8 }
    },
    {
      name: "Box Breathing",
      description: "Equal 4-count breathing pattern",
      pattern: { inhale: 4, hold: 4, exhale: 4, holdAfter: 4 }
    },
    {
      name: "Deep Breathing",
      description: "Slow, deep breaths for relaxation",
      pattern: { inhale: 6, exhale: 6 }
    }
  ];

  const handleMoodCheck = (mood) => {
    setMoodEntry(mood.label);
    // Here you could save the mood to localStorage or send to backend
    setTimeout(() => setMoodEntry(''), 2000);
  };

  const handleJournalSave = () => {
    if (journalEntry.trim()) {
      // Here you could save the journal entry
      setJournalEntry('');
      setActiveTool(null);
    }
  };

  const startBreathing = (exercise) => {
    setBreathingActive(true);
    setActiveTool('breathing');
    
    let phase = 'inhale';
    let count = 0;
    
    const breathingCycle = () => {
      if (!breathingActive) return;
      
      setBreathingPhase(phase);
      
      setTimeout(() => {
        if (phase === 'inhale') {
          phase = 'hold';
          count = exercise.pattern.hold;
        } else if (phase === 'hold') {
          phase = 'exhale';
          count = exercise.pattern.exhale;
        } else if (phase === 'exhale') {
          if (exercise.pattern.holdAfter) {
            phase = 'holdAfter';
            count = exercise.pattern.holdAfter;
          } else {
            phase = 'inhale';
            count = exercise.pattern.inhale;
          }
        } else {
          phase = 'inhale';
          count = exercise.pattern.inhale;
        }
        
        if (breathingActive) {
          breathingCycle();
        }
      }, count * 1000);
    };
    
    breathingCycle();
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    setBreathingPhase('inhale');
  };

  return (
    <div className="wellness-tools">
      <h3>Wellness Tools</h3>
      
      {activeTool === null && (
        <div className="tools-grid">
          <button 
            className="tool-card"
            onClick={() => setActiveTool('mood')}
          >
            <span className="tool-icon">😊</span>
            <h4>Mood Check-in</h4>
            <p>Track how you're feeling</p>
          </button>
          
          <button 
            className="tool-card"
            onClick={() => setActiveTool('journal')}
          >
            <span className="tool-icon">📝</span>
            <h4>Journal</h4>
            <p>Write your thoughts</p>
          </button>
          
          <button 
            className="tool-card"
            onClick={() => setActiveTool('breathing')}
          >
            <span className="tool-icon">🫁</span>
            <h4>Breathing</h4>
            <p>Guided breathing exercises</p>
          </button>
        </div>
      )}

      {activeTool === 'mood' && (
        <div className="tool-content">
          <div className="tool-header">
            <h4>How are you feeling today?</h4>
            <button 
              className="back-btn"
              onClick={() => setActiveTool(null)}
            >
              ← Back
            </button>
          </div>
          
          <div className="mood-options">
            {moodOptions.map((mood, index) => (
              <button
                key={index}
                className="mood-option"
                onClick={() => handleMoodCheck(mood)}
                style={{ borderColor: mood.color }}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-label">{mood.label}</span>
              </button>
            ))}
          </div>
          
          {moodEntry && (
            <div className="mood-feedback">
              <p>Thank you for sharing! You marked yourself as: <strong>{moodEntry}</strong></p>
            </div>
          )}
        </div>
      )}

      {activeTool === 'journal' && (
        <div className="tool-content">
          <div className="tool-header">
            <h4>Journal Your Thoughts</h4>
            <button 
              className="back-btn"
              onClick={() => setActiveTool(null)}
            >
              ← Back
            </button>
          </div>
          
          <textarea
            className="journal-textarea"
            placeholder="Write whatever comes to mind..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            rows="6"
          />
          
          <div className="journal-actions">
            <button 
              className="save-btn"
              onClick={handleJournalSave}
              disabled={!journalEntry.trim()}
            >
              Save Entry
            </button>
          </div>
        </div>
      )}

      {activeTool === 'breathing' && (
        <div className="tool-content">
          <div className="tool-header">
            <h4>Breathing Exercises</h4>
            <button 
              className="back-btn"
              onClick={() => {
                setActiveTool(null);
                stopBreathing();
              }}
            >
              ← Back
            </button>
          </div>
          
          {!breathingActive ? (
            <div className="breathing-exercises">
              {breathingExercises.map((exercise, index) => (
                <button
                  key={index}
                  className="breathing-exercise"
                  onClick={() => startBreathing(exercise)}
                >
                  <h5>{exercise.name}</h5>
                  <p>{exercise.description}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="breathing-active">
              <div className={`breathing-circle ${breathingPhase}`}>
                <span className="breathing-text">
                  {breathingPhase === 'inhale' && 'Breathe In'}
                  {breathingPhase === 'hold' && 'Hold'}
                  {breathingPhase === 'exhale' && 'Breathe Out'}
                  {breathingPhase === 'holdAfter' && 'Hold'}
                </span>
              </div>
              
              <button 
                className="stop-breathing-btn"
                onClick={stopBreathing}
              >
                Stop Exercise
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WellnessTools;
