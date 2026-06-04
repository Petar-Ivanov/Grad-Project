from fastapi import APIRouter, Depends, status
from app.models.user import User
from app.schemas.material_dto import MaterialDTO, CreateMaterialDTO, UpdateMaterialDTO
from app.mappers.material_mapper import material_to_dto, materials_to_dto_list
from app.dependenies.auth_deps import get_current_user
from app.dependenies.material_deps import get_material_service
from app.services.material_service import MaterialService

router = APIRouter(prefix="/materials", tags=["materials"])

@router.post("/", response_model=MaterialDTO, status_code=status.HTTP_201_CREATED)
async def create_material(
    dto: CreateMaterialDTO,
    current_user: User = Depends(get_current_user),
    service: MaterialService = Depends(get_material_service)
):
    new_material = await service.create_material(
        dto=dto, 
        current_user=current_user
    )

    return material_to_dto(new_material)

@router.get("/", response_model=list[MaterialDTO])
async def get_materials(
    current_user: User = Depends(get_current_user),
    service: MaterialService = Depends(get_material_service)
):
    materials = await service.get_materials(
        current_user=current_user
    )

    return materials_to_dto_list(materials)

@router.get("/{id}", response_model=MaterialDTO)
async def get_material(
    id: int,
    current_user: User = Depends(get_current_user),
    service: MaterialService = Depends(get_material_service)
):
    material = await service.get_material(
        material_id=id, 
        current_user=current_user
    )

    return material_to_dto(material)

@router.get("/topic/{topic_id}", response_model=list[MaterialDTO])
async def get_materials_by_topic(
    topic_id: int,
    current_user: User = Depends(get_current_user),
    service: MaterialService = Depends(get_material_service)
):
    materials = await service.get_materials_by_topic(
        topic_id=topic_id, 
        current_user=current_user
    )

    return materials_to_dto_list(materials)

@router.put("/{id}", response_model=MaterialDTO)
async def update_material(
    id: int,
    dto: UpdateMaterialDTO,
    current_user: User = Depends(get_current_user),
    service: MaterialService = Depends(get_material_service)
):
    updated_material = await service.update_material(
        material_id=id, 
        dto=dto, 
        current_user=current_user
    )

    return material_to_dto(updated_material)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_material(
    id: int,
    current_user: User = Depends(get_current_user),
    service: MaterialService = Depends(get_material_service)
):
    await service.delete_material(
        material_id=id, 
        current_user=current_user
    )

    return None