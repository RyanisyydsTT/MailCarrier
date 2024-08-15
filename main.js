export default {
  async email(message, env, ctx) {
    // Construct the webhook payload with email details
    const discordPayload = {
      embeds: [
        {
          title: "New Email Received!",
          description: `From: ${message.from}\nSubject: ${message.headers.get('subject')}\n\nMessages:\n${message.body}`,
          footer: {
            text: "github.com/RyanisyydsTT",
            icon_url: "https://avatars.githubusercontent.com/u/129717677" 
          }
        }
      ]
    };

    // Send a separate message to mention the user
    await fetch("https://YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: "<@YOURUSERID>" // Ping the user
      })
    });
    
    // Send the email details to the Discord webhook
    await fetch("https://YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(discordPayload)
    });



    // Forward the email to your personal email address
    await message.forward("EMAIL@gmail.com");
  }
}

