'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';

export default function NewTransactionPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [form, setForm] = useState({ productId: '', quantity: 1, type: 'sale', customerId: '' });

  useEffect(() => {
    api.get('/products?page=1&pageSize=50').then(res => setProducts(res.data.products));
    api.get('/customers').then(res => setCustomers(res.data.customers));
  }, []);

  const submit = async () => {
    const transactionId = `T${Date.now()}`;
    await api.post('/transactions', { ...form, transactionId, createdBy: 'U1' });
    alert('Transaction recorded!');
    router.push('/transactions');
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">➕ Add Transaction</h1>

      <label>Product</label>
      <select
        className="border p-2 w-full"
        value={form.productId}
        onChange={e => setForm({ ...form, productId: e.target.value })}
      >
        <option value="">-- Select Product --</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>
            {p.name} (Stock: {p.stock})
          </option>
        ))}
      </select>

      <label>Quantity</label>
      <input
        type="number"
        className="border p-2 w-full"
        value={form.quantity}
        onChange={e => setForm({ ...form, quantity: +e.target.value })}
      />

      <label>Type</label>
      <select
        className="border p-2 w-full"
        value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })}
      >
        <option value="sale">Sale</option>
        <option value="purchase">Purchase</option>
      </select>

      <label>Customer</label>
      <select
        className="border p-2 w-full"
        value={form.customerId}
        onChange={e => setForm({ ...form, customerId: e.target.value })}
      >
        <option value="">-- Select Customer --</option>
        {customers.map(c => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.category})
          </option>
        ))}
      </select>

      <button
        onClick={submit}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Transaction
      </button>
    </div>
  );
}
