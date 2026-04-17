import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PRODUCT = 100;
const MAX_NOTE = 2000;

function clean(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { email, product, tier, note } = req.body ?? {};

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "A valid address is required." });
  }
  if (tier !== "waitlist" && tier !== "appointment") {
    return res.status(400).json({ error: "Invalid tier." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const fromAddress = process.env.FROM_EMAIL || "hello@hayes.press";

  if (!apiKey || !notifyEmail) {
    console.error("Missing RESEND_API_KEY or NOTIFY_EMAIL.");
    return res.status(500).json({ error: "The house is momentarily unreachable." });
  }

  const productName = clean(product, MAX_PRODUCT) || "The House";
  const trimmedNote = clean(note, MAX_NOTE);
  const submitter = email.trim();
  const from = `HAYES <${fromAddress}>`;
  const replyTo = fromAddress;

  const autoReply =
    tier === "waitlist"
      ? {
          subject: "Your address has been noted.",
          text: "We will write when there is something to write about.\n\n— The House",
        }
      : {
          subject: "Your request has been received.",
          text: "We will reply as we are able.\n\nNot all correspondence is answered.\n\n— The House",
        };

  const notifySubject =
    tier === "waitlist"
      ? `[HAYES] Waitlist · ${productName}`
      : `[HAYES] Appointment · ${productName}`;

  const notifyBody = [
    `Tier:     ${tier}`,
    `Product:  ${productName}`,
    `Email:    ${submitter}`,
    trimmedNote ? `\nNote:\n${trimmedNote}` : "",
    "",
    `Received: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from,
        to: submitter,
        replyTo,
        subject: autoReply.subject,
        text: autoReply.text,
      }),
      resend.emails.send({
        from,
        to: notifyEmail,
        replyTo: submitter,
        subject: notifySubject,
        text: notifyBody,
      }),
    ]);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("inquire error:", err);
    return res
      .status(502)
      .json({ error: "Unable to deliver. Please write to hello@hayes.press." });
  }
}
