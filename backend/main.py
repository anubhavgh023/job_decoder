from typing import Annotated
from fastapi import FastAPI, Query, HTTPException
import sqlite3
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://jobdecoder.anubhavsamanta.tech",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def db_connect():
    try:
        conn = sqlite3.connect("db/ycombinator.db")
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {e}")


@app.get("/")
async def heathCheck():
    return {"success": True}


@app.get("/search")
async def search(keyword: Annotated[str, Query()] =""):
    # Check if keyword is empty
    if not keyword:
        return {"message": "No keyword provided, please enter a search term."}
    
    # query keyword
    try:
        # connect to db
        conn = db_connect()
        cur = conn.cursor()

        # Replace commas with AND operator, to ensure all terms must appear
        search_query = " AND ".join(keyword.split(","))
        query = """
            SELECT 
                c.company_id,
                c.company_name,
                c.short_description,
                c.website,
                j.job_id,
                j.title AS job_title,
                j.job_url
            FROM job_skill_search js
            JOIN company c ON js.company_id = c.company_id
            JOIN jobs j ON js.job_id = j.job_id
            WHERE js.job_skill_search MATCH ?
        """
        results = cur.execute(query, (search_query,)).fetchall()

    except sqlite3.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database search query error: {e}")
    finally:
        conn.close()

    # aggregate job details by company_id
    company_data = defaultdict(
        lambda: {
            "company_id": None,
            "company_name": "",
            "short_description": "",
            "website": "",
            "jobs": [],
        }
    )

    for row in results:
        company_id = row["company_id"]

        # get or create the company entry
        company_entry = company_data[company_id]

        if company_entry["company_id"] is None:
            company_entry["company_id"] = row["company_id"]
            company_entry["company_name"] = row["company_name"]
            company_entry["short_description"] = row["short_description"]
            company_entry["website"] = row["website"]

        # append the job details to the company's job list
        company_entry["jobs"].append(
            {
                "job_id": row["job_id"],
                "job_title": row["job_title"],
                "job_url": row["job_url"],
            }
        )

    # converting response data to list
    response_data = {"data": list(company_data.values())}

    return response_data


def get_job_density_by_country() -> list[dict[str, str]]:
    conn = db_connect()
    cursor = conn.cursor()
    query = """
    SELECT country, COUNT(*) as job_count
    FROM company
    JOIN jobs ON company.company_id = jobs.company_id
    GROUP BY country;
    """
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()

    return [{"country": row[0], "job_count": row[1]} for row in results]


def top_skills_in_demand() -> dict[str, list[dict[str, int]]]:
    conn = db_connect()
    cursor = conn.cursor()

    # Query to get top 5 languages
    lang_query = """
    SELECT l.language, COUNT(s.language_id) as lang_count
    FROM skillset s
    JOIN languages l ON s.language_id = l.language_id
    GROUP BY s.language_id
    ORDER BY lang_count DESC
    LIMIT 5;
    """
    cursor.execute(lang_query)
    lang_results = cursor.fetchall()

    # Query to get top 5 tools
    tool_query = """
    SELECT t.tool, COUNT(s.tool_id) as tool_count
    FROM skillset s
    JOIN tools t ON s.tool_id = t.tool_id
    GROUP BY s.tool_id
    ORDER BY tool_count DESC
    LIMIT 5;
    """
    cursor.execute(tool_query)
    tool_results = cursor.fetchall()

    conn.close()

    return {
        "languages": [{"name": row[0], "count": row[1]} for row in lang_results],
        "tools": [{"name": row[0], "count": row[1]} for row in tool_results],
    }


def all_language_tool_demand():
    conn = db_connect()
    cursor = conn.cursor()

    # Query all language data:
    lang_query = """
    SELECT l.language, COUNT(s.language_id) as lang_count
    FROM skillset s
    JOIN languages l ON s.language_id = l.language_id
    GROUP BY s.language_id
    ORDER BY lang_count DESC;
    """
    lang_results = cursor.execute(lang_query).fetchall()

    # Query to get top 5 tools
    tool_query = """
    SELECT t.tool, COUNT(s.tool_id) as tool_count
    FROM skillset s
    JOIN tools t ON s.tool_id = t.tool_id
    GROUP BY s.tool_id
    ORDER BY tool_count DESC;
    """
    tool_results = cursor.execute(tool_query).fetchall()

    return {
        "languages": [{"name": row[0], "count": row[1]} for row in lang_results],
        "tools": [{"name": row[0], "count": row[1]} for row in tool_results],
    }


def heatMap_lang_tool():
    conn = db_connect()
    cursor = conn.cursor()
    # Fetch language-tool combinations with their count
    cursor.execute(
        """
        SELECT l.language, t.tool, COUNT(s.skillset_id) as count
        FROM skillset s
        JOIN languages l ON s.language_id = l.language_id
        JOIN tools t ON s.tool_id = t.tool_id
        GROUP BY l.language_id, t.tool_id
        ORDER BY count DESC
    """
    )
    heatmap_data = cursor.fetchall()

    conn.close()

    # Convert to dict format for easier consumption by the frontend
    return [
        {"language": row[0], "tool": row[1], "count": row[2]} for row in heatmap_data
    ]


def sort_experience(exp: str) -> int:
    if exp == "Any (new grads ok)":
        return 0
    elif exp == "1+ years":
        return 1
    elif exp == "3+ years":
        return 2
    elif exp == "6+ years":
        return 3
    elif exp == "11+ years":
        return 4
    else:
        return 5  # for unexpected values


def jobs_experience_line_graph():
    conn = db_connect()
    cursor = conn.cursor()

    # Fetch job counts grouped by minExperience
    cursor.execute(
        """
        SELECT minExperience, COUNT(job_id) as job_count
        FROM jobs
        GROUP BY minExperience
    """
    )

    line_graph_data = cursor.fetchall()
    sorted_line_graph_data = sorted(
        line_graph_data, key=lambda x: sort_experience(x[0])
    )

    conn.close()
    return {
        "labels": [
            str(row["minExperience"])
            for row in sorted_line_graph_data
            if row["minExperience"] is not None  # Filter out None values
        ],
        "data": [
            row["job_count"]
            for row in sorted_line_graph_data
            if row["job_count"]
            is not None  # Ensure we only include counts for non-None labels
        ],
    }


@app.get("/dashboard")
async def dashboard():
    job_density = get_job_density_by_country()
    skills_in_demand = top_skills_in_demand()
    heatmap_data = heatMap_lang_tool()
    barGraph_data = all_language_tool_demand()
    line_graph_data = jobs_experience_line_graph()
    return {
        "geo_data": job_density,
        "top_skills": skills_in_demand,
        "heatmap_data": heatmap_data,
        "barGraph_data": barGraph_data,
        "line_graph_data": line_graph_data,
    }
