import { useState } from "react";
import { HideIcon, ShowIcon } from "../../../components/icons/index";
import { EDUCATION_LEVELS, LEARNING_STYLES } from "../../../utils/profileOptions";

export default function ProfileForm({ formData, onChange, onSubmitClick, isSaving = false }) {
    const [showPassword, setShowPassword] = useState(false);

    const inputClasses = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900 dark:focus:border-indigo-500";

    return (
        <form 
            onSubmit={(e) => { e.preventDefault(); onSubmitClick(); }} 
            className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
            
            {/* Account Credentials */}
            <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800/80">
                    Account Credentials
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white">
                            Username
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={onChange} 
                            required 
                            className={inputClasses} 
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={onChange} 
                            required 
                            className={inputClasses} 
                        />
                    </div>

                   <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                name="password"

                                value={formData.password}

                                onChange={onChange}

                                className={`${inputClasses} pr-12`}

                                placeholder="Leave blank to keep current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                            >
                                {
                                    showPassword 
                                    ? (
                                        <HideIcon/>
                                    ) : (
                                        <ShowIcon/>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white">
                            Date of Birth
                        </label>
                        <input 
                            type="date" 
                            name="birthday" 
                            value={formData.birthday} 
                            onChange={onChange} 
                            required 
                            className={`${inputClasses} [color-scheme:light] dark:[color-scheme:dark]`} 
                        />
                    </div>
                </div>
            </div>

            {/* Learning Profile */}
            <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800/80">
                    Learning Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white">
                            Education Level
                        </label>
                        <select 
                            name="educationLevel" 
                            value={formData.educationLevel} 
                            onChange={onChange} 
                            className={inputClasses}
                        >
                            {EDUCATION_LEVELS.map((level) => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white">
                            Learning Style <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <select 
                            name="learningStyle" 
                            value={formData.learningStyle} 
                            onChange={onChange} 
                            className={inputClasses}
                        >
                            {LEARNING_STYLES.map((style) => (
                                <option key={style.label} value={style.value}>{style.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white">
                            Bio <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <textarea 
                            name="bio" 
                            rows={3} 
                            value={formData.bio} 
                            onChange={onChange} 
                            placeholder="Tell the AI a bit about your background and goals..."
                            className={`resize-none ${inputClasses}`} 
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
                <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50"
            >
                {isSaving
                    ? "Saving Changes..."
                    : "Submit Changes"}
            </button>
            </div>
        </form>
    );
}