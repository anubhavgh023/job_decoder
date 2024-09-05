import { Company } from "@/types/types";

type CardProps = {
  company: Company;
};

export default function Card({ company }: CardProps) {
  return (
    <div className="bg-secondary p-6 rounded-lg">
      <a href={company.website} target="_blank">
        <h2 className="text-2xl font-bold text-foreground mb-2 hover:text-accent transition-colors">
          {company.company_name}
        </h2>
      </a>
      <p className="text-gray-400 mb-4">{company.short_description}</p>

      <h3 className="text-lg mt-6 font-semibold text-accent">
        Open Positions:
      </h3>
      <ul className="list-disc ml-5 mt-3 space-y-2">
        {company.jobs.map((job) => (
          <li key={job.job_id}>
            <div>
              <a
                href={job.job_url}
                target="_blank"
                className="text-primary font-medium hover:opacity-50 transition-colors duration-200"
              >
                {job.job_title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
