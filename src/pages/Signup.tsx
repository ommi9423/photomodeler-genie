
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({
        title: "Error",
        description: "You must agree to the terms and privacy policy.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock signup
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "You have successfully signed up.",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <motion.div 
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center text-sm text-gray-500 mb-6 hover:text-gray-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
          
          <h2 className="text-2xl font-semibold text-center">Create your account</h2>
          <p className="mt-2 text-center text-gray-600">
            Start creating amazing 3D models today.
          </p>
        </motion.div>

        <motion.div 
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="agree" 
                  checked={agreed} 
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <label htmlFor="agree" className="text-sm text-gray-600">
                  I agree to the <Link to="/terms" className="text-black hover:underline">Terms</Link> and{' '}
                  <Link to="/privacy" className="text-black hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>

            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium hover:text-gray-800 transition-colors">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
