import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Scale, Mail, Trash2, AlertCircle } from "lucide-react";
import {
  getHelpRequests,
  getLegalRequests,
  getContactMessages,
  getAllStats,
  clearAllData,
  updateHelpRequest,
  updateLegalRequest,
} from "@/lib/storage";
import { toast } from "sonner";

const Admin = () => {
  const [stats, setStats] = useState(getAllStats());
  const [helpRequests, setHelpRequests] = useState(getHelpRequests());
  const [legalRequests, setLegalRequests] = useState(getLegalRequests());
  const [contactMessages, setContactMessages] = useState(getContactMessages());

  const refreshData = () => {
    setStats(getAllStats());
    setHelpRequests(getHelpRequests());
    setLegalRequests(getLegalRequests());
    setContactMessages(getContactMessages());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      clearAllData();
      toast.success("All data cleared successfully");
      refreshData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all platform data, users, and requests.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-6 bg-gradient-primary text-hero-foreground border-0">
          <Users className="h-8 w-8 mb-2" />
          <div className="text-3xl font-bold">{stats.helpRequests}</div>
          <div className="text-sm">Help Requests</div>
        </Card>
        <Card className="p-6 bg-warning/10 border-warning">
          <AlertCircle className="h-8 w-8 mb-2 text-warning" />
          <div className="text-3xl font-bold text-warning">{stats.pendingHelpRequests}</div>
          <div className="text-sm">Pending Help</div>
        </Card>
        <Card className="p-6 bg-secondary/10 border-secondary">
          <Scale className="h-8 w-8 mb-2 text-secondary" />
          <div className="text-3xl font-bold text-secondary">{stats.legalRequests}</div>
          <div className="text-sm">Legal Requests</div>
        </Card>
        <Card className="p-6 bg-warning/10 border-warning">
          <AlertCircle className="h-8 w-8 mb-2 text-warning" />
          <div className="text-3xl font-bold text-warning">{stats.pendingLegalRequests}</div>
          <div className="text-sm">Pending Legal</div>
        </Card>
        <Card className="p-6 bg-muted">
          <Mail className="h-8 w-8 mb-2 text-muted-foreground" />
          <div className="text-3xl font-bold">{stats.contactMessages}</div>
          <div className="text-sm">Contact Messages</div>
        </Card>
      </div>

      {/* Actions */}
      <Card className="p-6 bg-destructive/10 border-destructive">
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <Trash2 className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Clear All Data</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete all stored requests and messages. This action cannot be undone.
              </p>
            </div>
          </div>
          <Button onClick={handleClearAll} variant="destructive">
            Clear All
          </Button>
        </div>
      </Card>

      {/* Data Tables */}
      <Tabs defaultValue="help" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="help">Help Requests</TabsTrigger>
          <TabsTrigger value="legal">Legal Requests</TabsTrigger>
          <TabsTrigger value="contact">Contact Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="help" className="space-y-4 mt-6">
          {helpRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No help requests found.</p>
            </Card>
          ) : (
            helpRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.email} | {request.phone}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      request.status === "completed" ? "bg-success/20 text-success" :
                      request.status === "in-progress" ? "bg-warning/20 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm bg-muted/30 p-3 rounded">{request.message}</p>
                  {request.counsellorNotes && (
                    <p className="text-sm bg-accent/30 p-3 rounded">
                      <span className="font-semibold">Notes: </span>
                      {request.counsellorNotes}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Submitted: {new Date(request.timestamp).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="legal" className="space-y-4 mt-6">
          {legalRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No legal requests found.</p>
            </Card>
          ) : (
            legalRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.email} | {request.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        request.urgency === "high" ? "bg-destructive/20 text-destructive" :
                        request.urgency === "medium" ? "bg-warning/20 text-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {request.urgency} urgency
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        request.status === "completed" ? "bg-success/20 text-success" :
                        request.status === "reviewed" ? "bg-warning/20 text-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm bg-muted/30 p-3 rounded">{request.caseDetails}</p>
                  <p className="text-xs text-muted-foreground">
                    Submitted: {new Date(request.timestamp).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 mt-6">
          {contactMessages.length === 0 ? (
            <Card className="p-12 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No contact messages found.</p>
            </Card>
          ) : (
            contactMessages.map((message) => (
              <Card key={message.id} className="p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold">{message.name}</h3>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                  </div>
                  <p className="text-sm font-semibold">{message.subject}</p>
                  <p className="text-sm bg-muted/30 p-3 rounded">{message.message}</p>
                  <p className="text-xs text-muted-foreground">
                    Submitted: {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
