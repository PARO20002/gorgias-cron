import { fetchIncomingMessages } from '@/lib/gorgias';
import { upsertMessages } from '@/lib/supabase';

// ⏰ Vercel Cronjob: Täglich um 4 Uhr CET (entspricht 2 Uhr UTC)
export const config = {
  schedule: '0 2 * * *',
};

export default async function handler(req, res) {
  try {
    const messages = await fetchIncomingMessages();
    await upsertMessages(messages);
    res.status(200).json({ message: 'Success', count: messages.length });
  } catch (err) {
    console.error('Fehler beim Cronjob:', err);
    res.status(500).json({ error: err.message });
  }
}
