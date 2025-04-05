import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function UnderMaintenance() {
  return (
    <div className="flex flex-col h-full justify-center p-4 text-center text-white items-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-bold mb-30"
      >
        Messages
      </motion.h1>
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        className="mb-4"
      >
        <AlertCircle className="h-16 text-[#70CCE2] w-16" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl font-bold mb-2"
      >
        This Page is Under Maintenance
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-gray-400 text-lg mb-4"
      >
        We're making some updates to improve your experience. Please check back soon!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      >
        <button className="bg-[#70CCE2] rounded-lg shadow-lg text-gray-900 duration-300 font-semibold hover:bg-[#70cbe2b0] px-6 py-2 transition-all">
          Notify Me
        </button>
      </motion.div>
    </div>
  );
}
