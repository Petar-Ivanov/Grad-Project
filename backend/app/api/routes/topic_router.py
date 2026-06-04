from fastapi import APIRouter, Depends
from app.mappers.topic_mapper import topic_to_dto
from app.models.user import User
from app.schemas.topic_dto import CreateTopicDTO, UpdateTopicDTO
from app.services.topic_service import TopicService
from app.schemas.topic_dto import TopicDTO
from app.dependenies.auth_deps import get_current_user
from app.dependenies.topic_deps import get_topic_service

router = APIRouter(prefix="/topics", tags=["topics"])

@router.get("/", response_model=list[TopicDTO])
async def get_topics(
    current_user: User = Depends(get_current_user), 
    service: TopicService = Depends(get_topic_service)
):
    topics = await service.get_topics(
        current_user=current_user
    )
    
    return [topic_to_dto(t) for t in topics]

@router.get("/{id}", response_model=TopicDTO)
async def get_topic(
    id: int, 
    current_user: User = Depends(get_current_user), 
    service: TopicService = Depends(get_topic_service)
):
    topic = await service.get_topic(
        topic_id=id,
        current_user=current_user
    )

    return topic_to_dto(topic)

@router.post("/", response_model=TopicDTO)
async def create_topic(
    topic: CreateTopicDTO, 
    current_user: User = Depends(get_current_user), 
    service: TopicService = Depends(get_topic_service)
):
    new_topic = await service.create_topic(
        topic_data=topic, 
        current_user=current_user
    )
    
    return topic_to_dto(new_topic)

@router.put("/{id}", response_model=TopicDTO)
async def update_topic(
    id: int, 
    topic: UpdateTopicDTO, 
    current_user: User = Depends(get_current_user), 
    service: TopicService = Depends(get_topic_service)
):
    updated_topic = await service.update_topic(
        topic_id=id,
        topic_data=topic,
        current_user=current_user
    )
    return topic_to_dto(updated_topic)

@router.delete("/{id}")
async def delete_topic(
    id: int, 
    current_user: User = Depends(get_current_user), 
    service: TopicService = Depends(get_topic_service)
):
    await service.delete_topic(
        topic_id=id,
        current_user=current_user
    )

    return {"message": "Topic deleted successfully"}