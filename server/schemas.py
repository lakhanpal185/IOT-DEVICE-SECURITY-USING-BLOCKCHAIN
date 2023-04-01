from pydantic import BaseModel

#the data of sensor accelerometer, gayrometer and magnetometer
class RequestData(BaseModel):
    sensor_name: str
    x: float
    y: float
    z: float
    
class ResponseData(RequestData):
    id: int
    class Config():
        orm_mode = True



#light sensor schemas
class RequestLightData(BaseModel):
    sensor_name: str
    illuminance: float
    
class ResponseLightData(RequestLightData):
    id: int
    class Config():
        orm_mode = True



