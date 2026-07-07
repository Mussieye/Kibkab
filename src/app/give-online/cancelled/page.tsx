import Link from "next/link";

export default function DonationCancelledPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-8">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center">
          <svg className="h-10 w-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="font-serif text-4xl text-royal-purple mb-4">
          Donation Cancelled
        </h1>
        
        <p className="text-lg text-charcoal/80 mb-2">
          Your donation process was cancelled.
        </p>
        
        <p className="text-charcoal/60">
          No charges were made to your payment method.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-medium">
        <h2 className="font-serif text-2xl text-royal-purple mb-4">
          Still Want to Give?
        </h2>
        
        <p className="text-charcoal/80 mb-6">
          If you cancelled by mistake or would like to try again, you can return to the donation form. 
          Your generosity helps us continue our mission and serve our community.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/offering"
            className="inline-block w-full rounded-lg bg-gradient-to-r from-gold to-gold-light px-6 py-3 font-semibold text-royal-purple text-center shadow-glow transition-all hover:scale-105"
          >
            Try Donation Again
          </Link>
          
          <Link
            href="/"
            className="inline-block w-full rounded-lg border border-royal-purple/20 px-6 py-3 font-semibold text-royal-purple text-center hover:bg-royal-purple/5 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-charcoal/60">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Need help? <Link href="/contact" className="text-gold hover:text-gold-light underline">Contact our office</Link>
        </div>
      </div>
    </div>
  );
}
