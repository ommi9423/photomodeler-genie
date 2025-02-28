
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'border-b border-gray-200' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-semibold text-lg md:text-xl">PhotoModeler</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="default" size="sm">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
