import { useEffect, useState } from 'react'
import { client } from '../api/client'
import { TowForm } from '../components/TowForm'
import { TowTable } from '../components/TowTable'
import { SearchBar } from '../components/SearchBar'

export default function Dashboard() {
  const [tows, setTows] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

  const loadTows = async () => {
    const res = await client.get('/tows')
    setTows(res.data)
    setFiltered(res.data)
  }

  useEffect(() => { loadTows() }, [])

  useEffect(() => {
    const lower = search.toLowerCase()
    const results = tows.filter((t) =>
      t.vehicle?.toLowerCase().includes(lower)
    )
    setFiltered(results)
  }, [search, tows])

  const handleCreate = async (tow: any) => {
    await client.post('/tows', tow)
    await loadTows()
    setShowForm(false)
  }

  const handleStatusChange = async (id: number, status: string) => {
    await client.put(`/tows/${id}`, { status })
    await loadTows()
  }

  return (
    <>
      <header className="backdrop-blur-xl bg-white/60 dark:bg-black/30 border-b border-[var(--color-border)] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
            TowPilot
            <span className="text-sm text-[var(--color-muted)]">Operations Dashboard</span>
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              {showForm ? 'Close' : '+ New Tow'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto p-6 space-y-8 w-full animate-fadeIn">
        {showForm && (
          <div className="animate-fadeIn card p-6">
            <TowForm onCreate={handleCreate} />
          </div>
        )}

        <section className="card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <h2 className="text-lg font-semibold">Active Tows</h2>
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <TowTable tows={filtered} onStatusChange={handleStatusChange} />
        </section>
      </main>

      <footer className="text-center text-xs text-[var(--color-muted)] py-4 border-t border-[var(--color-border)]">
        © {new Date().getFullYear()} TowPilot — Built with ⚡ React & Tailwind
      </footer>
    </>
  )
}
