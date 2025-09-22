import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Video, 
  User, 
  Bell, 
  Monitor, 
  Camera, 
  Mic, 
  Settings,
  ArrowLeft,
  Upload
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-[hsl(250_84%_60%)] rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MeetFlow</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your account and meeting preferences</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/api/placeholder/96/96" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g., Product Manager" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="e.g., Acme Corp" />
                  </div>
                </div>

                <Button className="btn-hero w-full">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Meeting Preferences */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-primary" />
                    Video & Audio
                  </CardTitle>
                  <CardDescription>
                    Configure your default meeting settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Camera on by default</Label>
                      <p className="text-sm text-muted-foreground">Start meetings with camera enabled</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Microphone on by default</Label>
                      <p className="text-sm text-muted-foreground">Start meetings with microphone enabled</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>HD video quality</Label>
                      <p className="text-sm text-muted-foreground">Use high definition video when possible</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-primary" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Manage how you receive meeting notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Meeting reminders</Label>
                      <p className="text-sm text-muted-foreground">Get notified before meetings start</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chat messages</Label>
                      <p className="text-sm text-muted-foreground">Receive chat notifications during meetings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email notifications</Label>
                      <p className="text-sm text-muted-foreground">Get meeting summaries via email</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Advanced Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-primary" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Additional preferences and account management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Display & Theme</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Fullscreen mode</Label>
                      <p className="text-sm text-muted-foreground">Start meetings in fullscreen</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Privacy & Security</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Waiting room</Label>
                      <p className="text-sm text-muted-foreground">Require approval to join meetings</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Meeting passwords</Label>
                      <p className="text-sm text-muted-foreground">Require passwords for meetings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-destructive">Danger Zone</h4>
                  <p className="text-sm text-muted-foreground">Irreversible account actions</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;