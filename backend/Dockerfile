FROM python:3.10-alpine

WORKDIR /app/backend

COPY requirements.txt  ./

# Install python dependencies
RUN pip3 install --no-cache-dir -r ./requirements.txt

COPY . ./

EXPOSE 8000

CMD [ "fastapi","run","./main.py","--port","8000" ]