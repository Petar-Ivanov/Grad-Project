import { useState } from "react";
import { Link } from "react-router-dom";
import { HideIcon, ShowIcon } from "../../../components/icons/index";
import FieldWrapper from "./FieldWrapper";


export default function RegisterStepOne({ formData, updateData, onNext }) {
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const validate = async () => {
        const newErrors = {};

        // username validation
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
            newErrors.username = "Username must be 3-20 characters (letters, numbers, underscores).";
        }

        // email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password needs 8+ chars, 1 uppercase, 1 number, and 1 special symbol.";
        }

        // confirm password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );
        // if (Object.keys(newErrors).length > 0) {
        //     return false;
        // }

        // mock backend check for taken credentials
        // setIsChecking(true);
        // await new Promise(resolve => setTimeout(resolve, 800));
        // setIsChecking(false);

        // if (formData.email.toLowerCase() === "taken@example.com") {
        //     setErrors({ email: "This email is already registered." });
        //     return false;
        // }
        // if (formData.username.toLowerCase() === "admin") {
        //     setErrors({ username: "This username is already taken." });
        //     return false;
        // }

        // return true;
    };

    const handleNextClick = async (e) => {
        e.preventDefault();
        const isValid = await validate();
        if (isValid) {
            onNext();
        }
    };

    const getInputClass = (fieldName) => {
        const base = "mt-1 block w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-950";    
        return errors[fieldName]
        ? `${base} border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-500`
        : `${base} border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:focus:border-indigo-500`;
    };

    return (
        <form 
            onSubmit={handleNextClick} 
            className="flex flex-col"
        >
            
            <FieldWrapper 
                label="Username" 
                errorMsg={errors.username}
            >
                <input
                    type="text"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={(e) => updateData({ username: e.target.value })}
                    className={getInputClass("username")}
                />
            </FieldWrapper>

            <FieldWrapper 
                label="Email Address" 
                errorMsg={errors.email}
            >
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => updateData({ email: e.target.value })}
                    className={getInputClass("email")}
                />
            </FieldWrapper>

            <FieldWrapper 
                label="Password" 
                errorMsg={errors.password}
            >
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => updateData({ password: e.target.value })}
                        className={`${getInputClass("password")} pr-12`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
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
            </FieldWrapper>

            <FieldWrapper 
                label="Confirm Password" 
                errorMsg={errors.confirmPassword}
            >
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => updateData({ confirmPassword: e.target.value })}
                    className={getInputClass("confirmPassword")}
                />
            </FieldWrapper>

            <button
                type="submit"
                disabled={isChecking}
                className="mt-2 flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-500 disabled:opacity-50"
            >
                {isChecking ? "Validating..." : "Continue to Step 2"}
            </button>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link 
                    to="/login" 
                    className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                    Sign in
                </Link>
            </p>

        </form>
    );
}