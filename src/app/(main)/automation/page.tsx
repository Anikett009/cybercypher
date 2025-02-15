import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Calendar, 
  MessageSquare, 
  Plus,
  Clock,
  Edit,
  Trash2,
  Save
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Automation Hub</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Automation
        </Button>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
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
        </TabsList>

        {/* Email Automation Tab */}
        <TabsContent value="email" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-x-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Investor Follow-up Sequence
                </span>
                <Switch />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Day 1: Initial Follow-up</p>
                    <p className="text-sm text-muted-foreground">
                      Sent 24 hours after pitch meeting
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Email Step
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reply Templates Tab */}
        <TabsContent value="replies" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-x-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Quick Reply Templates
                </span>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  New Template
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Meeting Confirmation</h3>
                  <div className="flex gap-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Thank you for scheduling a meeting. I confirm our appointment for...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Management Tab */}
        <TabsContent value="calendar" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Meeting Preferences
                </span>
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Available Hours</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-5">9 AM - 5 PM</SelectItem>
                      <SelectItem value="10-6">10 AM - 6 PM</SelectItem>
                      <SelectItem value="custom">Custom Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meeting Duration</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Buffer Time Between Meetings</label>
                  <Switch />
                </div>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select buffer time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Automatic Meeting Reminders</label>
                  <Switch />
                </div>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reminder time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour before</SelectItem>
                    <SelectItem value="24h">24 hours before</SelectItem>
                    <SelectItem value="custom">Custom timing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Calendars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Google Calendar</p>
                    <p className="text-sm text-muted-foreground">
                      Connected and syncing
                    </p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}