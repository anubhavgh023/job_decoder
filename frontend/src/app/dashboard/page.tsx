import GeoMap from "@/components/GeoMap";
import HeatMapToolLanguage from "@/components/HeatMapToolLanguage";
import JobsExperienceLineGraph from "@/components/JobExperienceLineGraph";
import SkillsBarGraph from "@/components/SkillsBarGraph";
import SkillsDemandPieChart from "@/components/SkillsDemandPieChart";
import { DashboardData } from "@/types/types";
import Link from "next/link";

async function fetchDashboardData(): Promise<DashboardData> {
  const res = await fetch("http://backend:8000/dashboard", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Dashboard() {
  const { geo_data, top_skills, heatmap_data, barGraph_data, line_graph_data } =
    await fetchDashboardData();

  return (
    <main className="ml-8 mr-8 mb-40">
      {/* trends */}
      <section className="flex flex-col md:grid md: grid-cols-2 lg:grid-cols-5 gap-6">
        <SkillsDemandPieChart
          title={"Top Languages"}
          topSkills={top_skills.languages}
        />
        <SkillsDemandPieChart
          title={"Top Tools"}
          topSkills={top_skills.tools}
        />
        <div className="col-span-3 border border-secondary rounded-md">
          <GeoMap data={geo_data} />
        </div>
        <div className="col-span-full rounded-md">
          <div className="overflow-y-auto h-[600px]">
            <HeatMapToolLanguage heatmapData={heatmap_data} />

          </div>
        </div>
      </section>

      {/* bar graphs */}
      <section className="mt-12">
        <div className="flex flex-col gap-4">
          <div className="overflow-y-auto h-[400px]">
            {/* Languages */}
            <SkillsBarGraph
              title={"Languages"}
              skills={barGraph_data.languages}
            />
          </div>
          <div className="overflow-y-auto h-[400px]">
            {/* Tools */}
            <SkillsBarGraph title={"Tools"} skills={barGraph_data.tools} />
          </div>
        </div>
      </section>

      {/* exp line graph */}
      <section className="mt-12">
        <JobsExperienceLineGraph
          title={"Jobs count Based on Experience"}
          lineGraphData={line_graph_data}
        />
      </section>
      <div className="flex justify-center items-center text-center mt-12">
        <Link
          href="/search"
          className="bg-primary w-full sm:w-56 text-primary-foreground py-2 px-6 rounded-md hover:bg-foreground hover:text-background active:scale-95 transition-colors"
        >
          Start Job Search...
        </Link>
      </div>
    </main>
  );
}
