import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

interface DeviceChartProps {
  devices: { device: string; count: number }[];
  browsers: { browser: string; count: number }[];
}

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const prettyLabel = (value: string) =>
  value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function DeviceChart({ devices, browsers }: DeviceChartProps) {
  const deviceData = devices.map((d) => ({
    name: prettyLabel(d.device),
    value: d.count,
  }));

  const total = deviceData.reduce((sum, d) => sum + d.value, 0) || 1;
  const maxBrowser = Math.max(...browsers.map((b) => b.count), 1);

  return (
    <div className='bg-track-card/80 backdrop-blur border border-track-border rounded-2xl p-5
      shadow-[0_8px_30px_rgba(0,0,0,0.25)]'>
      <h3 className='font-semibold text-track-text mb-4'>Devices & Browsers</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <p className='text-track-muted text-xs mb-2'>Device breakdown</p>
          {deviceData.length === 0 ? (
            <div className='flex items-center justify-center h-40'>
              <p className='text-track-muted text-sm'>No data yet</p>
            </div>
          ) : (
            <div className='h-44'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey='value'
                    nameKey='name'
                    innerRadius={42}
                    outerRadius={70}
                    paddingAngle={4}
                  >
                    {deviceData.map((_, i) => (
                      <Cell key={i} fill={colors[i % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#111827',
                      border: '1px solid #374151',
                      borderRadius: 12,
                      color: '#f9fafb',
                      fontSize: 12,
                    }}
                    formatter={(value, name) => {
                      const num = typeof value === 'number' ? value : 0;
                      return [
                        `${num} (${Math.round((num / total) * 100)}%)`,
                        name,
                      ];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div>
          <p className='text-track-muted text-xs mb-2'>Top browsers</p>
          {browsers.length === 0 ? (
            <div className='flex items-center justify-center h-40'>
              <p className='text-track-muted text-sm'>No data yet</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {browsers.map((b, i) => (
                <div key={i}>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-track-soft text-sm'>
                      {prettyLabel(b.browser)}
                    </span>
                    <span className='text-track-muted text-xs'>
                      {b.count.toLocaleString()}
                    </span>
                  </div>
                  <div className='h-1.5 bg-track-surface rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-track-green rounded-full'
                      style={{
                        width: `${(b.count / maxBrowser) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
