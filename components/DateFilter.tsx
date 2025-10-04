'use client';
import { useState } from 'react';

export default function DateFilter({ onChange }: { onChange: (range: {start: string, end: string}) => void }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const apply = () => {
    if (start && end) onChange({ start, end });
  };

  return (
    <div className="flex items-center space-x-2 mb-6">
      <input type="date" value={start} onChange={e => setStart(e.target.value)} className="border p-2 rounded"/>
      <span>to</span>
      <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="border p-2 rounded"/>
      <button onClick={apply} className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
    </div>
  );
}
