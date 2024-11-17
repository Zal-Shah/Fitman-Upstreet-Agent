import React, { useState } from 'react';
import { Agent, Prompt, Action, Task, TTS } from 'react-agents';
import { z } from 'zod';

const FitmanAssistant = () => {
  const [userProfile, setUserProfile] = useState({
    fitnessGoals: [],
    fitnessLevel: '',
    workoutHistory: [],
    injuries: [],
  });

  const generateWorkoutPlan = async (goals, level, injuries) => {
    const planDuration = {
      beginner: '4-week',
      intermediate: '8-week',
      expert: '12-week',
    }[level] || '4-week';

    const allExercises = [
      {
        name: 'Bench Press',
        muscles: ['chest', 'arms'],
        sets: 4,
        reps: '8-10',
        weight: 'progressive',
      },
      {
        name: 'Squats',
        muscles: ['legs'],
        sets: 4,
        reps: '8-10',
        weight: 'progressive',
      },
      {
        name: 'Deadlifts',
        muscles: ['back', 'legs'],
        sets: 3,
        reps: '8-10',
        weight: 'progressive',
      },
      {
        name: 'Push-Ups',
        muscles: ['chest', 'arms'],
        sets: 3,
        reps: '12-15',
      },
      {
        name: 'Pull-Ups',
        muscles: ['back', 'arms'],
        sets: 3,
        reps: '10-12',
      },
    ];

    // Exclude exercises targeting injured body parts
    const filteredExercises = allExercises.filter(
      (exercise) =>
        !injuries.some((injury) =>
          exercise.muscles.some((muscle) => muscle.toLowerCase().includes(injury.toLowerCase()))
        )
    );

    return {
      duration: planDuration,
      weeklySchedule: [
        {
          day: 'Monday',
          exercises: filteredExercises.slice(0, 3),
        },
        {
          day: 'Wednesday',
          exercises: filteredExercises.slice(3, 6),
        },
        {
          day: 'Friday',
          exercises: filteredExercises.slice(6, 9),
        },
      ],
      nutrition: {
        dailyCalories: goals.includes('bulk')
          ? 'Surplus of 300-500 calories'
          : 'Deficit of 300-500 calories',
        macroSplit: goals.includes('bulk')
          ? { protein: '2g/lb', carbs: '2.5g/lb', fats: '0.5g/lb' }
          : { protein: '1.8g/lb', carbs: '1.5g/lb', fats: '0.4g/lb' },
      },
      intensity: level,
      focusAreas: goals,
    };
  };

  return (
    <>
      <TTS voiceEndpoint="elevenlabs:terrorblade:lblRnHLq4YZ8wRRUe8ld" />

      <Action
        name="createFitnessProfile"
        description="Create or update user fitness profile with goals, current fitness level, and injuries"
        schema={z.object({
          goals: z.array(z.string()),
          fitnessLevel: z.enum(['beginner', 'intermediate', 'expert']),
          injuries: z.array(z.string()).optional(),
        })}
        examples={[
          {
            goals: ['build muscle', 'improve endurance'],
            fitnessLevel: 'intermediate',
            injuries: ['leg', 'shoulder'],
          },
        ]}
        handler={async (e) => {
          const { goals, fitnessLevel, injuries } = e.data.message.args;
          setUserProfile((prev) => ({
            ...prev,
            fitnessGoals: goals,
            fitnessLevel: fitnessLevel,
            injuries: injuries || [],
          }));
          const response = `Profile updated with goals: ${goals.join(', ')}, level: ${fitnessLevel}, and injuries: ${
            injuries?.join(', ') || 'none'
          }. Ready to generate your personalized workout plan?`;
          await e.data.agent.monologue(response);
          await e.commit();
        }}
      />

      <Action
        name="generateWorkoutPlan"
        description="Generate a personalized workout plan based on user's profile and injuries"
        schema={z.object({
          timeframe: z.enum(['daily', 'weekly', 'monthly']),
        })}
        examples={[
          {
            timeframe: 'weekly',
          },
        ]}
        handler={async (e) => {
          const { timeframe } = e.data.message.args;

          const workoutPlan = await generateWorkoutPlan(
            userProfile.fitnessGoals,
            userProfile.fitnessLevel,
            userProfile.injuries
          );

          const response = `Here's your ${timeframe} workout plan for ${workoutPlan.duration}:\n\n` +
            workoutPlan.weeklySchedule.map((day) =>
              `${day.day}:\n${day.exercises
                .map((ex) => `- ${ex.name}: ${ex.sets || ''} sets of ${ex.reps || ''}`)
                .join('\n')}`
            ).join('\n\n') +
            `\n\nNutrition Guidelines:\n` +
            `Daily Calories: ${workoutPlan.nutrition.dailyCalories}\n` +
            `Macro Split:\n` +
            `- Protein: ${workoutPlan.nutrition.macroSplit.protein}\n` +
            `- Carbs: ${workoutPlan.nutrition.macroSplit.carbs}\n` +
            `- Fats: ${workoutPlan.nutrition.macroSplit.fats}`;

          await e.data.agent.monologue(response);
          await e.commit();
        }}
      />

      <Action
        name="trackWorkoutProgress"
        description="Log completed workout and track progress"
        schema={z.object({
          exercisesDone: z.array(
            z.object({
              name: z.string(),
              sets: z.number(),
              reps: z.number(),
              weight: z.number().optional(),
            })
          ),
          date: z.string(),
        })}
        examples={[
          {
            exercisesDone: [{ name: 'Bench Press', sets: 3, reps: 12, weight: 135 }],
            date: '2024-11-16',
          },
        ]}
        handler={async (e) => {
          const workoutData = e.data.message.args;
          setUserProfile((prev) => ({
            ...prev,
            workoutHistory: [...prev.workoutHistory, workoutData],
          }));
          await e.data.agent.monologue('Progress tracked successfully! Keep up the great work!');
          await e.commit();
        }}
      />

      <Task
        schedule="every day at 20:00"
        handler={async (e) => {
          const lastWorkout = userProfile.workoutHistory[userProfile.workoutHistory.length - 1];
          if (lastWorkout?.date === new Date().toISOString().split('T')[0]) {
            await e.data.agent.monologue("Great job completing your workout today! Rest well and prepare for tomorrow's session.");
          } else {
            await e.data.agent.monologue("Don't forget to log your workout for today!");
          }
          await e.commit();
        }}
      />

      <Prompt>
        Fitman is your relentless fitness coach. Provide your fitness goals, level, and injuries. Fitman will ensure a safe and effective workout plan tailored to your needs and progress!
      </Prompt>
    </>
  );
};

export default function FitmanAgent() {
  return (
    <Agent>
      <FitmanAssistant />
    </Agent>
  );
}
