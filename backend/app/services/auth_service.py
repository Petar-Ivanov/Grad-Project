from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.exceptions.exceptions import ConflictException, UnauthorizedException
from app.models.user import User
from app.schemas.auth_dto import RegisterDTO
from app.core.security import hash_password
from app.core.security import (
    verify_password,
    create_access_token
)

async def register_user(db: AsyncSession, dto: RegisterDTO) -> User:
    email = dto.email.lower()

    result = await db.execute(
        select(User).where(User.email == email)
    )

    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise ConflictException("Email already exists")

    user = User(
        email=email,
        name=dto.name,
        hashed_password=hash_password(dto.password)
    )

    db.add(user)
    
    try:
        await db.commit()
    except:
        await db.rollback()
        raise

    await db.refresh(user)

    return user

async def login_user(db: AsyncSession, email: str, password: str) -> tuple[str, str]:
    result = await db.execute(
        select(User).where(User.email == email)
    )
    
    user = result.scalar_one_or_none()

    if not user or not verify_password(password, user.hashed_password): 
        raise UnauthorizedException("Invalid credentials")

    token = create_access_token({
    "sub": str(user.id),
    "type": "access"
    })

    return token, "bearer"
