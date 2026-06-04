from sqlalchemy import select
from app.models.source import Source
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.repositories.base_repository import BaseRepository

class SourceRepository(BaseRepository[Source]):
    def __init__(self, db: AsyncSession):
        super().__init__(Source, db)

    async def get_by_id(self, source_id: int) -> Source:
        result = await self.db.execute(
            select(Source).where(Source.id == source_id)
        )
        return result.scalar_one_or_none()

    async def update(self, _ ) -> Source:
        raise NotImplementedError("Sources cannot be updated.")
