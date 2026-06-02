import enum


class MaterialType(str, enum.Enum):
    LESSON = "lesson"
    TEST = "test"
    CHEATSHEET = "cheatsheet"