from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependenies.database_deps import get_db
from app.repositories.topic_repository import TopicRepository
from app.services.topic_service import TopicService

def get_topic_repo(db: AsyncSession = Depends(get_db)) -> TopicRepository:
    return TopicRepository(db)

def get_topic_service(repo: TopicRepository = Depends(get_topic_repo)) -> TopicService:
    return TopicService(repo)