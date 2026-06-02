from sqlalchemy import JSON, Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.models import knowledge_unit_source

class KnowledgeUnit(Base):
    __tablename__ = "knowledge_units"

    id = Column(Integer, primary_key=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)

    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    summary = Column(String, nullable=True)
    knowledge_metadata = Column(JSON, nullable=True) # type, difficulty, importance, ...

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    topic = relationship(
        "Topic",
        back_populates="knowledge_units"
    )

    sources = relationship(
        "Source",
        secondary=knowledge_unit_source,
        back_populates="knowledge_units"
    )

    outgoing_relations = relationship(
        "KnowledgeRelation",
        foreign_keys="KnowledgeRelation.from_unit_id",
        back_populates="from_unit",
        cascade="all, delete-orphan"
    )

    incoming_relations = relationship(
        "KnowledgeRelation",
        foreign_keys="KnowledgeRelation.to_unit_id",
        back_populates="to_unit",
        cascade="all, delete-orphan"
    )

    user_states = relationship(
        "UserKnowledgeState",
        back_populates="knowledge_unit",
        cascade="all, delete-orphan"
    )