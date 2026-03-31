import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface LineChartProps {
  title?: string;
  data: Record<string, number | string>[];
  xKey: string;
  yKey: string;
  height?: number;
}

export default function LineChart({
  title,
  data,
  xKey,
  yKey,
  height = 220,
}: LineChartProps) {
  return (
    <div className='bg-gradient-to-br from-track-card/90 to-track-surface/70
      border border-track-border/80 rounded-2xl p-5 ring-1 ring-white/5'>
      {title && (
        <h3 className='font-semibold text-track-text mb-4'>
          {title}
        </h3>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width='100%' height='100%'>
          <ReLineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke='#1f2a44' strokeDasharray='3 3' />
            <XAxis dataKey={xKey} stroke='#94a3b8' fontSize={12} tickMargin={8} />
            <YAxis stroke='#94a3b8' fontSize={12} tickMargin={8} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: '#0b1120',
                border: '1px solid #1f2a44',
                borderRadius: 12,
                color: '#e5e7eb',
                fontSize: 12,
              }}
            />
            <Line type='monotone' dataKey={yKey} stroke='#22d3ee' strokeWidth={2.5} dot={false} />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
