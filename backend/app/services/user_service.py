from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.exceptions.exceptions import ForbiddenException, NotFoundException, BadRequestException
from app.mappers.user_mapper import create_user_from_dto, update_user_from_dto
from app.models.enums.user_role import UserRole
from app.models.user import User
from app.schemas.user_dto import CreateUserDTO, UpdateUserDTO

async def get_users(db: AsyncSession) -> list[User]:
    result = await db.execute(select(User))
    return result.scalars().all()

async def get_user(user_id: int, db: AsyncSession, current_user: User) -> User:
    if current_user.role != UserRole.ADMIN and current_user.id != user_id:
        raise ForbiddenException("You can only view your own profile")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user:
        raise NotFoundException("User not found")
        
    return user

async def create_user(user_data: CreateUserDTO, db: AsyncSession) -> User:
    email_check = await db.execute(select(User).where(User.email == user_data.email))
    if email_check.scalar_one_or_none():
        raise BadRequestException("Email already registered")

    new_user = create_user_from_dto(user_data)
    db.add(new_user)

    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise

    await db.refresh(new_user)
    return new_user

async def update_user(user_id: int, user_data: UpdateUserDTO, db: AsyncSession, current_user: User) -> User:
    user = await get_user(user_id=user_id, db=db, current_user=current_user)

    if user_data.email and user_data.email != user.email:
        email_check = await db.execute(select(User).where(User.email == user_data.email))
        if email_check.scalar_one_or_none():
            raise BadRequestException("Email already registered")

    update_user_from_dto(user, user_data)

    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise

    await db.refresh(user)

    return user

async def delete_user(user_id: int, db: AsyncSession, current_user: User) -> None:
    user = await get_user(user_id=user_id, db=db, current_user=current_user)
    
    try:
        await db.delete(user)
        await db.commit()
    except Exception:
        await db.rollback()
        raise