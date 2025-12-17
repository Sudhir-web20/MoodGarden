
import React, { useMemo } from 'react';
import { MoodEntry } from '../types';
import { MOOD_CONFIG } from '../constants';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';

interface MoodStatsProps {
  entries: MoodEntry[];
}

const MoodStats: React.FC<MoodStatsProps> = ({ entries }) => {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach(e => {
      counts[e.mood] = (counts[e.mood] || 0) + 1;
    });
    return Object.keys(counts).map(mood => ({
      name: mood,
      value: counts[mood],
      color: mood.toLowerCase().includes('happy') ? '#fbbf24' : 
             mood.toLowerCase().includes('calm') ? '#10b981' :
             mood.toLowerCase().includes('sad') ? '#3b82f6' :
             mood.toLowerCase().includes('angry') ? '#f43f5e' :
             mood.toLowerCase().includes('anxious') ? '#6366f1' :
             mood.toLowerCase().includes('excited') ? '#f97316' : '#64748b'
    }));
  }, [entries]);

  const recentTrends = useMemo(() => {
    // Last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(dateStr => {
      const dayEntries = entries.filter(e => e.date.startsWith(dateStr));
      return {
        date: new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short' }),
        count: dayEntries.length
      };
    });
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-emerald-50">
        <p className="text-slate-500 font-medium">Growth data will appear here once you start tracking.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-50">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Mood Landscape</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-50">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Planting Consistency</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentTrends}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis hide />
                <RechartsTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#10b981" 
                  radius={[8, 8, 8, 8]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-emerald-50 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Blooms</p>
          <p className="text-3xl font-bold text-slate-800">{entries.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-emerald-50 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Top Mood</p>
          <p className="text-2xl font-bold text-emerald-600">
            {chartData.length > 0 ? chartData.sort((a,b) => b.value - a.value)[0].name : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-emerald-50 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Streaks</p>
          <p className="text-3xl font-bold text-emerald-600">7 Days</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-emerald-50 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Wisdom Count</p>
          <p className="text-3xl font-bold text-slate-800">{entries.filter(e => !!e.aiInsight).length}</p>
        </div>
      </div>
    </div>
  );
};

export default MoodStats;
