import os
import uuid
import aiofiles # type: ignore
from fastapi import UploadFile
from pathlib import Path
from sqlalchemy import Sequence
from app.mappers.source_mapper import create_file_source_entity, create_link_or_text_source_entity
from app.models import source
from app.models.source import Source
from app.models.topic import Topic
from app.models.user import User
from app.core.exceptions.exceptions import BadRequestException, NotFoundException, UnauthorizedException
from app.schemas.source_dto import CreateLinkOrTextSourceDTO
from app.models.enums.source_type import SourceType
from app.core.logging import logger
from app.repositories.source_repository import SourceRepository
from app.repositories.topic_repository import TopicRepository

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "/app/storage/sources"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_FILE_SIZE = 15 * 1024 * 1024  # 15 MB

class SourceService:
    def __init__(self, repo: SourceRepository, topic_repo: TopicRepository):
        self.repo = repo
        self.topic_repo = topic_repo

    async def _get_verified_topic(self, topic_id: int, current_user: User) -> Topic:
        topic = await self.topic_repo.get_by_id(topic_id)

        if not topic:
            raise NotFoundException("Topic not found")

        if topic.owner_id != current_user.id:
            raise UnauthorizedException("Access denied")
        
        return topic

    async def _get_verified_source(self, source_id: int, current_user: User) -> Source:
        source = await self.repo.get_by_id(source_id)

        if not source:
            raise NotFoundException("Source not found")

        if source.owner_id != current_user.id:
            raise UnauthorizedException("Access denied")
        
        return source
    
    async def get_sources_by_topic(self, topic_id: int, current_user: User) -> Sequence[Source]:
        topic = await self._get_verified_topic(topic_id, current_user)
        
        return topic.sources

    async def create_file_source(self,topic_id: int, file: UploadFile, current_user: User) -> Source:
        await self._get_verified_topic(topic_id, current_user)

        file_extension = os.path.splitext(file.filename)[1].lower().replace('.', '')
        
        if file_extension not in [SourceType.PDF, SourceType.DOCX, SourceType.TXT]:
            raise BadRequestException(f"Unsupported file type: {file_extension}")

        safe_name = f"{uuid.uuid4()}_{Path(file.filename.replace(' ', '_')).name}"
        file_path = os.path.join(UPLOAD_DIR, safe_name)
        total_size = 0

        try:
            async with aiofiles.open(file_path, "wb") as f:
                while chunk := await file.read(1024 * 64):
                    total_size += len(chunk)

                    if total_size == 0:
                        raise BadRequestException("File is empty")

                    if total_size > MAX_FILE_SIZE:
                        await f.close()
                    
                        if source.file_path and os.path.exists(file_path):
                            os.remove(file_path)

                        raise BadRequestException(f"File size exceeds the maximum limit of {MAX_FILE_SIZE // (1024 * 1024)} MB")
                    
                    await f.write(chunk)        

        except OSError as e:
            raise BadRequestException(f"Failed to save file: {e}")

        file_extension = os.path.splitext(file.filename or "")[1].lower().replace('.', '')

        try:
            resolved_ext = "text" if file_extension == "txt" else file_extension
            resolved_type = SourceType(resolved_ext)
            
        except ValueError:
            raise BadRequestException(f"Unsupported file type: {file_extension}")

        new_source = create_file_source_entity(
            topic_id=topic_id, 
            filename=file.filename or "Untitled", 
            file_path=file_path, 
            source_type=resolved_type
        )

        return await self.repo.create(new_source)

    async def create_link_or_text_source(self, topic_id: int, dto: CreateLinkOrTextSourceDTO, current_user: User) -> Source:
        await self._get_verified_topic(topic_id, current_user)

        meta = {}
        if dto.type in [SourceType.URL, SourceType.YOUTUBE]:
            if not dto.url:
                raise BadRequestException(f"URL is required for {dto.type.value} sources")
            meta["url"] = str(dto.url)
        elif dto.type == SourceType.TEXT:
            if not dto.content_raw:
                raise BadRequestException("Content is required for text sources")
            meta["has_raw_content"] = True
        
            safe_name = f"{uuid.uuid4()}_{Path(dto.title.replace(' ', '_')).name}.txt"
            file_path = os.path.join(UPLOAD_DIR, safe_name)
            async with aiofiles.open(file_path, "w", encoding="utf-8") as f:
                await f.write(dto.content_raw or "")
            meta["original_filename"] = file_path
        else:
            raise BadRequestException("Invalid source type")
        
        new_source = create_link_or_text_source_entity(
            topic_id=topic_id, 
            dto=dto, 
            file_path=file_path, 
            metadata=meta
        )

        return await self.repo.create(new_source)

    async def delete_source(self, source_id: int, current_user: User) -> None:
        source = await self._get_verified_source(source_id, current_user)
        file_path = source.file_path

        await self.repo.delete(source)

        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception:
                logger.error("Failed to delete file")
                pass
