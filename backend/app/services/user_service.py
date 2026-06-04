from app.core.exceptions.exceptions import ForbiddenException, NotFoundException, BadRequestException
from app.mappers.user_mapper import create_user_from_dto, update_user_from_dto
from app.models.enums.user_role import UserRole
from app.models.user import User
from app.schemas.user_dto import CreateUserDTO, UpdateUserDTO
from app.repositories.user_repository import UserRepository

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def get_users(self, current_user: User) -> list[User]:
        if current_user.role != UserRole.ADMIN:
            raise ForbiddenException("Only admins can view all users")
        
        return await self.repo.get_all()

    async def get_user(self, user_id: int, current_user: User) -> User:
        if current_user.id != user_id and current_user.role != UserRole.ADMIN:
            raise ForbiddenException("You can only view your own profile")

        user = await self.repo.get_by_id(user_id)
        
        if not user:
            raise NotFoundException("User not found")
            
        return user

    async def create_user(self, user_data: CreateUserDTO, current_user: User) -> User:
        if current_user.role != UserRole.ADMIN:
            raise ForbiddenException("Only admins can create users")

        email_check = await self.repo.get_by_email(user_data.email)
        if email_check:
            raise BadRequestException("Email already registered")

        new_user = create_user_from_dto(user_data)
        
        return await self.repo.create_user(new_user)

    async def update_user(self, user_id: int, user_data: UpdateUserDTO, current_user: User) -> User:
        user = await self.repo.get_by_id(user_id)

        if not user:
            raise NotFoundException("User not found")
        
        if current_user.id != user_id and current_user.role != UserRole.ADMIN:
            raise ForbiddenException("You can only update your own profile")

        if user_data.email and user_data.email != user.email:
            email_check = await self.repo.get_by_email(user_data.email)
            if email_check:
                raise BadRequestException("Email already registered")

        update_user_from_dto(user, user_data)

        return await self.repo.update_user(user)

    async def delete_user(self, user_id: int, current_user: User) -> None:
        if current_user.role != UserRole.ADMIN:
            raise ForbiddenException("Only admins can delete users")
        
        user = await self.repo.get_by_id(user_id)

        if not user:
            raise NotFoundException("User not found")
        
        await self.repo.delete_user(user)