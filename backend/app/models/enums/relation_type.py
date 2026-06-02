import enum


class RelationType(str, enum.Enum):
    PARTOF = "part_of"
    PREQUISITEOF = "prerequisite"
    RELATEDTO = "related_to"


# contradicts 
# supports
# example_of