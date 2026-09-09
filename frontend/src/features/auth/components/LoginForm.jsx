import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { HideIcon, ShowIcon } from "../../../components/icons/index";
import FieldWrapper from "./FieldWrapper";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        login,
        isLoggingIn,
    } = useAuth();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    // const [isChecking, setIsChecking] = useState(false);

    const validate = async () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

        // mock backend authentication
        // setIsChecking(true);
        // await new Promise(resolve => setTimeout(resolve, 800));
        // setIsChecking(false);

        // mock invalid credential response
        // if (formData.email.toLowerCase() === "wrong@example.com") {
        //     setErrors({ password: "The email or password you entered is incorrect." });
        //     return false;
        // }

        // return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();

        if (!isValid) {
            return;
        }

        try {
            await login({
                email: formData.email,

                password: formData.password,
            });

            const from =
                location.state?.from?.pathname ?? "/dashboard";

            navigate(from, {replace: true});

        } catch (error) {
            setErrors({
                password:
                    error.message || "The email or password you entered is incorrect.",
            });
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const isValid = await validate();
    //     if (isValid) {
    //         console.log("Logging in...", formData);
    //         navigate("/dashboard");
    //     }
    // };

    const getInputClass = (fieldName) => {
        const base = "mt-1 block w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-950";    
        return errors[fieldName]
            ? `${base} border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-500`
            : `${base} border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:focus:border-indigo-500`;
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col"
        >
            
            <FieldWrapper 
              label="Email Address" 
              errorMsg={errors.email}
            >
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={getInputClass("email")}
                />
            </FieldWrapper>

            <FieldWrapper 
                label={
                    <div className="flex items-center justify-between w-full">
                        <span>Password</span>
                        {/* <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            Forgot password?
                        </a> */}
                    </div>
                } 
                errorMsg={errors.password}
            >
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))}
                        className={`${getInputClass("password")} pr-12`}
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
                    >
                        {showPassword ? <HideIcon /> : <ShowIcon />}
                    </button>
                </div>
            </FieldWrapper>

            <button
                type="submit"
                disabled={isLoggingIn}
                className="mt-2 flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-500 disabled:opacity-50"
            >
                {isLoggingIn ? "Signing in..." : "Sign In"}
            </button>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?{" "}
                <Link 
                    to="/register" 
                    className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                    Create an account
                </Link>
            </p>
        </form>
    );
}


// logout
{/*
import { useAuth } from "../hooks/useAuth";

const {
    user,
    logout,
} = useAuth();

await logout();
navigate("/login");
*/}