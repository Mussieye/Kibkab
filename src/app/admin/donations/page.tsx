'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DonationRecord } from '@/lib/stripe-config';
import { useAuth } from '@/contexts/auth-context';

export default function DonationsAdminPage() {
  const { user, isAuthenticated } = useAuth();
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [frequencyFilter, setFrequencyFilter] = useState<'all' | 'one-time' | 'weekly' | 'monthly'>('all');

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#090909] to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You must be an administrator to access this page.</p>
          <a href="/ember-login" className="px-6 py-3 bg-gold text-black rounded-lg hover:bg-gold/90 transition font-medium">
            Log In
          </a>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchDonations();
    fetchStats();
  }, [filter, frequencyFilter]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);
      if (frequencyFilter !== 'all') params.append('frequency', frequencyFilter);

      const response = await fetch(`/api/admin/donations?${params.toString()}`);
      const data = await response.json();
      setDonations(data.donations || []);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/donations/stats');
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'refunded':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels: Record<string, string> = {
      'one-time': 'One-time',
      'weekly': 'Weekly',
      'monthly': 'Monthly',
    };
    return labels[frequency] || frequency;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090909] to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gold mb-2">💰 Donation Management</h1>
            <p className="text-gray-400">View and manage all church donations</p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-royal-purple text-white rounded-lg hover:bg-royal-purple/90 transition"
          >
            ← Back to Admin
          </Link>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur border border-gold/20 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Total Donations</p>
              <p className="text-3xl font-bold text-gold">{stats.totalDonations}</p>
            </div>

            <div className="bg-white/10 backdrop-blur border border-gold/20 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Total Amount</p>
              <p className="text-3xl font-bold text-gold">{formatCurrency(stats.totalAmount)}</p>
            </div>

            <div className="bg-white/10 backdrop-blur border border-gold/20 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Average Donation</p>
              <p className="text-3xl font-bold text-gold">{formatCurrency(stats.averageAmount)}</p>
            </div>

            <div className="bg-white/10 backdrop-blur border border-gold/20 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Recurring Donors</p>
              <p className="text-3xl font-bold text-gold">{stats.recurringCount}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur border border-gold/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-4 py-2 bg-gray-900 border border-gold/30 rounded text-white hover:border-gold transition"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Frequency</label>
              <select
                value={frequencyFilter}
                onChange={(e) => setFrequencyFilter(e.target.value as any)}
                className="w-full px-4 py-2 bg-gray-900 border border-gold/30 rounded text-white hover:border-gold transition"
              >
                <option value="all">All</option>
                <option value="one-time">One-time</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white/10 backdrop-blur border border-gold/20 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">Loading donations...</p>
            </div>
          ) : donations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No donations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-royal-purple/20 border-b border-gold/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Donor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Frequency</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Session ID</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation, idx) => (
                    <tr
                      key={donation.sessionId}
                      className={`border-b border-gold/10 ${idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'} hover:bg-white/10 transition`}
                    >
                      <td className="px-6 py-4 text-sm text-white">{donation.donorName}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{donation.donorEmail}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gold">{formatCurrency(donation.amount)}</td>
                      <td className="px-6 py-4 text-sm text-white">{getFrequencyLabel(donation.frequency)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(donation.status)}`}>
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{formatDate(donation.createdAt)}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-mono truncate max-w-xs">{donation.sessionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Breakdown by Frequency */}
        {stats && stats.byFrequency && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(stats.byFrequency).map(([freq, data]: any) => (
              <div key={freq} className="bg-white/10 backdrop-blur border border-gold/20 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">{getFrequencyLabel(freq)} Donations</p>
                <p className="text-2xl font-bold text-gold mb-2">{data.count}</p>
                <p className="text-gray-400 text-sm">{formatCurrency(data.total)} total</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
