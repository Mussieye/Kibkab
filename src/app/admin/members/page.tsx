"use client";

import { useAuth } from "@/contexts/auth-context";
import { MemberDashboardSimple } from "@/components/admin/member-dashboard-simple";
import { SEOLayout } from "@/components/seo/seo-layout";

export default function AdminMembersPage() {
  const { user, isAuthenticated } = useAuth();

  // Check if user is authenticated and has admin role
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-royal-purple mb-4">Access Denied</h1>
          <p className="text-charcoal/80 mb-6">You must be an administrator to access this page.</p>
          <a href="/auth/login" className="px-6 py-3 bg-gold text-royal-purple rounded-lg hover:bg-gold/90 transition-colors font-medium">
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <SEOLayout
      seoProps={{
        title: "Member Dashboard - Maranatha Christian Church",
        description: "Admin dashboard for viewing and managing church member registrations and statistics."
      }}
    >
      <div className="min-h-screen bg-off-white">
        <div className="container mx-auto px-4 py-8">
          <MemberDashboardSimple />
        </div>
      </div>
    </SEOLayout>
  );
}
