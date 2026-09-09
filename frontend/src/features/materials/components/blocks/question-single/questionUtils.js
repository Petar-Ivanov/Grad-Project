export const QUESTION_TYPES = {
    MULTIPLE_CHOICE: "multiple-choice",
    FREE_RESPONSE: "free-response",
};

export const MIN_MULTIPLE_CHOICE_OPTIONS = 2;
export const MIN_MATCHING_PAIRS = 2;

export function createDefaultMultipleChoiceData() {
    return {
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        prompt: "A new question",
        options: [
            "Answer 1",
            "Answer 2",
        ],
        correctIndex: 0,
        allowReset: true,
    };
}

export function createDefaultFreeResponseData() {
    return {
        type: QUESTION_TYPES.FREE_RESPONSE,
        prompt: "A new question",
        feedbackTarget: "",
        allowReset: true,
    };
}

export function createDefaultMatchingData() {
    return {
        type: QUESTION_TYPES.MATCHING,
        prompt: "Match each item with its correct answer.",
        leftItems: [
            "Item 1",
            "Item 2",
        ],
        rightItems: [
            "Match 1",
            "Match 2",
        ],
        correctMatches: [0, 1],
        allowReset: true,
    };
}

export function createDefaultFillGapData() {
    return {
        type: QUESTION_TYPES.FILL_GAP,
        prompt: "The answer is ____.",
        acceptedAnswers: [
            "answer",
        ],
        allowReset: true,
    };
}

export function changeQuestionType(question, newType) {
const baseData = {
        ...question,
        type: newType,
    };

    switch (newType) {
        case QUESTION_TYPES.MULTIPLE_CHOICE:
            return normalizeMultipleChoiceData(baseData);

        case QUESTION_TYPES.FREE_RESPONSE:
            return normalizeFreeResponseData(baseData);

        case QUESTION_TYPES.MATCHING:
            return normalizeMatchingData(baseData);

        case QUESTION_TYPES.FILL_GAP:
            return normalizeFillGapData(baseData);

        default:
            return question;
    }
}

export function updateQuestionField(question, field, value) {
    return {
        ...question,
        [field]: value,
    };
}

export function updateQuestionOption(question, index, value) {
    const options = [
        ...(question.options ?? []),
    ];

    if (index < 0 || index >= options.length) {
        return question;
    }

    options[index] = value;

    return {
        ...question,
        options,
    };
}

export function addQuestionOption(question) {
    const options = [
        ...(question.options ?? []),
    ];

    return {
        ...question,
        options: [
            ...options,
            `Option ${options.length + 1}`,
        ],
    };
}

export function removeQuestionOption(question, indexToRemove) {
    const options = [
        ...(question.options ?? []),
    ];

    if (options.length <= MIN_MULTIPLE_CHOICE_OPTIONS) {
        return question;
    }

    if (indexToRemove < 0 || indexToRemove >= options.length) {
        return question;
    }

    const updatedOptions = options.filter((_, index) =>
        index !== indexToRemove
    );

    let correctIndex =
        Number.isInteger(question.correctIndex)
        ? question.correctIndex
        : 0;

    if (correctIndex === indexToRemove) {
        correctIndex = 0;
    } else if (correctIndex > indexToRemove) {
        correctIndex -= 1;
    }

    // safety check
    correctIndex = Math.min(
        Math.max(correctIndex, 0),
        updatedOptions.length - 1
    );

    return {
        ...question,
        options: updatedOptions,
        correctIndex,
    };
}

export function addMatchingPair(question) {
    const leftItems = [
        ...(question.leftItems ?? []),
    ];

    const rightItems = [
        ...(question.rightItems ?? []),
    ];

    const correctMatches = [
        ...(question.correctMatches ?? []),
    ];

    const index = leftItems.length;

    return {
        ...question,

        leftItems: [
            ...leftItems,
            `Item ${index + 1}`,
        ],

        rightItems: [
            ...rightItems,
            `Match ${index + 1}`,
        ],

        correctMatches: [
            ...correctMatches,
            index,
        ],
    };
}

export function removeMatchingPair(question, indexToRemove) {
    const leftItems = [
        ...(question.leftItems ?? []),
    ];

    const rightItems = [
        ...(question.rightItems ?? []),
    ];

    const correctMatches = [
        ...(question.correctMatches ?? []),
    ];

    if (leftItems.length <= MIN_MATCHING_PAIRS) {
        return question;
    }

    if (indexToRemove < 0 || indexToRemove >= leftItems.length) {
        return question;
    }

    const updatedLeftItems =
        leftItems.filter((_, index) =>
            index !== indexToRemove
        );

    const updatedRightItems =
        rightItems.filter((_, index) =>
            index !== indexToRemove
        );

    const updatedMatches =
        correctMatches
            .filter((_, index) =>
                index !== indexToRemove
            )
            .map((match) => {
                if (match === indexToRemove) {
                    return 0;
                }

                if (match > indexToRemove) {
                    return match - 1;
                }

                return match;
            });

    return {
        ...question,
        leftItems: updatedLeftItems,
        rightItems: updatedRightItems,
        correctMatches: updatedMatches,
    };
}

export function updateMatchingItem(question, side, index, value) {
    const items = [
        ...(question[side] ?? []),
    ];

    if (index < 0 || index >= items.length) {
        return question;
    }

    items[index] = value;

    return {
        ...question,
        [side]: items,
    };
}

export function updateCorrectMatch(question, leftIndex, rightIndex) {
    const correctMatches = [
        ...(question.correctMatches ?? []),
    ];

    if (
        leftIndex < 0 ||
        leftIndex >= correctMatches.length
    ) {
        return question;
    }

    correctMatches[leftIndex] = Number(rightIndex);

    return {
        ...question,
        correctMatches,
    };
}

export function addAcceptedAnswer(question) {
    return {
        ...question,

        acceptedAnswers: [
            ...(question.acceptedAnswers ?? []),
            "",
        ],
    };
}

export function updateAcceptedAnswer(question, index, value) {
    const acceptedAnswers = [
        ...(question.acceptedAnswers ?? []),
    ];

    if (
        index < 0 ||
        index >= acceptedAnswers.length
    ) {
        return question;
    }

    acceptedAnswers[index] = value;

    return {
        ...question,
        acceptedAnswers,
    };
}

export function removeAcceptedAnswer(question, indexToRemove) {
    const acceptedAnswers = [
        ...(question.acceptedAnswers ?? []),
    ];

    if (acceptedAnswers.length <= 1) {
        return question;
    }

    return {
        ...question,

        acceptedAnswers:
            acceptedAnswers.filter((_, index) =>
                index !== indexToRemove
            ),
    };
}

export function normalizeMultipleChoiceData(question) {
    const options =
        Array.isArray(question.options) &&
        question.options.length >= MIN_MULTIPLE_CHOICE_OPTIONS
            ? question.options.map((option) =>
                  String(option ?? "")
              )
            : ["Option 1", "Option 2"];

    const correctIndex =
        Number.isInteger(question.correctIndex) &&
        question.correctIndex >= 0 &&
        question.correctIndex < options.length
        ? question.correctIndex
        : 0;

    return {
        ...question,
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        options,
        correctIndex,
        allowReset: question.allowReset !== false,
    };
}

export function normalizeFreeResponseData(question) {
    return {
        ...question,
        type: QUESTION_TYPES.FREE_RESPONSE,
        prompt: String(question.prompt ?? ""),
        feedbackTarget: String(question.feedbackTarget ?? ""),
        allowReset: question.allowReset !== false,
    };
}

export function normalizeMatchingData(question) {
    const leftItems =
        Array.isArray(question.leftItems) &&
        question.leftItems.length >= MIN_MATCHING_PAIRS
        ? question.leftItems.map((item) =>
                String(item ?? "")
            )
        : ["Item 1", "Item 2"];

    const rightItems =
        Array.isArray(question.rightItems) &&
        question.rightItems.length >= leftItems.length
            ? question.rightItems
            .slice(0, leftItems.length)
            .map((item) => String(item ?? "")
            )
            : leftItems.map(
                  (_, index) => `Match ${index + 1}`
              );

    const correctMatches =
        leftItems.map((_, index) => {
            const value =
                question.correctMatches?.[index];

            return Number.isInteger(value) &&
                value >= 0 &&
                value < rightItems.length
                ? value
                : Math.min(
                      index,
                      rightItems.length - 1
                  );
        });

    return {
        ...question,
        type: QUESTION_TYPES.MATCHING,
        leftItems,
        rightItems,
        correctMatches,
        allowReset:
            question.allowReset !== false,
    };
}

export function normalizeFillGapData(question) {
    const acceptedAnswers =
        Array.isArray(question.acceptedAnswers)
            ? question.acceptedAnswers
                  .map((answer) =>
                      String(answer ?? "")
                  )
                  .filter(Boolean)
            : [];

    return {
        ...question,
        type: QUESTION_TYPES.FILL_GAP,
        prompt: String(question.prompt ?? ""),
        acceptedAnswers:
            acceptedAnswers.length > 0
            ? acceptedAnswers
            : [""],
        allowReset:
            question.allowReset !== false,
    };
}