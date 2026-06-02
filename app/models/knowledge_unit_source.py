from sqlalchemy import Column, Integer, ForeignKey, Table
from app.db.base import Base

knowledge_unit_source = Table(
    "knowledge_unit_source",
    Base.metadata,
    Column("knowledge_unit_id", Integer, ForeignKey("knowledge_units.id", ondelete="CASCADE"), primary_key=True),
    Column("source_id", Integer, ForeignKey("sources.id", ondelete="CASCADE"), primary_key=True)
)