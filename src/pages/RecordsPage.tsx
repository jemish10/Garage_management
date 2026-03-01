import { useState } from 'react';
import { Customer, Vehicle, Billing, Page } from '../types';
import { getVehicles, saveVehicles } from '../store';
import { Search, Filter, Edit2, Receipt, CheckCircle, Clock, AlertCircle, X, ChevronDown } from 'lucide-react';

interface RecordsPageProps {
  customers: Customer[];
  vehicles: Vehicle[];
  billings: Billing[];
  onNavigate: (page: Page) => void;
  onDataChange: () => void;
  onSelectVehicle: (id: string) => void;
}

const STATUS_OPTIONS = ['All', 'Pending', 'In Progress', 'Completed'];

export default function RecordsPage({ customers, vehicles, billings, onNavigate, onDataChange, onSelectVehicle }: RecordsPageProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<Vehicle['serviceStatus']>('Pending');

  const getCustomer = (cid: string) => customers.find(c => c.id === cid);
  const hasBilling = (vid: string) => billings.some(b => b.vehicleId === vid);

  const filtered = vehicles.filter(v => {
    const cust = getCustomer(v.customerId);
    const searchLower = search.toLowerCase();
    const matchSearch = !search ||
      v.vehicleNumber.toLowerCase().includes(searchLower) ||
      cust?.mobile.includes(search) ||
      cust?.name.toLowerCase().includes(searchLower) ||
      v.vehicleModel.toLowerCase().includes(searchLower);
    const matchStatus = statusFilter === 'All' || v.serviceStatus === statusFilter;
    return matchSearch && matchStatus;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleStatusUpdate = (id: string) => {
    const all = getVehicles();
    const updated = all.map(v => v.id === id ? { ...v, serviceStatus: newStatus } : v);
    saveVehicles(updated);
    onDataChange();
    setEditingId(null);
  };

  const statusIcon = (s: string) => {
    if (s === 'Completed') return <CheckCircle size={13} />;
    if (s === 'In Progress') return <Clock size={13} />;
    return <AlertCircle size={13} />;
  };
  const statusClass = (s: string) => {
    if (s === 'Completed') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (s === 'In Progress') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Service Records</h1>
            <p className="text-gray-400 mt-1">{filtered.length} of {vehicles.length} records shown</p>
          </div>
          <button
            onClick={() => onNavigate('add-service')}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-orange-500/20"
          >
            + Add New Service
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, vehicle no, mobile..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:border-orange-500 placeholder-gray-600 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <div className="flex gap-2 flex-wrap">
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === s
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/60 text-left">
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">#</th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Customer</th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Vehicle</th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Service</th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {filtered.map((v, idx) => {
                  const cust = getCustomer(v.customerId);
                  const billed = hasBilling(v.id);
                  return (
                    <tr key={v.id} className="hover:bg-gray-700/20 transition-colors group">
                      <td className="px-5 py-4 text-sm text-gray-500 font-mono">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-white">{cust?.name || '—'}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{cust?.mobile}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm font-mono font-bold text-orange-400">{v.vehicleNumber}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{v.vehicleModel}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-300">{v.serviceType}</td>
                      <td className="px-5 py-4 text-sm text-gray-400">{v.serviceDate}</td>
                      <td className="px-5 py-4">
                        {editingId === v.id ? (
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <select
                                value={newStatus}
                                onChange={e => setNewStatus(e.target.value as Vehicle['serviceStatus'])}
                                className="bg-gray-900 border border-orange-500/50 text-white rounded-lg px-2 py-1 text-xs focus:outline-none appearance-none pr-6"
                              >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                              </select>
                              <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <button onClick={() => handleStatusUpdate(v.id)} className="text-green-400 hover:text-green-300 p-1">
                              <CheckCircle size={14} />
                            </button>
                            <button onClick={() => setEditingId(null)} className="text-red-400 hover:text-red-300 p-1">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusClass(v.serviceStatus)}`}>
                            {statusIcon(v.serviceStatus)} {v.serviceStatus}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditingId(v.id); setNewStatus(v.serviceStatus); }}
                            title="Update Status"
                            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all"
                          >
                            <Edit2 size={13} />
                          </button>
                          {billed ? (
                            <button
                              onClick={() => { onSelectVehicle(v.id); onNavigate('billing-detail'); }}
                              title="View Bill"
                              className="p-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all"
                            >
                              <Receipt size={13} />
                            </button>
                          ) : (
                            <button
                              onClick={() => { onSelectVehicle(v.id); onNavigate('billing'); }}
                              title="Generate Bill"
                              className="p-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 transition-all"
                            >
                              <Receipt size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="text-gray-600 mb-2">
                        <Search size={40} className="mx-auto mb-3 opacity-40" />
                      </div>
                      <p className="text-gray-400 font-medium">No records found</p>
                      <p className="text-gray-600 text-sm mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400" /> = Generate bill available</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400" /> = Bill already generated</div>
          <div className="flex items-center gap-1.5"><Edit2 size={12} /> = Update service status</div>
        </div>
      </div>
    </div>
  );
}
