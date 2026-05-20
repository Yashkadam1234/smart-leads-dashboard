import {
  ReactNode,
  useEffect,
} from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
      document.body.style.overflow =
        "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        px-4
      "
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close modal overlay"
        className="
          absolute inset-0
          bg-black/70
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      <div
        className="
          relative z-10
          w-full max-w-lg
          animate-[modalIn_0.2s_ease-out]
          rounded-3xl
          border border-white/10
          bg-[#0D1326]
          p-6
          shadow-[0_0_60px_rgba(0,212,255,0.12)]
        "
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-space text-2xl font-bold text-white">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-slate-400
              hover:bg-white/10
              hover:text-white
            "
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}