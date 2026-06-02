from sqlalchemy import JSON, Column, Enum, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.models import knowledge_unit_source
from app.models.enums.source_type import SourceType
from sqlalchemy.ext.associationproxy import association_proxy

class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    owner_id = association_proxy("topic", "owner_id")

    type = Column(
        Enum(SourceType),
        nullable=False,
        default=SourceType.TEXT
    )
    title = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    source_metadata = Column(JSON, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    topic = relationship(
        "Topic",
        back_populates="sources"
    )

    knowledge_units = relationship(
        "KnowledgeUnit",
        secondary=knowledge_unit_source,
        back_populates="sources"
    )
