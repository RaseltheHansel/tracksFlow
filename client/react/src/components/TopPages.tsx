interface TopPagesProps {
  pages: { url: string; views: number }[];
}

export default function TopPages({ pages }: TopPagesProps) {
  const max = Math.max(...pages.map(p => p.views), 1);

  return (
    <div className='bg-track-card border border-track-border rounded-2xl p-5'>
      <h3 className='font-semibold text-track-text mb-4'>Top Pages</h3>

      {pages.length === 0 ? (
        <div className='flex items-center justify-center h-32'>
          <p className='text-track-muted text-sm'>No data yet</p>
        </div>
      ) : (
        <div className='space-y-3'>
          {pages.map((page, i) => (
            <div key={i}>
              <div className='flex items-center justify-between mb-1'>
                <p className='text-track-soft text-sm truncate flex-1 mr-4'>
                  {page.url}
                </p>
                <span className='text-track-muted text-xs shrink-0'>
                  {page.views.toLocaleString()}
                </span>
              </div>
              <div className='h-1.5 bg-track-surface rounded-full overflow-hidden'>
                <div
                  className='h-full bg-track-accent rounded-full'
                  style={{ width: `${(page.views / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
