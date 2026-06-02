from app.models.material import Material
from app.schemas.material_dto import MaterialDTO, CreateMaterialDTO, UpdateMaterialDTO

def material_to_dto(material: Material) -> MaterialDTO:
    return MaterialDTO(
        id=material.id,
        topic_id=material.topic_id,
        type=material.type,
        content_json=material.content_json,
        status=material.status,
        created_at=material.created_at
    )

def create_material_from_dto(dto: CreateMaterialDTO) -> Material:
    return Material(
        topic_id=dto.topic_id,
        type=dto.type,
        content_json=dto.content_json
    )

def update_material_from_dto(material: Material, dto: UpdateMaterialDTO) -> Material:
    data = dto.model_dump(exclude_unset=True)
    allowed_fields = {"type", "content_json", "status"}
    
    for field in allowed_fields:
        if field in data:
            setattr(material, field, data[field])
            
    return material

def materials_to_dto_list(materials: list[Material]) -> list[MaterialDTO]:
    return [material_to_dto(m) for m in materials]