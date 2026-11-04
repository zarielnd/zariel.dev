/*
 * DRAFT privacy policy, generated on 2026-11-04 from the site's source code using the
 * vn-law-check checklist (.vn-law-check/references/10-generate-policy.md).
 * This is NOT legal advice. Have a legal professional review it before treating it as final.
 *
 * Every data type and recipient below traces back to code or to the live deployment:
 *   - name, email, message   -> src/components/Contact.tsx (contact form)
 *   - EmailJS                -> @emailjs/browser, emailjs.send() in Contact.tsx (api.emailjs.com)
 *   - Gmail                  -> destination inbox, src/data/personal.ts (personalInfo.email)
 *   - Vercel                 -> live response headers ("server: Vercel")
 *   - no cookies / tracking  -> no Set-Cookie header, no analytics scripts in code or live bundle
 *
 * Legal-basis notes are kept as JSX comments so reviewers can cross-check them; they are
 * not rendered. Remove them when publishing a final version if you wish.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { personalInfo } from "@/data/personal";
import { PRIVACY_POLICY } from "@/data/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Zariel collects, uses and protects personal data submitted through the contact form on this website.",
  alternates: {
    canonical: PRIVACY_POLICY.path,
  },
};

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="space-y-4">
    <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
    <div className="space-y-4 text-gray-300 leading-relaxed">{children}</div>
  </section>
);

export default function PrivacyPolicyPage() {
  const email = personalInfo.email;
  const mailto = (
    <a href={`mailto:${email}`} className="text-white underline hover:text-gray-300">
      {email}
    </a>
  );

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
        <article className="mx-auto max-w-3xl space-y-12">
          <header className="space-y-4">
            <p className="font-mono text-sm tracking-widest text-gray-500">
              LEGAL // PRIVACY
            </p>
            <h1 className="text-4xl md:text-6xl font-black">Privacy Policy</h1>
            <p className="text-sm text-gray-500">
              Last updated: {PRIVACY_POLICY.lastUpdated} · Version{" "}
              {PRIVACY_POLICY.version}
            </p>
            <p className="text-gray-300 leading-relaxed">
              This policy explains what personal data is collected through this
              website, why, who receives it, and the rights you have over it.
            </p>
          </header>

          {/* Basis: Law 91/2025/QH15, Art. 9 cl. 2 point b (data subject must know who the controller is). */}
          <Section id="who-we-are" title="1. Who we are">
            <p>
              This website is run by {personalInfo.name}, an individual, who is
              the controller of the personal data described below. For any
              question or request about your personal data, email {mailto}.
            </p>
          </Section>

          {/* Basis: Law 91/2025/QH15, Art. 9 cl. 2 point a and cl. 4 point a (data types and purposes, consent per purpose).
              Evidence: src/components/Contact.tsx form fields name, email, message. */}
          <Section id="data-we-collect" title="2. What we collect and why">
            <p>
              We only collect personal data when you choose to send a message
              through the contact form. We collect:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>your name,</li>
              <li>your email address,</li>
              <li>the content of your message, and</li>
              <li>
                a consent record: the time you agreed to this policy, the
                policy version, and the exact consent wording you agreed to.
              </li>
            </ul>
            <p>
              We use this data only to read and reply to your enquiry, and to
              keep proof that you consented. We do not use it for marketing or
              for any other purpose without asking you first.
            </p>
          </Section>

          {/* Basis: Decree 356/2025/ND-CP, Art. 4 cl. 1 (list of sensitive personal data). The form does not ask for any. */}
          <Section id="sensitive-data" title="3. Sensitive data">
            <p>
              We do not ask for sensitive personal data (for example health,
              financial, location or biometric information). Please do not
              include it in your message.
            </p>
          </Section>

          {/* Basis: Law 91/2025/QH15, Art. 7 cl. 6 (selling personal data is prohibited).
              Evidence: api.emailjs.com in the live bundle; "server: Vercel" response header. */}
          <Section id="recipients" title="4. Who receives your data">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white">EmailJS</strong> delivers the
                contact form submission as an email.
              </li>
              <li>
                <strong className="text-white">Google (Gmail)</strong> hosts
                the inbox where your message is received and stored.
              </li>
              <li>
                <strong className="text-white">Vercel</strong> hosts this
                website. Like any web host, it may process technical data such
                as your IP address and browser user agent in server logs when
                you load a page.
              </li>
            </ul>
            <p>We do not sell your personal data.</p>
          </Section>

          {/* Basis: Law 91/2025/QH15, Art. 20 cl. 1 (cross-border transfer includes using platforms located outside Vietnam);
              Art. 14 cl. 1 point b (delete once the purpose is fulfilled). */}
          <Section id="storage-and-transfers" title="5. Storage, retention and transfers abroad">
            <p>
              EmailJS, Gmail and Vercel are located outside Vietnam. Sending a
              message through the contact form therefore transfers your
              personal data outside Vietnam.
            </p>
            <p>
              We keep your message only for as long as needed to respond to and
              follow up on your enquiry, and then delete it. You can ask us to
              delete it earlier at any time (see section 7).
            </p>
          </Section>

          {/* Basis: Law 91/2025/QH15, Art. 28 cl. 8 (behavioural tracking requires consent).
              Evidence: no Set-Cookie header; no analytics/pixel scripts; fonts are self-hosted via next/font. */}
          <Section id="cookies" title="6. Cookies and tracking">
            <p>
              This website does not set cookies and does not use analytics,
              advertising or other tracking tools. Fonts are served from this
              website itself.
            </p>
          </Section>

          {/* Basis: Law 91/2025/QH15, Art. 4 cl. 1 (rights) and Art. 10 cl. 2 (withdrawal in writing, incl. electronic form);
              Decree 356/2025/ND-CP, Art. 5 (response deadlines and single extension). Do not shorten or extend these deadlines. */}
          <Section id="your-rights" title="7. Your rights">
            <p>You have the right to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>know what personal data of yours we process,</li>
              <li>give, refuse or withdraw your consent,</li>
              <li>access your data and have it corrected,</li>
              <li>
                request a copy of your data, have it deleted, restrict its
                processing, or object to its processing, and
              </li>
              <li>
                complain, report, or take legal action and claim compensation
                as provided by law.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email {mailto}. We will:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                acknowledge your request and explain the next steps within 2
                working days;
              </li>
              <li>
                let you access, correct or receive your data within 10 days (15
                days if a processor or third party must also act);
              </li>
              <li>
                handle withdrawal of consent, restriction or objection within 15
                days (20 days if a processor or third party must stop
                processing);
              </li>
              <li>
                delete your data within 20 days (30 days if a processor or third
                party must also delete it).
              </li>
            </ul>
            <p>
              For complex requests these periods may be extended once, and we
              will tell you why.
            </p>
          </Section>

          {/* Basis: Law 91/2025/QH15, Art. 23 cl. 1 (notify the specialised authority within 72 hours).
              Notifying affected users is voluntary here; add a commitment only if you can honour it. */}
          <Section id="incidents" title="8. Data incidents">
            <p>
              If a personal data breach occurs, we will notify the competent
              Vietnamese personal data protection authority as required by law.
            </p>
          </Section>

          <Section id="changes" title="9. Changes to this policy">
            <p>
              We will publish any change on this page and update the version
              and date above. If we change the purpose or the type of data we
              process, we will ask for your consent again where required.
            </p>
          </Section>

          <footer className="border-t border-gray-800 pt-8">
            <Link
              href="/"
              className="inline-block rounded-full bg-white px-8 py-3 font-medium text-black transition-all hover:bg-neutral-200"
            >
              Return to Home
            </Link>
          </footer>
        </article>
      </main>
  );
}
