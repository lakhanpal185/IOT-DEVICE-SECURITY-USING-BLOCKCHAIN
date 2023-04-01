from fastapi import APIRouter, status, Response, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
import models,schemas
from database import get_db

router = APIRouter(
    prefix="/lightsensor",
    tags=["light sensor"],
 )


#for light sensor 
@router.get("/",status_code = 200,response_model=List[schemas.ResponseLightData],)
async def read_all_data(response : Response,db: Session = Depends(get_db)):
    data = db.query(models.Lightsensor).all()
    if not data:
       response.status_code = status.HTTP_404_NOT_FOUND
       return {"detail":"data does not exist yet"}
    return data


@router.post("/", status_code=201, response_model= schemas.ResponseLightData)
async def write_data(request:schemas.RequestLightData, db: Session = Depends(get_db)):
    new_data = models.Lightsensor(sensor_name = request.sensor_name, illuminance=request.illuminance)
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return new_data