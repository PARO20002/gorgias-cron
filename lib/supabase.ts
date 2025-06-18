import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function upsertMessages(messages: any[]) {
  const rows = messages.map((msg) => ({
    id: msg.id,
    ticket_id: msg.ticket_id,
    subject: msg.subject ?? null,
    channel: msg.channel,
    message_type: msg.source?.type ?? null,
    customer_email: msg.source?.from?.address ?? null,
    body_text: msg.body_text ?? null,
    created_at: msg.created_datetime,
  }));

  const { error } = await supabase.from('raw_ticket_messages_gorgias').upsert(rows, { onConflict: 'id' });
  if (error) throw error;
}
