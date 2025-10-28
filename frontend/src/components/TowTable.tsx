const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'En Route': 'bg-blue-100 text-blue-800 border-blue-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
}

export function TowTable({
  tows,
  onStatusChange,
}: {
  tows: any[]
  onStatusChange: (id: number, status: string) => void
}) {
  const statuses = ['Pending', 'En Route', 'Delivered']

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs border-b border-[var(--color-border)]">
          <tr>
            <th className="p-3 font-semibold">Vehicle</th>
            <th className="p-3 font-semibold">Pickup</th>
            <th className="p-3 font-semibold">Dropoff</th>
            <th className="p-3 font-semibold text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {tows.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-6 text-gray-400">
                No tows yet — create one above.
              </td>
            </tr>
          )}
          {tows.map((tow) => (
            <tr key={tow.id} className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium">{tow.vehicle}</td>
              <td className="p-3">{tow.pickup}</td>
              <td className="p-3">{tow.dropoff}</td>
              <td className="p-3 text-center">
                <select
                  value={tow.status}
                  onChange={(e) => onStatusChange(tow.id, e.target.value)}
                  className={`rounded-md px-2 py-1 text-xs font-semibold border ${statusColors[tow.status] || 'bg-gray-100 text-gray-600 border-gray-200'} focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none`}
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
