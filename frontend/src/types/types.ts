export interface Job {
    job_id: number;
    job_title: string;
    job_url: string;
}

export interface Company {
    company_id: number;
    company_name: string;
    short_description: string;
    website: string;
    jobs: Job[];
}

export type JobDensityData = {
  country: string | null;
  job_count: number;
};

export type Skill = {
    name: string;
    count: number;
};

export type HeatmapData = {
    language: string;
    tool: string;
    count: number
}

export type BarGraphData = {
    languages: Skill[];
    tools: Skill[];
}

export type DashboardData = {
    geo_data: JobDensityData[];
    top_skills: {
        languages: Skill[];
        tools: Skill[];
    };
    heatmap_data: HeatmapData[];
    barGraph_data: BarGraphData;
}

// Define type for component props
export type GeoMapProps = {
  data: JobDensityData[];
};