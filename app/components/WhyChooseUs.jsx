import { Percent, Car, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section
      className="relative px-6 py-20 text-white bg-center bg-cover md:px-12 lg:px-20"
      style={{
        backgroundImage: "url('/side.avif')", // replace with your background
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#000000]/70"></div>

      <div className="relative z-10 mx-auto text-center max-w-7xl">
        <h2 className="text-3xl font-bold md:text-4xl mb-14">
          Why Choose Us?
        </h2>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <Percent className="w-12 h-12 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              Your Premier Automotive Destination
            </h3>
            <p className="leading-relaxed text-gray-200">
              We are your trusted destination for all automotive needs, delivering excellence at every step. Backed by years of industry expertise and a customer-first approach, we combine quality vehicles, transparent processes, and personalized service to ensure a superior car-buying experience. Our commitment to reliability and satisfaction makes us a name you can confidently choose.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <Car className="w-12 h-12 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              Nationwide Accessibility
            </h3>
            <p className="leading-relaxed text-gray-200">
              With a strong presence across multiple cities and regions, we bring our services closer to you. Our extensive network ensures easy accessibility, faster support, and consistent service standards wherever you are. No matter the location, you can expect seamless assistance, competitive pricing, and timely delivery—nationwide.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              All-Inclusive Car Buying Solution
            </h3>
            <p className="leading-relaxed text-gray-200">
              From selecting the right car to driving it home with confidence, we take care of everything. Our end-to-end solutions include financing, insurance, documentation, accessories, and after-sales support—designed to give you a hassle-free ownership journey. With us, car buying is simple, transparent, and complete.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
