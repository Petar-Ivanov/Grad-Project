from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.mappers.topic_mapper import topic_to_dto
from app.models.user import User
from app.schemas.topic_dto import CreateTopicDTO, UpdateTopicDTO
from app.services import topic_service
from app.schemas.topic_dto import TopicDTO
from app.db.deps import get_db, get_current_user

router = APIRouter(prefix="/topics", tags=["topics"])

@router.post("/", response_model=TopicDTO)
async def create_topic(topic: CreateTopicDTO, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_topic = await topic_service.create_topic(
        topic_data=topic, 
        db=db, 
        current_user=current_user
    )
    
    return topic_to_dto(new_topic)

@router.get("/", response_model=list[TopicDTO])
async def get_topics(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    topics = await topic_service.get_topics(
        db=db, 
        current_user=current_user
    )
    
    return [topic_to_dto(t) for t in topics]

@router.get("/{id}", response_model=TopicDTO)
async def get_topic(id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    topic = await topic_service.get_topic(
        topic_id=id,
        db=db,
        current_user=current_user
    )

    return topic_to_dto(topic)

@router.put("/{id}", response_model=TopicDTO)
async def update_topic(id: int, topic: UpdateTopicDTO, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated_topic = await topic_service.update_topic(
        topic_id=id,
        topic_data=topic,
        db=db,
        current_user=current_user
    )
    return topic_to_dto(updated_topic)

@router.delete("/{id}")
async def delete_topic(id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    await topic_service.delete_topic(
        topic_id=id,
        db=db,
        current_user=current_user
    )

    return {"message": "Topic deleted successfully"}