/**
 * Single source of truth for the privacy policy version and the contact-form
 * consent wording, so the form and the /privacy page never drift apart.
 *
 * Legal basis (Vietnam): Law on Personal Data Protection No. 91/2025/QH15 (Art. 9)
 * and Decree 356/2025/ND-CP (Art. 6, cl. 1-3: consent must be verifiable, recorded,
 * and never pre-selected). Bump `version` and `lastUpdated` whenever the policy changes.
 */
export const PRIVACY_POLICY = {
  version: "1.0",
  lastUpdated: "2026-11-04",
  path: "/privacy",
} as const;

/**
 * Exact consent wording shown next to the contact-form checkbox and embedded in
 * each message as proof of consent. The phrase "Privacy Policy" is rendered as a
 * link in the UI.
 */
export const CONTACT_CONSENT_TEXT =
  "I agree that Zariel may use my name, email address and message to reply to my enquiry, " +
  "as described in the Privacy Policy. My message is delivered via EmailJS and stored in Gmail, " +
  "both outside Vietnam.";

/**
 * Builds the consent record appended to the message body. The site has no backend,
 * so the delivered email itself serves as the record of who consented, when, and to what.
 */
export const buildConsentRecord = (consentedAt: Date): string =>
  [
    "",
    "---",
    "Consent record",
    "Consented: yes",
    `Time (UTC): ${consentedAt.toISOString()}`,
    `Privacy policy version: ${PRIVACY_POLICY.version}`,
    `Consent text: "${CONTACT_CONSENT_TEXT}"`,
  ].join("\n");
