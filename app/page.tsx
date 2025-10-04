'use client';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Bar, Pie } from 'react-chartjs-2';
import ChartCard from '../components/ChartCard';

export default function Dashboard() {
  const [inventoryValue, setInventoryValue] = useState(0);
  const [lowStock, setLowStock] = useState<any[]>([]);

  useEffect(() => {
    api.get('/reports/inventory').then(res => setInventoryValue(res.data.totalInventoryValue));
    api.get('/reports/low-stock?threshold=5').then(res => setLowStock(res.data.lowStockProducts));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📊 Inventory Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Total Inventory Value">
          <p className="text-3xl font-bold">Rp {inventoryValue.toLocaleString()}</p>
        </ChartCard>

        <ChartCard title="Low Stock Products">
          <ul>
            {lowStock.map(p => (
              <li key={p.id} className="text-red-600">{p.name} — Stock: {p.stock}</li>
            ))}
          </ul>
        </ChartCard>
      </div>
    </div>
  );
}
