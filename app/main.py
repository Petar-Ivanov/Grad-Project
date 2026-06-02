from fastapi import FastAPI
from app.api.router import api_router
from app.core.exceptions.error_setup import register_exception_handlers

app = FastAPI(
    title="Graduation Project API",
    version="0.0.1"
)

register_exception_handlers(app)

app.include_router(api_router)

@app.get("/")
def root():
    return {"status": "API is running"}