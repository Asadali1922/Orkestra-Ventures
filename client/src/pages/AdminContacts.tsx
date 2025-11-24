import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { ArrowLeft, Search, Download, Eye, Mail, Phone, Calendar, MessageSquare, X, Trash2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function AdminContacts() {
  const [, setLocation] = useLocation();
  const { isAdminAuthenticated } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const { data: contacts, isLoading, refetch } = trpc.admin.getAllContacts.useQuery();
  
  const updateStatus = trpc.admin.updateContactStatus.useMutation({
    onSuccess: () => {
      toast.success('Contact status updated successfully');
      refetch();
    },
    onError: () => {
      toast.error('Failed to update contact status');
    },
  });

  const deleteContact = trpc.admin.deleteContact.useMutation({
    onSuccess: () => {
      toast.success('Contact deleted successfully');
      setSelectedContact(null);
      refetch();
    },
    onError: () => {
      toast.error('Failed to delete contact');
    },
  });

  useEffect(() => {
    if (!isAdminAuthenticated) {
      setLocation('/admin/login');
    }
  }, [isAdminAuthenticated, setLocation]);

  if (!isAdminAuthenticated) {
    return null;
  }

  const filteredContacts = contacts?.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleStatusChange = (id: number, status: "new" | "in_progress" | "resolved") => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      deleteContact.mutate({ id });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.005_240)]">
      {/* Header */}
      <header className="bg-white border-b border-[oklch(0.90_0.02_240)] sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation('/admin/dashboard')}
              className="flex items-center gap-2 text-[oklch(0.45_0.02_240)] hover:text-[oklch(0.25_0.02_240)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[oklch(0.25_0.02_240)]">Contact Messages</h1>
              <p className="text-sm text-[oklch(0.45_0.02_240)]">View and respond to inquiries</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[oklch(0.45_0.02_240)]" />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[oklch(0.55_0.15_240)] text-white rounded-lg hover:bg-[oklch(0.50_0.15_240)] transition-colors">
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">{contacts?.length || 0}</h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">Total Messages</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">
              {contacts?.filter(c => c.status === 'new').length || 0}
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">New Messages</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">
              {contacts?.filter(c => c.status === 'in_progress').length || 0}
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">In Progress</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">
              {contacts?.filter(c => c.status === 'resolved').length || 0}
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">Resolved</p>
          </div>
        </div>

        {/* Contacts List */}
        <div className="bg-white rounded-xl shadow-sm border border-[oklch(0.90_0.02_240)] overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-[oklch(0.45_0.02_240)]">
              Loading messages...
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-12 text-center text-[oklch(0.45_0.02_240)]">
              <p>No messages found</p>
              <p className="text-sm mt-2">Contact messages will appear here once submitted through the website</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[oklch(0.98_0.005_240)] border-b border-[oklch(0.90_0.02_240)]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[oklch(0.90_0.02_240)]">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-[oklch(0.98_0.005_240)] transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-[oklch(0.25_0.02_240)]">{contact.name}</div>
                          <div className="text-sm text-[oklch(0.45_0.02_240)]">{contact.email}</div>
                          {contact.phone && (
                            <div className="text-sm text-[oklch(0.45_0.02_240)]">{contact.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[oklch(0.25_0.02_240)]">{contact.subject}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={contact.status}
                          onChange={(e) => handleStatusChange(contact.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)} border-0 cursor-pointer`}
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-[oklch(0.45_0.02_240)]">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedContact(contact)}
                            className="p-2 text-[oklch(0.55_0.15_240)] hover:bg-[oklch(0.96_0.005_240)] rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(contact.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Contact"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedContact(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[oklch(0.90_0.02_240)] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[oklch(0.25_0.02_240)]">Contact Message</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-[oklch(0.96_0.005_240)] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-[oklch(0.25_0.02_240)] mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[oklch(0.45_0.02_240)] mt-0.5" />
                    <div>
                      <div className="text-sm text-[oklch(0.45_0.02_240)]">Email</div>
                      <div className="font-medium text-[oklch(0.25_0.02_240)]">{selectedContact.email}</div>
                    </div>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[oklch(0.45_0.02_240)] mt-0.5" />
                      <div>
                        <div className="text-sm text-[oklch(0.45_0.02_240)]">Phone</div>
                        <div className="font-medium text-[oklch(0.25_0.02_240)]">{selectedContact.phone}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[oklch(0.45_0.02_240)] mt-0.5" />
                    <div>
                      <div className="text-sm text-[oklch(0.45_0.02_240)]">Received</div>
                      <div className="font-medium text-[oklch(0.25_0.02_240)]">
                        {new Date(selectedContact.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-[oklch(0.45_0.02_240)] mt-0.5" />
                    <div>
                      <div className="text-sm text-[oklch(0.45_0.02_240)]">Subject</div>
                      <div className="font-medium text-[oklch(0.25_0.02_240)]">{selectedContact.subject}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-semibold text-[oklch(0.25_0.02_240)] mb-2">Message</h3>
                <div className="bg-[oklch(0.98_0.005_240)] rounded-lg p-4">
                  <p className="text-[oklch(0.35_0.02_240)] whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-[oklch(0.90_0.02_240)]">
                <select
                  value={selectedContact.status}
                  onChange={(e) => {
                    handleStatusChange(selectedContact.id, e.target.value as any);
                    setSelectedContact({ ...selectedContact, status: e.target.value });
                  }}
                  className="flex-1 px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="px-6 py-2 bg-[oklch(0.55_0.15_240)] text-white rounded-lg hover:bg-[oklch(0.50_0.15_240)] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Reply
                </a>
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
