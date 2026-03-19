import { RSVP, PaginatedResponse } from "./types";

interface Props {
  rsvps: PaginatedResponse<RSVP>;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  searchQuery: string;
}

export default function RSVPResults({ rsvps, onPageChange, onSearchChange, searchQuery }: Props) {
  // Server-side values
  const { data: currentItems, totalPages, currentPage, count: totalItems } = rsvps;
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-zinc-400">check_circle</span>
          <h2 className="text-2xl font-bold italic text-white">RSVP Responses</h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">search</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full bg-zinc-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-white/20 transition-all outline-none text-white selection:bg-white/10"
          />
        </div>
      </div>

      <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">Tamu</th>
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">Kehadiran</th>
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400 w-1/3">Pesan</th>
                <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400 text-right">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentItems.map((rsvp) => (
                <tr key={rsvp.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{rsvp.name}</td>
                  <td className="px-6 py-4">
                    {rsvp.attending ? (
                      <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Hadir</span>
                    ) : (
                      <span className="bg-zinc-500/10 text-zinc-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Absen</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-zinc-400 italic">
                    {rsvp.message ? `"${rsvp.message}"` : '-'}
                  </td>
                  <td className="px-6 py-4 text-right text-zinc-500 text-[10px] font-mono whitespace-nowrap">
                    {new Date(rsvp.created_at).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 italic">No responses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/5">
            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest leading-none">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
            </p>
            <div className="flex gap-2 text-white">
              <button 
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="size-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`size-8 rounded-lg text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-white text-black' : 'hover:bg-white/5 text-zinc-500 hover:text-white'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="size-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 transition-all"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
