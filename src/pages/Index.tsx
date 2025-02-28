
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Upload, CheckCircle, Download, Zap, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import ThreeDemoViewer from '@/components/ThreeDemoViewer';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
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
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <div className="min-h-screen bg-black text-white" ref={containerRef}>
      <motion.div 
        className="progress-bar" 
        style={{ 
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' 
        }} 
      />
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 px-6 md:px-16 relative overflow-hidden"
        style={{ 
          opacity, 
          scale,
          y: useTransform(scrollYProgress, [0, 0.2], [0, 50])
        }}
      >
        {/* Parallax Background Elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"></div>
        </motion.div>
        
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-purple-900/20 to-black"></div>
        
        {/* Animated Particles/Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
                 backgroundSize: '100px 100px' 
               }}>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              From Photos to 3D,<br/>In Seconds
            </motion.h1>
            <motion.p 
              className="mt-6 text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Our AI transforms your ordinary photos into extraordinary 3D models,
              ready to use in AR, VR, games, or any creative project.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/learn-more">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10">
                  See Examples
                </Button>
              </Link>
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="mt-16 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
            >
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
                <MousePointer className="h-6 w-6 text-gray-400 animate-bounce" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* 3D Model Demo */}
      <section className="py-16 px-6 md:px-16 bg-gradient-to-b from-black to-blue-950/30 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                 backgroundSize: '30px 30px' 
               }}>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <span className="inline-block py-1 px-3 rounded-full text-sm bg-blue-900/50 text-blue-200 mb-4">
              Interactive Demo
            </span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400"
              style={{ rotate }}
            >
              See It In Action
            </motion.h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Drag to rotate, scroll to zoom. Watch how the model transforms as you scroll.
            </p>
          </div>
          
          <motion.div 
            className="relative rounded-xl overflow-hidden aspect-video shadow-2xl shadow-blue-900/20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              x: useTransform(scrollYProgress, [0.3, 0.5], [100, 0]),
              rotateY: useTransform(scrollYProgress, [0.3, 0.5], [30, 0])
            }}
          >
            {!isModelLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-purple-900/50 z-10">
                <div className="text-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white text-lg">Loading 3D Model...</p>
                </div>
              </div>
            )}
            <ThreeDemoViewer 
              modelPath="/models/sample.glb"
              onLoad={() => setIsModelLoaded(true)}
            />
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-purple-950/20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 reveal">
            <span className="inline-block py-1 px-3 rounded-full text-sm bg-purple-900/50 text-purple-200 mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Transform your photos into 3D models in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Line connecting steps */}
            <motion.div 
              className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 z-0"
              style={{
                scaleX: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
                transformOrigin: "left"
              }}
            />
            
            <motion.div 
              className="relative z-10 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <motion.div 
                  className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Upload className="h-7 w-7 text-white" />
                </motion.div>
                <div className="absolute top-6 right-6 bg-blue-900/80 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-medium">1</span>
                </div>
                <h3 className="mt-2 text-xl font-medium text-center text-white">Upload Photos</h3>
                <p className="mt-3 text-gray-300 text-center">
                  Take multiple photos of your object from different angles and upload them to our platform.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative z-10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <motion.div 
                  className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Zap className="h-7 w-7 text-white" />
                </motion.div>
                <div className="absolute top-6 right-6 bg-purple-900/80 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-medium">2</span>
                </div>
                <h3 className="mt-2 text-xl font-medium text-center text-white">AI Processing</h3>
                <p className="mt-3 text-gray-300 text-center">
                  Our advanced AI algorithms analyze your photos and generate a detailed 3D model with textures.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative z-10 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <motion.div 
                  className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Download className="h-7 w-7 text-white" />
                </motion.div>
                <div className="absolute top-6 right-6 bg-blue-900/80 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-medium">3</span>
                </div>
                <h3 className="mt-2 text-xl font-medium text-center text-white">Download Model</h3>
                <p className="mt-3 text-gray-300 text-center">
                  Download your fully textured 3D model in various formats (OBJ, FBX, GLTF) ready for use.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-blue-950/30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <span className="inline-block py-1 px-3 rounded-full text-sm bg-blue-900/50 text-blue-200 mb-4">
              Advanced Capabilities
            </span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400"
              style={{ y }}
            >
              Powerful Features
            </motion.h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need to create stunning 3D models
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-blue-300" />}
              title="Photorealistic Textures"
              description="Our AI captures the exact look and feel of your original object with high-quality textures."
              delay={0}
            />
            
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-purple-300" />}
              title="Mesh Optimization"
              description="Get models with the perfect balance of detail and performance for any platform."
              delay={0.1}
            />
            
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-blue-300" />}
              title="Multiple Formats"
              description="Export in OBJ, FBX, GLTF, and more for compatibility with all your favorite software."
              delay={0.2}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 md:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-12 md:p-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-white/10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Start Creating Amazing 3D Models Today
                </h2>
                <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
                  Join thousands of creators who are bringing their ideas to life in three dimensions.
                </p>
                <motion.div 
                  className="mt-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/signup">
                    <Button size="lg" className="rounded-full px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white text-lg">
                      Get Started For Free
                    </Button>
                  </Link>
                </motion.div>
                <p className="mt-4 text-sm text-gray-400">
                  No credit card required. Start with 3 free models.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
