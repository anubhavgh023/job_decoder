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