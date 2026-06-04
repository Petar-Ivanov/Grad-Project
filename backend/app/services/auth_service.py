from app.core.exceptions.exceptions import ConflictException, UnauthorizedException
from app.models.user import User
from app.schemas.auth_dto import LoginDTO, RegisterDTO
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password
from app.core.security import (
    verify_password,
    create_access_token
)

class AuthService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def register_user(self, dto: RegisterDTO) -> User:
        email = dto.email.lower()

        existing_user = await self.repo.get_by_email(email)

        if existing_user:
            raise ConflictException("Email already exists")

        new_user = User(
            email=email,
            name=dto.name,
            hashed_password=hash_password(dto.password)
        )

        return await self.repo.create_user(new_user)

    async def login_user(self, dto: LoginDTO) -> tuple[str, str]:
        existing_user = await self.repo.get_by_email(dto.email.lower())

        if not existing_user or not verify_password(dto.password, existing_user.hashed_password):
            raise UnauthorizedException("Invalid credentials")

        token = create_access_token({
            "sub": str(existing_user.id),
            "type": "access"
        })

        return token, "bearer"
