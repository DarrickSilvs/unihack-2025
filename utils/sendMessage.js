export async function sendMessage(userName, contactName, contactPhone, trackingLink) {
    try {
      const response = await fetch('/api/sendSms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, contactPhone, contactName, trackingLink }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }
  
      const result = await response.json();
      console.log('SMS sent successfully!', result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
