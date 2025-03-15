import supabase from "../supabaseClient";
import twilio from 'twilio'

const client = twilio(
    import.meta.env.VITE_TWILIO_ACCOUNT_SID,
    import.meta.env.VITE_TWILIO_AUTH_TOKEN
);

const twilioNumber = "+12523974989"

export async function sendMessage(to, trackingLink) {
    try {
        const message = await client.messages.create({
        body: `PLEASE HELP ME, go to this link: ${trackingLink}`,
        from: twilioNumber,
        to: to,
        });
        console.log(message.body);

    } catch (error) {
        console.error("Error sending message:", error);
    }
};

export async function sendEmergencyMessage(trackingLink) {
    const { data, error } = await supabase
    .from("emergency_contacts")
    .select("phone");

    if (error) {
        console.error("Error getting contact", error);
        return null;
    }

    const phoneNumbers = data.map((contact) => contact.phone);
    phoneNumbers.forEach((number) => sendMessage(number, trackingLink));
}