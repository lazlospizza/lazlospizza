FROM python:3.9.9-slim-buster

RUN apt-get update -y && apt-get install -y gcc libpango1.0-0 libcairo2 libpq-dev

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8080

ENTRYPOINT [ "python3" ]

CMD [ "api.py" ]
