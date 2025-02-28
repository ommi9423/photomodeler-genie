
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface ModelCardProps {
  title: string;
  thumbnailUrl: string;
  date: string;
  index: number;
}

const ModelCard = ({ title, thumbnailUrl, date, index }: ModelCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" 
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-base">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{date}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModelCard;
