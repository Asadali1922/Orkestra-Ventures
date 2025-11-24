import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Users, Mail, Settings, LogOut, FileText, TrendingUp, Clock, Target, 
  BarChart3, Briefcase, DollarSign, Calendar, UserCheck, Globe
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { isAdminAuthenticated, logout } = useAdminAuth();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      setLocation('/admin/login');
    }
  }, [isAdminAuthenticated, setLocation]);

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const { data: stats } = trpc.admin.getStats.useQuery();
  const { data: leads } = trpc.leads.getAll.useQuery();
  const { data: cohorts } = trpc.cohorts.getAll.useQuery();
  const { data: mentors } = trpc.mentors.getAll.useQuery();
  const { data: budgets } = trpc.budgets.getAll.useQuery();
  const { data: expenses } = trpc.expenses.getAll.useQuery();
  const { data: webPages } = trpc.webPages.getAll.useQuery();

  if (!isAdminAuthenticated) {
    return null;
  }

  // Calculate enterprise metrics
  const totalLeads = leads?.length || 0;
  const newLeads = leads?.filter(l => l.status === 'new').length || 0;
  const convertedLeads = leads?.filter(l => l.status === 'converted').length || 0;
  
  const activeCohorts = cohorts?.filter(c => c.status === 'active').length || 0;
  const totalEnrolled = cohorts?.reduce((sum, c) => sum + (c.enrolled || 0), 0) || 0;
  
  const activeMentors = mentors?.filter(m => m.status === 'active').length || 0;
  const totalSessions = mentors?.reduce((sum, m) => sum + (m.sessionsCompleted || 0), 0) || 0;
  
  const totalBudget = budgets?.reduce((sum, b) => sum + parseFloat(b.allocated), 0) || 0;
  const totalSpent = budgets?.reduce((sum, b) => sum + parseFloat(b.spent || "0"), 0) || 0;
  const budgetRemaining = totalBudget - totalSpent;
  
  const pendingExpenses = expenses?.filter(e => e.status === 'pending').length || 0;
  
  const publishedPages = webPages?.filter(p => p.status === 'published').length || 0;

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.005_240)]">
      {/* Header */}
      <header className="bg-white border-b border-[oklch(0.90_0.02_240)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[oklch(0.25_0.02_240)]">Orkestra Enterprise Control Panel</h1>
              <p className="text-sm text-[oklch(0.45_0.02_240)]">Comprehensive venture studio management</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-[oklch(0.45_0.02_240)] hover:text-[oklch(0.25_0.02_240)] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Applications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Applications</span>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-[oklch(0.25_0.02_240)]">
                {stats?.totalApplications || 0}
              </div>
              <p className="text-sm text-gray-600">Total submissions</p>
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Contacts</span>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-[oklch(0.25_0.02_240)]">
                {stats?.totalContacts || 0}
              </div>
              <p className="text-sm text-gray-600">Inquiries received</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Newsletter</span>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-[oklch(0.25_0.02_240)]">
                {stats?.totalNewsletter || 0}
              </div>
              <p className="text-sm text-gray-600">Subscribers</p>
            </div>
          </div>

          {/* Leads */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">Leads</span>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold text-[oklch(0.25_0.02_240)]">
                {totalLeads}
              </div>
              <p className="text-sm text-gray-600">{newLeads} new, {convertedLeads} converted</p>
            </div>
          </div>
        </div>

        {/* Enterprise Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Cohort Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Cohorts</h3>
                <p className="text-sm text-gray-600">Program management</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Cohorts</span>
                <span className="font-medium">{activeCohorts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Enrolled</span>
                <span className="font-medium">{totalEnrolled}</span>
              </div>
            </div>
            <button
              onClick={() => setLocation('/admin/cohorts')}
              className="mt-4 w-full bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Manage Cohorts
            </button>
          </div>

          {/* Mentor Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <UserCheck className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Mentors</h3>
                <p className="text-sm text-gray-600">Expert network</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Mentors</span>
                <span className="font-medium">{activeMentors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Sessions</span>
                <span className="font-medium">{totalSessions}</span>
              </div>
            </div>
            <button
              onClick={() => setLocation('/admin/mentors')}
              className="mt-4 w-full bg-teal-50 text-teal-600 py-2 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Manage Mentors
            </button>
          </div>

          {/* Financial Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Financials</h3>
                <p className="text-sm text-gray-600">Budget & expenses</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Budget</span>
                <span className="font-medium">${totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Remaining</span>
                <span className={`font-medium ${budgetRemaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${budgetRemaining.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending Expenses</span>
                <span className="font-medium">{pendingExpenses}</span>
              </div>
            </div>
            <button
              onClick={() => setLocation('/admin/financials')}
              className="mt-4 w-full bg-emerald-50 text-emerald-600 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              View Financials
            </button>
          </div>

          {/* Lead Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Target className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">CRM</h3>
                <p className="text-sm text-gray-600">Lead management</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Leads</span>
                <span className="font-medium">{totalLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-medium">
                  {totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
            <button
              onClick={() => setLocation('/admin/leads')}
              className="mt-4 w-full bg-amber-50 text-amber-600 py-2 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Manage Leads
            </button>
          </div>

          {/* Web Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-100 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Web Editor</h3>
                <p className="text-sm text-gray-600">Content management</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Pages</span>
                <span className="font-medium">{webPages?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Published</span>
                <span className="font-medium">{publishedPages}</span>
              </div>
            </div>
            <button
              onClick={() => setLocation('/admin/web-editor')}
              className="mt-4 w-full bg-cyan-50 text-cyan-600 py-2 rounded-lg hover:bg-cyan-100 transition-colors"
            >
              Edit Content
            </button>
          </div>

          {/* HR Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">HR Management</h3>
                <p className="text-sm text-gray-600">Employees & attendance</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Employees</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active</span>
                <span className="font-medium text-green-600">-</span>
              </div>
            </div>
            <button
              onClick={() => setLocation('/admin/hr')}
              className="mt-4 w-full bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Manage HR
            </button>
          </div>

          {/* Accounting */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Accounting</h3>
                <p className="text-sm text-gray-600">Invoices & transactions</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="font-medium text-green-600">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-medium text-yellow-600">-</span>
              </div>
            </div>
            <button
              onClick={() => setLocation('/admin/accounting')}
              className="mt-4 w-full bg-teal-50 text-teal-600 py-2 rounded-lg hover:bg-teal-100 transition-colors"
            >
              View Accounting
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Settings</h3>
                <p className="text-sm text-gray-600">System configuration</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Configure site settings, manage users, and system preferences</p>
            </div>
            <button
              onClick={() => setLocation('/admin/settings')}
              className="mt-4 w-full bg-gray-50 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Open Settings
            </button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setLocation('/admin/applications')}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow text-left"
          >
            <FileText className="w-5 h-5 text-blue-600 mb-2" />
            <div className="font-medium">Applications</div>
            <div className="text-sm text-gray-600">View submissions</div>
          </button>

          <button
            onClick={() => setLocation('/admin/contacts')}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow text-left"
          >
            <Mail className="w-5 h-5 text-green-600 mb-2" />
            <div className="font-medium">Contacts</div>
            <div className="text-sm text-gray-600">Manage inquiries</div>
          </button>

          <button
            onClick={() => setLocation('/admin/newsletter')}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow text-left"
          >
            <Users className="w-5 h-5 text-purple-600 mb-2" />
            <div className="font-medium">Newsletter</div>
            <div className="text-sm text-gray-600">Subscriber list</div>
          </button>

          <button
            onClick={() => setLocation('/admin/settings')}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow text-left"
          >
            <Settings className="w-5 h-5 text-gray-600 mb-2" />
            <div className="font-medium">Settings</div>
            <div className="text-sm text-gray-600">Configuration</div>
          </button>
        </div>
      </main>
    </div>
  );
}
