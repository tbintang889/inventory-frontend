'use client';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import EntityForm from '../../components/EntityForm';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  const fetchCustomers = () => {
    api.get('/customers').then(res => setCustomers(res.data.customers));
  };

  useEffect(() => { fetchCustomers(); }, []);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    {
      key: 'actions', label: 'Actions', render: (c: any) => (
        <button
          onClick={() => { setEditData(c); setOpen(true); }}
          className="text-blue-600 underline"
        >
          Edit
        </button>
      )
    }
  ];

  const fields = [
    { name: 'id', label: 'Customer ID' },
    { name: 'name', label: 'Name' },
    { name: 'category', label: 'Category', type: 'select', options: [
      { value: 'regular', label: 'Regular' },
      { value: 'premium', label: 'Premium' }
    ]}
  ];

  const handleSubmit = async (values: any) => {
  if (editData) {
    await api.put(`/customers/${editData.id}`, values); // untuk Customers
  } else {
    await api.post('/customers', values);
  }
  setOpen(false);
  setEditData(null);
  fetchCustomers();
};


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">👥 Customers</h1>
        <button
          onClick={() => { setEditData(null); setOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Customer
        </button>
      </div>

      <DataTable columns={columns} data={customers} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <EntityForm
          title={editData ? 'Edit Customer' : 'Add Customer'}
          fields={fields}
          initialValues={editData || {}}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
