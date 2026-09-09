import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCardWrapper from "../components/AuthCardWrapper";
import RegisterStepOne from "../components/RegisterStepOne";
import RegisterStepTwo from "../components/RegisterStepTwo";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // master state for registration
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    educationLevel: "",
    learningStyle: "",
    bio: ""
  });

  const updateData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const {
      register,
      isRegistering,
      registerError,
  } = useAuth();

  const handleFinalSubmit = async () => {
    try {
        await register({
            username:
                formData.username,

            email:
                formData.email,

            password:
                formData.password,

            birthday:
                formData.birthday,

            educationLevel:
                formData.educationLevel,

            learningStyle:
                formData.learningStyle,

            bio:
                formData.bio,
        });

        navigate("/dashboard");

    } catch (error) {
        console.error(
            "Registration failed:",
            error
        );
    }
  };

  // const handleFinalSubmit = () => {
  //   // 
  //   console.log("Successfully Registered User: ", formData);
  //   navigate("/dashboard");
  // };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 py-12">
      <AuthCardWrapper
        title={
          step === 1 
          ? "Create your account" 
          : "Personalize your profile"
        }
        subtitle={
          step === 1 
          ? "Start building your workspaces today" 
          : "Help the AI tailor material specifically to you"
        }
        stepInfo={{ 
          current: step, 
          total: 2 
        }}
      >
        {
          step === 1 
          ? (
            <RegisterStepOne 
              formData={formData} 
              updateData={updateData} 
              onNext={() => setStep(2)} 
            />
          ) : (
            <RegisterStepTwo 
              formData={formData} 
              updateData={updateData} 
              onBack={() => setStep(1)} 
              onSubmit={handleFinalSubmit} 
              isSubmitting={isRegistering}
              error={registerError}
            />
          )
        }
      </AuthCardWrapper>
    </div>
  );
}