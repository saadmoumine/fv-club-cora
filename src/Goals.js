import React, { useState } from 'react';
import './Goals.css';

function Goals() {
  const [goals, setGoals] = useState([
    { goal: 'Swim 100m without stopping', completed: false }
  ]);

  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = (e) => {
    e.preventDefault();
    setGoals([...goals, { goal: newGoal, completed: false }]);
    setNewGoal('');
  };

  const handleToggleComplete = (index) => {
    const updatedGoals = goals.map((goal, i) => (
      i === index ? { ...goal, completed: !goal.completed } : goal
    ));
    setGoals(updatedGoals);
  };

  return (
    <div className="goals-container">
      <h2>Goals</h2>
      <form onSubmit={handleAddGoal} className="goal-form">
        <div className="form-group">
          <label>New Goal</label>
          <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Enter a new goal" />
        </div>
        <button type="submit" className="add-goal-button">Add Goal</button>
      </form>
      <div className="goal-list">
        {goals.map((goal, index) => (
          <div key={index} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
            <span onClick={() => handleToggleComplete(index)}>{goal.goal}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goals;
