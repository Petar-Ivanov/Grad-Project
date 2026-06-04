from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependenies.database_deps import get_db
from app.repositories.source_repository import SourceRepository
from app.services.source_service import SourceService

def get_source_repo(db: AsyncSession = Depends(get_db)) -> SourceRepository:
    return SourceRepository(db)

def get_source_service(repo: SourceRepository = Depends(get_source_repo)) -> SourceService:
    return SourceService(repo)