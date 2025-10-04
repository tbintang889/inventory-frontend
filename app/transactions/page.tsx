'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import DataTable from '../../components/DataTable';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    api.get('/transactions').then(res => setTransactions(res.data.transactions));
  }, []);

  const columns = [
    { key: 'id', label: 'ID', render: (t: any) => <span className="font-mono">{t.id}</span> },
    { key: 'product_name', label: 'Product' },
    { key: 'quantity', label: 'Qty', align: 'center' },
    { key: 'type', label: 'Type', align: 'center', render: (t: any) => t.type.toUpperCase() },
    { key: 'customer_name', label: 'Customer' },
    { key: 'total_amount', label: 'Total', align: 'right', render: (t: any) => `Rp ${Number(t.total_amount).toLocaleString()}` },
    { key: 'timestamp', label: 'Date', align: 'center', render: (t: any) => new Date(t.timestamp).toLocaleString() }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Transactions</h1>
        <Link href="/transactions/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + Add Transaction
          </button>
        </Link>
      </div>

      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
