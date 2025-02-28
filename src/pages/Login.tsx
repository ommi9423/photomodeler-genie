
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "You have successfully logged in.",
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
          
          <h2 className="text-2xl font-semibold text-center">Log in to your account</h2>
          <p className="mt-2 text-center text-gray-600">
            Welcome back! Please enter your credentials to continue.
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
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
            </form>

            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium hover:text-gray-800 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
