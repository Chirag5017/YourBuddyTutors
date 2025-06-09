import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import {
  Menu,
  X,
  GraduationCap,
} from 'lucide-react';
import DarkMode from "@/DarkMode";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLogoutUserMutation } from "@/app/api/authApi";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.7, 0.95]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Courses', href: '#courses' },
    { name: 'Contact', href: '#contact' }
  ];

  const logoutHandler = async () => {
    await logoutUser();
  }

  console.log(user);


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/");
    }
  }, [isSuccess])

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };


  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4"
      style={{ backgroundOpacity }}
    >
      <motion.div
        className="backdrop-blur-lg bg-white/10 bg-gradient-to-r from-gray-500/10 to-gray-500/10 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 cursor-pointer" />
              <Link to="/">
                <span className="text-lg sm:text-xl font-bold text-white cursor-pointer">Your Buddy Tutor</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link to="/" key={item.name}>
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className="text-white cursor-pointer hover:bg-black p-1 px-2 rounded-md transition-colors duration-200 font-medium text-sm xl:text-base"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                </Link>
              ))}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src={user?.photoUrl || "https://github.com/shadcn.png"}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link to="my-learning">My learning</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {" "}
                        <Link to="profile">Edit Profile</Link>{" "}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logoutHandler}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {user?.role === "tutor" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link to="/tutor/dashboard">Dashboard</Link></DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (<Link to="/login">
                <motion.button
                  className="bg-gradient-to-r from-purple-400 to-blue-500 text-white px-4 xl:px-6 py-2 rounded-full font-medium text-sm xl:text-base hover:from-purple-400 hover:to-blue-500 transition-all duration-200"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(91, 82, 228, 0.53)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>)}
              <DarkMode />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden text-white p-1"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 pt-4 border-t border-white/20 overflow-hidden"
              >
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left text-white/80 hover:text-white py-2 font-medium text-sm"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar>
                          <AvatarImage
                            src={user?.photoUrl || "https://github.com/shadcn.png"}
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link to="my-learning">My learning</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {" "}
                            <Link to="profile">Edit Profile</Link>{" "}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={logoutHandler}>
                            Log out
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        {user?.role === "tutor" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link to="/tutor/dashboard">Dashboard</Link></DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (<Link to="/login">
                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-400 to-blue-500 text-white px-4 py-2 rounded-full font-medium text-sm mt-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navItems.length * 0.1 }}
                    >
                      Get Started
                    </motion.button>
                  </Link>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;