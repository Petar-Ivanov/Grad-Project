from fastapi import APIRouter, Depends, UploadFile, File
from app.models.user import User
from app.schemas.source_dto import SourceDTO, CreateLinkOrTextSourceDTO
from app.services import source_service
from app.dependenies.auth_deps import get_current_user
from app.dependenies.source_deps import get_source_service

router = APIRouter(prefix="/sources", tags=["sources"])
nested_router = APIRouter()

@nested_router.get("/", response_model=list[SourceDTO])
async def get_sources(
    topic_id: int, 
    current_user: User = Depends(get_current_user), 
    service: source_service.SourceService = Depends(get_source_service)
):
    sources = await service.get_sources_by_topic(
        topic_id=topic_id, 
        current_user=current_user
    )

    return sources

@nested_router.post("/upload-file", response_model=SourceDTO)
async def upload_file_source(
    topic_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    service: source_service.SourceService = Depends(get_source_service),
):
    source = await service.create_file_source(
        topic_id=topic_id, 
        file=file, 
        current_user=current_user
    )

    return source

@nested_router.post("/link-or-text", response_model=SourceDTO)
async def create_link_or_text_source(
    topic_id: int,
    payload: CreateLinkOrTextSourceDTO,
    current_user: User = Depends(get_current_user),
    service: source_service.SourceService = Depends(get_source_service),
):
    source = await service.create_link_or_text_source(
        topic_id=topic_id, 
        dto=payload, 
        current_user=current_user
    )

    return source

@router.delete("/{source_id}")
async def delete_source(
    source_id: int, 
    current_user: User = Depends(get_current_user), 
    service: source_service.SourceService = Depends(get_source_service)
):
    await service.delete_source(
        source_id=source_id, 
        current_user=current_user
    )

    return {"message": "Source document removed successfully"}


router.include_router(
    nested_router, 
    prefix="/topics/{topic_id}/sources", 
    tags=["sources"]
)