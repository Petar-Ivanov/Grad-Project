from app.models.source import Source
from app.models.enums.source_type import SourceType
from app.schemas.source_dto import CreateLinkOrTextSourceDTO

def create_file_source_entity(topic_id: int, filename: str, file_path: str, source_type: SourceType) -> Source:
    return Source(
        topic_id=topic_id,
        type=source_type,
        title=filename or "Untitled",
        file_path=file_path,
        source_metadata={"original_filename": filename}
    )

def create_link_or_text_source_entity(topic_id: int, dto: CreateLinkOrTextSourceDTO, file_path: str | None, metadata: dict) -> Source:
    return Source(
        topic_id=topic_id,
        type=dto.type,
        title=dto.title,
        file_path=file_path,
        source_metadata=metadata
    )