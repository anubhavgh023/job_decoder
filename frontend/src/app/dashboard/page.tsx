import GeoMap from "@/components/GeoMap";
import HeatMapToolLanguage from "@/components/HeadMapToolLanguage";
import SkillsBarGraph from "@/components/SkillsBarGraph";
import SkillsDemandPieChart from "@/components/SkillsDemandPieChart";
import { DashboardData } from "@/types/types";

async function fetchDashboardData(): Promise<DashboardData> {
  const res = await fetch("http://localhost:8000/dashboard", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Dashboard() {
  const { geo_data, top_skills } = await fetchDashboardData();
  console.log(top_skills)

  return (
    <main>
      {/* trends */}
      <section className="grid grid-cols-5 gap-6 ml-10 mr-10">
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
          <HeatMapToolLanguage />
        </div>
      </section>

      {/* bar graphs */}
      <section>
        <SkillsBarGraph />
        <SkillsBarGraph />
      </section>
    </main>
  );
}
