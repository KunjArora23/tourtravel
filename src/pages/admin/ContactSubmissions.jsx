import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PAGE_SIZE = 20;

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [emailFilter, setEmailFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const params = { page, limit: PAGE_SIZE };
      if (emailFilter) params.email = emailFilter;
      if (dateFilter) params.date = dateFilter;
      const res = await axios.get('/api/v1/contact/admin/submissions', { params, withCredentials: true });
      setSubmissions(Array.isArray(res.data.data) ? res.data.data : []);
      setTotal(res.data.total);
    } catch (e) {
      setSubmissions([]);
      setTotal(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line
  }, [page, emailFilter, dateFilter]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Form Submissions</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="email"
          placeholder="Filter by email"
          value={emailFilter}
          onChange={e => { setEmailFilter(e.target.value); setPage(1); }}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={e => { setDateFilter(e.target.value); setPage(1); }}
          className="border px-3 py-2 rounded"
        />
        <button onClick={fetchSubmissions} className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Inquiry Type</th>
              <th className="p-2 border">Meeting Date</th>
              <th className="p-2 border">Meeting Time</th>
              <th className="p-2 border">Submitted</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center p-4">Loading...</td></tr>
            ) : !Array.isArray(submissions) || submissions.length === 0 ? (
              <tr><td colSpan={8} className="text-center p-4">No submissions found.</td></tr>
            ) : (
              submissions.map(sub => (
                <tr key={sub._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{sub.name}</td>
                  <td className="p-2 border">{sub.email}</td>
                  <td className="p-2 border">{sub.phone}</td>
                  <td className="p-2 border">{sub.inquiryType}</td>
                  <td className="p-2 border">{sub.meetingDate || '-'}</td>
                  <td className="p-2 border">{sub.meetingTime || '-'}</td>
                  <td className="p-2 border">{new Date(sub.createdAt).toLocaleString()}</td>
                  <td className="p-2 border">
                    <button className="text-blue-600 underline" onClick={() => setSelected(sub)}>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>Page {page} of {Math.ceil(total / PAGE_SIZE) || 1}</span>
        <div className="space-x-2">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <button disabled={page * PAGE_SIZE >= total} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setSelected(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Submission Details</h2>
            <div className="space-y-2">
              {Object.entries(selected).map(([key, value]) => (
                key !== "_id" && key !== "__v" && (
                  <div key={key}>
                    <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {Array.isArray(value) ? value.join(', ') : value?.toString()}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissions; 