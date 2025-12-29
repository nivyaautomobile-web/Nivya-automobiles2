'use client';
import React from 'react';
import Link from 'next/link';


export const metadata = {
  title: 'Privacy Policy | Nivya Maruti Suzuki',
  description:
    'Read the Privacy Policy of Nivya Maruti Suzuki to learn how we collect, use, protect, and safeguard your personal information when you use our website and services.',
  keywords: [
    'Nivya Maruti Suzuki privacy policy',
    'data policy',
    'customer privacy',
    'automobile dealership privacy policy'
  ],
  openGraph: {
    title: 'Privacy Policy | Nivya Maruti Suzuki',
    description:
      'Learn how Nivya Maruti Suzuki collects and protects your personal information in accordance with data security standards.',
    url: 'https://www.nivyamaruti.com/privacy-policy',
    siteName: 'Nivya Maruti Suzuki',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.nivyamaruti.com/privacy-policy',
  },
};
export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen py-16 mt-10 bg-gray-50">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            This Privacy Policy explains how Nivya Maruti Suzuki collects, uses, and protects your personal information.
          </p>
        </div>

        {/* Main Card */}
        <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl md:p-12">
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            Nivya Maruti Suzuki – Statement of Privacy Policy
          </h2>
          <p className="mb-6 leading-relaxed text-gray-700">
            At <strong>Nivya Maruti Suzuki (Anantapur, Shilparamam)</strong>, we value your privacy and are committed to
            safeguarding your personal information. Please read this policy carefully to understand how your data is
            collected, used, and protected when you visit our website or use our services.
          </p>

          {/* Section 1 */}
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            1. Scope of This Policy
          </h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            This Privacy Policy describes Nivya Maruti Suzuki’s handling of personally identifiable information
            collected from our customers, website visitors, and service users. It also applies to any information shared
            with our business partners. This policy does not cover practices of companies we do not own or manage.
          </p>

          {/* Section 2 */}
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            2. Consent and Communication
          </h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            By providing your contact information, you authorize <strong>RKS Motor Pvt. Ltd. (Nivya Maruti Suzuki)</strong>
            to contact you via calls, SMS, or emails regarding our products, offers, and services. This consent will
            override any Do Not Disturb (DND) registration under the National Customer Preference Register (NCPR).
          </p>

          {/* Section 3 */}
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            3. Information Collection and Use
          </h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            Nivya Maruti Suzuki collects personally identifiable information when you:
          </p>
          <ul className="pl-6 mb-6 space-y-1 leading-relaxed text-gray-700 list-disc">
            <li>Register for an account or submit an enquiry on our website.</li>
            <li>Request information, products, or participate in promotional events.</li>
            <li>Engage with our support or sales team through phone or email.</li>
          </ul>
          <p className="mb-6 leading-relaxed text-gray-700">
            The collected data may include your name, email, contact number, gender, date of birth, occupation, and
            interests. This information is used to provide and improve our services, notify you of offers, and enhance
            your customer experience.
          </p>

          {/* Section 4 */}
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            4. Information Sharing and Disclosure
          </h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            We do not sell or rent your personal information to anyone. However, Nivya Maruti Suzuki may share your data
            only under the following circumstances:
          </p>
          <ul className="pl-6 mb-6 space-y-1 leading-relaxed text-gray-700 list-disc">
            <li>When you give us explicit consent to share your information.</li>
            <li>When required to fulfill your service or purchase requests.</li>
            <li>To comply with legal obligations such as subpoenas or court orders.</li>
            <li>To prevent misuse or violation of Nivya Maruti Suzuki website policies.</li>
          </ul>

          {/* Section 5 */}
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            5. Security
          </h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal data from
            unauthorized access, misuse, or loss. Your account information is password-protected, and our systems are
            regularly monitored to ensure security compliance.
          </p>

          {/* Section 6 */}
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            6. Changes to This Policy
          </h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            Nivya Maruti Suzuki reserves the right to update or modify this Privacy Policy at any time. Significant
            changes will be notified through our website. We recommend reviewing this page periodically for the latest
            information on our privacy practices.
          </p>

          {/* Section 7 */}
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            7. Contact Information
          </h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            For any questions or concerns regarding this Privacy Policy, please contact us:
          </p>

          <div className="p-5 mb-6 text-gray-700 bg-blue-50 rounded-xl">
            <p className="mb-2">
              <span className="font-semibold text-blue-800">Showroom:</span>{' '}
              Maruti Suzuki ARENA (Nivya Automobiles, Anantapur, Shilparamam)
            </p>
            <p className="mb-2">
              <span className="font-semibold text-blue-800">Address:</span>{' '}
              NH-44, near Shilparamam, Rajeev Colony, Anantapur, Andhra Pradesh 515005
            </p>
            <p className="mb-2">
              <span className="font-semibold text-blue-800">Email:</span>{' '}
              <Link href="mailto:info@nivyaautomobiles.com" className="text-blue-700 hover:underline">
                info@nivyaautomobiles.com
              </Link>
            </p>
            <p>
              <span className="font-semibold text-blue-800">Phone:</span>{' '}
              <Link href="tel:+919876543210" className="text-blue-700 hover:underline">
                +91 98765 43210
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="pt-6 mt-8 text-sm text-gray-600 border-t">
            <p>
              © {new Date().getFullYear()} Nivya Maruti Suzuki. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
