from fastapi import FastAPI, Depends, Response, status, HTTPException
from typing import Union, List
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
@app.get("/sensorsxyz",status_code = 200,response_model=List[schemas.ResponseData], tags=['sensorxyz'])
async def read_all_data(response : Response,db: Session = Depends(get_db)):
    data = db.query(models.Sensorsxyz).all()
    if not data:
       response.status_code = status.HTTP_404_NOT_FOUND
       return {"detail":"data does not exist yet"}
    return data


@app.get("/sensorsxyz/{name}",status_code=200,response_model=List[schemas.ResponseData],tags=['sensorxyz'])
async def read_name_data(name: str,response: Response, db: Session = Depends(get_db)):
    data = db.query(models.Sensorsxyz).filter(models.Sensorsxyz.sensor_name == name).all()
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"The data for sensor {name} not exist") 
    return data


@app.post("/sensorsxyz",tags=['sensorxyz'],response_model= schemas.ResponseData)
async def write_data(request:schemas.RequestData, db: Session = Depends(get_db)):
    new_data = models.Sensorsxyz(sensor_name = request.sensor_name, x=request.x, y=request.y, z=request.z)
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return new_data