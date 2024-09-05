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

export type DashboardData = {
    geo_data: JobDensityData[];
    top_skills: {
        languages: Skill[];
        tools: Skill[];
    };
    heatmap_data: HeatmapData[];
}

// Define type for component props
export type GeoMapProps = {
  data: JobDensityData[];
};