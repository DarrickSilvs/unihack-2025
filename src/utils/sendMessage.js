import axios from 'axios';

const appName = "Live_Tag";
const apiKey = ""
const url = '';

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