import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { getHelpRequests, updateHelpRequest, HelpRequest } from "@/lib/storage";
import { toast } from "sonner";

const Counsellor = () => {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    setRequests(getHelpRequests());
  };

  const handleUpdateStatus = (id: string, status: HelpRequest["status"]) => {
    updateHelpRequest(id, { status });
    toast.success(`Status updated to ${status}`);
    loadRequests();
  };

  const handleAddNotes = (id: string) => {
    if (!notes.trim()) {
      toast.error("Please enter notes before saving");
      return;
    }
    updateHelpRequest(id, { counsellorNotes: notes });
    toast.success("Notes saved successfully");
    setNotes("");
    setSelectedRequest(null);
    loadRequests();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "in-progress":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5" />;
      case "in-progress":
        return <Clock className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
          <Heart className="h-8 w-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold">Counsellor Dashboard</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Review and respond to support requests from survivors. Provide compassionate guidance and track progress.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-primary text-hero-foreground border-0">
          <div className="text-3xl font-bold mb-2">{requests.length}</div>
          <div className="text-sm">Total Requests</div>
        </Card>
        <Card className="p-6 bg-warning/10 border-warning">
          <div className="text-3xl font-bold mb-2 text-warning">
            {requests.filter(r => r.status === "pending").length}
          </div>
          <div className="text-sm">Pending Review</div>
        </Card>
        <Card className="p-6 bg-success/10 border-success">
          <div className="text-3xl font-bold mb-2 text-success">
            {requests.filter(r => r.status === "completed").length}
          </div>
          <div className="text-sm">Completed</div>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Support Requests</h2>
        {requests.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No support requests yet.</p>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="p-6 shadow-card hover:shadow-soft transition-all">
              <div className="space-y-4">
                {/* Request Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-bold">{request.name}</h3>
                      <span className={`flex items-center space-x-1 text-sm ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Email: {request.email}</p>
                      <p>Phone: {request.phone}</p>
                      <p>Submitted: {new Date(request.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Request Message */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Situation Description:</p>
                  <p className="text-sm">{request.message}</p>
                </div>

                {/* Counsellor Notes */}
                {request.counsellorNotes && (
                  <div className="bg-accent/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Your Notes:</p>
                    <p className="text-sm">{request.counsellorNotes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  {request.status === "pending" && (
                    <Button
                      onClick={() => handleUpdateStatus(request.id, "in-progress")}
                      variant="default"
                      size="sm"
                    >
                      Start Working
                    </Button>
                  )}
                  {request.status === "in-progress" && (
                    <Button
                      onClick={() => handleUpdateStatus(request.id, "completed")}
                      variant="default"
                      size="sm"
                    >
                      Mark Complete
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setSelectedRequest(request);
                      setNotes(request.counsellorNotes || "");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    {request.counsellorNotes ? "Edit Notes" : "Add Notes"}
                  </Button>
                </div>

                {/* Notes Editor */}
                {selectedRequest?.id === request.id && (
                  <div className="space-y-3 pt-4 border-t border-border animate-in slide-in-from-top">
                    <Textarea
                      placeholder="Add counselling notes, progress updates, or action items..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => handleAddNotes(request.id)} size="sm">
                        Save Notes
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedRequest(null);
                          setNotes("");
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Counsellor;
