import { ImageIcon } from "../../../../../components/icons/index.jsx";

export default {
    type: "image",
    label: "Image",
    icon: ImageIcon,

    createDefaultData() {
        return {
            url: "https://placehold.co/600x400/e2e8f0/475569?text=Placeholder+Image",
            caption: "New Image Caption",
        };
    },

    loadComponent: () => import("./ImageBlock.jsx"),
};