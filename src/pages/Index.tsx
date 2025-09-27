import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Video,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Play,
  Image as ImageIcon,
  Sun,
  Moon,
  Contrast,
} from "lucide-react";

import heroImage from "@/assets/bg-video.png";
import videoImage from "@/assets/video-conferencing.jpg";
import Team from "@/assets/team.jpg";
import rent from "@/assets/rent.jpg";
import Security from "@/assets/security.jpg";

const features = [
  { icon: Video, title: "HD Video Quality", description: "Crystal clear video calls with adaptive quality", img: videoImage },
  { icon: Users, title: "Team Collaboration", description: "Connect with unlimited participants seamlessly", img: Team },
  { icon: Shield, title: "Enterprise Security", description: "End-to-end encryption for all your meetings", img: Security },
  { icon: Zap, title: "Lightning Fast", description: "Join meetings instantly with one click", img: rent },
];

// Mobile-friendly Navbar component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="border-b border-border bg-background/90 backdrop-blur-md fixed w-full z-20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">connect</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="btn-hero">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <div className="w-6 h-0.5 bg-foreground mb-1 transition-all duration-300"
              style={{ transform: isMobileMenuOpen ? "rotate(45deg) translateY(8px)" : "none" }}
            />
            <div className="w-6 h-0.5 bg-foreground mb-1 transition-all duration-300"
              style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            />
            <div className="w-6 h-0.5 bg-foreground transition-all duration-300"
              style={{ transform: isMobileMenuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 border-t border-border backdrop-blur-md">
          <div className="flex flex-col items-center py-4 space-y-3">
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-32">Login</Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="btn-hero w-32">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [theme, setTheme] = useState("light");

  const handleUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    const body = document.body;
    body.classList.remove("light", "dark", "mixed-theme");
    body.classList.add(theme === "mixed" ? "mixed-theme" : theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-40 flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <p className="text-lg text-white/80 mb-8">
            Connect seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="btn-hero text-lg px-8 py-6 animate-glow flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" /> Start Meeting
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg flex items-center justify-center">
              Join Meeting <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Slider */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Team Collaboration</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
            loop
          >
            {features.map((feature, idx) => (
              <SwiperSlide key={idx}>
                <Card className="glass-card p-4 md:p-6 text-center hover:-translate-y-3 hover:scale-105 transition-transform duration-300 relative group">
                  {feature.img && <img src={feature.img} alt={feature.title} className="w-full h-36 object-cover rounded-xl mb-4" />}
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="absolute inset-0 bg-background/95 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-xl">
                    <span className="text-sm font-medium">More about {feature.title}: {feature.description}</span>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-full max-w-md h-72 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-6 bg-muted/20 overflow-hidden">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded Preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <input type="file" id="upload" className="hidden" onChange={handleUpload} />
                  <label htmlFor="upload" className="cursor-pointer flex flex-col items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
                    <span className="text-lg font-medium text-foreground">Click to Upload Image</span>
                    <span className="text-sm text-muted-foreground">PNG, JPG up to 5MB</span>
                  </label>
                </>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Your Contribution</h1>
            <p className="text-muted-foreground">Showcase your uploaded image or project contribution here.</p>
          </div>
        </div>
      </section>

      {/* Floating Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
        <div className="group relative flex flex-col items-center">
          <div className="absolute bottom-16 flex flex-col gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300">
            <Button className={`rounded-full w-12 h-12 shadow-md ${theme === "light" ? "ring-2 ring-blue-500" : ""}`} variant="secondary" onClick={() => setTheme("light")}><Sun className="w-6 h-6" /></Button>
            <Button className={`rounded-full w-12 h-12 shadow-md ${theme === "dark" ? "ring-2 ring-blue-500" : ""}`} variant="secondary" onClick={() => setTheme("dark")}><Moon className="w-6 h-6" /></Button>
            <Button className={`rounded-full w-12 h-12 shadow-md ${theme === "mixed" ? "ring-2 ring-blue-500" : ""}`} variant="secondary" onClick={() => setTheme("mixed")}><Contrast className="w-6 h-6" /></Button>
          </div>
          <Button className="rounded-full w-14 h-14 shadow-lg group-hover:scale-110 transition-all duration-300" variant="secondary">
            {theme === "light" && <Sun className="w-6 h-6" />}
            {theme === "dark" && <Moon className="w-6 h-6" />}
            {theme === "mixed" && <Contrast className="w-6 h-6" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
