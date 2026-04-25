"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-royal-purple/20 bg-off-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Maranatha Christian Church logo"
              width={44}
              height={44}
              priority
            />
            <div>
              <p className="font-serif text-lg text-royal-purple">
                Maranatha Christian Church
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-burgundy">
                Reverent. Modern. Royal.
              </p>
            </div>
          </Link>
        </div>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors hover:text-royal-purple ${
                      isActive ? "text-royal-purple" : "text-charcoal"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
