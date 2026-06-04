from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.material import Material
from app.models.topic import Topic
from backend.app.repositories.base_repository import BaseRepository

class MaterialRepository(BaseRepository[Material]):
    def __init__(self, db: AsyncSession):
        super().__init__(Material, db)

    async def get_by_owner(self, owner_id: int) -> list[Material]:
        result = await self.db.execute(
            select(Material)
            .join(Material.topic)
            .where(Topic.owner_id == owner_id)
        )
        
        return list(result.scalars().all())

    async def get_by_id(self, material_id: int) -> Material | None:
        result = await self.db.execute(
            select(Material, Topic.owner_id)
            .join(Topic, Material.topic_id == Topic.id)
            .where(Material.id == material_id)
        )
        
        return result.one_or_none()

    async def get_by_topic_and_owner(self, topic_id: int, owner_id: int) -> list[Material]:
        result = await self.db.execute(
            select(Material).where(Material.topic_id == topic_id, Material.owner_id == owner_id)
        )
        return list(result.scalars().all())