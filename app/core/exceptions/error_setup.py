from fastapi import FastAPI

from app.core.exceptions.exceptions import (
    BadRequestException,
    NotFoundException,
    ConflictException,
    UnauthorizedException,
    ForbiddenException
)

from app.core.exceptions.exception_handlers import (
    bad_request_exception_handler,
    forbidden_exception_handler,
    not_found_exception_handler,
    conflict_exception_handler,
    unauthorized_exception_handler,
    forbidden_exception_handler
)


def register_exception_handlers(app: FastAPI):

    app.add_exception_handler(
        NotFoundException,
        not_found_exception_handler
    )

    app.add_exception_handler(
        ConflictException,
        conflict_exception_handler
    )

    app.add_exception_handler(
        UnauthorizedException,
        unauthorized_exception_handler
    )

    app.add_exception_handler(
        BadRequestException,
        bad_request_exception_handler
    )

    app.add_exception_handler(
        ForbiddenException,
        forbidden_exception_handler
    )