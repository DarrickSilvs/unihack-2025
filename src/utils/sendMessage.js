import axios from 'axios';

const appName = "Live_Tag";
const apiKey = import.meta.env.VITE_SMS_API_KEY;
 const url = import.meta.env.VITE_SMS_URL;

export async function sendMessage(userName, contactName, contactPhone, trackingLink) {
    try {
        const smsData = {
          messages: [
            {
              to: contactPhone, 
              body: `Hello ${contactName}, I am in danger. This link contains my current location ${trackingLink}.`, 
            }
          ]
        };
        
        axios.post(url, smsData, {
          auth: {
            username: appName,
            password: apiKey 
          }
        })
        .then(response => {
          console.log('SMS sent successfully!', response.data);
        })
        .catch(error => {
          console.error('Failed to send SMS:', error.response ? error.response.data : error.message);
        });
    } catch (error) {
        console.error("Error sending message:", error);
    }
};