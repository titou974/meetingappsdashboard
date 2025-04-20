"use client";
import { useRef, forwardRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import confettiAnimation from "@/assets/confetti.json";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  copied: boolean;
  onCopied: () => void;
}

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ textToCopy, copied, onCopied }, ref) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(textToCopy);
      lottieRef.current?.goToAndPlay(0, true);
      onCopied();
    };

    return (
      <Button
        ref={ref}
        onClick={handleCopy}
        className="relative flex items-center w-24"
        type="button"
      >
        {copied ? (
          <>
            Copié
            <Check size={16} />
          </>
        ) : (
          <>
            Copier
            <Copy size={16} />
          </>
        )}
        <span className="absolute top-[-1/2] -translate-y-1/2 pointer-events-none">
          <Lottie
            lottieRef={lottieRef}
            animationData={confettiAnimation}
            loop={false}
            autoplay={false}
            className="w-40 h-40"
          />
        </span>
      </Button>
    );
  }
);

CopyButton.displayName = "CopyButton";
export default CopyButton;
