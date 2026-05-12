import { useState } from "react";
import PrimaryButton from "./ui/PrimaryButton";

const services = [
  { 
    id: 1, 
    name: "Digital PR", 
    href: "#", 
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
  },
  { 
    id: 2, 
    name: "Organic Social & Content", 
    href: "#", 
    image: "https://images.unsplash.com/photo-1611537929007-eb2dedca2b00?w=600&h=400&fit=crop" 
  },
  { 
    id: 3, 
    name: "Search & Growth Strategy", 
    href: "#", 
    image: "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=600&h=400&fit=crop" 
  },
  { 
    id: 4, 
    name: "Content Experience", 
    href: "#", 
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop" 
  },
  { 
    id: 5, 
    name: "Data & Insights", 
    href: "#", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
  },
  { 
    id: 6, 
    name: "Onsite SEO", 
    href: "#", 
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
  },
];

export default function OurServices() {
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredId(id);
  };

  return (
    <section className="py-10 lg:py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Left: Title with square image */}
          <div className="w-full md:w-[2/3]">
            <h2 className="text-[50px] lg:text-[75px] font-medium tracking-tight leading-none flex items-center">
              Our
              <span className="inline-flex items-center">
                <span className="inline-block w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-lg overflow-hidden mx-3">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop')" }}
                  />
                </span>
                Services
              </span>
            </h2>
          </div>

          {/* Right: View All Services button */}
          <div className="hidden w-full md:w-[1/3] md:flex items-center justify-start md:justify-end">
            <PrimaryButton label="View All Services" url="/services/" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-0 hidden md:block" />

        {/* Desktop: 2 cols × 3 rows grid */}
        <div className="hidden md:grid grid-cols-2 gap-x-10 mt-8">
          {services.map((service, index) => (
            <a
              key={service.id}
              href={service.href}
              className="group relative overflow-hidden transition-all duration-300 rounded-full"
              style={{ padding: "1rem 1.5rem" }}
              onMouseEnter={(e) => handleMouseMove(e, service.id)}
              onMouseMove={(e) => handleMouseMove(e, service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Image (appears on hover) */}
              <div
                className={`absolute inset-0 z-0 transition-opacity duration-500 ${hoveredId === service.id ? "opacity-100" : "opacity-0"
                  }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Divider (bottom border) */}
              {index < services.length - 2 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300" />
              )}

              {/* Content */}
              <div className="relative z-10 flex items-center gap-3">
                {/* Arrow Icon (slides in from left on hover) */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${hoveredId === service.id ? "w-10 opacity-100" : "w-0 opacity-0"
                    }`}
                >
                  <i
                    className={`fa-sharp fa-regular fa-arrow-up-right text-white transition-transform duration-500 text-5xl ${hoveredId === service.id ? "translate-y-0" : "translate-y-full"
                      }`}
                  />
                </div>
                {/* Service Name */}
                <span
                  className={`text-lg md:text-[40px] font-medium transition-colors duration-300 ${hoveredId === service.id ? "text-white" : "text-black whitespace-nowrap"
                    }`}
                >
                  {service.name}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile: Single column */}
        <div className="md:hidden flex flex-col">
          {services.map((service, index) => (
            <div key={service.id}>
              <a
                href={service.href}
                className="flex items-center gap-4 py-4 group"
              >
                {/* Square Image Left */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                </div>

                {/* Service Name */}
                <span className="text-[30px] font-medium text-black group-hover:text-gray-600 transition-colors leading-none">
                  {service.name}
                </span>
              </a>

              {/* Divider */}
              {index < services.length - 1 && (
                <div className="w-full h-px bg-gray-300" />
              )}
            </div>
          ))}

          <div className="flex items-center justify-center">
            <PrimaryButton label="View All Services" url="/services/" />
          </div>
        </div>
      </div>
    </section>
  );
}
