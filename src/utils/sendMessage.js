import axios from 'axios';

const appName = "Live_Tag";
const apiKey = "7347F7B4-F742-0EA8-A760-F0B567C3F12B"
const url = 'https://rest.clicksend.com/v3/sms/send';

export async function sendMessage(userName, contactName, contactPhone, trackingLink) {
    try {
        const smsData = {
          messages: [
            {
              to: contactPhone, 
              body: `Hello ${contactName}, press this link for free gems: ${trackingLink}`, 
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