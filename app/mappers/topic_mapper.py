from app.models.topic import Topic
from app.schemas.topic_dto import CreateTopicDTO, TopicDTO, UpdateTopicDTO


def topic_to_dto(topic: Topic) -> TopicDTO:
    return TopicDTO(
        id=topic.id,
        name=topic.name,
        description=topic.description
    )


def dto_to_topic(dto: CreateTopicDTO, owner_id: int) -> Topic:
    return Topic(
        name=dto.name,
        description=dto.description,
        owner_id=owner_id
    )


def update_topic_from_dto(topic: Topic, dto: UpdateTopicDTO) -> Topic:
    data = dto.model_dump(exclude_unset=True)

    allowed_fields = {"name", "description"}

    for field in allowed_fields:
        if field in data:
            setattr(topic, field, data[field])

    return topic