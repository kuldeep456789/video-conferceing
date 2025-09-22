import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  Users, 
  Share, 
  MoreVertical,
  Send,
  Settings,
  Monitor,
  Volume2
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const MeetingRoom = () => {
  const { roomId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const participants = [
    { id: "1", name: "John Doe", avatar: "/api/placeholder/40/40", isHost: true, isMuted: false, isVideoOff: false },
    { id: "2", name: "Jane Smith", avatar: "/api/placeholder/40/40", isHost: false, isMuted: true, isVideoOff: false },
    { id: "3", name: "Mike Johnson", avatar: "/api/placeholder/40/40", isHost: false, isMuted: false, isVideoOff: true },
    { id: "4", name: "Sarah Wilson", avatar: "/api/placeholder/40/40", isHost: false, isMuted: false, isVideoOff: false },
  ];

  const chatMessages = [
    { id: "1", sender: "Jane Smith", message: "Hello everyone!", time: "10:30 AM" },
    { id: "2", sender: "Mike Johnson", message: "Great presentation!", time: "10:32 AM" },
    { id: "3", sender: "Sarah Wilson", message: "Could you share the slides?", time: "10:35 AM" },
  ];

  const sendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message via WebSocket
      console.log("Sending message:", chatMessage);
      setChatMessage("");
    }
  };

  const leaveCall = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Meeting Header */}
      <header className="bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold">Meeting Room: {roomId}</h1>
            <span className="text-sm text-muted-foreground">4 participants</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Invite
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 p-4">
          <div className="h-full">
            {/* Video Grid */}
            <div className="video-grid-4 h-full max-h-[calc(100vh-200px)]">
              {participants.map((participant) => (
                <Card key={participant.id} className="relative bg-muted/20 overflow-hidden">
                  {participant.isVideoOff ? (
                    <div className="w-full h-full flex items-center justify-center bg-muted/30">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="text-2xl">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center">
                      <span className="text-muted-foreground">Video Stream</span>
                    </div>
                  )}
                  
                  {/* Participant Info Overlay */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-background/80 backdrop-blur rounded-lg px-2 py-1">
                        <span className="text-sm font-medium text-foreground">{participant.name}</span>
                        {participant.isHost && (
                          <span className="text-xs bg-primary text-primary-foreground px-1 rounded">Host</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {participant.isMuted && (
                          <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
                            <MicOff className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {participant.isVideoOff && (
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                            <VideoOff className="w-3 h-3 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panels */}
        {(showChat || showParticipants) && (
          <div className="w-80 border-l border-border bg-card">
            {showChat && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </h3>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{msg.sender}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {showParticipants && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Participants ({participants.length})
                  </h3>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-2">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{participant.name}</span>
                            {participant.isHost && (
                              <span className="text-xs bg-primary text-primary-foreground px-1 rounded">Host</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {participant.isMuted ? (
                            <MicOff className="w-4 h-4 text-destructive" />
                          ) : (
                            <Mic className="w-4 h-4 text-success" />
                          )}
                          {participant.isVideoOff ? (
                            <VideoOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Video className="w-4 h-4 text-success" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-background border-t border-border p-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isMuted ? "default" : "outline"}
            size="lg"
            className={isMuted ? "toolbar-btn-active" : "toolbar-btn"}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>

          <Button
            variant={isVideoOff ? "default" : "outline"}
            size="lg"
            className={isVideoOff ? "toolbar-btn-active" : "toolbar-btn"}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="toolbar-btn"
          >
            <Monitor className="w-5 h-5" />
          </Button>

          <Button
            variant={showChat ? "default" : "outline"}
            size="lg"
            className={showChat ? "toolbar-btn-active" : "toolbar-btn"}
            onClick={() => {
              setShowChat(!showChat);
              setShowParticipants(false);
            }}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          <Button
            variant={showParticipants ? "default" : "outline"}
            size="lg"
            className={showParticipants ? "toolbar-btn-active" : "toolbar-btn"}
            onClick={() => {
              setShowParticipants(!showParticipants);
              setShowChat(false);
            }}
          >
            <Users className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="toolbar-btn"
          >
            <Volume2 className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="toolbar-btn"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>

          <Button
            variant="destructive"
            size="lg"
            className="toolbar-btn-danger"
            onClick={leaveCall}
          >
            <Phone className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;