from sqlalchemy import Boolean, Column,Integer,Float, String
from database import Base

class Sensorsxyz(Base):
    __tablename__ = "sensorxyz"

    id = Column(Integer,primary_key=True, index=True)
    sensor_name = Column(String)
    x = Column(Float)
    y = Column(Float)
    z = Column(Float)
