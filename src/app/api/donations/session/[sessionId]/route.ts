import { NextRequest, NextResponse } from 'next/server';
import { getDonationBySessionId } from '@/lib/donations';

/**
 * GET /api/donations/session/[sessionId]
 * Retrieves a specific donation by session ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const donation = await getDonationBySessionId(sessionId);

    if (!donation) {
      return NextResponse.json(
        { success: false, error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      donation,
    });
  } catch (error) {
    console.error('Error fetching donation by session ID:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donation' },
      { status: 500 }
    );
  }
}
