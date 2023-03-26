from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./sensors_data.db"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
# Base.metadata.create_all(bind=engine) 

class CameraData(Base):
    __tablename__ = "camera_data"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String)
    sensor = Column(String)

class HumidityData(Base):
    __tablename__= "humidity"
    id = Column(Integer, primary_key=True, index= True)
    humidity = Column(Integer)
    sensor = Column(String)

