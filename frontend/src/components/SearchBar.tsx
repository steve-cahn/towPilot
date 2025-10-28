import { X, Search } from 'lucide-react'

export function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search by vehicle..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[var(--color-border)] rounded-lg pl-9 pr-9 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none bg-white/80 dark:bg-black/40"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
