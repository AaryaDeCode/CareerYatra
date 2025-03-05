from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# FastAPI app instance
app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
DATABASE_URL = "mysql+pymysql://root:Ch3-cooh@localhost/career_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Security settings
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(200))
    role = Column(String(50))  # jobseeker or employer

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(String(500))
    company = Column(String(100))
    location = Column(String(100))
    employer_id = Column(Integer, ForeignKey("users.id"))

# Create database tables
Base.metadata.create_all(bind=engine)

# Utility functions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Pydantic models for request validation
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

# Register endpoint
@app.post("/register")
def register(user: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = User(name=user.name, email=user.email, password=hashed_password, role=user.role)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

# Login & Token generation
@app.post("/token", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": user.email, "role": user.role, "id": user.id},
                                       expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    
    return {"access_token": access_token, "token_type": "bearer"}

# Fetch job listings
@app.get("/jobs")
def get_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()

# Post a job (only employers)
@app.post("/jobs")
def post_job(title: str, description: str, company: str, location: str, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        employer_id = payload.get("id")
        role = payload.get("role")

        if role != "employer":
            raise HTTPException(status_code=403, detail="Only employers can post jobs")

        job = Job(title=title, description=description, company=company, location=location, employer_id=employer_id)
        db.add(job)
        db.commit()
        db.refresh(job)
        return {"message": "Job posted successfully"}

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
