export function createDefaultQuestion() {
    return {
        type: "multiple-choice",
        prompt: "New Question",
        options: ["Option 1", "Option 2"],
        correctIndex: 0,
        allowReset: true,
    };
}

export function createDefaultQuizData() {
    return {
        title: "New Mini-Quiz",
        viewMode: "paginated",
        submitMode: "individual",
        questions: [
            createDefaultQuestion(),
        ],
    };
}

export function addQuestionToQuiz(data, question = createDefaultQuestion()) {
    return {
        ...data,
        questions: [
            ...(data.questions ?? []),
            question,
        ],
    };
}

export function removeQuestionFromQuiz(data, index) {
    const questions = data.questions ?? [];

    // A quiz must contain at least one question
    if (questions.length <= 1) {
        return data;
    }

    return {
        ...data,
        questions: questions.filter(
            (_, questionIndex) => questionIndex !== index
        ),
    };
}

export function updateQuestionInQuiz(data, index, updatedQuestion) {
    const questions = data.questions ?? [];

    if (!questions[index]) {
        return data;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;

    return {
        ...data,
        questions: updatedQuestions,
    };
}

export function getQuizQuestions(data) {
    return data?.questions ?? [];
}

export function isPaginatedQuiz(data) {
    return data?.viewMode === "paginated";
}

export function isBatchSubmitQuiz(data) {
    return (
        data?.viewMode === "list" &&
        data?.submitMode === "batch"
    );
}