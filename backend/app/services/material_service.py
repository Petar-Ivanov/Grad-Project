from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.exceptions.exceptions import NotFoundException, UnauthorizedException
from app.models.material import Material
from app.models.topic import Topic
from app.models.topic import Topic
from app.models.user import User
from app.schemas.material_dto import CreateMaterialDTO, UpdateMaterialDTO

async def get_materials(db: AsyncSession, current_user: User) -> list[Material]:
    result = await db.execute(
        select(Material)
        .join(Topic, Material.topic_id == Topic.id)
        .where(Topic.owner_id == current_user.id)
    )
    
    return list(result.scalars().all())


async def get_material(material_id: int, db: AsyncSession, current_user: User) -> Material:
    result = await db.execute(
        select(Material, Topic.owner_id)
        .join(Topic, Material.topic_id == Topic.id)
        .where(Material.id == material_id)
    )
    
    row = result.first()

    if not row:
        raise NotFoundException("Material not found")
        
    material, owner_id = row
    
    if owner_id != current_user.id:
        raise UnauthorizedException("Access denied to this material resource")
        
    return material

async def get_materials_by_topic(topic_id: int, db: AsyncSession, current_user: User) -> list[Material]:
    topic_check = await db.execute(
        select(Topic).where(Topic.id == topic_id, Topic.owner_id == current_user.id)
    )
    if not topic_check.scalar_one_or_none():
        raise NotFoundException("Topic not found or access denied")
        
    result = await db.execute(
        select(Material).where(Material.topic_id == topic_id)
    )
    return list(result.scalars().all())

async def create_material(dto: CreateMaterialDTO, db: AsyncSession, current_user: User) -> Material:
    """Placeholder"""
    pass

async def update_material(material_id: int, dto: UpdateMaterialDTO, db: AsyncSession, current_user: User) -> Material:
    """Placeholder"""
    pass

async def delete_material(material_id: int, db: AsyncSession, current_user: User) -> None:
    """Placeholder"""
    pass