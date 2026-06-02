from datetime import datetime
from typing import Any
from pydantic import BaseModel, ConfigDict
from app.models.enums.material_type import MaterialType
from app.models.enums.material_status import MaterialStatus

class MaterialDTO(BaseModel):
    id: int
    topic_id: int
    type: MaterialType
    content_json: dict[str, Any] | list[Any]
    status: MaterialStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class CreateMaterialDTO(BaseModel):
    topic_id: int
    type: MaterialType
    content_json: dict[str, Any] | list[Any]

class UpdateMaterialDTO(BaseModel):
    type: MaterialType | None = None
    content_json: dict[str, Any] | list[Any] | None = None
    status: MaterialStatus | None = None