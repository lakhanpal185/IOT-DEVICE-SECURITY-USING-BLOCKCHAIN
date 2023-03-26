from typing import Union
from fastapi import FastAPI, Depends
from database import SessionLocal, CameraData, HumidityData,Base, engine
from schema import CameraDataIn, HumidityDataIn
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine) 

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/camera_data/")
async def create_camera_data(camera_data: CameraDataIn, db: Session = Depends(get_db)):
    db_data = CameraData(image_url=camera_data.image_url, sensor = camera_data.sensor)
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    # db.close()
    return {"data": db_data}

@app.post("/humidity_data/")
async def create_humidity_data(data: HumidityDataIn, db: Session = Depends(get_db)):
    db_data = HumidityData(sensor=data.sensor, humidity= data.humidity)
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    # db.close()
    return db_data
