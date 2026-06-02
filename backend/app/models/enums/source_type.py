import enum


class SourceType(str, enum.Enum):
    PDF = "pdf"
    URL = "url"
    TEXT = "text"
    DOCX = "docx"
    YOUTUBE = "youtube"