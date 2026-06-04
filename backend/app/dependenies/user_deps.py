from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependenies.database_deps import get_db
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository

def get_user_repo(db: AsyncSession = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

def get_user_service(repo: UserRepository = Depends(get_user_repo)) -> UserService:
    return UserService(repo)