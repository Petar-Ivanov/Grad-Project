from app.core.exceptions.exceptions import NotFoundException, UnauthorizedException
from app.models.material import Material
from app.models.user import User
from app.schemas.material_dto import CreateMaterialDTO, UpdateMaterialDTO
from app.repositories.material_repository import MaterialRepository

class MaterialService:
    def __init__(self, repo: MaterialRepository):
        self.repo = repo

    async def get_materials(self, current_user: User) -> list[Material]:
        return await self.repo.get_by_owner(current_user.id)


    async def get_material(self, material_id: int, current_user: User) -> Material:
        material = await self.repo.get_by_id(material_id)

        if not material:
            raise NotFoundException("Material not found")
        
        if material.topic.owner_id != current_user.id:
            raise UnauthorizedException("Access denied to this material resource")
            
        return material

    async def get_materials_by_topic(self, topic_id: int, current_user: User) -> list[Material]:
        materials = await self.repo.get_by_topic_and_owner(topic_id, current_user.id)

        return materials

    async def create_material(self, dto: CreateMaterialDTO, current_user: User) -> Material:
        """Placeholder"""
        #return await self.repo.create()
        pass

    async def update_material(self, material_id: int, dto: UpdateMaterialDTO, current_user: User) -> Material:
        """Placeholder"""
        #return await self.repo.update()
        pass

    async def delete_material(self, material_id: int, current_user: User) -> None:
        """Placeholder"""
        #await self.repo.delete()
        pass