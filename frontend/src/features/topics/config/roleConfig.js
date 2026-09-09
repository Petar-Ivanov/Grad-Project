import { EditIcon, ShowIcon, SocialIcon, UserOwnerIcon } from "../../../components/icons/index";


export const ROLE_ICONS = {
    all: SocialIcon,
    owner: UserOwnerIcon,
    editor: EditIcon,
    viewer: ShowIcon,
};

export const ROLE_FILTERS = [
    { label: "All", value: "all" },
    { label: "Editors", value: "editor" },
    { label: "Viewers", value: "viewer" },
];