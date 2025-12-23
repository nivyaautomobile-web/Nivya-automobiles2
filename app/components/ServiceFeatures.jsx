import { FaCar, FaTools, FaShieldAlt, FaComments } from "react-icons/fa";

const services = [
  {
    icon: FaTools,
    title: "Maintenance",
  },
  {
    icon: FaCar,
    title: "Detailing",
  },
  {
    icon: FaShieldAlt,
    title: "Insurance & Warranty",
  },
  {
    icon: FaComments,
    title: "Expert Consultation",
  },
];

export default function ServiceFeatures() {
  return (
    <section className="py-12">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="relative flex items-center justify-center group"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-[#bc7501]/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              {/* Card */}
              <div className="relative flex h-36 w-full max-w-[170px] flex-col items-center justify-center rounded-2xl border border-[#bc7501]/50 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <Icon className="mb-3 text-3xl text-[#bc7501] transition-transform duration-300 group-hover:scale-110" />

                <p className="px-2 text-sm font-semibold tracking-wide text-center text-gray-200">
                  {service.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
