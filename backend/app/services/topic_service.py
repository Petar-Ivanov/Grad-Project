from app.core.exceptions.exceptions import UnauthorizedException, NotFoundException
from app.models.topic import Topic
from app.models.user import User
from app.schemas.topic_dto import CreateTopicDTO, TopicDTO, UpdateTopicDTO
from app.mappers.topic_mapper import update_topic_from_dto
from app.repositories.topic_repository import TopicRepository

class TopicService:
    def __init__(self, repo: TopicRepository):
        self.repo = repo

    async def get_topics(self, current_user: User) -> list[Topic]:
        return await self.repo.get_by_owner(current_user.id)

    async def get_topic(self, topic_id: int, current_user: User) -> Topic:
        topic = await self.repo.get_by_id(topic_id)
        
        if not topic:
            raise NotFoundException("Topic not found")
        
        if topic.owner_id != current_user.id:
            raise UnauthorizedException("Unauthorized to access this topic")
        
        return topic

    async def create_topic(self, topic_data: CreateTopicDTO, current_user: User) -> Topic:
        new_topic = Topic(**topic_data.model_dump())
        new_topic.owner_id = current_user.id

        return await self.repo.create(new_topic)

    async def update_topic(self, topic_id: int, topic_data: UpdateTopicDTO, current_user: User) -> TopicDTO:
        topic = await self.repo.get_by_id(topic_id)

        if not topic:
            raise NotFoundException("Topic not found")

        if topic.owner_id != current_user.id:
            raise UnauthorizedException("Unauthorized to update this topic")

        topic = update_topic_from_dto(topic, topic_data)

        return await self.repo.update(topic)

    async def delete_topic(self, topic_id: int, current_user: User) -> None:
        topic = await self.repo.get_by_id(topic_id)

        if not topic:
            raise NotFoundException("Topic not found")

        if topic.owner_id != current_user.id:
            raise UnauthorizedException("Unauthorized to delete this topic")

        await self.repo.delete(topic)