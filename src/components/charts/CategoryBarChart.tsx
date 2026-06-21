import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';

export default function CategoryBarChart() {
  const data = useCarbonStore((state) => state.categoryChartData);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">Category Comparison</h2>
      <p className="text-sm text-slate-500">Side-by-side footprint by category.</p>
      <div className="mt-4 h-72" aria-label="Bar chart comparing carbon emissions by category" role="img">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="value" fill="#0f766e" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
