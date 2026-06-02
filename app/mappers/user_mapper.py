from app.core.security import hash_password
from app.models.user import User
from app.schemas.user_dto import UpdateUserDTO, UserDTO, CreateUserDTO

def user_to_dto(user: User) -> UserDTO:
    return UserDTO(
        id=user.id,
        email=user.email,
        name=user.name
    )

def create_user_from_dto(dto: CreateUserDTO) -> User:
    return User(
        email=dto.email.lower(),
        name=dto.name,
        hashed_password=hash_password(dto.password)
    )

def update_user_from_dto(user: User, dto: UpdateUserDTO) -> User:
    data = dto.model_dump(exclude_unset=True)
    
    allowed_fields = {"email", "name"}
    for field in allowed_fields:
        if field in data:
            val = data[field].lower() if field == "email" else data[field]
            setattr(user, field, val)
            
    return user