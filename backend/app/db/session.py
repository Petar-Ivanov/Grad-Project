from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import settings


engine = create_async_engine(settings.DATABASE_URL)

from sqlalchemy.ext.asyncio import async_sessionmaker

SessionLocal = async_sessionmaker(
    engine,
    expire_on_commit=False
)