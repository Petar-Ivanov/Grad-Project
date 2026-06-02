from sqlalchemy import JSON, Column, DateTime, Enum, Integer, String, ForeignKey
from app.db.base import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.models.enums.material_status import MaterialStatus
from app.models.enums.material_type import MaterialType

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)

    type = Column(String, nullable=False)  # lesson, test, cheatsheet
    type = Column(
        Enum(MaterialType),
        nullable=False,
        default=MaterialType.LESSON
    )
    content_json = Column(JSON, nullable=False)
    status = Column(
        Enum(MaterialStatus),
        nullable=False,
        default=MaterialStatus.PENDING
    )

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    topic = relationship(
        "Topic",
        back_populates="materials"
    )