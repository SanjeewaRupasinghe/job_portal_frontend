-- Enable realtime for chats table
ALTER TABLE public.chats REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;

-- Add index for better query performance
CREATE INDEX idx_chats_sender_receiver ON public.chats(sender_id, receiver_id);
CREATE INDEX idx_chats_application_id ON public.chats(application_id);
CREATE INDEX idx_chats_read_at ON public.chats(read_at) WHERE read_at IS NULL;

-- Function to get unread message count
CREATE OR REPLACE FUNCTION get_unread_message_count(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER
    FROM chats
    WHERE receiver_id = user_uuid
    AND read_at IS NULL
    AND deleted_at IS NULL
  );
END;
$$;