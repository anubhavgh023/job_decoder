"use client";

import GeoMap from "@/components/GeoMap";
import HeatMapToolLanguage from "@/components/HeadMapToolLanguage";
import SkillsBarGraph from "@/components/SkillsBarGraph";
import ToolsDemand from "@/components/SkillsDemandPieChart";
import SkillsDemandPieChart from "@/components/SkillsDemandPieChart";

export default function Dashboard() {
  return (
    <main>
      {/* trends */}
      <section className="grid grid-cols-5 gap-6 ml-10 mr-10">
        <SkillsDemandPieChart title={"Top Langugages"}></SkillsDemandPieChart>
        <SkillsDemandPieChart title={"Top Tools"}></SkillsDemandPieChart>
        <div className="col-span-3 border border-secondary rounded-md">
          <GeoMap></GeoMap>
        </div>
        <div className="col-span-full rounded-md">
          <HeatMapToolLanguage></HeatMapToolLanguage>
        </div>
      </section>

      {/* bar graphs */}
      <section>
        <SkillsBarGraph></SkillsBarGraph>
        <SkillsBarGraph></SkillsBarGraph>
      </section>
    </main>
  );
}
