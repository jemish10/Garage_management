import { Customer, Vehicle, Billing, Page } from '../types';
import { Printer, ArrowLeft, Wrench, MapPin, Phone, Calendar } from 'lucide-react';

interface BillingDetailPageProps {
  customers: Customer[];
  vehicles: Vehicle[];
  billings: Billing[];
  selectedVehicleId: string | null;
  onNavigate: (page: Page) => void;
}

export default function BillingDetailPage({ customers, vehicles, billings, selectedVehicleId, onNavigate }: BillingDetailPageProps) {
  const vehicle = vehicles.find(v => v.id === selectedVehicleId);
  const customer = vehicle ? customers.find(c => c.id === vehicle.customerId) : null;
  const billing = vehicle ? billings.find(b => b.vehicleId === vehicle.id) : null;

  if (!vehicle || !customer || !billing) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Bill not found.</p>
          <button onClick={() => onNavigate('billing')} className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold">
            Go to Billing
          </button>
        </div>
      </div>
    );
  }

  const billNo = `GMS-${billing.id.slice(-6).toUpperCase()}`;
  const gst = billing.totalAmount * 0.18;
  const grandTotal = billing.totalAmount + gst;

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Action Bar – hidden on print */}
        <div className="flex items-center justify-between print:hidden">
          <button
            onClick={() => onNavigate('billing')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Back to Billing
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/20"
          >
            <Printer size={16} /> Print Bill
          </button>
        </div>

        {/* Bill Card */}
        <div id="print-bill" className="bg-white rounded-3xl overflow-hidden shadow-2xl print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2.5 rounded-xl">
                  <Wrench size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black">AutoCare<span className="text-orange-400">Pro</span></h1>
                  <p className="text-gray-400 text-xs">Garage Management System</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-orange-400 font-bold text-lg">SERVICE BILL</p>
                <p className="text-gray-400 text-xs mt-0.5">Bill No: <span className="text-white font-mono">{billNo}</span></p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5"><MapPin size={12} className="text-orange-400" /> 24, Industrial Estate Road, Ambattur, Chennai - 600058</div>
              <div className="flex items-center gap-1.5 justify-end"><Phone size={12} className="text-orange-400" /> +91 98765 43210</div>
            </div>
          </div>

          {/* Customer & Vehicle Details */}
          <div className="px-8 py-6 grid sm:grid-cols-2 gap-6 bg-gray-50">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Customer Details</h3>
              <div className="space-y-1.5">
                <p className="font-bold text-gray-900 text-lg">{customer.name}</p>
                <p className="text-gray-600 text-sm flex items-center gap-1.5"><Phone size={12} />{customer.mobile}</p>
                <p className="text-gray-600 text-sm flex items-center gap-1.5"><MapPin size={12} />{customer.address}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Vehicle Details</h3>
              <div className="space-y-1.5">
                <p className="font-bold text-gray-900 font-mono text-xl">{vehicle.vehicleNumber}</p>
                <p className="text-gray-600 text-sm">{vehicle.vehicleModel}</p>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar size={12} />
                  <span>Service Date: <strong>{vehicle.serviceDate}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar size={12} />
                  <span>Bill Date: <strong>{billing.billDate}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <div className="px-8 py-2">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide py-3">Description</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wide py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4">
                    <p className="font-semibold text-gray-800">{vehicle.serviceType}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Labour & Service Charges</p>
                  </td>
                  <td className="py-4 text-right font-semibold text-gray-800">₹{billing.serviceCharge.toFixed(2)}</td>
                </tr>
                {billing.partsCharge > 0 && (
                  <tr>
                    <td className="py-4">
                      <p className="font-semibold text-gray-800">Spare Parts</p>
                      <p className="text-xs text-gray-500 mt-0.5">OEM Quality Parts</p>
                    </td>
                    <td className="py-4 text-right font-semibold text-gray-800">₹{billing.partsCharge.toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-8 pb-6">
            <div className="bg-gray-50 rounded-2xl p-5 space-y-2.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{billing.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>GST @ 18%</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black border-t-2 border-gray-300 pt-3 mt-1">
                <span className="text-gray-900">Grand Total</span>
                <span className="text-orange-500">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="px-8 pb-4 flex items-center justify-between">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
              vehicle.serviceStatus === 'Completed'
                ? 'bg-green-100 text-green-700'
                : vehicle.serviceStatus === 'In Progress'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              Service Status: {vehicle.serviceStatus}
            </span>
            <p className="text-xs text-gray-400">Thank you for your business!</p>
          </div>

          {/* Footer */}
          <div className="bg-orange-500 px-8 py-4 text-center">
            <p className="text-white font-semibold text-sm">AutoCare Pro – Your Trusted Garage Partner</p>
            <p className="text-orange-100 text-xs mt-1">Visit us again • +91 98765 43210 • autocurepro@gmail.com</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-bill, #print-bill * { visibility: visible; }
          #print-bill { position: fixed; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
