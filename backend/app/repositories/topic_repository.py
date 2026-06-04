from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.topic import Topic
from backend.app.repositories.base_repository import BaseRepository

class TopicRepository(BaseRepository[Topic]):
    def __init__(self, db: AsyncSession):
        super().__init__(Topic, db)

    async def get_by_owner(self, owner_id: int) -> list[Topic]:
        result = await self.db.execute(
            select(Topic).where(Topic.owner_id == owner_id)
        )
        return list(result.scalars().all())
    
    async def get_by_id(self, topic_id: int) -> Topic | None:
        result = await self.db.execute(
            select(Topic).where(
                Topic.id == topic_id
            )
        )
        return result.scalar_one_or_none()