import { useState, useEffect } from 'react';
import { Customer, Vehicle, Billing, Page } from '../types';
import { getBillings, saveBillings, generateId } from '../store';
import { Receipt, Printer, CheckCircle, AlertCircle, Calculator, Car, User, Wrench } from 'lucide-react';

interface BillingPageProps {
  customers: Customer[];
  vehicles: Vehicle[];
  billings: Billing[];
  selectedVehicleId: string | null;
  onNavigate: (page: Page) => void;
  onDataChange: () => void;
  onSelectVehicle: (id: string) => void;
}

export default function BillingPage({ customers, vehicles, billings, selectedVehicleId, onNavigate, onDataChange, onSelectVehicle }: BillingPageProps) {
  const [serviceCharge, setServiceCharge] = useState('');
  const [partsCharge, setPartsCharge] = useState('');
  const [selectedId, setSelectedId] = useState(selectedVehicleId || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedVehicleId) setSelectedId(selectedVehicleId);
  }, [selectedVehicleId]);

  const selectedVehicle = vehicles.find(v => v.id === selectedId);
  const selectedCustomer = selectedVehicle ? customers.find(c => c.id === selectedVehicle.customerId) : null;
  const svc = parseFloat(serviceCharge) || 0;
  const parts = parseFloat(partsCharge) || 0;
  const total = svc + parts;
  const today = new Date().toISOString().split('T')[0];

  const unbilledVehicles = vehicles.filter(v => !billings.some(b => b.vehicleId === v.id));

  const handleSubmit = () => {
    if (!selectedId) { setError('Please select a vehicle.'); return; }
    if (!serviceCharge) { setError('Enter service charge.'); return; }
    setError('');
    setSubmitting(true);

    setTimeout(() => {
      const all = getBillings();
      const newBill: Billing = {
        id: generateId('b'),
        vehicleId: selectedId,
        serviceCharge: svc,
        partsCharge: parts,
        totalAmount: total,
        billDate: today,
      };
      all.push(newBill);
      saveBillings(all);
      onDataChange();
      setSuccess(true);
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-black text-white">Billing</h1>
          <p className="text-gray-400 mt-1">Generate service bills for customers</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bill Generator */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator size={18} className="text-orange-400" /> Generate Bill
            </h2>

            {success && (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-3 text-sm">
                <CheckCircle size={16} />
                Bill generated! <button onClick={() => { onSelectVehicle(selectedId); onNavigate('billing-detail'); }} className="underline ml-1">View & Print →</button>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Vehicle *</label>
              <select
                value={selectedId}
                onChange={e => { setSelectedId(e.target.value); setSuccess(false); }}
                className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-all"
              >
                <option value="">-- Choose a vehicle --</option>
                {unbilledVehicles.map(v => {
                  const c = customers.find(c => c.id === v.customerId);
                  return <option key={v.id} value={v.id}>{v.vehicleNumber} – {c?.name} ({v.serviceType})</option>;
                })}
              </select>
            </div>

            {/* Vehicle Info Preview */}
            {selectedVehicle && selectedCustomer && (
              <div className="bg-gray-900/60 rounded-xl border border-gray-700/50 p-4 space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <User size={14} className="text-orange-400" />
                  <span className="font-semibold text-white">{selectedCustomer.name}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-400">{selectedCustomer.mobile}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Car size={14} className="text-orange-400" />
                  <span className="font-mono font-bold text-orange-300">{selectedVehicle.vehicleNumber}</span>
                  <span className="text-gray-500">–</span>
                  <span>{selectedVehicle.vehicleModel}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Wrench size={14} className="text-orange-400" />
                  <span>{selectedVehicle.serviceType}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Service Charge (₹) *</label>
                <input
                  type="number"
                  min="0"
                  value={serviceCharge}
                  onChange={e => setServiceCharge(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-all placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Spare Parts (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={partsCharge}
                  onChange={e => setPartsCharge(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-all placeholder-gray-600"
                />
              </div>
            </div>

            {/* Live total */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Service Charge</span>
                <span>₹{svc.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300 mb-3 pb-3 border-b border-orange-500/20">
                <span>Spare Parts</span>
                <span>₹{parts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-xl">
                <span className="text-orange-400">Total Amount</span>
                <span className="text-white">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || success || !selectedId}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 text-sm"
            >
              {submitting ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
              ) : (
                <><Receipt size={16} /> Generate Bill</>
              )}
            </button>
          </div>

          {/* Generated Bills List */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-700/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Receipt size={18} className="text-orange-400" /> Generated Bills ({billings.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-700/30 max-h-[520px] overflow-y-auto">
              {billings.length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm">No bills generated yet</div>
              )}
              {[...billings].reverse().map(bill => {
                const veh = vehicles.find(v => v.id === bill.vehicleId);
                const cust = veh ? customers.find(c => c.id === veh.customerId) : null;
                return (
                  <div key={bill.id} className="p-4 hover:bg-gray-700/20 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-bold text-orange-400">{veh?.vehicleNumber || '—'}</span>
                          <span className="text-gray-500 text-xs">·</span>
                          <span className="text-sm text-gray-300 truncate">{cust?.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">{veh?.serviceType} · {bill.billDate}</div>
                        <div className="flex gap-3 text-xs text-gray-400">
                          <span>Svc: ₹{bill.serviceCharge}</span>
                          <span>Parts: ₹{bill.partsCharge}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-black text-white">₹{bill.totalAmount.toLocaleString()}</div>
                        <button
                          onClick={() => { onSelectVehicle(bill.vehicleId); onNavigate('billing-detail'); }}
                          className="mt-1 flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors"
                        >
                          <Printer size={11} /> Print
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
