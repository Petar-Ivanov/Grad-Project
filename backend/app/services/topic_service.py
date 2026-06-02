from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.exceptions.exceptions import NotFoundException
from app.models.topic import Topic
from app.models.user import User
from app.schemas.topic_dto import CreateTopicDTO, TopicDTO, UpdateTopicDTO
from app.mappers.topic_mapper import update_topic_from_dto


async def get_topics(db: AsyncSession, current_user: User) -> list[Topic]:
    result = await db.execute(
        select(Topic).where(Topic.owner_id == current_user.id)
    )

    topics = result.scalars().all()

    return topics

async def get_topic(topic_id: int, db: AsyncSession, current_user: User) -> Topic:
    result = await db.execute(
        select(Topic).where(
            Topic.id == topic_id,
            Topic.owner_id == current_user.id
        )
    )

    topic = result.scalar_one_or_none()
    
    if not topic:
        raise NotFoundException("Topic not found")
    
    return topic

async def create_topic(topic_data: CreateTopicDTO, db: AsyncSession, current_user: User) -> Topic:
    new_topic = Topic(**topic_data.model_dump())
    new_topic.owner_id = current_user.id

    db.add(new_topic)

    try:
        await db.commit()
    except:
        await db.rollback()
        raise

    await db.refresh(new_topic)
    
    return new_topic

async def update_topic(topic_id: int, topic_data: UpdateTopicDTO, db: AsyncSession, current_user: User) -> TopicDTO:
    result = await db.execute(
        select(Topic).where(
            Topic.id == topic_id,
            Topic.owner_id == current_user.id
        )
    )

    topic = result.scalar_one_or_none()

    if not topic:
        raise NotFoundException("Topic not found")
    
    topic = update_topic_from_dto(topic, topic_data)

    try:
        await db.commit()
    except:
        await db.rollback()
        raise

    await db.refresh(topic)

    return topic

async def delete_topic(topic_id: int, db: AsyncSession, current_user: User) -> None:
    result = await db.execute(
        select(Topic).where(
            Topic.id == topic_id,
            Topic.owner_id == current_user.id
        )
    )

    topic = result.scalar_one_or_none()

    if not topic:
        raise NotFoundException("Topic not found")

    await db.delete(topic)
    
    try:
        await db.commit()
    except:
        await db.rollback()
        raise