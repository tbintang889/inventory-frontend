'use client';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import EntityForm from '../../components/EntityForm';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  const fetchProducts = () => {
    api.get('/products?page=1&pageSize=50').then(res => setProducts(res.data.products));
  };

  useEffect(() => { fetchProducts(); }, []);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price', align: 'right', render: (p: any) => `Rp ${Number(p.price).toLocaleString()}` },
    { key: 'stock', label: 'Stock', align: 'center' },
    { key: 'category', label: 'Category' },
    {
      key: 'actions', label: 'Actions', render: (p: any) => (
        <button
          onClick={() => { setEditData(p); setOpen(true); }}
          className="text-blue-600 underline"
        >
          Edit
        </button>
      )
    }
  ];

  const fields = [
    { name: 'id', label: 'Product ID' },
    { name: 'name', label: 'Name' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'stock', label: 'Stock', type: 'number' },
    { name: 'category', label: 'Category' }
  ];

  const handleSubmit = async (values: any) => {
    if (editData) {
      await api.put(`/products/${editData.id}`, values);
    } else {
      await api.post('/products', {
        productId: values.id,
        name: values.name,
        price: values.price,
        stock: values.stock,
        category: values.category,
        createdBy: 'U1'
      });
    }
    setOpen(false);
    setEditData(null);
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">📦 Products</h1>
        <button
          onClick={() => { setEditData(null); setOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      <DataTable columns={columns} data={products} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <EntityForm
          title={editData ? 'Edit Product' : 'Add Product'}
          fields={fields}
          initialValues={editData || {}}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
