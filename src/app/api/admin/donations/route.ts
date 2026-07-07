import { NextRequest, NextResponse } from 'next/server';
import { getAllDonations } from '@/lib/donations';
import { withAuth } from '@/lib/auth/middleware';

export const GET = withAuth(
  async (request: NextRequest) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      const status = searchParams.get('status') as any;
      const frequency = searchParams.get('frequency') as any;

      const donations = await getAllDonations({
        status: status || undefined,
        frequency: frequency || undefined,
      });

      return NextResponse.json({
        success: true,
        donations,
        count: donations.length,
      });
    } catch (error) {
      console.error('Error fetching donations:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch donations' },
        { status: 500 }
      );
    }
  },
  'admin'
);
