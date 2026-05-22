import { Deal } from '../models/deals';

export const MOCK_DEALS: Deal[] = [
  {
    id: 1,
    dealName: 'Sunset Plaza',
    purchasePrice: 2500000,
    address: '123 Main St',
    noi: 200000,
    capRate: 8,
  },
  {
    id: 2,
    dealName: 'Downtown Tower',
    purchasePrice: 5000000,
    address: '456 Market St',
    noi: 450000,
    capRate: 9,
  },
];
