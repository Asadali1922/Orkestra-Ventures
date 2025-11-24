import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { ArrowLeft, Settings, Database, Bell, Shield, Globe } from 'lucide-react';

export default function AdminSettings() {
  const [, setLocation] = useLocation();
  const { isAdminAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      setLocation('/admin/login');
    }
  }, [isAdminAuthenticated, setLocation]);

  if (!isAdminAuthenticated) {
    return null;
  }

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
              <h1 className="text-2xl font-bold text-[oklch(0.25_0.02_240)]">Settings</h1>
              <p className="text-sm text-[oklch(0.45_0.02_240)]">Configure website and admin panel settings</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h2 className="text-xl font-bold text-[oklch(0.25_0.02_240)] mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[oklch(0.25_0.02_240)] mb-2">
                  Website Name
                </label>
                <input
                  type="text"
                  defaultValue="Orkestra Ventures"
                  className="w-full px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.25_0.02_240)] mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="info@orkestra.ventures"
                  className="w-full px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.25_0.02_240)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+201114156734"
                  className="w-full px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)]"
                />
              </div>
            </div>
          </div>

          {/* Database Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h2 className="text-xl font-bold text-[oklch(0.25_0.02_240)] mb-6 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[oklch(0.98_0.005_240)] rounded-lg">
                <div>
                  <p className="font-medium text-[oklch(0.25_0.02_240)]">Database Status</p>
                  <p className="text-sm text-[oklch(0.45_0.02_240)]">Connected to TiDB Cloud</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[oklch(0.98_0.005_240)] rounded-lg">
                <div>
                  <p className="font-medium text-[oklch(0.25_0.02_240)]">Auto Backup</p>
                  <p className="text-sm text-[oklch(0.45_0.02_240)]">Daily backups at 2:00 AM</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[oklch(0.55_0.15_240_/_0.2)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[oklch(0.55_0.15_240)]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h2 className="text-xl font-bold text-[oklch(0.25_0.02_240)] mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[oklch(0.98_0.005_240)] rounded-lg">
                <div>
                  <p className="font-medium text-[oklch(0.25_0.02_240)]">New Applications</p>
                  <p className="text-sm text-[oklch(0.45_0.02_240)]">Get notified when someone applies</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[oklch(0.55_0.15_240_/_0.2)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[oklch(0.55_0.15_240)]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-[oklch(0.98_0.005_240)] rounded-lg">
                <div>
                  <p className="font-medium text-[oklch(0.25_0.02_240)]">Contact Messages</p>
                  <p className="text-sm text-[oklch(0.45_0.02_240)]">Get notified of new contact form submissions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[oklch(0.55_0.15_240_/_0.2)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[oklch(0.55_0.15_240)]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-[oklch(0.98_0.005_240)] rounded-lg">
                <div>
                  <p className="font-medium text-[oklch(0.25_0.02_240)]">Newsletter Subscriptions</p>
                  <p className="text-sm text-[oklch(0.45_0.02_240)]">Get notified of new newsletter subscribers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[oklch(0.55_0.15_240_/_0.2)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[oklch(0.55_0.15_240)]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h2 className="text-xl font-bold text-[oklch(0.25_0.02_240)] mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[oklch(0.25_0.02_240)] mb-2">
                  Admin Username
                </label>
                <input
                  type="text"
                  defaultValue="admin"
                  disabled
                  className="w-full px-4 py-2 border border-[oklch(0.90_0.02_240)] rounded-lg bg-[oklch(0.96_0.005_240)] text-[oklch(0.45_0.02_240)] cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.25_0.02_240)] mb-2">
                  Change Password
                </label>
                <button className="px-4 py-2 bg-[oklch(0.55_0.15_240)] text-white rounded-lg hover:bg-[oklch(0.50_0.15_240)] transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Website Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[oklch(0.90_0.02_240)]">
            <h2 className="text-xl font-bold text-[oklch(0.25_0.02_240)] mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Website Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[oklch(0.98_0.005_240)] rounded-lg">
                <div>
                  <p className="font-medium text-[oklch(0.25_0.02_240)]">Maintenance Mode</p>
                  <p className="text-sm text-[oklch(0.45_0.02_240)]">Put website in maintenance mode</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[oklch(0.55_0.15_240_/_0.2)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[oklch(0.55_0.15_240)]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-[oklch(0.98_0.005_240)] rounded-lg">
                <div>
                  <p className="font-medium text-[oklch(0.25_0.02_240)]">Accept Applications</p>
                  <p className="text-sm text-[oklch(0.45_0.02_240)]">Allow new program applications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[oklch(0.55_0.15_240_/_0.2)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[oklch(0.55_0.15_240)]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setLocation('/admin/dashboard')}
              className="px-6 py-2 border border-[oklch(0.90_0.02_240)] text-[oklch(0.45_0.02_240)] rounded-lg hover:bg-[oklch(0.96_0.005_240)] transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-[oklch(0.55_0.15_240)] text-white rounded-lg hover:bg-[oklch(0.50_0.15_240)] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
