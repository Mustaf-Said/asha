import { getSession } from "@/auth.config";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const user = await getSession();

  if (user) {
    redirect("/community");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600 mb-8">Log in to join the nursing community</p>

          <LoginForm />

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900 font-medium">Demo Credentials:</p>
            <p className="text-sm text-blue-800 mt-2">Email: <code className="bg-blue-100 px-2 py-1 rounded">nurse1</code></p>
            <p className="text-sm text-blue-800">Password: <code className="bg-blue-100 px-2 py-1 rounded">password123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
