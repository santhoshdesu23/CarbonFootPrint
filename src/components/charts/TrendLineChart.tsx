import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';

export default function TrendLineChart() {
  const data = useCarbonStore((state) => state.trendChartData);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">Monthly Trend</h2>
      <p className="text-sm text-slate-500">Month-over-month carbon changes.</p>
      <div className="mt-4 h-72" aria-label="Area chart showing monthly carbon trend" role="img">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#059669" fill="url(#trendFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
