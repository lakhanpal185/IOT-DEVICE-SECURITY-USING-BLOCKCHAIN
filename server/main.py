from fastapi import FastAPI
import models
from routers import sensorxyz,lightsensor
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(sensorxyz.router)
app.include_router(lightsensor.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

