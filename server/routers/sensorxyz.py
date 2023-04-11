from fastapi import APIRouter, status, Response, HTTPException,WebSocket, WebSocketDisconnect, Depends
from typing import List
from sqlalchemy.orm import Session
import models,schemas
from database import get_db
from fastapi.responses import HTMLResponse
from datetime import datetime
import json


router = APIRouter(
    prefix="/sensorxyz",
    tags=["sensor of data xyz"],
 )


# #maganetometer,accelerometer,gayrometer
# @router.get("/",status_code = 200,response_model=List[schemas.ResponseData],)
# async def read_all_data(response : Response,db: Session = Depends(get_db)):
#     data = db.query(models.Sensorsxyz).all()
#     if not data:
#        response.status_code = status.HTTP_404_NOT_FOUND
#        return {"detail":"data does not exist yet"}
#     return data


# @router.get("/{name}",status_code=200,response_model=List[schemas.ResponseData])
# async def read_name_data(name: str,response: Response, db: Session = Depends(get_db)):
#     data = db.query(models.Sensorsxyz).filter(models.Sensorsxyz.sensor_name == name).all()
#     if not data:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"The data for sensor {name} not exist") 
#     return data


# @router.post("/",status_code=201,response_model= schemas.ResponseData)
# async def write_data(request:schemas.RequestData, db: Session = Depends(get_db)):
#     new_data = models.Sensorsxyz(sensor_name = request.sensor_name, x=request.x, y=request.y, z=request.z)
#     db.add(new_data)
#     db.commit()
#     db.refresh(new_data)
#     return new_data


#websocket for sensor of data x ,y ,z
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@router.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data)

    except WebSocketDisconnect:
        manager.disconnect(websocket)

