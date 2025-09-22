import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Video, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  Settings, 
  LogOut,
  Copy,
  Play,
  MoreVertical
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [meetingCode, setMeetingCode] = useState("");
  
  const upcomingMeetings = [
    {
      id: "1",
      title: "Team Standup",
      time: "10:00 AM",
      date: "Today",
      participants: 5,
      roomId: "team-standup-123"
    },
    {
      id: "2", 
      title: "Client Review",
      time: "2:00 PM",
      date: "Today",
      participants: 3,
      roomId: "client-review-456"
    },
    {
      id: "3",
      title: "Project Planning",
      time: "9:00 AM",
      date: "Tomorrow",
      participants: 8,
      roomId: "project-planning-789"
    }
  ];

  const recentMeetings = [
    {
      id: "1",
      title: "Design Review",
      date: "Yesterday",
      duration: "45 min",
      participants: 4
    },
    {
      id: "2",
      title: "Sprint Planning",
      date: "2 days ago", 
      duration: "1h 30min",
      participants: 7
    }
  ];

  const generateRoomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const startInstantMeeting = () => {
    const roomId = generateRoomId();
    window.location.href = `/room/${roomId}`;
  };

  const joinMeeting = () => {
    if (meetingCode.trim()) {
      window.location.href = `/room/${meetingCode}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-[hsl(250_84%_60%)] rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">MeetFlow</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="w-5 h-5 mr-2 text-primary" />
                    Start Meeting
                  </CardTitle>
                  <CardDescription>
                    Create an instant meeting room
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={startInstantMeeting}
                    className="btn-hero w-full"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Instant Meeting
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Join Meeting
                  </CardTitle>
                  <CardDescription>
                    Enter a meeting code to join
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Enter meeting code"
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    className="bg-background/50"
                  />
                  <Button 
                    onClick={joinMeeting}
                    variant="outline" 
                    className="w-full"
                    size="lg"
                    disabled={!meetingCode.trim()}
                  >
                    Join Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Meetings */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Upcoming Meetings
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div 
                      key={meeting.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {meeting.time}
                          </span>
                          <span>{meeting.date}</span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {meeting.participants}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/room/${meeting.roomId}`)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Link to={`/room/${meeting.roomId}`}>
                          <Button size="sm" className="btn-hero">
                            Join
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Meetings */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Recent Meetings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMeetings.map((meeting) => (
                    <div key={meeting.id} className="space-y-2">
                      <h4 className="font-medium text-sm">{meeting.title}</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>{meeting.date}</div>
                        <div className="flex justify-between">
                          <span>{meeting.duration}</span>
                          <span>{meeting.participants} participants</span>
                        </div>
                      </div>
                      {meeting.id !== recentMeetings[recentMeetings.length - 1].id && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Meetings</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total time</span>
                  <span className="font-semibold">8h 45m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-semibold">28</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;