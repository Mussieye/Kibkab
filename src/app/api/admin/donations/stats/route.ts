import { NextResponse } from 'next/server';
import { getDonationStats } from '@/lib/donations';
import { withAuth } from '@/lib/auth/middleware';

export const GET = withAuth(
  async () => {
    try {
      const stats = await getDonationStats();
      return NextResponse.json({ success: true, stats });
    } catch (error) {
      console.error('Error fetching donation stats:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch donation stats' },
        { status: 500 }
      );
    }
  },
  'admin'
);
