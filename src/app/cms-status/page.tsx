import { getCMSHealthReport } from "@/lib/cms/health";

export default async function CMSStatusPage() {
  const report = await getCMSHealthReport();

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
          CMS Diagnostics
        </p>
        <h1 className="mt-3 font-serif text-4xl text-royal-purple">Strapi Status</h1>
        <p className="mt-3 text-sm text-charcoal/90">
          Provider: <span className="font-semibold">{report.provider}</span>
        </p>
        <p className="mt-1 text-sm text-charcoal/90">
          Base URL:{" "}
          <span className={report.baseUrlConfigured ? "text-green-700" : "text-red-700"}>
            {report.baseUrlConfigured ? "configured" : "missing"}
          </span>
        </p>
        <p className="mt-1 text-sm text-charcoal/90">
          API token:{" "}
          <span className={report.tokenConfigured ? "text-green-700" : "text-amber-700"}>
            {report.tokenConfigured ? "configured" : "not set (optional if public role has read access)"}
          </span>
        </p>
        <p className="mt-3 text-sm font-semibold">
          Overall:{" "}
          <span className={report.overallOk ? "text-green-700" : "text-red-700"}>
            {report.overallOk ? "Healthy" : "Needs attention"}
          </span>
        </p>
      </header>

      <div className="rounded-2xl border border-royal-purple/15 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl text-royal-purple">Endpoint checks</h2>
        <ul className="mt-4 space-y-3">
          {report.checks.map((check) => (
            <li
              key={check.label}
              className="rounded-lg border border-royal-purple/10 bg-off-white p-4"
            >
              <p className="text-sm font-semibold text-charcoal">
                {check.label}:{" "}
                <span className={check.ok ? "text-green-700" : "text-red-700"}>
                  {check.ok ? "OK" : "Fail"}
                </span>
              </p>
              <p className="mt-1 text-xs text-charcoal/80">{check.path}</p>
              <p className="mt-1 text-xs text-charcoal/80">{check.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
