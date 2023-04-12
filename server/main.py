from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from routers import sensorxyz,lightsensor,actuators
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(sensorxyz.router)
app.include_router(lightsensor.router)
app.include_router(actuators.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

