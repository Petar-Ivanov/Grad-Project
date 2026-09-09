import AuthCardWrapper from "../components/AuthCardWrapper";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 py-12">
      <AuthCardWrapper
        title="Welcome back!"
        subtitle="Sign in to your study workspace"
      >
        <LoginForm />
      </AuthCardWrapper>
    </div>
  );
}