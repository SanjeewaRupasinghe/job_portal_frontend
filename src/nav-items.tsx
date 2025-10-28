import { Home, Briefcase, User, HelpCircle, BookOpen, Info, MessageCircle } from "lucide-react";
import Index from "./pages/Index.jsx";
import Jobs from "./pages/Jobs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import BlogManager from "./pages/BlogManager.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import Messages from "./pages/Messages.jsx";
import NotFound from "./pages/NotFound.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Jobs",
    to: "/jobs",
    icon: <Briefcase className="h-4 w-4" />,
    page: <Jobs />,
  },
  {
    title: "About",
    to: "/about",
    icon: <Info className="h-4 w-4" />,
    page: <About />,
  },
  {
    title: "Blog",
    to: "/blog",
    icon: <BookOpen className="h-4 w-4" />,
    page: <Blog />,
  },
  {
    title: "FAQ",
    to: "/faq",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <FAQ />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <Contact />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <User className="h-4 w-4" />,
    page: <Profile />,
  },
  {
    title: "Messages",
    to: "/messages",
    icon: <MessageCircle className="h-4 w-4" />,
    page: <Messages />,
  },
  {
    title: "Single Blog",
    to: "/blog/:slug",
    icon: <BookOpen className="h-4 w-4" />,
    page: <SingleBlog />,
  },
  {
    title: "Blog Manager",
    to: "/blog-manager",
    icon: <BookOpen className="h-4 w-4" />,
    page: <BlogManager />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <User className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <User className="h-4 w-4" />,
    page: <Login />,
  },
  {
    title: "Register",
    to: "/register",
    icon: <User className="h-4 w-4" />,
    page: <Register />,
  },
  {
    title: "404",
    to: "*",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <NotFound />,
  },
];