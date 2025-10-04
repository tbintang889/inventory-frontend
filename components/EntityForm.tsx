'use client';
import { useState, useEffect } from 'react';

interface Field {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'select';
  options?: { value: string; label: string }[];
}

interface EntityFormProps {
  title: string;
  fields: Field[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
  onCancel: () => void;
}

export default function EntityForm({ title, fields, initialValues = {}, onSubmit, onCancel }: EntityFormProps) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">{title}</h2>
      {fields.map(f => (
        <div key={f.name}>
          <label className="block text-sm font-medium mb-1">{f.label}</label>
          {f.type === 'select' ? (
            <select
              className="border p-2 w-full rounded"
              value={values[f.name] || ''}
              onChange={e => handleChange(f.name, e.target.value)}
            >
              <option value="">-- Select --</option>
              {f.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={f.type || 'text'}
              className="border p-2 w-full rounded"
              value={values[f.name] || ''}
              onChange={e => handleChange(f.name, f.type === 'number' ? +e.target.value : e.target.value)}
            />
          )}
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </form>
  );
}
