import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useForm,
} from "react-hook-form";

import { z } from "zod";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  motion,
} from "framer-motion";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import Input
from "../components/ui/Input";

import Button
from "../components/ui/Button";

import {
  useAuth,
} from "../context/AuthContext";

const registerSchema =
  z
    .object({
      name:
        z.string().min(
          2,
          "Name must be at least 2 characters"
        ),

      email:
        z.string().email(
          "Valid email required"
        ),

      password:
        z
          .string()
          .min(
            8,
            "Password must be at least 8 characters"
          )
          .regex(
            /^(?=.*[A-Z])(?=.*\d).+$/,
            "Must include 1 uppercase and 1 number"
          ),

      confirmPassword:
        z.string(),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        message:
          "Passwords do not match",
        path: [
          "confirmPassword",
        ],
      }
    );

type RegisterFormData =
  z.infer<
    typeof registerSchema
  >;

export default function RegisterPage() {
  const navigate =
    useNavigate();

  const {
    register: registerUser,
  } = useAuth();

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    authError,
    setAuthError,
  ] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<
    RegisterFormData
  >({
    resolver:
      zodResolver(
        registerSchema
      ),
  });

  const onSubmit =
    async (
      data:
        RegisterFormData
    ) => {
      try {
        setIsLoading(true);
        setAuthError("");

        await registerUser({
          name:
            data.name,
          email:
            data.email,
          password:
            data.password,
        });

        navigate(
          "/dashboard"
        );
      } catch (
        error
      ) {
        setAuthError(
          error instanceof
            Error
            ? error.message
            : "Registration failed"
        );
      } finally {
        setIsLoading(
          false
        );
      }
    };

  return (
    <div
      className="
        min-h-screen
        bg-[#0A0F1E]
        command-grid
        flex
        items-center
        justify-center
        px-4
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          glass-card
          rounded-[28px]
          p-8
          w-full
          max-w-md
        "
      >
        <p className="text-cyan-400 text-sm mb-3 uppercase tracking-[3px]">
          Smart Leads
        </p>

        <h1 className="font-space text-4xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 mb-8">
          Join the command center
        </p>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="flex flex-col gap-5"
        >
          <Input
            label="Name"
            placeholder="John Doe"
            register={register(
              "name"
            )}
            error={
              errors.name
            }
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            register={register(
              "email"
            )}
            error={
              errors.email
            }
          />

          <div className="relative">
            <Input
              label="Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              register={register(
                "password"
              )}
              error={
                errors.password
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-[52px] text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              register={register(
                "confirmPassword"
              )}
              error={
                errors.confirmPassword
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-[52px] text-slate-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {authError && (
            <p className="text-red-400 text-sm">
              {authError}
            </p>
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={
              isLoading
            }
          >
            Create Account
          </Button>

          <p className="text-sm text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}