import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function EmissionBreakdown() {
  const data = useCarbonStore((state) => state.categoryChartData);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">Emission Breakdown</h2>
      <p className="text-sm text-slate-500">Category distribution across your footprint profile.</p>
      <div className="mt-4 h-72" aria-label="Bar chart showing carbon emissions by category" role="img">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
