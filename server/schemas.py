from pydantic import BaseModel


class RequestData(BaseModel):
    sensor_name: str
    x: float
    y: float
    z: float
    
class ResponseData(RequestData):
    class Config():
        orm_mode = True
