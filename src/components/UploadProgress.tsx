
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface UploadProgressProps {
  progress: number;
  status: string;
}

const UploadProgress = ({ progress, status }: UploadProgressProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-medium mb-4">Processing...</h3>
      <Progress value={progress} className="h-2 mb-2" />
      <p className="text-sm text-gray-500">{status}</p>
    </motion.div>
  );
};

export default UploadProgress;
