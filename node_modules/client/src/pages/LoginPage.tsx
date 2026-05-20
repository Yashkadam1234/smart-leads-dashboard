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

const loginSchema =
  z.object({
    email:
      z.string().email(
        "Valid email required"
      ),

    password:
      z.string().min(
        8,
        "Password must be at least 8 characters"
      ),
  });

type LoginFormData =
  z.infer<
    typeof loginSchema
  >;

export default function LoginPage() {
  const navigate =
    useNavigate();

  const {
    login,
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
    LoginFormData
  >({
    resolver:
      zodResolver(
        loginSchema
      ),
  });

  const onSubmit =
    async (
      data:
        LoginFormData
    ) => {
      try {
        setIsLoading(true);
        setAuthError("");

        await login(
          data
        );

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
            : "Login failed"
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
        relative
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          h-[300px]
          w-[300px]
          rounded-full
          bg-cyan-500/10
          blur-[100px]
        "
      />

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
          relative
          z-10
          rounded-[28px]
          p-8
          w-full
          max-w-md
        "
      >
        <p
          className="
            text-cyan-400
            text-sm
            mb-3
            uppercase
            tracking-[3px]
          "
        >
          Smart Leads
        </p>

        <h1
          className="
            font-space
            text-4xl
            font-bold
            mb-2
          "
        >
          Command Login
        </h1>

        <p
          className="
            text-slate-400
            mb-8
          "
        >
          Access your
          dashboard
        </p>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="
            flex
            flex-col
            gap-5
          "
        >
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

          <div>
            <div className="relative">
              <Input
                label="Password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
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
                className="
                  absolute
                  right-4
                  top-[52px]
                  text-slate-400
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
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
            Sign In
          </Button>

          <p
            className="
              text-sm
              text-center
              text-slate-400
            "
          >
            No account?{" "}
            <Link
              to="/register"
              className="
                text-cyan-400
              "
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}