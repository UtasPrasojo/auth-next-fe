import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-3xl font-bold text-center">Sign In</h2>
          <p className="text-center text-gray-600 mt-2">
            Welcome back to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}