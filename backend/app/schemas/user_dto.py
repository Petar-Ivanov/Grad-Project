from pydantic import BaseModel, ConfigDict, EmailStr
from app.schemas.topic_dto import TopicDTO

class UserDTO(BaseModel):
    id: int
    email: EmailStr
    name: str

    model_config = ConfigDict(from_attributes=True)

class CreateUserDTO(BaseModel):
    email: EmailStr
    name: str
    password: str

class UpdateUserDTO(BaseModel):
    email: EmailStr | None = None
    name: str | None = None

class UserDetailDTO(BaseModel):
    id: int
    email: EmailStr
    name: str
    topics: list["TopicDTO"] = []

    model_config = ConfigDict(from_attributes=True)