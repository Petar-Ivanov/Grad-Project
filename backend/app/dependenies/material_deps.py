from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependenies.database_deps import get_db
from app.repositories.material_repository import MaterialRepository
from app.services.material_service import MaterialService

def get_material_repo(db: AsyncSession = Depends(get_db)) -> MaterialRepository:
    return MaterialRepository(db)

def get_material_service(repo: MaterialRepository = Depends(get_material_repo)) -> MaterialService:
    return MaterialService(repo)