import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DeviceChartProps {
  devices:  { device: string; count: number }[];
  browsers: { browser: string; count: number }[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function DeviceChart({ devices, browsers }: DeviceChartProps) {
  const deviceData  = devices.map(d  => ({ name: d.device,  value: Number(d.count)  }));
  const browserData = browsers.map(b => ({ name: b.browser, value: Number(b.count) }));

  return (
    <div className='bg-track-card border border-track-border rounded-2xl p-5'>
      <h3 className='font-semibold text-track-text mb-4'>
        Devices & Browsers
      </h3>
      {deviceData.length === 0 ? (
        <div className='flex items-center justify-center h-32'>
          <p className='text-track-muted text-sm'>No data yet</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {/* Devices */}
          <div>
            <p className='text-track-muted text-xs mb-3 text-center'>
              Devices
            </p>
            <ResponsiveContainer width='100%' height={150}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx='50%' cy='50%'
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey='value'
                >
                  {deviceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb',
                  }}
                />
                <Legend
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ color: '#9ca3af', fontSize: 11 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Browsers */}
          <div>
            <p className='text-track-muted text-xs mb-3 text-center'>
              Browsers
            </p>
            <ResponsiveContainer width='100%' height={150}>
              <PieChart>
                <Pie
                  data={browserData}
                  cx='50%' cy='50%'
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey='value'
                >
                  {browserData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb',
                  }}
                />
                <Legend
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ color: '#9ca3af', fontSize: 11 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}