
from pydantic import BaseModel

class CameraDataIn(BaseModel):
    sensor : str
    image_url: str

class HumidityDataIn(BaseModel):
    sensor : str
    humidity : int