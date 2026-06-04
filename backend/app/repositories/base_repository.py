from typing import Generic, TypeVar, Type
from sqlalchemy.ext.asyncio import AsyncSession

ModelT = TypeVar("ModelT")

class BaseRepository(Generic[ModelT]):
    def __init__(self, model: Type[ModelT], db: AsyncSession):
        self.model = model
        self.db = db

    async def create(self, instance: ModelT) -> ModelT:
        self.db.add(instance)
        await self.db.flush()
        return instance

    async def update(self, instance: ModelT) -> ModelT:
        await self.db.flush()
        return instance

    async def delete(self, instance: ModelT) -> None:
        await self.db.delete(instance)
        await self.db.flush()