from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.material_dto import MaterialDTO, CreateMaterialDTO, UpdateMaterialDTO
from app.services import material_service
from app.mappers.material_mapper import material_to_dto, materials_to_dto_list
from app.db.deps import get_db, get_current_user

router = APIRouter(prefix="/materials", tags=["materials"])

@router.post("/", response_model=MaterialDTO, status_code=status.HTTP_201_CREATED)
async def create_material(
    dto: CreateMaterialDTO,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_material = await material_service.create_material(
        dto=dto, 
        db=db, 
        current_user=current_user
    
    )

    return material_to_dto(new_material)

@router.get("/", response_model=list[MaterialDTO])
async def get_materials(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    materials = await material_service.get_materials(
        db=db, 
        current_user=current_user
    )

    return materials_to_dto_list(materials)

@router.get("/{id}", response_model=MaterialDTO)
async def get_material(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    material = await material_service.get_material(
        material_id=id, 
        db=db, 
        current_user=current_user
    )

    return material_to_dto(material)

@router.get("/topic/{topic_id}", response_model=list[MaterialDTO])
async def get_materials_by_topic(
    topic_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    materials = await material_service.get_materials_by_topic(
        topic_id=topic_id, 
        db=db, 
        current_user=current_user
    )

    return materials_to_dto_list(materials)

@router.put("/{id}", response_model=MaterialDTO)
async def update_material(
    id: int,
    dto: UpdateMaterialDTO,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    updated_material = await material_service.update_material(
        material_id=id, 
        dto=dto, db=db, 
        current_user=current_user
    )

    return material_to_dto(updated_material)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_material(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    await material_service.delete_material(
        material_id=id, 
        db=db, 
        current_user=current_user
    )

    return None