import React from 'react'
import { motion, AnimatePresence} from "motion/react"

interface AlertProps {
    type: string,
    text: string
}

const Alert = ({ type, text }: AlertProps) => {
    const alertVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -50, scale: 0.8 },
    };

    return (
        <AnimatePresence>
            <motion.div className='fixed z-50 flex items-center justify-center
    bottom-5 right-5'
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={alertVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className={`p-2 ${type === "danger" ? "bg-red-500" : "bg-green-400"
                    } items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex
             rounded-md p-5`}>
                    <p className={`flex rounded-full ${type === "danger" ? "bg-red-500" : "bg-green-400"
                        }`}
                    >
                        {type === "danger" ? "Failed" : "Success"}
                    </p>
                    <p className='mr-2 text-left'>{text}</p>
                </div>
            </motion.div>
        </AnimatePresence>

    )
}

export default Alert