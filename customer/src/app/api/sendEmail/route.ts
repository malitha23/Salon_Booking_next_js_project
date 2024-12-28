import nodemailer from 'nodemailer';

// Set up the transporter for sending emails using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Email address
    pass: process.env.GMAIL_PASS, // Gmail App password or OAuth credentials
  },
});

// API handler for sending the email
export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { firstName, lastName, email, phone, message } = await req.json();

    // Validate the request body
    if (!firstName || !lastName || !email || !phone || !message) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Set up the email options
    const mailOptions = {
      from: email, // Sender's email (the one submitting the form)
      to: process.env.GMAIL_ADMIN, // Admin's email where the form data will be sent
      subject: 'New Form Submission',
      text: `You have received a new message from ${firstName} ${lastName}.
      
      Details:
      Email: ${email}
      Phone: ${phone}
      Message: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with a success message
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    // Type assertion: handle errors properly
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
      return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Unexpected error:', error);
      return new Response(JSON.stringify({ message: 'Failed to send email', error: 'Unexpected error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
