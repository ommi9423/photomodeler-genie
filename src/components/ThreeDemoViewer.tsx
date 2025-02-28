
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { motion } from 'framer-motion';

interface ThreeDemoViewerProps {
  modelPath: string;
  materialPath?: string;
  onLoad?: () => void;
}

const ThreeDemoViewer = ({ modelPath, materialPath, onLoad }: ThreeDemoViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollYRef = useRef(0);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 2);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2);
    pointLight2.position.set(0, -2, -3);
    scene.add(pointLight2);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    
    // Add particle background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Determine file extension to use appropriate loader
    const fileExtension = modelPath.split('.').pop()?.toLowerCase();
    
    const loadModel = () => {
      try {
        if (fileExtension === 'obj') {
          // OBJ model loading
          if (materialPath) {
            const mtlLoader = new MTLLoader();
            mtlLoader.load(materialPath, (materials) => {
              materials.preload();
              
              const objLoader = new OBJLoader();
              objLoader.setMaterials(materials);
              objLoader.load(modelPath, handleLoadedModel, onProgress, onError);
            }, onProgress, onError);
          } else {
            const objLoader = new OBJLoader();
            objLoader.load(modelPath, handleLoadedModel, onProgress, onError);
          }
        } else if (fileExtension === 'gltf' || fileExtension === 'glb') {
          // GLTF model loading
          const gltfLoader = new GLTFLoader();
          gltfLoader.load(modelPath, (gltf) => {
            handleLoadedModel(gltf.scene);
          }, onProgress, onError);
        } else {
          setError(`Unsupported file format: ${fileExtension}`);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading model:', err);
        setError('Failed to load 3D model');
        setLoading(false);
      }
    };
    
    const handleLoadedModel = (object: THREE.Object3D) => {
      // Center the model
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 1.5; // Zoom out a bit
      
      camera.position.z = cameraZ;
      
      // Set a default material if none provided and it's OBJ format
      if (fileExtension === 'obj' && !materialPath) {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x888888,
              roughness: 0.5,
              metalness: 0.5,
            });
          }
        });
      }
      
      // Reposition to center
      object.position.x -= center.x;
      object.position.y -= center.y;
      object.position.z -= center.z;
      
      // Save reference to model for scroll animations
      modelRef.current = object;
      scene.add(object);
      setLoading(false);
      
      // Call onLoad callback if provided
      if (onLoad) onLoad();
    };
    
    const onProgress = (xhr: ProgressEvent) => {
      console.log(`${(xhr.loaded / xhr.total * 100).toFixed(0)}% loaded`);
    };
    
    const onError = (err: ErrorEvent) => {
      console.error('Error loading 3D model:', err);
      setError('Failed to load 3D model');
      setLoading(false);
    };
    
    // Load the model
    loadModel();
    
    // Scroll handler for animations
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate particles based on scroll
      particlesMesh.rotation.y += 0.0005;
      
      // Apply scroll-based animations to model
      if (modelRef.current) {
        // Rotate model based on scroll position
        const normalizedScroll = scrollYRef.current / (document.body.scrollHeight - window.innerHeight);
        modelRef.current.rotation.y = normalizedScroll * Math.PI * 2;
        
        // Add a small wobble effect
        const wobble = Math.sin(Date.now() * 0.001) * 0.05;
        modelRef.current.rotation.z = wobble;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [modelPath, materialPath, onLoad]);
  
  return (
    <motion.div 
      ref={containerRef} 
      className="w-full h-[400px] md:h-[500px] relative rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="text-red-500 text-center p-4">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ThreeDemoViewer;
