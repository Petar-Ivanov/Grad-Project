from pydantic import BaseModel, ConfigDict, HttpUrl
from typing import Optional, Any
from datetime import datetime

from app.models.enums.source_type import SourceType

class SourceBaseDTO(BaseModel):
    title: str

class CreateLinkOrTextSourceDTO(SourceBaseDTO):
    type: SourceType 
    content_raw: Optional[str] = None
    url: Optional[HttpUrl] = None

class SourceDTO(SourceBaseDTO):
    id: int
    topic_id: int
    type: SourceType
    file_path: Optional[str] = None
    source_metadata: Optional[dict[str, Any]] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)