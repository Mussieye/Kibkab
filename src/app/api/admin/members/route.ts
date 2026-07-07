import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/auth-config';

// Mock database - in production, this would be a real database
let members: User[] = [
  {
    id: '1',
    email: 'admin@maranatha.church',
    name: 'John Pastor',
    role: 'admin',
    phone: '+1234567890',
    address: {
      street: '123 Church Street',
      city: 'Your City',
      state: 'State',
      zip: '12345',
      country: 'US'
    },
    membershipDate: new Date('2023-01-15'),
    isActive: true,
    preferences: {
      language: 'en',
      notifications: {
        email: true,
        sms: true,
        push: false
      }
    }
  },
  {
    id: '2',
    email: 'member1@maranatha.church',
    name: 'Sarah Member',
    role: 'member',
    phone: '+1234567891',
    address: {
      street: '456 Faith Avenue',
      city: 'Your City',
      state: 'State',
      zip: '12345',
      country: 'US'
    },
    membershipDate: new Date('2023-03-20'),
    isActive: true,
    preferences: {
      language: 'en',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    }
  },
  {
    id: '3',
    email: 'member2@maranatha.church',
    name: 'Michael Believer',
    role: 'member',
    phone: '+1234567892',
    address: {
      street: '789 Hope Road',
      city: 'Your City',
      state: 'State',
      zip: '12345',
      country: 'US'
    },
    membershipDate: new Date('2023-06-10'),
    isActive: true,
    preferences: {
      language: 'es',
      notifications: {
        email: false,
        sms: true,
        push: true
      }
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const isActive = searchParams.get('isActive');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredMembers = members;

    // Filter by role if specified
    if (role) {
      filteredMembers = filteredMembers.filter(member => member.role === role);
    }

    // Filter by active status if specified
    if (isActive !== null) {
      const activeStatus = isActive === 'true';
      filteredMembers = filteredMembers.filter(member => member.isActive === activeStatus);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

    // Calculate statistics
    const totalMembers = members.length;
    const activeMembers = members.filter(member => member.isActive).length;
    const adminCount = members.filter(member => member.role === 'admin').length;
    const editorCount = members.filter(member => member.role === 'editor').length;
    const memberCount = members.filter(member => member.role === 'member').length;

    // New members in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newMembersLast30Days = members.filter(member => 
      new Date(member.membershipDate) >= thirtyDaysAgo
    ).length;

    const statistics = {
      totalMembers,
      activeMembers,
      inactiveMembers: totalMembers - activeMembers,
      adminCount,
      editorCount,
      memberCount,
      newMembersLast30Days,
      totalFiltered: filteredMembers.length,
      currentPage: page,
      totalPages: Math.ceil(filteredMembers.length / limit)
    };

    return NextResponse.json({
      success: true,
      data: {
        members: paginatedMembers,
        statistics
      }
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const memberData = await request.json();

    // Validate required fields
    if (!memberData.email || !memberData.name || !memberData.password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if member already exists
    const existingMember = members.find(member => member.email === memberData.email);
    if (existingMember) {
      return NextResponse.json(
        { success: false, error: 'Member with this email already exists' },
        { status: 409 }
      );
    }

    // Create new member
    const newMember: User = {
      id: (members.length + 1).toString(),
      email: memberData.email,
      name: memberData.name,
      role: 'member', // Default role for new registrations
      phone: memberData.phone,
      address: memberData.address,
      membershipDate: new Date(),
      isActive: true,
      preferences: {
        language: memberData.language || 'en',
        notifications: {
          email: true,
          sms: false,
          push: true
        }
      }
    };

    members.push(newMember);

    return NextResponse.json({
      success: true,
      data: newMember
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create member' },
      { status: 500 }
    );
  }
}
