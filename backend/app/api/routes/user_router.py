from fastapi import APIRouter, Depends, status
from app.models.user import User
from app.schemas.user_dto import CreateUserDTO, UpdateUserDTO, UserDTO, UserDetailDTO
from app.services import user_service
from app.dependenies.auth_deps import get_current_user, get_current_admin_user
from app.dependenies.user_deps import get_user_service

router = APIRouter(prefix="/users", tags=["users"])
admin_router = APIRouter(dependencies=[Depends(get_current_admin_user)])

@admin_router.post("/", response_model=UserDTO, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: CreateUserDTO,
    service: user_service.UserService = Depends(get_user_service)
):
    new_user = await service.create_user(
        user_data=user
    )

    return UserDTO.model_validate(new_user)

@admin_router.get("/", response_model=list[UserDTO])
async def get_users(
    current_user: User = Depends(get_current_user),
    service: user_service.UserService = Depends(get_user_service),
):
    users = await service.get_users(
        current_user=current_user
    )

    return [UserDTO.model_validate(u) for u in users]

@router.get("/{id}", response_model=UserDetailDTO)
async def get_user(
    id: int, 
    current_user: User = Depends(get_current_user),
    service: user_service.UserService = Depends(get_user_service)
):
    user = await service.get_user(
        user_id=id, 
        current_user=current_user
    )

    return UserDetailDTO.model_validate(user)

@router.put("/{id}", response_model=UserDTO)
async def update_user(
    id: int, 
    user: UpdateUserDTO, 
    service: user_service.UserService = Depends(get_user_service),
    current_user: User = Depends(get_current_user)
):
    updated_user = await service.update_user(
        user_id=id, 
        user_data=user, 
        current_user=current_user
    )

    return UserDTO.model_validate(updated_user)

@admin_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    id: int, 
    service: user_service.UserService = Depends(get_user_service),
    current_user: User = Depends(get_current_user)
):
    await service.delete_user(
        user_id=id, 
        current_user=current_user
    )
    return None



router.include_router(admin_router)