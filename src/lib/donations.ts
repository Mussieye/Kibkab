import { DonationRecord } from './stripe-config';

// In-memory store for donations (would be replaced with a real database)
// This demonstrates the structure; in production, use a proper DB like Postgres, MongoDB, etc.
let donationsStore: DonationRecord[] = [];

/**
 * Store a donation record
 */
export async function storeDonationRecord(donation: Omit<DonationRecord, 'id'>): Promise<DonationRecord> {
  const id = `don_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const record: DonationRecord = {
    id,
    ...donation,
  };

  donationsStore.push(record);
  
  // In production, persist to database here
  console.log(`[DONATION STORED] ID: ${id}, Amount: $${donation.amount}, Donor: ${donation.donorEmail}`);
  
  return record;
}

/**
 * Retrieve donation record by session ID
 */
export async function getDonationBySessionId(sessionId: string): Promise<DonationRecord | null> {
  return donationsStore.find(d => d.sessionId === sessionId) || null;
}

/**
 * Retrieve donation record by ID
 */
export async function getDonationById(id: string): Promise<DonationRecord | null> {
  return donationsStore.find(d => d.id === id) || null;
}

/**
 * Get all donations (for admin dashboard)
 */
export async function getAllDonations(filters?: {
  status?: DonationRecord['status'];
  frequency?: DonationRecord['frequency'];
  startDate?: Date;
  endDate?: Date;
}): Promise<DonationRecord[]> {
  let filtered = [...donationsStore];

  if (filters?.status) {
    filtered = filtered.filter(d => d.status === filters.status);
  }

  if (filters?.frequency) {
    filtered = filtered.filter(d => d.frequency === filters.frequency);
  }

  if (filters?.startDate) {
    filtered = filtered.filter(d => new Date(d.createdAt) >= filters.startDate!);
  }

  if (filters?.endDate) {
    filtered = filtered.filter(d => new Date(d.createdAt) <= filters.endDate!);
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get donation statistics
 */
export async function getDonationStats(): Promise<{
  totalDonations: number;
  totalAmount: number;
  averageAmount: number;
  byFrequency: Record<string, { count: number; total: number }>;
  byStatus: Record<string, number>;
  recurringCount: number;
}> {
  const donations = await getAllDonations({ status: 'completed' });

  const stats = {
    totalDonations: donations.length,
    totalAmount: donations.reduce((sum, d) => sum + d.amount, 0),
    averageAmount: donations.length > 0 ? donations.reduce((sum, d) => sum + d.amount, 0) / donations.length : 0,
    byFrequency: {} as Record<string, { count: number; total: number }>,
    byStatus: {} as Record<string, number>,
    recurringCount: donationsStore.filter(d => d.frequency !== 'one-time').length,
  };

  // Group by frequency
  donations.forEach(d => {
    if (!stats.byFrequency[d.frequency]) {
      stats.byFrequency[d.frequency] = { count: 0, total: 0 };
    }
    stats.byFrequency[d.frequency].count++;
    stats.byFrequency[d.frequency].total += d.amount;
  });

  // Group by status
  donationsStore.forEach(d => {
    stats.byStatus[d.status] = (stats.byStatus[d.status] || 0) + 1;
  });

  return stats;
}

/**
 * Update donation status
 */
export async function updateDonationStatus(
  sessionId: string,
  status: DonationRecord['status'],
  completedAt?: Date
): Promise<DonationRecord | null> {
  const donation = donationsStore.find(d => d.sessionId === sessionId);

  if (donation) {
    donation.status = status;
    if (completedAt) {
      donation.completedAt = completedAt;
    }
    console.log(`[DONATION UPDATED] Session: ${sessionId}, New Status: ${status}`);
  }

  return donation || null;
}

/**
 * Get donations by email
 */
export async function getDonationsByEmail(email: string): Promise<DonationRecord[]> {
  return donationsStore.filter(d => d.donorEmail.toLowerCase() === email.toLowerCase());
}

/**
 * Calculate total given by a donor
 */
export async function getTotalDonatedByDonor(email: string): Promise<number> {
  const donations = await getDonationsByEmail(email);
  return donations
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);
}

/**
 * Export donations as CSV (for admin reports)
 */
export function exportDonationsAsCSV(donations: DonationRecord[]): string {
  const headers = ['ID', 'Session ID', 'Amount', 'Currency', 'Frequency', 'Status', 'Donor Name', 'Donor Email', 'Created At', 'Completed At'];
  const rows = donations.map(d => [
    d.id,
    d.sessionId,
    d.amount,
    d.currency,
    d.frequency,
    d.status,
    d.donorName,
    d.donorEmail,
    new Date(d.createdAt).toISOString(),
    d.completedAt ? new Date(d.completedAt).toISOString() : '',
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  return csv;
}
