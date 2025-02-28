
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Camera, X, Loader2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import UploadProgress from '@/components/UploadProgress';
import { uploadImagesForReconstruction } from '@/services/reconstructionService';

const CreateModel = () => {
  const [modelName, setModelName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload image files only.",
        variant: "destructive"
      });
      return;
    }
    
    addImages(imageFiles);
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      addImages(files);
    }
  };

  const addImages = (files: File[]) => {
    if (images.length + files.length > 20) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 20 images.",
        variant: "destructive"
      });
      return;
    }
    
    setImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!modelName.trim()) {
      toast({
        title: "Model name required",
        description: "Please enter a name for your model.",
        variant: "destructive"
      });
      return;
    }
    
    if (images.length < 5) {
      toast({
        title: "More images needed",
        description: "Please upload at least 5 images for better results.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Use our reconstruction service to process the images
      const result = await uploadImagesForReconstruction(
        images, 
        modelName,
        (progress, status) => {
          setProgress(progress);
          setProgressStatus(status);
        }
      );
      
      if (result.status === 'completed') {
        toast({
          title: "Model created successfully",
          description: "Your 3D model has been created and is ready to view.",
        });
        
        // In a real app, you would store the model in your database
        // and then redirect to the model page with the ID
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast({
          title: "Model creation failed",
          description: "There was an error creating your 3D model. Please try again.",
          variant: "destructive"
        });
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Error during model creation:", error);
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          
          <h1 className="text-2xl font-semibold mt-4">Create New 3D Model</h1>
          <p className="text-gray-600 mt-1">
            Upload photos of an object to generate a 3D model.
          </p>
        </div>
        
        {isUploading ? (
          <UploadProgress progress={progress} status={progressStatus} />
        ) : (
          <motion.div 
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="modelName">Model Name</Label>
                  <Input
                    id="modelName"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="Enter a name for your 3D model"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Upload Images</Label>
                  <div 
                    className={`mt-1 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${
                      isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Camera className="h-10 w-10 text-gray-400 mb-4" />
                    <p className="text-center text-gray-600 mb-2">
                      Drag and drop your images here
                    </p>
                    <p className="text-center text-gray-500 text-sm mb-4">
                      Upload at least 5 images from different angles for best results
                    </p>
                    <div className="mt-2">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Select Images
                        </Button>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
                {previewUrls.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Uploaded Images ({previewUrls.length}/20)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative rounded-md overflow-hidden aspect-square bg-gray-100">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isUploading || images.length === 0}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Create 3D Model'
                    )}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Image className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Tips for best results</h4>
                  <ul className="mt-1 text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Take photos from multiple angles, covering the entire object</li>
                    <li>Ensure consistent lighting across all photos</li>
                    <li>Avoid reflective or transparent surfaces when possible</li>
                    <li>Place the object on a contrasting background</li>
                    <li>Try to keep the camera at a consistent distance from the object</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreateModel;
