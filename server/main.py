from fastapi import FastAPI,Depends,Response
from typing import Union
from sqlalchemy.orm import Session
import schemas
import models
from database import engine, SessionLocal, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


#maganetometer,accelerometer,gayrometer
@app.get("/sensorsxyz")
async def read_all_data(db: Session = Depends(get_db)):
    data = db.query(models.Sensorsxyz).all()
    return data

@app.get("/sensorsxyz/{name}")
async def read_name_data(name: str, db: Session = Depends(get_db)):
    data = db.query(models.Sensorsxyz).filter(models.Sensorsxyz.sensor_name == name).all()
    return data

@app.post("/sensorsxyz")
async def write_data(request:schemas.RequestData, db: Session = Depends(get_db)):
    new_data = models.Sensorsxyz(sensor_name = request.sensor_name, x=request.x, y=request.y, z=request.z)
    db.add(new_data)
    db.commit()
    db.refresh(new_data);
    return new_data