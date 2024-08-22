from typing import Annotated
from fastapi import FastAPI, Query, HTTPException
import sqlite3

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
        # Connect to db
        conn = db_connect()
        cur = conn.cursor()

        # Perform search using FTS5 virtual table
        search_query = keyword.replace(" ", " OR ")
        query = """
            SELECT company_id,company_name,job_id
            FROM job_skill_search
            WHERE job_skill_search MATCH ?
        """
        results = cur.execute(query, (search_query,)).fetchall()
    except sqlite3.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database search query error: {e}")
    finally:
        conn.close()

    companies = [row["company_name"] for row in results]

    return {"companies": companies}
