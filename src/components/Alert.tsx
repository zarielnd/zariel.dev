import React from "react";
import { motion, AnimatePresence } from "motion/react";

export type AlertType = "success" | "danger";

interface AlertProps {
  type: AlertType;
  text: string;
}

const Alert = ({ type, text }: AlertProps) => {
  const alertVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      <motion.div
        role="alert"
        aria-live="polite"
        className="fixed z-50 flex items-center justify-center bottom-5 right-5"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={alertVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`p-2 ${
            type === "danger" ? "bg-red-500" : "bg-green-500"
          } items-center text-white leading-none rounded-md lg:rounded-full flex lg:inline-flex p-5 shadow-lg`}
        >
          <span
            className={`flex rounded-full px-2 py-1 uppercase text-xs font-bold mr-3 ${
              type === "danger" ? "bg-red-700" : "bg-green-700"
            }`}
          >
            {type === "danger" ? "Failed" : "Success"}
          </span>
          <span className="text-left font-medium">{text}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
