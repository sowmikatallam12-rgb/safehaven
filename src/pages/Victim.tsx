import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Shield, CheckCircle } from "lucide-react";
import { saveHelpRequest, getHelpRequests } from "@/lib/storage";
import { toast } from "sonner";

const Victim = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showRequests, setShowRequests] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error("Please enter a valid phone number (minimum 10 digits)");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Please describe your situation");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    saveHelpRequest(formData);
    toast.success("Your request has been submitted. A counsellor will contact you soon.");
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const myRequests = getHelpRequests().filter(r => r.email === formData.email);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Get Help & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          You've taken a brave step. Fill out the form below to request confidential help from our counsellors.
          Your information is stored securely and privately.
        </p>
      </div>

      {/* Safety Notice */}
      <Card className="p-6 bg-warning/10 border-warning">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">Safety First</h3>
            <p className="text-sm text-muted-foreground">
              If you're in immediate danger, please call emergency services (100) or use the Quick Exit button 
              at the top right corner. This form is for non-emergency support requests.
            </p>
          </div>
        </div>
      </Card>

      {/* Success Message */}
      {submitted && (
        <Card className="p-6 bg-success/10 border-success animate-in slide-in-from-top">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Request Submitted Successfully</h3>
              <p className="text-sm text-muted-foreground">
                A trained counsellor will review your request and reach out to you as soon as possible.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Help Request Form */}
      <Card className="p-8 shadow-card">
        <h2 className="text-2xl font-bold mb-6">Request Counselling Support</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Describe Your Situation *</Label>
            <Textarea
              id="message"
              placeholder="Please share what you're going through. This helps us provide the best support."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full shadow-soft">
            Submit Request
          </Button>
        </form>
      </Card>

      {/* View My Requests */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">My Support Requests</h3>
          <Button 
            variant="outline" 
            onClick={() => setShowRequests(!showRequests)}
          >
            {showRequests ? "Hide" : "View"} Requests
          </Button>
        </div>
        
        {showRequests && (
          <div className="space-y-4 mt-4">
            {myRequests.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No requests found. Submit a request above to get started.
              </p>
            ) : (
              myRequests.map((request) => (
                <Card key={request.id} className="p-4 bg-muted/30">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold">{request.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request.status === "completed" ? "bg-success/20 text-success" :
                        request.status === "in-progress" ? "bg-warning/20 text-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {new Date(request.timestamp).toLocaleDateString()}
                    </p>
                    {request.counsellorNotes && (
                      <div className="mt-2 p-3 bg-accent/30 rounded-lg">
                        <p className="text-sm font-semibold mb-1">Counsellor Notes:</p>
                        <p className="text-sm">{request.counsellorNotes}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Victim;
