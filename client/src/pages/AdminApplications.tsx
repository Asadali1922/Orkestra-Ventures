import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { ArrowLeft, Search, Download, Eye, Mail, Phone, Calendar, MapPin, Briefcase, GraduationCap, Target, Linkedin, Globe, X, Trash2, CheckCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function AdminApplications() {
  const [, setLocation] = useLocation();
  const { isAdminAuthenticated } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrack, setFilterTrack] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const { data: applications, isLoading, refetch } = trpc.admin.getAllApplications.useQuery();
  
  const updateStatus = trpc.admin.updateApplicationStatus.useMutation({
    onSuccess: () => {
      toast.success('Application status updated successfully');
      refetch();
    },
    onError: () => {
      toast.error('Failed to update application status');
    },
  });

  const deleteApp = trpc.admin.deleteApplication.useMutation({
    onSuccess: () => {
      toast.success('Application deleted successfully');
      setSelectedApplication(null);
      refetch();
    },
    onError: () => {
      toast.error('Failed to delete application');
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

  const filteredApplications = applications?.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = filterTrack === 'all' || app.track === filterTrack;
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesTrack && matchesStatus;
  }) || [];

  const handleStatusChange = (id: number, status: "pending" | "reviewing" | "accepted" | "rejected") => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      deleteApp.mutate({ id });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewing': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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
              <h1 className="text-2xl font-bold text-[oklch(0.25_0.02_240)]">Applications Management</h1>
              <p className="text-sm text-[oklch(0.45_0.02_240)]">View and manage program applications</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[oklch(0.45_0.02_240)]" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
              />
            </div>
            <select
              value={filterTrack}
              onChange={(e) => setFilterTrack(e.target.value)}
              className="px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
            >
              <option value="all">All Tracks</option>
              <option value="technical">Technical Track</option>
              <option value="business">Business Track</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
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
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">{applications?.length || 0}</h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">Total Applications</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">
              {applications?.filter(a => a.status === 'pending').length || 0}
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">Pending Review</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">
              {applications?.filter(a => a.status === 'reviewing').length || 0}
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">Under Review</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h3 className="text-2xl font-bold text-[oklch(0.25_0.02_240)] mb-1">
              {applications?.filter(a => a.status === 'accepted').length || 0}
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_240)]">Accepted</p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-[oklch(0.90_0.02_240)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[oklch(0.96_0.005_240)] border-b border-[oklch(0.90_0.02_240)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Applicant</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Track</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Career Path</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.25_0.02_240)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[oklch(0.90_0.02_240)]">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[oklch(0.45_0.02_240)]">
                      Loading applications...
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[oklch(0.45_0.02_240)]">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-[oklch(0.98_0.005_240)] transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-[oklch(0.25_0.02_240)]">{app.fullName}</div>
                          <div className="text-sm text-[oklch(0.45_0.02_240)]">{app.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-[oklch(0.25_0.02_240)]">{app.track}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-[oklch(0.25_0.02_240)]">{app.careerPath}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)} border-0 cursor-pointer`}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-[oklch(0.45_0.02_240)]">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="p-2 text-[oklch(0.55_0.15_240)] hover:bg-[oklch(0.96_0.005_240)] rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[oklch(0.90_0.02_240)] px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[oklch(0.25_0.02_240)]">Application Details</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-[oklch(0.96_0.005_240)] rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-[oklch(0.25_0.02_240)] mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[oklch(0.98_0.005_240)] p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)]">Full Name</p>
                    <p className="font-medium text-[oklch(0.25_0.02_240)]">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)]">Email</p>
                    <p className="font-medium text-[oklch(0.25_0.02_240)]">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)]">Phone</p>
                    <p className="font-medium text-[oklch(0.25_0.02_240)]">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)]">Location</p>
                    <p className="font-medium text-[oklch(0.25_0.02_240)]">{selectedApplication.city}, {selectedApplication.country}</p>
                  </div>
                </div>
              </div>

              {/* Program Selection */}
              <div>
                <h3 className="text-lg font-semibold text-[oklch(0.25_0.02_240)] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Program Selection
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[oklch(0.98_0.005_240)] p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)]">Track</p>
                    <p className="font-medium text-[oklch(0.25_0.02_240)] capitalize">{selectedApplication.track}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)]">Career Path</p>
                    <p className="font-medium text-[oklch(0.25_0.02_240)] capitalize">{selectedApplication.careerPath}</p>
                  </div>
                </div>
              </div>

              {/* Background */}
              <div>
                <h3 className="text-lg font-semibold text-[oklch(0.25_0.02_240)] mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Background
                </h3>
                <div className="space-y-4 bg-[oklch(0.98_0.005_240)] p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)]">Education</p>
                    <p className="font-medium text-[oklch(0.25_0.02_240)]">{selectedApplication.education}</p>
                  </div>
                  {selectedApplication.currentRole && (
                    <div>
                      <p className="text-sm text-[oklch(0.45_0.02_240)]">Current Role</p>
                      <p className="font-medium text-[oklch(0.25_0.02_240)]">{selectedApplication.currentRole}</p>
                    </div>
                  )}
                  {selectedApplication.yearsExperience && (
                    <div>
                      <p className="text-sm text-[oklch(0.45_0.02_240)]">Years of Experience</p>
                      <p className="font-medium text-[oklch(0.25_0.02_240)]">{selectedApplication.yearsExperience} years</p>
                    </div>
                  )}
                  {selectedApplication.technicalBackground && (
                    <div>
                      <p className="text-sm text-[oklch(0.45_0.02_240)]">Technical Background</p>
                      <p className="font-medium text-[oklch(0.25_0.02_240)]">{selectedApplication.technicalBackground}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Motivation & Goals */}
              <div>
                <h3 className="text-lg font-semibold text-[oklch(0.25_0.02_240)] mb-4">Motivation & Goals</h3>
                <div className="space-y-4 bg-[oklch(0.98_0.005_240)] p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)] mb-2">Why join Orkestra Ventures?</p>
                    <p className="text-[oklch(0.25_0.02_240)]">{selectedApplication.motivation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[oklch(0.45_0.02_240)] mb-2">Career Goals</p>
                    <p className="text-[oklch(0.25_0.02_240)]">{selectedApplication.goals}</p>
                  </div>
                </div>
              </div>

              {/* Links */}
              {(selectedApplication.linkedinUrl || selectedApplication.portfolioUrl) && (
                <div>
                  <h3 className="text-lg font-semibold text-[oklch(0.25_0.02_240)] mb-4">Links</h3>
                  <div className="flex gap-4">
                    {selectedApplication.linkedinUrl && (
                      <a
                        href={selectedApplication.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[oklch(0.55_0.15_240)] text-white rounded-lg hover:bg-[oklch(0.50_0.15_240)] transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn Profile
                      </a>
                    )}
                    {selectedApplication.portfolioUrl && (
                      <a
                        href={selectedApplication.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[oklch(0.65_0.12_180)] text-white rounded-lg hover:bg-[oklch(0.60_0.12_180)] transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-[oklch(0.90_0.02_240)]">
                <select
                  value={selectedApplication.status}
                  onChange={(e) => {
                    handleStatusChange(selectedApplication.id, e.target.value as any);
                    setSelectedApplication({ ...selectedApplication, status: e.target.value });
                  }}
                  className="flex-1 px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button
                  onClick={() => {
                    handleDelete(selectedApplication.id);
                  }}
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
