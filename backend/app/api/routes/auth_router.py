from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.deps import get_db
from app.mappers.user_mapper import user_to_dto
from app.schemas.auth_dto import (
    RegisterDTO,
    LoginDTO,
    TokenDTO
)

from app.schemas.user_dto import UserDTO
from app.services.auth_service import (
    register_user,
    login_user
)

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserDTO)
async def register(dto: RegisterDTO, db: AsyncSession = Depends(get_db)):
    user = await register_user(
        db=db, 
        dto=dto
    )
    
    return user_to_dto(user)
    

@router.post("/login", response_model=TokenDTO)
async def login(dto: LoginDTO, db: AsyncSession = Depends(get_db)):
    token, token_type = await login_user(
        db=db,
        email=dto.email,
        password=dto.password
    )

    return TokenDTO(
        access_token=token,
        token_type=token_type
    )