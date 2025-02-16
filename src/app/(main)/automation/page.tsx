"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Calendar, MessageSquare, Plus, Bot } from "lucide-react";

export default function AutomationPage() {
  const [emailDetails, setEmailDetails] = useState({
    recipient: "",
    subject: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [startupQuestion, setStartupQuestion] = useState("");
  const [startupAdvice, setStartupAdvice] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailDetails),
      });
      const data = await response.json();
      setResponseMessage(data.message || "Email sent successfully!");
    } catch (error) {
      setResponseMessage("Failed to send email.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartupAdviceSubmit = async () => {
    if (!startupQuestion) return;
    setStartupAdvice(null);
    setResponseMessage("Fetching advice...");
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: startupQuestion }),
      });
      const data = await response.json();
      setStartupAdvice(data);
    } catch (error) {
      setResponseMessage("Error fetching advice");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Automation Hub</h1>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email Automation
          </TabsTrigger>
          <TabsTrigger value="replies">
            <MessageSquare className="mr-2 h-4 w-4" />
            Reply Templates
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar Management
          </TabsTrigger>
          <TabsTrigger value="chatbot">
            <Bot className="mr-2 h-4 w-4" />
            Chatbot
          </TabsTrigger>
        </TabsList>

        {/* Email Automation Tab */}
        <TabsContent value="email" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Automation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Recipient Email</Label>
              <Input name="recipient" value={emailDetails.recipient} onChange={handleInputChange} required />

              <Label>Subject</Label>
              <Input name="subject" value={emailDetails.subject} onChange={handleInputChange} required />

              <Label>Body</Label>
              <Textarea name="body" value={emailDetails.body} onChange={handleInputChange} required />

              <Button onClick={handleEmailSubmit} className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Email"}
              </Button>
              {responseMessage && <p className="text-center text-sm font-medium mt-2">{responseMessage}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chatbot Tab */}
        <TabsContent value="chatbot" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Startup Guidance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Ask for startup advice from the greats</Label>
              <Input value={startupQuestion} onChange={(e) => setStartupQuestion(e.target.value)} placeholder="Ask about startup challenges..." />
              <Button onClick={handleStartupAdviceSubmit}>Get Advice</Button>
              {startupAdvice && (
                <div className="p-4 bg-gray-100 border rounded-lg text-sm space-y-4">
                  <p className="font-bold">{startupAdvice.guidance}</p>
                  <ul className="list-disc pl-5">
                    {startupAdvice.citations.map((citation, index) => (
                      <li key={index}>
                        <strong>{citation.book}</strong> (Page {citation.page}): {citation.anecdote}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
