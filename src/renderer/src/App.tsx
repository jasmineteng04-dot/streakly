import { useState, useReducer, JSX } from 'react'
import { HabitForm } from './components/HabitForm'
import { HabitCard } from './components/HabitCard'
import { StatsBar } from './components/StatsBar'
import './App.css'

export type HabitColor = 'coral' | 'sky' | 'lime' | 'amber' | 'violet' | 'rose'

export interface Habit {
  id: string
  name: string
  emoji: string
  color: HabitColor
  createdAt: string
  completedDates: string[] // ISO date strings "YYYY-MM-DD"
}

type Action =
  | { type: 'ADD_HABIT'; habit: Habit }
  | { type: 'DELETE_HABIT'; id: string }
  | { type: 'TOGGLE_TODAY'; id: string; date: string }

function habitsReducer(state: Habit[], action: Action): Habit[] {
  switch (action.type) {
    case 'ADD_HABIT':
      return [action.habit, ...state]
    case 'DELETE_HABIT':
      return state.filter((h) => h.id !== action.id)
    case 'TOGGLE_TODAY':
      return state.map((h) => {
        if (h.id !== action.id) return h
        const already = h.completedDates.includes(action.date)
        return {
          ...h,
          completedDates: already
            ? h.completedDates.filter((d) => d !== action.date)
            : [...h.completedDates, action.date]
        }
      })
    default:
      return state
  }
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getStreak(dates: string[]): number {
  if (!dates.length) return 0
  const sorted = [...dates].sort().reverse()
  const today = todayStr()
  let streak = 0
  let cursor = today
  for (const d of sorted) {
    if (d === cursor) {
      streak++
      const prev = new Date(cursor)
      prev.setDate(prev.getDate() - 1)
      cursor = prev.toISOString().slice(0, 10)
    } else if (d < cursor) {
      break
    }
  }
  return streak
}

export default function App(): JSX.Element {
  const [habits, dispatch] = useReducer(habitsReducer, [
    {
      id: '1',
      name: 'Morning run',
      emoji: 'run',
      color: 'coral',
      createdAt: todayStr(),
      completedDates: [todayStr()]
    },
    {
      id: '2',
      name: 'Read 20 pages',
      emoji: 'book',
      color: 'sky',
      createdAt: todayStr(),
      completedDates: []
    },
    {
      id: '3',
      name: 'Drink water',
      emoji: 'drop',
      color: 'lime',
      createdAt: todayStr(),
      completedDates: [todayStr()]
    }
  ])
  const [showForm, setShowForm] = useState(false)

  const today = todayStr()
  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length

  const addHabit = (name: string, emoji: string, color: HabitColor): void => {
    dispatch({
      type: 'ADD_HABIT',
      habit: {
        id: crypto.randomUUID(),
        name,
        emoji,
        color,
        createdAt: today,
        completedDates: []
      }
    })
    setShowForm(false)
  }

  const toggleToday = (id: string): void => {
    dispatch({ type: 'TOGGLE_TODAY', id, date: today })
  }

  const deleteHabit = (id: string): void => {
    dispatch({ type: 'DELETE_HABIT', id })
  }

  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1 className="app-title">Streakly</h1>
            <p className="app-subtitle">Build better habits, one day at a time</p>
            <p className="app-date">
              {dateLabel} <span className="version-badge">v1.1.0</span>
            </p>
          </div>
          <button className="add-btn" onClick={() => setShowForm(true)} aria-label="Add habit">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New Habit
          </button>
        </div>
        <StatsBar habits={habits} completedToday={completedToday} />
      </header>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <HabitForm onAdd={addHabit} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <main className="habits-grid">
        {habits.length === 0 && (
          <div className="empty-state">
            <svg className="empty-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="currentColor" opacity="0.08" />
              <path d="M12 20h16M12 13h16M12 27h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p>No habits yet — add your first one!</p>
          </div>
        )}
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={() => toggleToday(habit.id)}
            onDelete={() => deleteHabit(habit.id)}
          />
        ))}
      </main>
    </div>
  )
}