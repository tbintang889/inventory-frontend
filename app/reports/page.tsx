'use client';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import ChartCard from '../../components/ChartCard';
import DateFilter from '../../components/DateFilter';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
const apply = () => {
  if (start && end) {
    onChange({ start, end });
  } else {
    // fallback: kirim null → backend pakai default
    onChange({ start: '', end: '' });
  }
};
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function ReportsPage() {
  const [range, setRange] = useState<{start: string, end: string} | null>(null);
  const [monthlySales, setMonthlySales] = useState<any[]>([]);
  const [groupSales, setGroupSales] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  const fetchData = () => {
    const params = range ? `?start=${range.start}&end=${range.end}` : '';
    api.get(`/reports/sales${params}`).then(res => setMonthlySales(res.data.sales));
    api.get(`/reports/group-sales${params}`).then(res => setGroupSales(res.data.groups));
    api.get(`/reports/top-products${params}`).then(res => setTopProducts(res.data.products));
  };

  useEffect(() => { fetchData(); }, [range]);

  const monthlyData = {
    labels: monthlySales.map((m: any) => `Bulan ${m.month}`),
    datasets: [{
      label: 'Sales',
      data: monthlySales.map((m: any) => m.total),
      backgroundColor: 'rgba(59,130,246,0.7)',
      borderRadius: 6
    }]
  };

  const groupData = {
    labels: groupSales.map((g: any) => g.category),
    datasets: [{
      data: groupSales.map((g: any) => g.total),
      backgroundColor: ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#14b8a6']
    }]
  };

  const topData = {
    labels: topProducts.map((p: any) => p.name),
    datasets: [{
      label: 'Sales Value',
      data: topProducts.map((p: any) => p.total),
      backgroundColor: 'rgba(16,185,129,0.7)',
      borderRadius: 4
    }]
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800">📊 Reports</h1>
        <span className="text-sm text-gray-500 italic">
          {range ? `${range.start} → ${range.end}` : 'All time'}
        </span>
      </div>

      <DateFilter onChange={setRange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Penjualan per Bulan">
          {monthlySales.length ? <Bar data={monthlyData} /> : <p className="text-gray-400">No data</p>}
        </ChartCard>

        <ChartCard title="Penjualan per Group Barang">
          {groupSales.length ? <Pie data={groupData} /> : <p className="text-gray-400">No data</p>}
        </ChartCard>
      </div>

      <ChartCard title="10 Produk Terlaris">
        {topProducts.length ? (
          <Bar data={topData} options={{ indexAxis: 'y' }} />
        ) : (
          <p className="text-gray-400">No data</p>
        )}
      </ChartCard>
    </div>
  );
}
