import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Shield, Users, Target, Mail } from "lucide-react";
import { useState } from "react";
import { saveContactMessage } from "@/lib/storage";
import { toast } from "sonner";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error("Please enter a subject");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    saveContactMessage(formData);
    toast.success("Message sent successfully. We'll get back to you soon!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* About Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">About SafeHaven</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          SafeHaven is a gender-responsive digital platform committed to providing comprehensive support 
          to survivors of domestic violence. We believe everyone deserves safety, dignity, and justice.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 bg-gradient-primary text-hero-foreground border-0">
          <Target className="h-12 w-12 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-hero-foreground/90">
            To empower survivors of domestic violence with accessible resources, compassionate support, 
            and expert guidance. We strive to create a safe space where every individual can find help, 
            healing, and hope for a violence-free future.
          </p>
        </Card>

        <Card className="p-8">
          <Shield className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-muted-foreground">
            A world where domestic violence is eliminated, and all individuals live with dignity, 
            respect, and safety. We envision communities where survivors are supported, 
            perpetrators are held accountable, and prevention is prioritized.
          </p>
        </Card>
      </div>

      {/* Core Values */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-soft transition-all">
            <Heart className="h-10 w-10 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Compassion</h3>
            <p className="text-sm text-muted-foreground">
              Every survivor deserves empathy, understanding, and non-judgmental support.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-soft transition-all">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Safety First</h3>
            <p className="text-sm text-muted-foreground">
              Your security and privacy are our highest priorities in everything we do.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-soft transition-all">
            <Users className="h-10 w-10 text-success mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Empowerment</h3>
            <p className="text-sm text-muted-foreground">
              We provide tools and knowledge to help survivors regain control of their lives.
            </p>
          </Card>
        </div>
      </div>

      {/* What We Offer */}
      <Card className="p-12 bg-gradient-soft">
        <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-3">
            <h3 className="font-bold text-lg">✓ Confidential Counselling</h3>
            <p className="text-sm text-muted-foreground">
              Connect with trained professionals who provide emotional support and guidance.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg">✓ Legal Resources</h3>
            <p className="text-sm text-muted-foreground">
              Access information about your rights and connect with legal advisors.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg">✓ Safety Planning</h3>
            <p className="text-sm text-muted-foreground">
              Quick exit features and emergency contacts for immediate safety.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg">✓ 24/7 Support</h3>
            <p className="text-sm text-muted-foreground">
              Our platform and emergency resources are available whenever you need them.
            </p>
          </div>
        </div>
      </Card>

      {/* Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions? Want to know more about our services? We're here to help. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <Card className="p-6 bg-muted/30">
            <h3 className="font-bold mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              Contact Information
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: support@safehaven.org</p>
              <p>Helpline: 1800-XXX-XXXX (24/7)</p>
              <p>Address: [Location Details]</p>
            </div>
          </Card>

          <Card className="p-6 bg-accent/30">
            <h3 className="font-bold mb-2">Privacy Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              All communications are confidential. Your information is stored locally and securely. 
              We never share your data without your explicit consent.
            </p>
          </Card>
        </div>

        <Card className="p-8 shadow-card sticky top-24">
          <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name *</Label>
              <Input
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email *</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-subject">Subject *</Label>
              <Input
                id="contact-subject"
                type="text"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Message *</Label>
              <Textarea
                id="contact-message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full shadow-soft">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default About;
