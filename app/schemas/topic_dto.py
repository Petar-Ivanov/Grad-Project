from pydantic import BaseModel, ConfigDict

class TopicDTO(BaseModel):
    id: int
    name: str
    description: str | None

    model_config = ConfigDict(from_attributes=True)

class CreateTopicDTO(BaseModel):
    name: str
    description: str | None

class UpdateTopicDTO(BaseModel):
    name: str | None = None
    description: str | None = None