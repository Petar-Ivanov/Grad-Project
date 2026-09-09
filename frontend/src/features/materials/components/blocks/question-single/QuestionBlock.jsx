import { useEffect, useState } from "react";
import QuestionEditor from "./QuestionEditor";
import QuestionRenderer from "./QuestionRenderer";

export default function QuestionBlock({data, isEditing, setIsEditing, onDelete, onUpdate}){
    const [currentData, setCurrentData] = useState(data);
    const [draftData, setDraftData] = useState(data);

    const [answer, setAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // synchronizing the block with external data
    useEffect(() => {
        setCurrentData(data);

        if (!isEditing) {
            setDraftData(data);
        }
    }, [data, isEditing]);

    // setting editor data
    useEffect(() => {
        if (isEditing) {
            setDraftData(currentData);
        }
    }, [isEditing, currentData]);

    useEffect(() => {
        setAnswer(null);
        setIsSubmitted(false);
    }, [currentData]);

    const handleSave = () => {
        setCurrentData(draftData);
        setDraftData(draftData);

        setAnswer(null);
        setIsSubmitted(false);

        setIsEditing(false);

        onUpdate?.(draftData);
    };

    const handleCancel = () => {
        setDraftData(currentData);
        setIsEditing(false);
    };

    const handleAnswerChange = (newAnswer) => {
        if (isSubmitted) {
            return;
        }

        setAnswer(newAnswer);
    };

    const handleSubmit = () => {
        if (isSubmitted) {
            return;
        }

        if (currentData.type === "multiple-choice" && answer === null) {
            return;
        }

        if (currentData.type !== "multiple-choice" && (!answer || !answer.trim())) {
            return;
        }

        setIsSubmitted(true);
    };

    const handleReset = () => {
        if (currentData.allowReset === false) {
            return;
        }

        setAnswer(null);
        setIsSubmitted(false);
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

            {/* Parameter Editor */}
            {isEditing && (
                <QuestionEditor
                    data={draftData}
                    onChange={setDraftData}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onDelete={onDelete}
                />
            )}
            
            {!isEditing && (
                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                    <QuestionRenderer
                        data={currentData}
                        answer={answer}
                        onAnswerChange={setAnswer}
                        isSubmitted={isSubmitted}
                        disabled={isEditing}
                        onSubmit={handleSubmit}
                        onReset={() => { setAnswer(null); setIsSubmitted(false); }}
                    />
                </div>
            )}

        </div>
        
    );
}