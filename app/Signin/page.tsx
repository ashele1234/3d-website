"use client";

import { FcGoogle } from "react-icons/fc";
import { auth } from "../Firebase/Firebaseconfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signInWithGoogle } from "../lib/auth";
import Link from "next/link";
import logo from "../Assets/images/logo-removebg-preview (1).png"
import Image from "next/image";
const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // ✅ Fixed: use Firebase's built-in signInWithEmailAndPassword
  const handleSignin = async () => {
    setLoading(true);
    try {
      const userCredential = await
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("Logged in:", userCredential.user);
  })
  .catch((error) => {
    console.error(error.message);
  });

      toast.success("Signed in successfully 🎉");
      router.push("/Home");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      console.log("User signed in with Google:", result.user);

      toast.success("Signed in with Google 🚀");
      router.push("/Home");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email address");
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset link sent! 📩");
      setShowReset(false);
      setResetEmail("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your image"
          src={logo}
          width={100}
          height={100}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => setShowReset(!showReset)}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Sign In with Email */}
          <button
            type="button"
            disabled={loading}
            onClick={handleSignin}
            className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign in"}
          </button>

          {/* Google Sign In */}
          <button
            type="button"
            disabled={googleLoading}
            onClick={handleGoogleSignin}
            className={`w-full flex justify-center items-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 ${
              googleLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {googleLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                Sign in with Google <FcGoogle className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Forgot Password Section */}
        {showReset && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">
              Reset Password
            </h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
            />
            <button
              type="button"
              disabled={resetLoading}
              onClick={handlePasswordReset}
              className={`mt-3 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 ${
                resetLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {resetLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="./Signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
