import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  PhoneCall,
  Mail,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Edit2,
  Save,
  Lock,
} from 'lucide-react';

export function AdminPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const initialSampleLeads = [
    {
      id: 'SWD-84210',
      leadNumber: 'SWD-84210',
      fullName: 'Vikram Singhania',
      companyName: 'Singhania Luxury Garments',
      email: 'vikram@singhania.com',
      phone: '+91 98220 11223',
      serviceRequired: 'Meta & Google Ads',
      budget: '₹1,00,000 - ₹3,00,000',
      description: 'Looking to scale D2C apparel sales ahead of festive season.',
      sourcePage: '/services/meta-ads',
      status: 'Qualified',
      createdAt: '2026-10-28T10:14:00.000Z',
      notes: 'Initial discovery call completed. Pitching 90-day performance plan.',
    },
    {
      id: 'SWD-84209',
      leadNumber: 'SWD-84209',
      fullName: 'Dr. Sameer Joshi',
      companyName: 'Joshi Dental & Implant Center',
      email: 'dr.sameer@joshidental.in',
      phone: '+91 94221 44556',
      serviceRequired: 'Website Development',
      budget: '₹50,000 - ₹1,00,000',
      description: 'Need modern website with online appointment booking.',
      sourcePage: '/services/website-development',
      status: 'New',
      createdAt: '2026-10-27T14:32:00.000Z',
      notes: 'Form received via homepage inquiry.',
    },
    {
      id: 'SWD-84208',
      leadNumber: 'SWD-84208',
      fullName: 'Pooja Agarwal',
      companyName: 'Chai & Co. Café Chain',
      email: 'pooja@chaico.com',
      phone: '+91 99230 77889',
      serviceRequired: 'Reels & Video Production',
      budget: '₹1,00,000 - ₹3,00,000',
      description: 'Monthly 16 reels batch shoot across 4 café locations.',
      sourcePage: '/services/reels-ad-shoots',
      status: 'Meeting Scheduled',
      createdAt: '2026-10-26T09:20:00.000Z',
      notes: 'Meeting set for Thursday 3 PM at studio.',
    },
    {
      id: 'SWD-84207',
      leadNumber: 'SWD-84207',
      fullName: 'Anil Deshmukh',
      companyName: 'Marathwada Auto Components',
      email: 'anil@macparts.co.in',
      phone: '+91 98900 12345',
      serviceRequired: 'Digital Growth Strategy',
      budget: '₹3,00,000 - ₹10,00,000+',
      description: 'B2B export inquiries from Europe and Southeast Asia.',
      sourcePage: '/free-digital-audit',
      status: 'Won',
      createdAt: '2026-10-24T16:45:00.000Z',
      notes: 'Contract signed for annual retainer.',
    },
  ];

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        if (data.leads && data.leads.length > 0) {
          setLeads(data.leads);
        } else {
          setLeads(initialSampleLeads);
        }
      } else {
        setLeads(initialSampleLeads);
      }
    } catch {
      setLeads(initialSampleLeads);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
    setLeads(updated);

    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // offline fallback
    }
  };

  const handleSaveNotes = async (leadId) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, notes: editNotes, status: editStatus || l.status } : l));
    setLeads(updated);
    setEditingLeadId(null);

    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: editNotes, status: editStatus }),
      });
    } catch {
      // offline fallback
    }
  };

  const exportCSV = () => {
    const headers = ['Lead Number', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Service', 'Budget', 'Status', 'Notes'];
    const rows = leads.map((l) => [
      `"${l.leadNumber || l.id}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${l.fullName}"`,
      `"${l.companyName}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.serviceRequired}"`,
      `"${l.budget || ''}"`,
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sw-digital-hub-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.leadNumber && l.leadNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesService = serviceFilter === 'All' || l.serviceRequired.includes(serviceFilter);

    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate metrics
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === 'New').length;
  const qualifiedCount = leads.filter((l) => l.status === 'Qualified').length;
  const meetingCount = leads.filter((l) => l.status === 'Meeting Scheduled').length;
  const wonCount = leads.filter((l) => l.status === 'Won').length;

  return (
    <div className="admin-page">
      <div className="admin-top-bar">
        <div className="container admin-top-bar-inner">
          <div className="admin-title-area">
            <span className="badge-pill">SW DIGITAL HUB CRM</span>
            <h1>Inquiry &amp; Lead Management Portal</h1>
          </div>
          <div className="admin-actions-area">
            <button className="btn-secondary btn-sm" onClick={fetchLeads} title="Refresh Live Leads">
              <RefreshCw size={14} /> Refresh
            </button>
            <button className="btn-primary btn-sm" onClick={exportCSV}>
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="container admin-body">
        {/* Metric Cards Row */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-card">
            <span className="amc-label">Total Inquiries</span>
            <strong className="amc-val">{totalCount}</strong>
            <small>All Captured Leads</small>
          </div>

          <div className="admin-metric-card border-cyan">
            <span className="amc-label">New Leads</span>
            <strong className="amc-val text-cyan">{newCount}</strong>
            <small>Action Required</small>
          </div>

          <div className="admin-metric-card">
            <span className="amc-label">Qualified Prospects</span>
            <strong className="amc-val">{qualifiedCount}</strong>
            <small>Budget &amp; Scope Aligned</small>
          </div>

          <div className="admin-metric-card">
            <span className="amc-label">Meetings Scheduled</span>
            <strong className="amc-val">{meetingCount}</strong>
            <small>Strategy Calls Pending</small>
          </div>

          <div className="admin-metric-card border-green">
            <span className="amc-label">Won Contracts</span>
            <strong className="amc-val text-green">{wonCount}</strong>
            <small>Retainers Active</small>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="admin-controls-card">
          <div className="admin-search-wrap">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name, company, phone, or Lead ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="admin-filter-selects">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Meeting Scheduled">Meeting Scheduled</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
              <option value="All">All Services</option>
              <option value="Website">Website</option>
              <option value="App">Mobile App</option>
              <option value="Ads">Ads / Marketing</option>
              <option value="Social Media">Social Media</option>
              <option value="Shoots">Shoots / Production</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="admin-table-card">
          <div className="table-responsive">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Lead ID / Date</th>
                  <th>Client &amp; Company</th>
                  <th>Contact Info</th>
                  <th>Service &amp; Budget</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const isEditing = editingLeadId === lead.id;
                  return (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.leadNumber || lead.id}</strong>
                        <div className="table-sub-date">{new Date(lead.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td>
                        <div className="client-name">{lead.fullName}</div>
                        <div className="client-company">{lead.companyName}</div>
                      </td>
                      <td>
                        <div><a href={`tel:${lead.phone}`} className="phone-link"><PhoneCall size={12} /> {lead.phone}</a></div>
                        <div><a href={`mailto:${lead.email}`} className="email-link"><Mail size={12} /> {lead.email}</a></div>
                      </td>
                      <td>
                        <div className="service-badge">{lead.serviceRequired}</div>
                        <small className="budget-tag">{lead.budget || 'Custom Scope'}</small>
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="status-edit-select"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Meeting Scheduled">Meeting Scheduled</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Won">Won</option>
                            <option value="Lost">Lost</option>
                          </select>
                        ) : (
                          <span className={`status-pill status-${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {lead.status}
                          </span>
                        )}
                      </td>
                      <td className="notes-col">
                        {isEditing ? (
                          <textarea
                            rows={2}
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            className="notes-textarea"
                          />
                        ) : (
                          <p className="notes-text">{lead.notes || 'No internal notes added.'}</p>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <button
                            className="btn-save-note"
                            onClick={() => handleSaveNotes(lead.id)}
                            title="Save Changes"
                          >
                            <Save size={14} /> Save
                          </button>
                        ) : (
                          <button
                            className="btn-edit-note"
                            onClick={() => {
                              setEditingLeadId(lead.id);
                              setEditNotes(lead.notes || '');
                              setEditStatus(lead.status);
                            }}
                            title="Edit Status & Notes"
                          >
                            <Edit2 size={14} /> Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
