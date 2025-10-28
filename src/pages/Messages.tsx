import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { ChatList } from '@/components/chat/ChatList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { MessageCircle } from 'lucide-react';

export default function Messages() {
  const { user, loading } = useAuth();
  const [selectedChat, setSelectedChat] = useState<{
    userId: string;
    userName: string;
    userAvatar?: string;
    applicationId?: string;
  } | null>(null);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Messages - FindJobOffer</title>
        <meta name="description" content="Chat with employers and candidates about job applications" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <MessageCircle className="h-8 w-8" />
              Messages
            </h1>
            <p className="text-muted-foreground">
              Chat with employers and candidates about applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
            <div className="md:col-span-1">
              <ChatList 
                currentUserId={user.id}
                onSelectChat={setSelectedChat}
                selectedChatUserId={selectedChat?.userId}
              />
            </div>
            
            <div className="md:col-span-2">
              {selectedChat ? (
                <ChatWindow
                  currentUserId={user.id}
                  otherUserId={selectedChat.userId}
                  otherUserName={selectedChat.userName}
                  otherUserAvatar={selectedChat.userAvatar}
                  applicationId={selectedChat.applicationId}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-card rounded-lg border">
                  <div className="text-center text-muted-foreground">
                    <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
