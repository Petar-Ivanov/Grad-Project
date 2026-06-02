from sqlalchemy import Column, DateTime, Float, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class UserKnowledgeState(Base):
    __tablename__ = "user_knowledge_states"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    knowledge_unit_id = Column(Integer, ForeignKey("knowledge_units.id"), nullable=False)

    mastery_score = Column(Float, nullable=False, default=0.0)
    reviews = Column(Integer, nullable=False, default=0)

    last_reviewed = Column(DateTime(timezone=True), nullable=True)

    user = relationship(
        "User",
        back_populates="knowledge_states"
    )

    knowledge_unit = relationship(
        "KnowledgeUnit",
        back_populates="user_states"
    )