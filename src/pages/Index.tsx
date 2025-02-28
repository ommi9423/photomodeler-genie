
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Camera, Upload, Box, Download, CheckCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import ThreeDemoViewer from '@/components/ThreeDemoViewer';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer to reveal elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
    });
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  
  return (
    <div className="min-h-screen" ref={containerRef}>
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <motion.section 
        className="pt-32 pb-20 px-6 md:px-16 relative overflow-hidden bg-cover bg-center"
        style={{ 
          opacity, 
          scale,
          backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
              Transform Photos into<br/>Professional 3D Models
            </h1>
            <p className="mt-6 text-xl text-gray-200 leading-relaxed">
              Our AI-powered platform turns your photos into detailed, textured 3D models ready for your next project.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-gray-200">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/learn-more">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* 3D Model Demo */}
      <section className="py-16 px-6 md:px-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl font-semibold text-white">See It In Action</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Explore one of our AI-generated 3D models. Drag to rotate, scroll to zoom.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <ThreeDemoViewer 
              modelPath="/models/sample.obj"
              materialPath="/models/sample.mtl"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works with Background Image */}
      <section className="py-20 px-6 md:px-16 relative">
        <div className="absolute inset-0 z-0 opacity-15" 
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1610366398516-46da9dec5931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl font-semibold">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our technology makes creating 3D models simple, even if you're not a 3D artist.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6 reveal stagger-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Camera className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Capture Photos</h3>
              <p className="mt-3 text-gray-600">
                Take multiple photos of your object from different angles with consistent lighting.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 reveal stagger-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Upload Images</h3>
              <p className="mt-3 text-gray-600">
                Upload your photos to our platform and let our AI analyze them.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 reveal stagger-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Download className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Download Model</h3>
              <p className="mt-3 text-gray-600">
                Get your fully textured 3D model ready for your next project.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section with Gradient Background */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl font-semibold">Powerful Features</h2>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Our platform offers everything you need to create high-quality 3D models.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-blue-300" />}
              title="High-Quality Textures"
              description="Create photorealistic textures that capture every detail of your object."
              delay={0}
              className="bg-white/10 backdrop-blur-sm border border-white/20"
              textColor="text-white"
              descriptionColor="text-gray-300"
            />
            
            <FeatureCard
              icon={<Layers className="h-6 w-6 text-blue-300" />}
              title="Mesh Optimization"
              description="Our AI creates optimized meshes that balance detail and performance."
              delay={0.1}
              className="bg-white/10 backdrop-blur-sm border border-white/20"
              textColor="text-white"
              descriptionColor="text-gray-300"
            />
            
            <FeatureCard
              icon={<Box className="h-6 w-6 text-blue-300" />}
              title="Multiple Formats"
              description="Export your models in various formats including OBJ, FBX, and more."
              delay={0.2}
              className="bg-white/10 backdrop-blur-sm border border-white/20"
              textColor="text-white"
              descriptionColor="text-gray-300"
            />
          </div>
        </div>
      </section>
      
      {/* CTA with Background Image */}
      <section className="py-24 px-6 md:px-16 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1535378273068-9bb67d5b7be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundAttachment: 'fixed'
          }}>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm py-16 px-8 rounded-xl shadow-xl"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">
              Ready to transform your photos into 3D models?
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of users creating stunning 3D assets with our platform.
            </p>
            <div className="mt-10">
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Get Started For Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
