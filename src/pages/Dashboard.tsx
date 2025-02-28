
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, User, LogOut, Settings, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ModelCard from '@/components/ModelCard';

const models = [
  {
    id: 1,
    title: 'Coffee Mug',
    thumbnailUrl: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'June 15, 2023',
  },
  {
    id: 2,
    title: 'Desk Plant',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    date: 'May 28, 2023',
  },
  {
    id: 3,
    title: 'Vintage Camera',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    date: 'May 10, 2023',
  }
];

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="font-semibold text-xl">PhotoModeler</Link>
              </div>
            </div>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <motion.h1 
              className="text-2xl font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              My 3D Models
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              View and manage your 3D models.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link to="/create">
              <Button className="mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Create New Model
              </Button>
            </Link>
          </motion.div>
        </div>

        {models.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <Link key={model.id} to={`/model/${model.id}`}>
                <ModelCard
                  title={model.title}
                  thumbnailUrl={model.thumbnailUrl}
                  date={model.date}
                  index={index}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <Box className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No models yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by creating your first 3D model.
            </p>
            <div className="mt-6">
              <Link to="/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Model
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
