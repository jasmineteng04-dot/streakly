import { format } from 'date-fns'
import type { Habit } from '../App'
import { getStreak } from '../App'
import { JSX } from 'react'

interface Props {
  habits: Habit[]
  completedToday: number
}

export function StatsBar({ habits, completedToday }: Props): JSX.Element {
  const total = habits.length
  const pct = total === 0 ? 0 : Math.round((completedToday / total) * 100)
  const bestStreak = habits.reduce((max, h) => Math.max(max, getStreak(h.completedDates)), 0)
  const weekLabel = format(new Date(), "'Week' w, yyyy")

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-value">{completedToday}/{total}</span>
        <span className="stat-label">Today</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value">{pct}%</span>
        <span className="stat-label">Complete</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value">{bestStreak}</span>
        <span className="stat-label">Best streak</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value week-val">{weekLabel}</span>
        <span className="stat-label">This week</span>
      </div>

      {total > 0 && (
        <div className="progress-strip">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  )
}