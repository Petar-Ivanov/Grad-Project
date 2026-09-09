import { QuizIcon } from "../../../../../components/icons/index.jsx";

export default {
    type: "question-sequence",
    label: "Quiz",
    icon: QuizIcon,

    createDefaultData() {
        return { 
            title: "New Mini-Quiz", 
            viewMode: "paginated", 
            submitMode: "individual", 
            questions: [
            {
                type: "multiple-choice",
                prompt: "Question 1",
                options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                correctIndex: 1
            },
            {
                type: "free-response",
                prompt: "Question 2",
                feedbackTarget: "Question answer"
            }
        ]
        };
    },

    loadComponent: () => import("./QuizBlock.jsx"),
}