import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { ArrowLeft, Search, Download, Mail, Calendar, UserMinus } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function AdminNewsletter() {
  const [, setLocation] = useLocation();
  const { isAdminAuthenticated } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: subscribers, isLoading, refetch } = trpc.admin.getAllNewsletter.useQuery();
  
  const unsubscribe = trpc.admin.unsubscribeNewsletter.useMutation({
    onSuccess: () => {
      toast.success('Subscriber removed successfully');
      refetch();
    },
    onError: () => {
      toast.error('Failed to remove subscriber');
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

  const filteredSubscribers = subscribers?.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  }) || [];

  const handleUnsubscribe = (id: number, email: string) => {
    if (confirm(`Are you sure you want to unsubscribe ${email}? This action cannot be undone.`)) {
      unsubscribe.mutate({ id });
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
              <h1 className="text-2xl font-bold text-[oklch(0.25_0.02_240)]">Newsletter Subscribers</h1>
              <p className="text-sm text-[oklch(0.45_0.02_240)]">Manage newsletter subscriptions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[oklch(0.45_0.02_240)]" />
              <input
                type="text"
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[oklch(0.55_0.15_240)] text-white rounded-lg hover:bg-[oklch(0.50_0.15_240)] transition-colors">
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">{subscribers?.length || 0}</h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">Active Subscribers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">{filteredSubscribers.length}</h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">Filtered Results</p>
          </div>
        </div>

        {/* Subscribers List */}
        <div className="bg-white rounded-xl shadow-sm border border-[oklch(0.90_0.02_240)] overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-[oklch(0.45_0.02_240)]">
              Loading subscribers...
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="p-12 text-center text-[oklch(0.45_0.02_240)]">
              <p>No subscribers found</p>
              <p className="text-sm mt-2">Newsletter subscribers will appear here once they sign up</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[oklch(0.96_0.005_240)] border-b border-[oklch(0.90_0.02_240)]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Subscribed Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[oklch(0.90_0.02_240)]">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-[oklch(0.98_0.005_240)] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[oklch(0.45_0.02_240)]" />
                          <span className="font-medium text-[oklch(0.25_0.02_240)]">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[oklch(0.25_0.02_240)]">
                        {subscriber.name || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-[oklch(0.45_0.02_240)]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(subscriber.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleUnsubscribe(subscriber.id, subscriber.email)}
                          className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <UserMinus className="w-4 h-4" />
                          Unsubscribe
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
