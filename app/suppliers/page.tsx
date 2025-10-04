'use client';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import EntityForm from '../../components/EntityForm';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  const fetchSuppliers = () => {
    api.get('/suppliers').then(res => setSuppliers(res.data.suppliers));
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'contact', label: 'Contact' },
    {
      key: 'actions', label: 'Actions', render: (s: any) => (
        <button
          onClick={() => { setEditData(s); setOpen(true); }}
          className="text-blue-600 underline"
        >
          Edit
        </button>
      )
    }
  ];

  const fields = [
    { name: 'id', label: 'Supplier ID' },
    { name: 'name', label: 'Name' },
    { name: 'contact', label: 'Contact' }
  ];

 const handleSubmit = async (values: any) => {
  if (editData) {
    await api.put(`/suppliers/${editData.id}`, values);
  } else {
    await api.post('/suppliers', values);
  }
  setOpen(false);
  setEditData(null);
  fetchSuppliers();
};


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🏭 Suppliers</h1>
        <button
          onClick={() => { setEditData(null); setOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Supplier
        </button>
      </div>

      <DataTable columns={columns} data={suppliers} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <EntityForm
          title={editData ? 'Edit Supplier' : 'Add Supplier'}
          fields={fields}
          initialValues={editData || {}}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
