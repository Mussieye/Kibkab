import Link from "next/link";
import { PhaseShellPage } from "@/components/phase-shell-page";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <PhaseShellPage
        title="About Maranatha"
        description="Learn our mission, leadership, and beliefs."
      />
      <div className="flex flex-wrap gap-3">
        <Link href="/about/mission-vision" className="text-royal-purple underline">
          Mission & Vision
        </Link>
        <Link href="/about/leadership" className="text-royal-purple underline">
          Leadership
        </Link>
        <Link href="/about/beliefs" className="text-royal-purple underline">
          Beliefs
        </Link>
      </div>
    </div>
  );
}
