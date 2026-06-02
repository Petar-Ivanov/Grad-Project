class AppException(Exception):
    def __init__(self, detail: str):
        self.detail = detail


class NotFoundException(AppException):
    pass

class ConflictException(AppException):
    pass

class UnauthorizedException(AppException):
    pass

class BadRequestException(AppException):
    pass

class ForbiddenException(AppException):
    pass