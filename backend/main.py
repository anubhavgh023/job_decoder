from typing import Annotated
from fastapi import FastAPI, Query, HTTPException
import sqlite3
from collections import defaultdict

app = FastAPI()


def db_connect():
    try:
        conn = sqlite3.connect("db/ycombinator.db")
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {e}")


@app.get("/search/")
async def search(keyword: Annotated[str, Query()] = ...):
    print(keyword)

    # query keyword
    try:
        # connect to db
        conn = db_connect()
        cur = conn.cursor()

        # perform search using FTS5 virtual table
        search_query = keyword.replace(" ", " OR ")
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
