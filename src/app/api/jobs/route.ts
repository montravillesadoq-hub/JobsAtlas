import { NextRequest, NextResponse } from "next/server";
import { featuredJobs } from "@/lib/content";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase() || "";
  const country = searchParams.get("country");
  const sector = searchParams.get("sector");

  const jobs = featuredJobs.filter((job) => {
    const matchesQuery = query
      ? [job.title, job.company, job.description, ...job.skills].join(" ").toLowerCase().includes(query)
      : true;

    return matchesQuery && (!country || job.country === country) && (!sector || job.sector === sector);
  });

  return NextResponse.json({
    jobs,
    source: "curated-demo",
    note: "Connectez vos agrégateurs officiels, portails publics et flux d’entreprises dans cette route.",
  });
}
