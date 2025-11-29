import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, BookOpen, Shield, AlertTriangle } from "lucide-react";
import { saveLegalRequest } from "@/lib/storage";
import { toast } from "sonner";

const Legal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseDetails: "",
    urgency: "medium" as "low" | "medium" | "high",
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
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    if (!formData.caseDetails.trim()) {
      toast.error("Please describe your legal situation");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    saveLegalRequest(formData);
    toast.success("Legal consultation request submitted successfully");
    setFormData({
      name: "",
      email: "",
      phone: "",
      caseDetails: "",
      urgency: "medium",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Scale className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Legal Resources & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Understand your legal rights and access expert legal consultation for domestic violence cases.
        </p>
      </div>

      {/* Legal Rights Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Legal Rights</h2>
          
          <Card className="p-6 bg-primary/5 border-primary">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Protection from Domestic Violence Act</h3>
                <p className="text-sm text-muted-foreground">
                  This law provides legal protection to women from physical, emotional, sexual, verbal, 
                  and economic abuse. You have the right to file for protection orders.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-3 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Key Legal Protections
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Right to reside in a shared household</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Protection orders and restraining orders</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Monetary relief and compensation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Custody of children</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Right to free legal aid</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-warning/10 border-warning">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Emergency Legal Steps</h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Document all incidents with dates and details</li>
                  <li>Preserve evidence (photos, medical records, messages)</li>
                  <li>File a police complaint if in immediate danger</li>
                  <li>Apply for a protection order at the magistrate's court</li>
                  <li>Seek legal counsel from a qualified attorney</li>
                </ol>
              </div>
            </div>
          </Card>
        </div>

        {/* Legal Consultation Form */}
        <div>
          <Card className="p-8 shadow-card sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Request Legal Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="legal-name">Full Name *</Label>
                <Input
                  id="legal-name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="legal-email">Email Address *</Label>
                <Input
                  id="legal-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="legal-phone">Phone Number *</Label>
                <Input
                  id="legal-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Case Urgency *</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setFormData({ ...formData, urgency: value })
                  }
                >
                  <SelectTrigger id="urgency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General Consultation</SelectItem>
                    <SelectItem value="medium">Medium - Need Advice Soon</SelectItem>
                    <SelectItem value="high">High - Urgent Situation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="case-details">Case Details *</Label>
                <Textarea
                  id="case-details"
                  placeholder="Please describe your legal situation and what help you need..."
                  value={formData.caseDetails}
                  onChange={(e) => setFormData({ ...formData, caseDetails: e.target.value })}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full shadow-soft">
                Submit Consultation Request
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                A legal advisor will review your request and contact you within 24-48 hours.
              </p>
            </form>
          </Card>
        </div>
      </div>

      {/* Additional Resources */}
      <Card className="p-8 bg-gradient-soft">
        <h2 className="text-2xl font-bold mb-6 text-center">Additional Legal Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-bold mb-2">National Legal Services Authority</h3>
            <p className="text-sm text-muted-foreground mb-2">Free legal aid for women</p>
            <Button variant="outline" size="sm">Learn More</Button>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-2">Women's Commission</h3>
            <p className="text-sm text-muted-foreground mb-2">Rights advocacy and support</p>
            <Button variant="outline" size="sm">Visit Website</Button>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-2">Pro Bono Lawyers</h3>
            <p className="text-sm text-muted-foreground mb-2">Connect with volunteer attorneys</p>
            <Button variant="outline" size="sm">Find Lawyers</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Legal;
