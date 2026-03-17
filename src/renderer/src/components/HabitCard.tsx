import { JSX } from 'react'
import { getStreak, todayStr } from '../App'
import type { Habit } from '../App'

interface Props {
  habit: Habit
  onToggle: () => void
  onDelete: () => void
}

function getLast7Days(): string[] {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

// SVG icon map keyed by the icon id stored on the habit
const ICONS: Record<string, JSX.Element> = {
  run: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><path d="M8 21l2-6 2 2 4-7"/><path d="M6 13l2-2 2 1 2-3"/></svg>,
  book: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  drop: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>,
  meditation: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  palette: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  salad: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22a10 10 0 0120 0"/><path d="M12 12a5 5 0 000-10 5 5 0 000 10z"/></svg>,
  moon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  music: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  pen: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  leaf: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.82L2 22l2.39-1.2A14.32 14.32 0 0021 7a16 16 0 01-4 1z"/></svg>,
  dumbbell: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v16M18 4v16M6 8h12M6 16h12M3 7h3M3 17h3M18 7h3M18 17h3"/></svg>,
  broom: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3L2 12l9 3 3 9 6-21z"/></svg>,
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function HabitCard({ habit, onToggle, onDelete }: Props): JSX.Element {
  const today = todayStr()
  const doneToday = habit.completedDates.includes(today)
  const streak = getStreak(habit.completedDates)
  const last7 = getLast7Days()

  const startDow = new Date(last7[0]).getDay()

  const iconEl = ICONS[habit.emoji] ?? ICONS['run']

  return (
    <div className={`habit-card color-${habit.color} ${doneToday ? 'done' : ''}`}>
      <div className="card-top">
        <div className="habit-icon">{iconEl}</div>
        <div className="habit-info">
          <h2 className="habit-name">{habit.name}</h2>
          <span className="streak-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/></svg>
            {streak} day streak
          </span>
        </div>
        <button className="delete-btn" onClick={onDelete} aria-label="Delete habit">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="week-grid">
        {last7.map((date, i) => {
          const dow = (startDow + i) % 7
          const done = habit.completedDates.includes(date)
          const isToday = date === today
          return (
            <div key={date} className={`day-cell ${done ? 'filled' : ''} ${isToday ? 'today' : ''}`}>
              <span className="day-label">{DAY_LABELS[dow]}</span>
              <div className="day-dot">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          )
        })}
      </div>

      <button className={`complete-btn ${doneToday ? 'completed' : ''}`} onClick={onToggle}>
        {doneToday ? 'Done today' : 'Mark done'}
      </button>
    </div>
  )
}