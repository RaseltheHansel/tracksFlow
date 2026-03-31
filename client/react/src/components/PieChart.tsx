import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

interface PieChartProps {
  title?: string;
  data: { name: string; value: number }[];
  height?: number;
  colors?: string[];
}

const defaultColors = ['#22d3ee', '#38bdf8', '#a3e635', '#f59e0b', '#fb7185'];

export default function PieChart({
  title,
  data,
  height = 220,
  colors = defaultColors,
}: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

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
          <RePieChart>
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              innerRadius={42}
              outerRadius={70}
              paddingAngle={4}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#0b1120',
                border: '1px solid #1f2a44',
                borderRadius: 12,
                color: '#e5e7eb',
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
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
