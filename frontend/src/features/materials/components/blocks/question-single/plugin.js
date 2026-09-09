import { QuestionIcon } from "../../../../../components/icons/index.jsx";

export default {
    type: "question-single",
    label: "Question",
    icon: QuestionIcon,

    createDefaultData() {
        return { 
            type: "multiple-choice", 
            prompt: "A new question", 
            options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"], 
            correctIndex: 0,
            allowReset: true
        };
    },

    loadComponent: () => import("./QuestionBlock.jsx"),
}