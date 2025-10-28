import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';

interface Conversation {
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  applicationId?: string;
}

interface ChatListProps {
  currentUserId: string;
  onSelectChat: (chat: { userId: string; userName: string; userAvatar?: string; applicationId?: string }) => void;
  selectedChatUserId?: string;
}

export function ChatList({ currentUserId, onSelectChat, selectedChatUserId }: ChatListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
    
    // Subscribe to new messages
    const channel = supabase
      .channel('chat-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chats',
          filter: `receiver_id=eq.${currentUserId},sender_id=eq.${currentUserId}`
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);

  const loadConversations = async () => {
    try {
      // Get all messages where user is sender or receiver
      const { data: messages, error } = await supabase
        .from('chats')
        .select(`
          *,
          sender:profiles!chats_sender_id_fkey(first_name, last_name, avatar),
          receiver:profiles!chats_receiver_id_fkey(first_name, last_name, avatar)
        `)
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by conversation partner
      const conversationMap = new Map<string, Conversation>();

      messages?.forEach((msg: any) => {
        const isReceiver = msg.receiver_id === currentUserId;
        const partnerId = isReceiver ? msg.sender_id : msg.receiver_id;
        const partner = isReceiver ? msg.sender : msg.receiver;

        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            userId: partnerId,
            userName: `${partner?.first_name || ''} ${partner?.last_name || ''}`.trim() || 'Unknown User',
            userAvatar: partner?.avatar,
            lastMessage: msg.message,
            lastMessageTime: msg.created_at,
            unreadCount: 0,
            applicationId: msg.application_id
          });
        }

        // Count unread messages
        if (isReceiver && !msg.read_at) {
          conversationMap.get(partnerId)!.unreadCount++;
        }
      });

      setConversations(Array.from(conversationMap.values()));
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </Card>
    );
  }

  if (conversations.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No conversations yet</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-2 h-full overflow-y-auto">
      {conversations.map((conv) => (
        <button
          key={conv.userId}
          onClick={() => onSelectChat({
            userId: conv.userId,
            userName: conv.userName,
            userAvatar: conv.userAvatar,
            applicationId: conv.applicationId
          })}
          className={`w-full p-3 rounded-lg text-left transition-colors ${
            selectedChatUserId === conv.userId
              ? 'bg-primary/10'
              : 'hover:bg-muted'
          }`}
        >
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={conv.userAvatar} />
              <AvatarFallback>{conv.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold truncate">{conv.userName}</p>
                {conv.unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {conv.unreadCount}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate mb-1">
                {conv.lastMessage}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(conv.lastMessageTime), { addSuffix: true })}
              </p>
            </div>
          </div>
        </button>
      ))}
    </Card>
  );
}
