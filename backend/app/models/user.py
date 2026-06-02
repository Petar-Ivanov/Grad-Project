from sqlalchemy import Column, Enum, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.models.enums.user_role import UserRole


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    role = Column(
        Enum(UserRole),
        nullable=False,
        default=UserRole.USER
    )

    topics = relationship(
        "Topic",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    knowledge_states = relationship(
        "UserKnowledgeState",
        back_populates="user",
        cascade="all, delete-orphan"
    )