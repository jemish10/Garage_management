export interface Customer {
  id: string;
  name: string;
  mobile: string;
  address: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  customerId: string;
  vehicleNumber: string;
  vehicleModel: string;
  serviceType: string;
  serviceStatus: 'Pending' | 'In Progress' | 'Completed';
  serviceDate: string;
  createdAt: string;
}

export interface Billing {
  id: string;
  vehicleId: string;
  serviceCharge: number;
  partsCharge: number;
  totalAmount: number;
  billDate: string;
}

export interface AdminUser {
  username: string;
  password: string;
}

export type Page =
  | 'home'
  | 'login'
  | 'dashboard'
  | 'add-service'
  | 'records'
  | 'billing'
  | 'billing-detail'
  | 'setup-guide';
