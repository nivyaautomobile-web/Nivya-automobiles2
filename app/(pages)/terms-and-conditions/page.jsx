import React from 'react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <section className='min-h-screen py-16 bg-gray-50 mt-11'>
      <div className='px-6 mx-auto max-w-7xl'>
        {/* Page Header */}
        <div className='mb-12 text-center'>
          <h1 className='mb-3 text-3xl font-bold text-gray-900 md:text-4xl'>
            Terms & Conditions
          </h1>
          <p className='text-lg text-gray-600'>
            Please read these Terms and Conditions carefully before using our
            website and services.
          </p>
        </div>

        {/* Card Container */}
        <div className='p-8 bg-white border border-gray-100 shadow-lg rounded-2xl md:p-12'>
          {/* Company Statement */}
          <h2 className='mb-4 text-2xl font-semibold text-blue-700'>
            Nivya Maruti Suzuki – Statement of Terms and Conditions
          </h2>
          <p className='mb-6 leading-relaxed text-gray-700'>
            At Nivya Maruti Suzuki, we value your trust and take your privacy
            seriously. Please read the following carefully to understand how we
            handle your information and your rights as a valued customer.
          </p>

          {/* Section 1 */}
          <h3 className='mb-3 text-xl font-semibold text-gray-900'>
            1. What These Terms Cover
          </h3>
          <p className='mb-6 leading-relaxed text-gray-700'>
            These Terms and Conditions outline the treatment of personally
            identifiable information collected by Nivya Maruti Suzuki when you
            visit our website or use our services. They also cover any
            personally identifiable information shared with our partners. This
            policy does not apply to the practices of companies that Nivya
            Maruti Suzuki does not own, control, employ, or manage.
          </p>

          {/* Section 2 */}
          <h3 className='mb-3 text-xl font-semibold text-gray-900'>
            2. Consent and Authorization
          </h3>
          <p className='mb-6 leading-relaxed text-gray-700'>
            By submitting your contact details, you expressly authorize Nivya
            Maruti Suzuki (RKS Motor Pvt. Ltd.) to contact you through phone
            calls, SMS, or emails to provide information about our products and
            services. This consent will override any registration on the
            National Customer Preference Register (NCPR).
          </p>

          {/* Section 3 */}
          <h3 className='mb-3 text-xl font-semibold text-gray-900'>
            3. Information Collection and Use
          </h3>
          <p className='mb-6 leading-relaxed text-gray-700'>
            We collect personally identifiable information when you register on
            our site, express interest in our services, or participate in
            promotions. This may include details such as your name, email,
            contact number, birth date, gender, occupation, and interests.
          </p>
          <p className='mb-6 leading-relaxed text-gray-700'>
            Nivya Maruti Suzuki uses this information to:
          </p>
          <ul className='pl-6 mb-6 space-y-1 leading-relaxed text-gray-700 list-disc'>
            <li>Fulfill your requests for products and services.</li>
            <li>Notify you about special offers, updates, or promotions.</li>
            <li>Improve our website, services, and customer experience.</li>
          </ul>

          {/* Section 4 */}
          <h3 className='mb-3 text-xl font-semibold text-gray-900'>
            4. Information Sharing and Disclosure
          </h3>
          <p className='mb-6 leading-relaxed text-gray-700'>
            Nivya Maruti Suzuki will never sell or rent your personal
            information to anyone. We may share information only under the
            following circumstances:
          </p>
          <ul className='pl-6 mb-6 space-y-1 leading-relaxed text-gray-700 list-disc'>
            <li>When you have given explicit consent to share your details.</li>
            <li>To provide the product or service you have requested.</li>
            <li>
              To comply with legal obligations such as court orders or
              subpoenas.
            </li>
            <li>
              When your actions on our website violate our terms of service or
              usage guidelines.
            </li>
          </ul>

          {/* Section 5 */}
          <h3 className='mb-3 text-xl font-semibold text-gray-900'>
            5. Security
          </h3>
          <p className='mb-6 leading-relaxed text-gray-700'>
            We take appropriate technical and organizational measures to protect
            your personal data. Your Nivya Maruti Suzuki account information is
            password-protected to ensure privacy and prevent unauthorized
            access.
          </p>

          {/* Section 6 */}
          <h3 className='mb-3 text-xl font-semibold text-gray-900'>
            6. Changes to This Policy
          </h3>
          <p className='mb-6 leading-relaxed text-gray-700'>
            Nivya Maruti Suzuki reserves the right to modify these Terms and
            Conditions at any time. In case of significant updates, we will
            notify users through our website or email.
          </p>

          {/* Footer */}
          <div className='pt-6 mt-8 text-sm text-gray-600 border-t'>
            <p>
              For any questions regarding these Terms & Conditions, please
              contact us at{' '}
              <Link
                href='mailto:info@nivyaautomobiles.com'
                className='text-blue-700 hover:underline'
              >
                info@nivyaautomobiles.com
              </Link>
            </p>
            <p className='mt-2'>
              © {new Date().getFullYear()} Nivya Maruti Suzuki. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
