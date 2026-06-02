from fastapi import APIRouter
from app.api.routes import auth_router, material_router, topic_router, source_router, user_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_router.router)
api_router.include_router(topic_router.router)
api_router.include_router(source_router.router)
api_router.include_router(user_router.router)
api_router.include_router(material_router.router)