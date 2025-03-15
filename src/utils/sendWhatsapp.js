export async function sendWhatsAppMessage(phoneNumber, trackingLink) {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUM;
    const accessToken = process.env.WHATSAPP_TOKEN;

    const messageData = {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "text",
        text: { body: `Emergency! Track live location here: ${trackingLink}` }
    };

    const response = await fetch(
        `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageData)
        }
    );

    const data = await response.json();
    if (data.error) {
        console.error("WhatsApp API Error:", data.error);
        return false;
    }

    return true;
}
