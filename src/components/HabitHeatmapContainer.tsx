import React from 'react';
import HabitHeatmap from './HabitHeatmap';
import HabitItem from './HabitItem';

type Habit = {
  id: string;
  habit: string;
  datesCompleted: Record<string, boolean>;
};

interface HabitHeatmapContainerProps {
  userId: string;
  habits: Habit[];
  loading: boolean
}

const HabitHeatmapContainer: React.FC<HabitHeatmapContainerProps> = ({ userId ,habits,loading}) => {
  
  if (loading) {
    return <div className="text-center py-8">Loading your habits...</div>;
  }

  if (habits.length === 0) {
    return <div className="text-center py-8">No habits found. Start by adding a new habit!</div>;
  }

  return (
    <div className="space-y-8">
      {habits.map(habit => (
        <div key={habit.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{habit.habit}</h3>
            <HabitItem habit={habit} userId={userId} />
          </div>
          <HabitHeatmap habit={habit} />
        </div>
      ))}
    </div>
  );
};

export default HabitHeatmapContainer;