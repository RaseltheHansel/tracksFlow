import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const FROM = process.env.EMAIL_FROM!;

export const sendWelcomeEmail = async (
  to: string,
  name: string
) => {
  await sgMail.send({
    to,
    from: FROM,
    subject: 'Welcome to TrackFlow! 📊',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
        <h1 style="color:#3b82f6;">Welcome to TrackFlow, ${name}!</h1>
        <p>Your privacy-first analytics dashboard is ready.</p>
        <p>Add your first website to start tracking visitors in real-time.</p>
        <a href="${process.env.CLIENT_URL}"
           style="background:#3b82f6;color:#fff;padding:12px 24px;
                  border-radius:8px;text-decoration:none;display:inline-block;">
          Open Dashboard
        </a>
      </div>
    `,
  });
};

export const sendTrafficSpikeAlert = async (
  to: string,
  siteName: string,
  views: number
) => {
  await sgMail.send({
    to,
    from: FROM,
    subject: `Traffic spike on ${siteName}! 🚀`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
        <h2 style="color:#f59e0b;">Traffic Spike Alert</h2>
        <p>Your site <strong>${siteName}</strong> received
           <strong>${views} page views</strong> in the last hour.</p>
        <a href="${process.env.CLIENT_URL}"
           style="background:#3b82f6;color:#fff;padding:12px 24px;
                  border-radius:8px;text-decoration:none;display:inline-block;">
          View Dashboard
        </a>
      </div>
    `,
  });
};

export const sendWeeklyReport = async (
  to: string,
  name: string,
  stats: { pageviews: number; visitors: number; topPage: string }
) => {
  await sgMail.send({
    to,
    from: FROM,
    subject: 'Your weekly TrackFlow report 📈',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
        <h2 style="color:#3b82f6;">Weekly Report for ${name}</h2>
        <p>Here is your website performance this week:</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="background:#f3f4f6;">
            <td style="padding:8px;">Page Views</td>
            <td style="padding:8px;font-weight:bold;">${stats.pageviews}</td>
          </tr>
          <tr>
            <td style="padding:8px;">Unique Visitors</td>
            <td style="padding:8px;font-weight:bold;">${stats.visitors}</td>
          </tr>
          <tr style="background:#f3f4f6;">
            <td style="padding:8px;">Top Page</td>
            <td style="padding:8px;font-weight:bold;">${stats.topPage}</td>
          </tr>
        </table>
      </div>
    `,
  });
};
