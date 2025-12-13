from fastapi import APIRouter, FastAPI
from assignment_2.asgi2 import a2_app
from assignment_1.asgi1 import a1_app


app = FastAPI()
app.include_router(a1_app, prefix="/assignment_1", tags=["Assignment 1"])
app.include_router(a2_app, prefix="/assignment_2", tags=["Assignment 2"])

@app.get("/")
def health_check():
    return {"message": "Main API is running", "endpoints": ["/assignment_1/", "/assignment_2/"]}