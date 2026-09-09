import { useState } from "react";
import FieldWrapper from "./FieldWrapper";
import { EDUCATION_LEVELS, LEARNING_STYLES } from "../../../utils/profileOptions";

export default function RegisterStepTwo({ formData, updateData, onBack, onSubmit, isSubmitting = false, error,}) {
    // const [isSubmitting, setIsSubmitting] = useState(false);
    //const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    const handleFinalSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.birthday) {
            newErrors.birthday = "Date of birth is required.";
        }

        if (!formData.educationLevel) {
            newErrors.educationLevel = "Please select an education level.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        await onSubmit();
    };

    // const handleFinalSubmit = async (e) => {
    //     e.preventDefault();
        
    //     const newErrors = {};
    //     if (!formData.birthday) {
    //         newErrors.birthday = "Date of birth is required.";
    //     }
    //     if (!formData.educationLevel) {
    //         newErrors.educationLevel = "Please select an education level.";
    //     }

    //     setErrors(newErrors);

    //     if (Object.keys(newErrors).length > 0) {
    //         return;
    //     }

    //     setIsSubmitting(true);
    //     // mock API registration call
    //     await new Promise(resolve => setTimeout(resolve, 1500));
    //     onSubmit(); // redirecting to dashboard
    // };

    const getInputClass = (fieldName) => {
        const base = "mt-1 block w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-950";
        return errors[fieldName]
            ? `${base} border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500`
            : `${base} border-slate-200 dark:border-slate-800`;
    };
   
    return (
        <form 
            onSubmit={handleFinalSubmit} 
            className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300"
        >

            <FieldWrapper 
                label={<span>Date of Birth <span className="text-red-500">*</span></span>} 
                errorMsg={errors.birthday}
            >
                <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => updateData({ birthday: e.target.value })}
                    className={`${getInputClass("birthday")} [color-scheme:light] dark:[color-scheme:dark]`}
                />
            </FieldWrapper>

            <FieldWrapper 
                label={<span>Education Level <span className="text-red-500">*</span></span>} 
                errorMsg={errors.educationLevel}
            >
                <select
                    value={formData.educationLevel}
                    onChange={(e) => updateData({ educationLevel: e.target.value })}
                    className={getInputClass("educationLevel")}
                >
                    <option value="" disabled>Select your level</option>
                    {EDUCATION_LEVELS.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </FieldWrapper>

            <FieldWrapper label={<span>Learning Style <span className="text-slate-400 font-normal">(Optional)</span></span>}>
                <select
                    value={formData.learningStyle}
                    onChange={(e) => updateData({ learningStyle: e.target.value })}
                    className={getInputClass("learningStyle")}
                >
                    {LEARNING_STYLES.map((style) => (
                        <option key={style.label} value={style.value}>{style.label}</option>
                    ))}
                </select>
            </FieldWrapper>

            <FieldWrapper label={<span>Short Bio <span className="text-slate-400 font-normal">(Optional)</span></span>}>
                <textarea
                    rows={2}
                    placeholder="What are your learning goals?"
                    value={formData.bio}
                    onChange={(e) => updateData({ bio: e.target.value })}
                    className={`${getInputClass("bio")} resize-none`}
                />
            </FieldWrapper>

            {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {error.message}
                </div>
            )}

            <div className="mt-2 flex gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="w-1/3 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 disabled:opacity-50"
                >
                    Back
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex flex-1 justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-500 disabled:opacity-50"
                >
                    {
                        isSubmitting 
                        ? (
                            <span className="flex items-center gap-2">
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : (
                            "Complete Registration"
                        )
                    }
                </button>
            </div>
        </form>
    );
}