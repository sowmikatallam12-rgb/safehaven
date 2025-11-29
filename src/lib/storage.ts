// LocalStorage utility functions for SafeHaven

export interface HelpRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "in-progress" | "completed";
  timestamp: string;
  counsellorNotes?: string;
}

export interface LegalRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  caseDetails: string;
  urgency: "low" | "medium" | "high";
  timestamp: string;
  status: "pending" | "reviewed" | "completed";
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// Help Requests
export const getHelpRequests = (): HelpRequest[] => {
  const data = localStorage.getItem("helpRequests");
  return data ? JSON.parse(data) : [];
};

export const saveHelpRequest = (request: Omit<HelpRequest, "id" | "timestamp" | "status">) => {
  const requests = getHelpRequests();
  const newRequest: HelpRequest = {
    ...request,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    status: "pending",
  };
  requests.push(newRequest);
  localStorage.setItem("helpRequests", JSON.stringify(requests));
  return newRequest;
};

export const updateHelpRequest = (id: string, updates: Partial<HelpRequest>) => {
  const requests = getHelpRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    localStorage.setItem("helpRequests", JSON.stringify(requests));
    return requests[index];
  }
  return null;
};

// Legal Requests
export const getLegalRequests = (): LegalRequest[] => {
  const data = localStorage.getItem("legalRequests");
  return data ? JSON.parse(data) : [];
};

export const saveLegalRequest = (request: Omit<LegalRequest, "id" | "timestamp" | "status">) => {
  const requests = getLegalRequests();
  const newRequest: LegalRequest = {
    ...request,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    status: "pending",
  };
  requests.push(newRequest);
  localStorage.setItem("legalRequests", JSON.stringify(requests));
  return newRequest;
};

export const updateLegalRequest = (id: string, updates: Partial<LegalRequest>) => {
  const requests = getLegalRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    localStorage.setItem("legalRequests", JSON.stringify(requests));
    return requests[index];
  }
  return null;
};

// Contact Messages
export const getContactMessages = (): ContactMessage[] => {
  const data = localStorage.getItem("contactMessages");
  return data ? JSON.parse(data) : [];
};

export const saveContactMessage = (message: Omit<ContactMessage, "id" | "timestamp">) => {
  const messages = getContactMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);
  localStorage.setItem("contactMessages", JSON.stringify(messages));
  return newMessage;
};

// Admin functions
export const clearAllData = () => {
  localStorage.removeItem("helpRequests");
  localStorage.removeItem("legalRequests");
  localStorage.removeItem("contactMessages");
};

export const getAllStats = () => {
  return {
    helpRequests: getHelpRequests().length,
    legalRequests: getLegalRequests().length,
    contactMessages: getContactMessages().length,
    pendingHelpRequests: getHelpRequests().filter(r => r.status === "pending").length,
    pendingLegalRequests: getLegalRequests().filter(r => r.status === "pending").length,
  };
};
