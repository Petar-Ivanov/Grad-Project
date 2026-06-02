from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.exceptions.exceptions import (
    ForbiddenException,
    BadRequestException,
    NotFoundException,
    ConflictException,
    UnauthorizedException
)


async def not_found_exception_handler(request: Request, exc: NotFoundException):
    return JSONResponse(
        status_code=404,
        content={"detail": exc.detail}
    )


async def conflict_exception_handler(request: Request, exc: ConflictException):
    return JSONResponse(
        status_code=409,
        content={"detail": exc.detail}
    )


async def unauthorized_exception_handler(request: Request, exc: UnauthorizedException):
    return JSONResponse(
        status_code=401,
        content={"detail": exc.detail}
    )

async def forbidden_exception_handler(request: Request, exc: ForbiddenException):
    return JSONResponse(
        status_code=403,
        content={"detail": exc.detail}
    )

async def bad_request_exception_handler(request: Request, exc: BadRequestException):
    return JSONResponse(
        status_code=400,
        content={"detail": exc.detail}
    )