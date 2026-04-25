import Link from "next/link";
import { navigationItems } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-royal-purple/20 bg-royal-purple text-off-white">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="font-serif text-xl">Maranatha Christian Church</h2>
          <p className="mt-2 max-w-md text-sm text-off-white/90">
            A welcoming church family rooted in Christ, serving our city through
            worship, prayer, and outreach.
          </p>
        </div>
        <div className="md:justify-self-end">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            Quick Links
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navigationItems.slice(0, 8).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
