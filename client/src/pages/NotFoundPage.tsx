import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div
      className="
        relative
        flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-[#0A0F1E]
        px-4
        text-white
        command-grid
      "
    >
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[length:100%_4px]
          animate-[scanline_4s_linear_infinite]
        "
      />

      <div
        className="
          absolute
          h-[400px] w-[400px]
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
      />

      <div
        className="
          relative z-10
          max-w-xl
          rounded-[32px]
          border border-white/10
          bg-white/5
          p-10
          text-center
          backdrop-blur-xl
          shadow-[0_0_80px_rgba(0,212,255,0.08)]
        "
      >
        <h1
          className="
            font-space
            text-8xl
            font-bold
            tracking-widest
            text-cyan-300
            animate-[glitch_1.5s_infinite]
          "
        >
          404
        </h1>

        <h2
          className="
            mt-4
            font-space
            text-3xl
            font-bold
          "
        >
          Signal Lost
        </h2>

        <p className="mt-4 text-slate-400">
          The route you are trying to reach has vanished from the command grid.
        </p>

        <div className="mt-8 flex justify-center">
          <Link to="/dashboard">
            <Button>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}