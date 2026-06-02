from pydantic import BaseModel, EmailStr

class RegisterDTO(BaseModel):
    email: EmailStr
    name: str
    password: str

class LoginDTO(BaseModel):
    email: EmailStr
    password: str

class TokenDTO(BaseModel):
    access_token: str
    token_type: str