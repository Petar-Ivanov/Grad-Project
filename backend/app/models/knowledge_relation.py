from sqlalchemy import Column, Enum, Float, Index, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.models.enums.relation_type import RelationType

class KnowledgeRelation(Base):
    __tablename__ = "knowledge_relations"

    id = Column(Integer, primary_key=True)

    from_unit_id = Column(Integer, ForeignKey("knowledge_units.id"), nullable=False)
    to_unit_id = Column(Integer, ForeignKey("knowledge_units.id"), nullable=False)  

    weight = Column(Float, nullable=False, default=1.0)
    relation_type = Column(
        Enum(RelationType),
        nullable=False,
        default=RelationType.PARTOF
    )

    from_unit = relationship(
        "KnowledgeUnit",
        foreign_keys=[from_unit_id],
        back_populates="outgoing_relations"
    )

    to_unit = relationship(
        "KnowledgeUnit",
        foreign_keys=[to_unit_id],
        back_populates="incoming_relations"
    )

    __table_args__ = (
        UniqueConstraint("from_unit_id", "to_unit_id", 'relation_type', name="uq_from_to_units"),
        Index("idx_graph_traversal", "from_unit_id", "to_unit_id")
    )