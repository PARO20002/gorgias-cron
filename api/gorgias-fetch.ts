import { fetchIncomingMessages } from '@/lib/gorgias';
import { upsertMessages } from '@/lib/supabase';

export default async function handler(req, res) {
  try {
    const messages = await fetchIncomingMessages();
    await upsertMessages(messages);
    res.status(200).json({ message: 'Success', count: messages.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
