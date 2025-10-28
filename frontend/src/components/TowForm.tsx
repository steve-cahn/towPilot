import { useState } from 'react'

export function TowForm({ onCreate }: { onCreate: (tow: any) => void }) {
  const [form, setForm] = useState({ vehicle: '', pickup: '', dropoff: '' })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!form.vehicle || !form.pickup || !form.dropoff) return
    onCreate(form)
    setForm({ vehicle: '', pickup: '', dropoff: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        {['vehicle', 'pickup', 'dropoff'].map((field) => (
          <input
            key={field}
            placeholder={field === 'vehicle' ? 'Vehicle (e.g., Toyota Camry)' :
              field === 'pickup' ? 'Pickup Location' : 'Dropoff Location'}
            value={(form as any)[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            className="border border-[var(--color-border)] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none bg-white/90"
            required
          />
        ))}
      </div>
      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary shadow">
          Save Tow
        </button>
      </div>
    </form>
  )
}
