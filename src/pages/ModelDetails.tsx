
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Trash2, Share, Edit, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import ThreeDemoViewer from '@/components/ThreeDemoViewer';

const demoModels = [
  {
    id: '1',
    title: 'Coffee Mug',
    description: 'A white ceramic coffee mug with a handle.',
    createdAt: 'June 15, 2023',
    thumbnailUrl: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    modelPath: '/models/sample.obj',
    materialPath: '/models/sample.mtl',
  },
  {
    id: '2',
    title: 'Desk Plant',
    description: 'A small potted succulent plant.',
    createdAt: 'May 28, 2023',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    modelPath: '/models/sample.obj',
    materialPath: '/models/sample.mtl',
  },
  {
    id: '3',
    title: 'Vintage Camera',
    description: 'An old film camera from the 1960s.',
    createdAt: 'May 10, 2023',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    modelPath: '/models/sample.obj',
    materialPath: '/models/sample.mtl',
  }
];

const ModelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<typeof demoModels[0] | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching model data
    const foundModel = demoModels.find(m => m.id === id);
    setModel(foundModel || null);
  }, [id]);

  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate deletion
    setTimeout(() => {
      toast({
        title: "Model deleted",
        description: "The 3D model has been deleted successfully.",
      });
      navigate('/dashboard');
    }, 1000);
  };

  const handleDownload = () => {
    toast({
      title: "Downloading model",
      description: "Your model is being prepared for download.",
    });
    
    // Simulate download preparation
    setTimeout(() => {
      // In a real app, you'd create a download link for the model files
      toast({
        title: "Download ready",
        description: "Your model has been downloaded.",
      });
    }, 2000);
  };

  if (!model) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium">Model not found</h2>
          <p className="text-gray-600 mt-2">The model you're looking for doesn't exist or has been deleted.</p>
          <Link to="/dashboard">
            <Button variant="outline" className="mt-4">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
        <div className="mb-8">
          <Link to="/dashboard" className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to dashboard
          </Link>
          
          <div className="flex justify-between items-start mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-semibold">{model.title}</h1>
              <p className="text-gray-600 mt-1">Created on {model.createdAt}</p>
            </motion.div>
            
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center text-red-500 focus:text-red-500"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <div className="h-4 w-4 mr-2 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ThreeDemoViewer 
            modelPath={model.modelPath}
            materialPath={model.materialPath}
          />
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium mb-4">Model Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p>{model.description}</p>
              
              <h3 className="text-sm font-medium text-gray-500 mt-4 mb-1">Created</h3>
              <p>{model.createdAt}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Formats</h3>
              <p>OBJ, FBX</p>
              
              <h3 className="text-sm font-medium text-gray-500 mt-4 mb-1">Polygon Count</h3>
              <p>~10,000 triangles</p>
              
              <h3 className="text-sm font-medium text-gray-500 mt-4 mb-1">Texture Resolution</h3>
              <p>2048 x 2048</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModelDetails;
