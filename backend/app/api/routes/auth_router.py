from fastapi import APIRouter, Depends
from app.dependenies.user_deps import get_user_service
from app.mappers.user_mapper import user_to_dto
from app.schemas.auth_dto import (
    RegisterDTO,
    LoginDTO,
    TokenDTO
)
from app.schemas.user_dto import UserDTO

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserDTO)
async def register(dto: RegisterDTO, service = Depends(get_user_service)):
    user = await service.register_user(
        dto=dto
    )
    
    return user_to_dto(user)
    

@router.post("/login", response_model=TokenDTO)
async def login(dto: LoginDTO, service = Depends(get_user_service)):
    token, token_type = await service.login_user(
        dto=dto
    )

    return TokenDTO(
        access_token=token,
        token_type=token_type
    )