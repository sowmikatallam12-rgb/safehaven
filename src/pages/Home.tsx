import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Heart, Scale, Phone, Users, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 text-center">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 px-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            You Are Not Alone.
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              We're Here to Help.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            SafeHaven provides confidential support, legal guidance, and counselling for survivors of domestic violence. 
            Your safety and wellbeing are our top priorities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/victim">
              <Button size="lg" className="shadow-soft hover:shadow-lg transition-all">
                <AlertCircle className="mr-2 h-5 w-5" />
                Get Help Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="shadow-sm">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/legal">
          <Card className="p-6 hover:shadow-soft transition-all cursor-pointer group border-2 hover:border-primary">
            <Scale className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Legal Rights</h3>
            <p className="text-muted-foreground">
              Understand your rights under the Domestic Violence Act and access legal consultation.
            </p>
          </Card>
        </Link>

        <Link to="/counsellor">
          <Card className="p-6 hover:shadow-soft transition-all cursor-pointer group border-2 hover:border-secondary">
            <Heart className="h-12 w-12 text-secondary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Counselling</h3>
            <p className="text-muted-foreground">
              Connect with trained counsellors who provide compassionate, confidential support.
            </p>
          </Card>
        </Link>

        <Card className="p-6 bg-gradient-primary text-hero-foreground border-0">
          <Phone className="h-12 w-12 mb-4" />
          <h3 className="text-xl font-bold mb-2">Emergency Contacts</h3>
          <div className="space-y-2 text-sm">
            <p>National Helpline: 1800-XXX-XXXX</p>
            <p>Police Emergency: 100</p>
            <p>Women's Helpline: 181</p>
          </div>
        </Card>
      </section>

      {/* Features Section */}
      <section className="bg-accent/30 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SafeHaven Helps</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides multiple pathways to support and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <Shield className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Confidential & Safe</h3>
            <p className="text-sm text-muted-foreground">
              All information is stored securely and locally. Your privacy is protected.
            </p>
          </Card>

          <Card className="p-6">
            <Users className="h-10 w-10 text-secondary mb-4" />
            <h3 className="text-lg font-bold mb-2">Expert Support</h3>
            <p className="text-sm text-muted-foreground">
              Access trained counsellors and legal advisors who understand your situation.
            </p>
          </Card>

          <Card className="p-6">
            <Heart className="h-10 w-10 text-success mb-4" />
            <h3 className="text-lg font-bold mb-2">Compassionate Care</h3>
            <p className="text-sm text-muted-foreground">
              We treat every survivor with respect, empathy, and understanding.
            </p>
          </Card>

          <Card className="p-6">
            <Scale className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Legal Resources</h3>
            <p className="text-sm text-muted-foreground">
              Learn about protection orders, legal rights, and available remedies.
            </p>
          </Card>

          <Card className="p-6">
            <Phone className="h-10 w-10 text-warning mb-4" />
            <h3 className="text-lg font-bold mb-2">24/7 Emergency</h3>
            <p className="text-sm text-muted-foreground">
              Quick exit feature and emergency contact numbers always available.
            </p>
          </Card>

          <Card className="p-6">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <h3 className="text-lg font-bold mb-2">Crisis Intervention</h3>
            <p className="text-sm text-muted-foreground">
              Immediate support and guidance during critical situations.
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <Card className="max-w-3xl mx-auto p-8 md:p-12 bg-card shadow-card">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Whether you need immediate help, legal advice, or just someone to talk to, 
            SafeHaven is here for you. Your journey to safety starts now.
          </p>
          <Link to="/victim">
            <Button size="lg" className="shadow-soft">
              <Shield className="mr-2 h-5 w-5" />
              Access Support Services
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Home;
