import React, { useState } from 'react';
import './Program.css';

function Program() {
  const [program, setProgram] = useState({
    fitness: 'Running 5km every day',
    nutrition: 'High protein, low carb diet'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission and updating the program
  };

  return (
    <div className="laura-program-container">
      <h2>Personalized Program</h2>
      <form onSubmit={handleSubmit} className="program-form">
        <div className="form-group">
          <label>Fitness Program</label>
          <textarea value={program.fitness} onChange={(e) => setProgram({ ...program, fitness: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Nutrition Program</label>
          <textarea value={program.nutrition} onChange={(e) => setProgram({ ...program, nutrition: e.target.value })} />
        </div>
        <button type="submit" className="submit-button">Update Program</button>
      </form>
    </div>
  );
}

export default Program;
