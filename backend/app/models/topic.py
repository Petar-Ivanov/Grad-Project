from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base

class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship(
        "User",
        back_populates="topics"
    )

    sources = relationship(
        "Source",
        back_populates="topic",
        cascade="all, delete-orphan"
    )

    knowledge_units = relationship(
        "KnowledgeUnit",
        back_populates="topic",
        cascade="all, delete-orphan"
    )

    materials = relationship(
        "Material",
        back_populates="topic",
        cascade="all, delete-orphan"
    )