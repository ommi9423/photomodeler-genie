
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">PhotoModeler</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Transform your photos into professional 3D models with our AI-powered platform.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} PhotoModeler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
