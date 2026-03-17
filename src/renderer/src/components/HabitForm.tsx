import { JSX, useState } from 'react'
import type { HabitColor } from '../App'

interface Props {
  onAdd: (name: string, iconKey: string, color: HabitColor) => void
  onCancel: () => void
}

const ICONS: { key: string; label: string; svg: JSX.Element }[] = [
  { key: 'run',        label: 'Run',      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><path d="M8 21l2-6 2 2 4-7"/><path d="M6 13l2-2 2 1 2-3"/></svg> },
  { key: 'book',       label: 'Read',     svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> },
  { key: 'drop',       label: 'Water',    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg> },
  { key: 'meditation', label: 'Mindful',  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
  { key: 'palette',    label: 'Create',   svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> },
  { key: 'salad',      label: 'Eat well', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22a10 10 0 0120 0"/><path d="M12 12a5 5 0 000-10 5 5 0 000 10z"/></svg> },
  { key: 'moon',       label: 'Sleep',    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg> },
  { key: 'music',      label: 'Practice', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
  { key: 'pen',        label: 'Journal',  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { key: 'leaf',       label: 'Nature',   svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.82L2 22l2.39-1.2A14.32 14.32 0 0021 7a16 16 0 01-4 1z"/></svg> },
  { key: 'dumbbell',   label: 'Workout',  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v16M18 4v16M6 8h12M6 16h12M3 7h3M3 17h3M18 7h3M18 17h3"/></svg> },
  { key: 'broom',      label: 'Clean',    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3L2 12l9 3 3 9 6-21z"/></svg> },
]

const COLORS: HabitColor[] = ['coral', 'sky', 'lime', 'amber', 'violet', 'rose']
const COLOR_LABELS: Record<HabitColor, string> = {
  coral: 'Coral', sky: 'Sky', lime: 'Lime', amber: 'Amber', violet: 'Violet', rose: 'Rose'
}

export function HabitForm({ onAdd, onCancel }: Props): JSX.Element {
  const [name, setName] = useState('')
  const [iconKey, setIconKey] = useState('run')
  const [color, setColor] = useState<HabitColor>('coral')

  const handleSubmit = (): void => {
    if (!name.trim()) return
    onAdd(name.trim(), iconKey, color)
  }

  return (
    <div className="habit-form">
      <h2 className="form-title">New habit</h2>

      <div>
        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Morning stretch"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
          maxLength={40}
        />
      </div>

      <div>
        <label className="form-label">Icon</label>
        <div className="icon-grid">
          {ICONS.map(({ key, label, svg }) => (
            <button
              key={key}
              className={`icon-btn ${iconKey === key ? 'selected' : ''}`}
              onClick={() => setIconKey(key)}
              title={label}
              aria-label={label}
            >
              {svg}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="form-label">Color</label>
        <div className="color-row">
          {COLORS.map((c) => (
            <button
              key={c}
              className={`color-swatch swatch-${c} ${color === c ? 'selected' : ''}`}
              onClick={() => setColor(c)}
              aria-label={COLOR_LABELS[c]}
              title={COLOR_LABELS[c]}
            />
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button className="submit-btn" onClick={handleSubmit} disabled={!name.trim()}>
          Add habit
        </button>
      </div>
    </div>
  )
}