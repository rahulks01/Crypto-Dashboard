import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Heart, DollarSign, Menu, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Switch } from "./ui/switch";

const Navbar = () => {
  /* Responsible for managing the dark mode functionality of the application */
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  /* A nested component that returns a fragment containing three `Link` components. 
  Each `Link` component wraps a `Button` component with specific props and content. */
  const NavItems = () => (
    <>
      <Link to="/">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Link to="/favorites">
        <Button variant="ghost" className="w-full justify-start">
          <Heart className="mr-2 h-4 w-4" />
          Favorites
        </Button>
      </Link>
      <Link to="/exchanges">
        <Button variant="ghost" className="w-full justify-start">
          <DollarSign className="mr-2 h-4 w-4" />
          Exchanges
        </Button>
      </Link>
    </>
  );

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              CoinGecko Dashboard
            </span>
          </Link>
        </div>
        {/* Logo and Title - End*/}

        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <NavItems />
        </div>

        {/* Dark Mode Switch */}
        <div className="flex items-center space-x-2 ml-4">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            className="data-[state=checked]:bg-slate-700"
          />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
        {/* Dark Mode Switch - End */}

        {/* Menu Button for Responsiveness */}
        <div className="md:hidden ml-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-4">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Menu Button for Responsiveness - End */}
      </div>
    </nav>
  );
};

export default Navbar;
