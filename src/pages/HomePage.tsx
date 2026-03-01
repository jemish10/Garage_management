import { Page } from '../types';
import { Wrench, Droplet, Settings, Shield, Zap, Star, Phone, MapPin, Clock, ChevronRight, Car, CheckCircle, BookOpen } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
}

const services = [
  { icon: <Settings size={32} />, title: 'Full Engine Service', desc: 'Complete engine diagnostics, tune-up and overhaul for peak performance.', color: 'from-orange-500 to-red-500', price: '₹2,500+' },
  { icon: <Droplet size={32} />, title: 'Oil & Filter Change', desc: 'Premium quality engine oil replacement with genuine filters.', color: 'from-blue-500 to-cyan-500', price: '₹800+' },
  { icon: <Wrench size={32} />, title: 'Brake Service', desc: 'Brake pad replacement, disc resurfacing and hydraulic check.', color: 'from-green-500 to-emerald-500', price: '₹1,200+' },
  { icon: <Zap size={32} />, title: 'Electrical Repairs', desc: 'Battery, alternator, wiring and complete electrical system diagnostics.', color: 'from-yellow-500 to-amber-500', price: '₹1,500+' },
  { icon: <Shield size={32} />, title: 'Tyre & Wheel', desc: 'Tyre fitting, balancing, alignment and puncture repair services.', color: 'from-purple-500 to-violet-500', price: '₹600+' },
  { icon: <Car size={32} />, title: 'Body & Paint', desc: 'Dent removal, scratch repair and full body repainting services.', color: 'from-pink-500 to-rose-500', price: '₹3,000+' },
];

const testimonials = [
  { name: 'Rajesh K.', vehicle: 'Honda City', rating: 5, text: 'Excellent service! My car runs like new after the full engine overhaul. Highly recommend AutoCare Pro.' },
  { name: 'Priya S.', vehicle: 'Maruti Swift', rating: 5, text: 'Quick and reliable service. The staff is professional and the pricing is very transparent.' },
  { name: 'Arun V.', vehicle: 'Hyundai i20', rating: 4, text: 'Great experience overall. The digital billing system is very convenient and professional.' },
];

const stats = [
  { value: '5,000+', label: 'Happy Customers' },
  { value: '12,000+', label: 'Services Done' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export default function HomePage({ onNavigate, isLoggedIn }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-2 text-orange-400 text-sm font-medium mb-6">
                <Wrench size={14} />
                Premium Auto Service Center
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                Your Car<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Deserves
                </span><br />
                The Best
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                Professional garage services with certified mechanics, genuine parts, and transparent pricing. Trusted by thousands of vehicle owners since 2009.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate(isLoggedIn ? 'add-service' : 'login')}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-2xl shadow-orange-500/30 hover:shadow-orange-400/40 hover:scale-105"
                >
                  <PlusCircle />
                  Book a Service
                </button>
                <button
                  onClick={() => onNavigate(isLoggedIn ? 'records' : 'login')}
                  className="flex items-center gap-2 border border-gray-600 hover:border-orange-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:bg-orange-500/10"
                >
                  View Records
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-orange-500/30 transition-all">
                  <div className="text-4xl font-black text-orange-400 mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Our <span className="text-orange-400">Services</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">From routine maintenance to complex repairs, we've got every service your vehicle needs under one roof.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div key={i} className="group bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 cursor-pointer">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${svc.color} mb-4 shadow-lg`}>
                  {svc.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{svc.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{svc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-400 font-bold text-lg">{svc.price}</span>
                  <button
                    onClick={() => onNavigate(isLoggedIn ? 'add-service' : 'login')}
                    className="text-sm text-gray-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
                  >
                    Book Now <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose <span className="text-orange-400">AutoCare Pro?</span></h2>
              <div className="space-y-5">
                {[
                  { title: 'Certified Mechanics', desc: 'All our technicians are manufacturer-certified with years of hands-on experience.' },
                  { title: 'Genuine Spare Parts', desc: 'We use only OEM and quality-certified parts for all repairs and replacements.' },
                  { title: 'Transparent Pricing', desc: 'No hidden charges. You get a detailed bill before we start any work.' },
                  { title: 'Digital Records', desc: 'Complete service history maintained digitally for easy access anytime.' },
                  { title: 'Quick Turnaround', desc: 'Most services completed within the same day to minimize your downtime.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle className="text-orange-400 flex-shrink-0 mt-1" size={22} />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm italic mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.vehicle} Owner</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Find <span className="text-orange-400">Us</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-orange-500/20 mb-4">
                <MapPin size={28} className="text-orange-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Location</h3>
              <p className="text-gray-400 text-sm">24, Industrial Estate Road,<br />Ambattur, Chennai - 600058</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-orange-500/20 mb-4">
                <Phone size={28} className="text-orange-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Contact</h3>
              <p className="text-gray-400 text-sm">+91 98765 43210<br />autocurepro@gmail.com</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-orange-500/20 mb-4">
                <Clock size={28} className="text-orange-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Working Hours</h3>
              <p className="text-gray-400 text-sm">Mon – Sat: 8:00 AM – 8:00 PM<br />Sunday: 9:00 AM – 2:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Book a Service?</h2>
          <p className="text-orange-100 mb-8 text-lg">Login as admin to manage bookings, records, and billing.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate(isLoggedIn ? 'add-service' : 'login')}
              className="bg-white text-orange-600 font-black px-10 py-4 rounded-xl text-lg hover:bg-orange-50 transition-all shadow-2xl hover:scale-105"
            >
              {isLoggedIn ? 'Add New Service' : 'Admin Login →'}
            </button>
            <button
              onClick={() => onNavigate('setup-guide')}
              className="flex items-center gap-2 bg-orange-800/60 border border-white/30 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-orange-800 transition-all shadow-xl hover:scale-105"
            >
              <BookOpen size={20} />
              How to Run in Cursor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="font-bold text-white mb-1">AutoCare<span className="text-orange-400">Pro</span> Garage Management System</p>
          <p>© 2025 AutoCare Pro. All rights reserved. | Built with ❤️ for garage owners</p>
        </div>
      </footer>
    </div>
  );
}

function PlusCircle({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
