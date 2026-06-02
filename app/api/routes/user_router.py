from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.user_dto import CreateUserDTO, UpdateUserDTO, UserDTO, UserDetailDTO
from app.services import user_service
from app.db.deps import get_current_user, get_db, get_current_admin_user

router = APIRouter(prefix="/users", tags=["users"])
admin_router = APIRouter(dependencies=[Depends(get_current_admin_user)])

@admin_router.post("/", response_model=UserDTO, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: CreateUserDTO, 
    db: AsyncSession = Depends(get_db),
):
    new_user = await user_service.create_user(
        user_data=user, 
        db=db
    )

    return UserDTO.model_validate(new_user)

@admin_router.get("/", response_model=list[UserDTO])
async def get_users(
    db: AsyncSession = Depends(get_db),
):
    users = await user_service.get_users(
        db=db
    )

    return [UserDTO.model_validate(u) for u in users]

@router.get("/{id}", response_model=UserDetailDTO)
async def get_user(
    id: int, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = await user_service.get_user(
        user_id=id, 
        db=db,
        current_user=current_user
    )

    return UserDetailDTO.model_validate(user)

@router.put("/{id}", response_model=UserDTO)
async def update_user(
    id: int, 
    user: UpdateUserDTO, 
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    updated_user = await user_service.update_user(
        user_id=id, 
        user_data=user, 
        db=db,
        current_user=current_user
    )

    return UserDTO.model_validate(updated_user)

@admin_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    id: int, 
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    await user_service.delete_user(
        user_id=id, 
        db=db,
        current_user=current_user
    )
    return None



router.include_router(admin_router)