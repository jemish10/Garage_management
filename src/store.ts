import { Customer, Vehicle, Billing } from './types';

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];

const SEED_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Rajesh Kumar', mobile: '9876543210', address: '12, MG Road, Chennai', createdAt: twoDaysAgo },
  { id: 'c2', name: 'Priya Sharma', mobile: '8765432109', address: '45, Anna Nagar, Chennai', createdAt: yesterday },
  { id: 'c3', name: 'Arun Vijay', mobile: '7654321098', address: '78, T Nagar, Chennai', createdAt: today },
  { id: 'c4', name: 'Meena Devi', mobile: '6543210987', address: '23, Velachery, Chennai', createdAt: today },
  { id: 'c5', name: 'Suresh Babu', mobile: '9988776655', address: '56, Adyar, Chennai', createdAt: yesterday },
];

const SEED_VEHICLES: Vehicle[] = [
  { id: 'v1', customerId: 'c1', vehicleNumber: 'TN01AB1234', vehicleModel: 'Honda City', serviceType: 'Full Service', serviceStatus: 'Completed', serviceDate: twoDaysAgo, createdAt: twoDaysAgo },
  { id: 'v2', customerId: 'c2', vehicleNumber: 'TN02CD5678', vehicleModel: 'Maruti Swift', serviceType: 'Oil Change', serviceStatus: 'Completed', serviceDate: yesterday, createdAt: yesterday },
  { id: 'v3', customerId: 'c3', vehicleNumber: 'TN03EF9012', vehicleModel: 'Hyundai i20', serviceType: 'Engine Repair', serviceStatus: 'In Progress', serviceDate: today, createdAt: today },
  { id: 'v4', customerId: 'c4', vehicleNumber: 'TN04GH3456', vehicleModel: 'Toyota Innova', serviceType: 'Brake Service', serviceStatus: 'Pending', serviceDate: today, createdAt: today },
  { id: 'v5', customerId: 'c5', vehicleNumber: 'TN05IJ7890', vehicleModel: 'Bajaj Pulsar', serviceType: 'Tyre Replacement', serviceStatus: 'Pending', serviceDate: today, createdAt: today },
];

const SEED_BILLING: Billing[] = [
  { id: 'b1', vehicleId: 'v1', serviceCharge: 2500, partsCharge: 1200, totalAmount: 3700, billDate: twoDaysAgo },
  { id: 'b2', vehicleId: 'v2', serviceCharge: 800, partsCharge: 400, totalAmount: 1200, billDate: yesterday },
];

function loadOrSeed<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  } catch {
    return seed;
  }
}

function save<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCustomers(): Customer[] {
  return loadOrSeed<Customer>('garage_customers', SEED_CUSTOMERS);
}
export function saveCustomers(data: Customer[]): void {
  save('garage_customers', data);
}

export function getVehicles(): Vehicle[] {
  return loadOrSeed<Vehicle>('garage_vehicles', SEED_VEHICLES);
}
export function saveVehicles(data: Vehicle[]): void {
  save('garage_vehicles', data);
}

export function getBillings(): Billing[] {
  return loadOrSeed<Billing>('garage_billings', SEED_BILLING);
}
export function saveBillings(data: Billing[]): void {
  save('garage_billings', data);
}

export function generateId(prefix: string): string {
  return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}
