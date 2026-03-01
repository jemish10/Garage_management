import { useMemo } from 'react';
import { Customer, Vehicle, Billing, Page } from '../types';
import { Users, Car, CheckCircle, Clock, AlertCircle, TrendingUp, PlusCircle, FileText, Receipt, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardPageProps {
  customers: Customer[];
  vehicles: Vehicle[];
  billings: Billing[];
  onNavigate: (page: Page) => void;
}

const today = new Date().toISOString().split('T')[0];

export default function DashboardPage({ customers, vehicles, billings, onNavigate }: DashboardPageProps) {
  const todayServices = vehicles.filter(v => v.serviceDate === today);
  const pendingServices = vehicles.filter(v => v.serviceStatus === 'Pending');
  const inProgressServices = vehicles.filter(v => v.serviceStatus === 'In Progress');
  const completedServices = vehicles.filter(v => v.serviceStatus === 'Completed');
  const totalRevenue = billings.reduce((sum, b) => sum + b.totalAmount, 0);

  const last7Days = useMemo(() => {
    const days: { date: string; label: string; services: number; revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('en-IN', { weekday: 'short' });
      const svcs = vehicles.filter(v => v.serviceDate === dateStr).length;
      const rev = billings.filter(b => b.billDate === dateStr).reduce((s, b) => s + b.totalAmount, 0);
      days.push({ date: dateStr, label, services: svcs, revenue: rev });
    }
    return days;
  }, [vehicles, billings]);

  const serviceTypeData = useMemo(() => {
    const map: Record<string, number> = {};
    vehicles.forEach(v => { map[v.serviceType] = (map[v.serviceType] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [vehicles]);

  const PIE_COLORS = ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ec4899', '#eab308'];

  const recentRecords = [...vehicles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getCustomer = (cid: string) => customers.find(c => c.id === cid);

  const statusColor = (s: string) => {
    if (s === 'Completed') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (s === 'In Progress') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, Admin! Here's today's overview.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate('add-service')} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-orange-500/20">
              <PlusCircle size={16} /> Add Service
            </button>
            <button onClick={() => onNavigate('records')} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all">
              <FileText size={16} /> Records
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Customers', value: customers.length, icon: <Users size={22} />, color: 'from-orange-500 to-red-500', bg: 'bg-orange-500/10 border-orange-500/20' },
            { label: "Today's Services", value: todayServices.length, icon: <Activity size={22} />, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10 border-blue-500/20' },
            { label: 'Pending', value: pendingServices.length, icon: <AlertCircle size={22} />, color: 'from-yellow-500 to-amber-500', bg: 'bg-yellow-500/10 border-yellow-500/20' },
            { label: 'Completed', value: completedServices.length, icon: <CheckCircle size={22} />, color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10 border-green-500/20' },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} border rounded-2xl p-5 relative overflow-hidden group hover:scale-105 transition-transform cursor-default`}>
              <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg mb-3`}>
                <span className="text-white">{stat.icon}</span>
              </div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">{stat.label}</p>
              <p className="text-4xl font-black text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Revenue + In Progress row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 flex items-center gap-5 shadow-2xl shadow-orange-500/20">
            <div className="bg-white/20 p-3 rounded-xl">
              <TrendingUp size={28} className="text-white" />
            </div>
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Revenue</p>
              <p className="text-4xl font-black text-white">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-orange-200 text-xs mt-1">From {billings.length} bills generated</p>
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 flex items-center gap-5">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <Clock size={28} className="text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">In Progress</p>
              <p className="text-4xl font-black text-white">{inProgressServices.length}</p>
              <p className="text-gray-500 text-xs mt-1">Vehicles currently being serviced</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5 flex items-center gap-2">
              <Activity size={18} className="text-orange-400" /> Weekly Service Activity
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={last7Days} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="label" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '12px', color: '#fff' }}
                  formatter={(val) => [val, 'Services']}
                />
                <Bar dataKey="services" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5 flex items-center gap-2">
              <Car size={18} className="text-orange-400" /> Service Types
            </h3>
            {serviceTypeData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={serviceTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                      {serviceTypeData.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-3">
                  {serviceTypeData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                        <span className="text-gray-400 truncate max-w-[120px]">{item.name}</span>
                      </div>
                      <span className="text-white font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">No service data yet</p>
            )}
          </div>
        </div>

        {/* Recent Records */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-700/50 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Receipt size={18} className="text-orange-400" /> Recent Service Records
            </h3>
            <button onClick={() => onNavigate('records')} className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-900/40">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Customer</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Vehicle</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Service</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {recentRecords.map(v => {
                  const cust = getCustomer(v.customerId);
                  return (
                    <tr key={v.id} className="hover:bg-gray-700/20 transition-colors">
                      <td className="px-5 py-3.5 text-sm text-white font-medium">{cust?.name || '—'}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-300">
                        <div>{v.vehicleNumber}</div>
                        <div className="text-xs text-gray-500">{v.vehicleModel}</div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-300">{v.serviceType}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-400">{v.serviceDate}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColor(v.serviceStatus)}`}>
                          {v.serviceStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {recentRecords.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-gray-500 text-sm">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
