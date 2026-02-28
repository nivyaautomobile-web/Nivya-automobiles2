'use client'
import { useState } from 'react'

const outlets = [
  {
    name: "Anantapur – Shilparamam",
    phone: "+91 9977499499",
    map: "https://www.google.com/maps?q=Maruti+Suzuki+ARENA+Nivya+Automobiles+Anantapur+Shilparamam&output=embed",
  },
  {
    name: "Gooty Branch",
    phone: "+91 8977747199",
    map: "https://www.google.com/maps?q=Maruti+Suzuki+ARENA+Gooty+Revenue+ward+no+7+Maruti+nagar+Gooty&output=embed",
  },
  {
    name: "Kottacheruvu Branch",
    phone: "+91 8977747198",
    map: "https://www.google.com/maps?q=Maruti+Suzuki+ARENA+Kottacheruvu+Dharmavaram+Road&output=embed",
  },
  {
    name: "Kadiri Branch",
    phone: "+91 8977747192",
    map: "https://www.google.com/maps?q=Maruti+Suzuki+ARENA+Kadiri+Main+Road+Sri+Sathya+Sai+District&output=embed",
  },
]

export default function OutletSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-[#E9F0FF] py-20">
      <div className="px-6 mx-auto max-w-7xl">

        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
          Our Outlets
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* LEFT SIDE - OUTLET LIST */}
          <div className="space-y-4">
            {outlets.map((outlet, index) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`p-5 rounded-xl cursor-pointer transition shadow-md
                ${active === index
                    ? 'bg-[#0E1224] text-white'
                    : 'bg-white hover:shadow-lg'}`}
              >
                <h3 className="text-lg font-semibold">
                  {outlet.name}
                </h3>

                <p className={`mt-2 text-sm 
                  ${active === index ? 'text-gray-300' : 'text-gray-500'}`}>
                  {outlet.phone}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - MAP */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden shadow-lg rounded-2xl h-[450px]">
              <iframe
                title={outlets[active].name}
                src={outlets[active].map}
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}