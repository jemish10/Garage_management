import { useState } from 'react';
import { Vehicle, Page } from '../types';
import { getCustomers, saveCustomers, getVehicles, saveVehicles, generateId } from '../store';
import { User, Phone, MapPin, Car, Wrench, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

interface AddServicePageProps {
  onNavigate: (page: Page) => void;
  onDataChange: () => void;
}

const SERVICE_TYPES = [
  'Full Service', 'Oil Change', 'Engine Repair', 'Brake Service',
  'Tyre Replacement', 'Electrical Repair', 'AC Service', 'Wheel Alignment',
  'Suspension Repair', 'Body & Paint', 'Denting', 'Battery Replacement',
];

const VEHICLE_MODELS = [
  'Honda City', 'Maruti Swift', 'Hyundai i20', 'Toyota Innova', 'Tata Nexon',
  'Mahindra Scorpio', 'Ford EcoSport', 'Renault Kwid', 'Bajaj Pulsar',
  'Hero Splendor', 'TVS Apache', 'Royal Enfield Bullet', 'Other',
];

interface FormData {
  name: string;
  mobile: string;
  address: string;
  vehicleNumber: string;
  vehicleModel: string;
  serviceType: string;
  serviceDate: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  address?: string;
  vehicleNumber?: string;
  vehicleModel?: string;
  serviceType?: string;
}

export default function AddServicePage({ onNavigate, onDataChange }: AddServicePageProps) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState<FormData>({
    name: '', mobile: '', address: '', vehicleNumber: '',
    vehicleModel: '', serviceType: '', serviceDate: today,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Customer name is required';
    if (!form.mobile.trim()) errs.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(form.mobile.trim())) errs.mobile = 'Enter valid 10-digit mobile number';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.vehicleNumber.trim()) errs.vehicleNumber = 'Vehicle number is required';
    if (!form.vehicleModel.trim()) errs.vehicleModel = 'Vehicle model is required';
    if (!form.serviceType) errs.serviceType = 'Please select a service type';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    setTimeout(() => {
      const customers = getCustomers();
      let existingCustomer = customers.find(c => c.mobile === form.mobile.trim());
      if (!existingCustomer) {
        existingCustomer = {
          id: generateId('c'),
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          address: form.address.trim(),
          createdAt: today,
        };
        customers.push(existingCustomer);
        saveCustomers(customers);
      }

      const vehicles = getVehicles();
      const newVehicle: Vehicle = {
        id: generateId('v'),
        customerId: existingCustomer.id,
        vehicleNumber: form.vehicleNumber.trim().toUpperCase(),
        vehicleModel: form.vehicleModel.trim(),
        serviceType: form.serviceType,
        serviceStatus: 'Pending',
        serviceDate: form.serviceDate,
        createdAt: new Date().toISOString(),
      };
      vehicles.push(newVehicle);
      saveVehicles(vehicles);

      onDataChange();
      setSuccess(true);
      setSubmitting(false);

      setForm({ name: '', mobile: '', address: '', vehicleNumber: '', vehicleModel: '', serviceType: '', serviceDate: today });
    }, 800);
  };

  const Field = ({ label, icon, error, children }: { label: string; icon: React.ReactNode; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-1.5">
        <span className="text-orange-400">{icon}</span> {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} />{error}</p>}
    </div>
  );

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-gray-900 border ${errors[field] ? 'border-red-500/50 focus:border-red-500' : 'border-gray-600 focus:border-orange-500'} text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 ${errors[field] ? 'focus:ring-red-500' : 'focus:ring-orange-500'} transition-all placeholder-gray-600`;

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Add New Service</h1>
          <p className="text-gray-400">Enter customer and vehicle details to book a service.</p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl px-5 py-4 mb-6">
            <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Service booked successfully!</p>
              <p className="text-sm text-green-300/70 mt-1">
                The service has been added to records.{' '}
                <button onClick={() => onNavigate('records')} className="underline hover:text-green-300">View Records →</button>
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
          {/* Customer Section */}
          <div className="p-6 sm:p-8 border-b border-gray-700/50">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-xs font-black">1</div>
              Customer Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Customer Name *" icon={<User size={14} />} error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className={inputClass('name')}
                />
              </Field>
              <Field label="Mobile Number *" icon={<Phone size={14} />} error={errors.mobile}>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={e => setForm({ ...form, mobile: e.target.value })}
                  placeholder="10-digit mobile"
                  maxLength={10}
                  className={inputClass('mobile')}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address *" icon={<MapPin size={14} />} error={errors.address}>
                  <textarea
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="Full address"
                    rows={2}
                    className={`${inputClass('address')} resize-none`}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Vehicle Section */}
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-xs font-black">2</div>
              Vehicle & Service Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Vehicle Number *" icon={<Car size={14} />} error={errors.vehicleNumber}>
                <input
                  type="text"
                  value={form.vehicleNumber}
                  onChange={e => setForm({ ...form, vehicleNumber: e.target.value.toUpperCase() })}
                  placeholder="e.g. TN01AB1234"
                  className={inputClass('vehicleNumber')}
                />
              </Field>
              <Field label="Vehicle Model *" icon={<Car size={14} />} error={errors.vehicleModel}>
                <select
                  value={form.vehicleModel}
                  onChange={e => setForm({ ...form, vehicleModel: e.target.value })}
                  className={inputClass('vehicleModel')}
                >
                  <option value="">Select model...</option>
                  {VEHICLE_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Service Type *" icon={<Wrench size={14} />} error={errors.serviceType}>
                <select
                  value={form.serviceType}
                  onChange={e => setForm({ ...form, serviceType: e.target.value })}
                  className={inputClass('serviceType')}
                >
                  <option value="">Select service...</option>
                  {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Service Date" icon={<Calendar size={14} />}>
                <input
                  type="date"
                  value={form.serviceDate}
                  onChange={e => setForm({ ...form, serviceDate: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </Field>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 text-sm"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Book Service
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('records')}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                View Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
