export async function fetchIncomingMessages() {
  let allMessages: any[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const res = await fetch(`https://${process.env.GORGIAS_DOMAIN}/api/messages?page=${page}&limit=${perPage}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.GORGIAS_API_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (!Array.isArray(data)) break;

    const incoming = data.filter((msg: any) =>
      msg.channel &&
      ['email', 'chat'].includes(msg.channel) &&
      msg.source?.from?.address &&
      !msg.from_agent
    );

    allMessages.push(...incoming);
    if (data.length < perPage) break;
    page++;
  }

  return allMessages;
}
