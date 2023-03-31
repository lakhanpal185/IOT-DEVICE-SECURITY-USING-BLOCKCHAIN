from fastapi import FastAPI
import models
from routers import sensorxyz
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(sensorxyz.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

