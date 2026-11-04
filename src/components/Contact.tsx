import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert, { type AlertType } from "./Alert";
import { personalInfo } from "@/data/personal";
import {
  CONTACT_CONSENT_TEXT,
  PRIVACY_POLICY,
  buildConsentRecord,
} from "@/data/privacy";

// Render the consent wording with "Privacy Policy" as a link, from the same constant
// that is embedded in the message as proof of consent.
const POLICY_LINK_LABEL = "Privacy Policy";
const [CONSENT_BEFORE_LINK, CONSENT_AFTER_LINK] =
  CONTACT_CONSENT_TEXT.split(POLICY_LINK_LABEL);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Consent must never be pre-selected (Decree 356/2025/ND-CP, Art. 6 cl. 3).
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>("success");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertMessage = (type: AlertType, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Defence in depth: the submit button is disabled and the checkbox is required,
    // but never send personal data without consent even if those are bypassed.
    if (!consent) {
      showAlertMessage(
        "danger",
        "Please agree to the Privacy Policy before sending.",
      );
      return;
    }

    setIsLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const toEmail =
      process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || personalInfo.email;
    const toName =
      process.env.NEXT_PUBLIC_CONTACT_TO_NAME || personalInfo.name;

    if (!serviceId || !templateId || !publicKey) {
      setIsLoading(false);
      console.error(
        "EmailJS configuration error: Missing environment variables (NEXT_PUBLIC_EMAILJS_*).",
      );
      showAlertMessage(
        "danger",
        "Contact service is temporarily unavailable. Please email directly.",
      );
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          to_name: toName,
          from_email: formData.email,
          to_email: toEmail,
          // No backend: the delivered email itself is the verifiable consent record.
          message: formData.message + "\n" + buildConsentRecord(new Date()),
        },
        publicKey,
      );
      setIsLoading(false);
      showAlertMessage("success", "Your message has been sent!");
      setFormData({ name: "", email: "", message: "" });
      setConsent(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Email send error:", error);
      showAlertMessage("danger", "Something went wrong! Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative flex items-center c-space bg-white section-spacing py-20"
    >
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-black rounded-2xl bg-white w-full">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-3xl font-bold text-black">Let&rsquo;s Talk</h2>
          <p className="text-gray-600">
            Whether you&rsquo;re looking to build a new website, improve your
            existing platform, or bring a unique project to life, I&rsquo;m here
            to help.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label !font-bold text-black">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              className="field-input field-input-focus !border-black text-black"
              type="text"
              placeholder="Jane Doe"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="field-label !font-bold text-black"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              className="field-input field-input-focus !border-black text-black"
              type="email"
              placeholder="jane@example.com"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="field-label !font-bold text-black"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="field-input field-input-focus !border-black text-black"
              rows={4}
              placeholder="Share your thoughts..."
              required
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5 flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-black"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              {CONSENT_BEFORE_LINK}
              <a
                href={PRIVACY_POLICY.path}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-black underline hover:text-neutral-600"
              >
                {POLICY_LINK_LABEL}
              </a>
              {CONSENT_AFTER_LINK}
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading || !consent}
            aria-disabled={isLoading || !consent}
            className="w-full px-1 py-3 text-lg font-medium text-center rounded-md cursor-pointer
            bg-black text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
