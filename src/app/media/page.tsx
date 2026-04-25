import Link from "next/link";
import { PhaseShellPage } from "@/components/phase-shell-page";

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <PhaseShellPage
        title="Media"
        description="Media hub route is ready for sermons, live stream, and categorized media."
      />
      <div className="flex flex-wrap gap-3">
        <Link href="/media/sermons" className="text-royal-purple underline">
          Sermons
        </Link>
        <Link href="/media/live-stream" className="text-royal-purple underline">
          Live Stream
        </Link>
      </div>
    </div>
  );
}
