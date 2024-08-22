-- schema.sql

-- Create the company table
CREATE TABLE IF NOT EXISTS company (
    company_id INTEGER PRIMARY KEY,
    company_name TEXT,
    short_description TEXT,
    batch TEXT,
    status TEXT,
    tags TEXT,
    location TEXT,
    country TEXT,
    year_founded INTEGER,
    founders_names TEXT,
    website TEXT,
    logo_url TEXT,
    is_job_available BOOLEAN
);

-- Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
    job_id INTEGER PRIMARY KEY,
    company_id INTEGER,
    title TEXT,
    job_url TEXT,
    minExperience INTEGER,
    job_description TEXT,
    FOREIGN KEY (company_id) REFERENCES company (company_id)
);

-- languages table
CREATE TABLE IF NOT EXISTS languages (
    language_id INTEGER PRIMARY KEY AUTOINCREMENT,
    language TEXT UNIQUE
);

-- tools table
CREATE TABLE IF NOT EXISTS tools (
    tool_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tool TEXT UNIQUE
);

-- Table to store skillsets for jobs
CREATE TABLE IF NOT EXISTS skillset (
    skillset_id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id INTEGER,
    language_id INTEGER,
    tool_id INTEGER,
    FOREIGN KEY (job_id) REFERENCES jobs (job_id),
    FOREIGN KEY (language_id) REFERENCES languages (language_id),
    FOREIGN KEY (tool_id) REFERENCES tools (tool_id)
);

----------------------------------------------------------

-- Create an FTS5 virtual table for jobs, skills, and tools
CREATE VIRTUAL TABLE IF NOT EXISTS job_skill_search USING fts5(
    company_id,
    job_id,
    company_name UNINDEXED,      
    job_title,                   
    job_description             
);

-- Populate the FTS5 virtual table with data
INSERT INTO job_skill_search (company_id, job_id, company_name, job_title, job_description)
SELECT 
    c.company_id,
    j.job_id,
    c.company_name, 
    j.title AS job_title, 
    j.job_description 
FROM jobs j
JOIN company c ON j.company_id = c.company_id;
