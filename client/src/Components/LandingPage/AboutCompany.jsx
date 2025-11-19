import { Stethoscope, UserCheck, PackageSearch, Code2 } from "lucide-react";

export default function CompanyOverviewAndServices() {
  const services = [
    {
      icon: Stethoscope,
      title: "HIMS(EHR)",
      description: "Specializing in Digitalization of Healthcare Systems",
    },
    {
      icon: PackageSearch,
      title: "Wholesale Management System",
      description:
        "Efficiently manage stock levels, track inventory movements, and reduce the risk of overstocking or stockouts.",
    },
    {
      icon: UserCheck,
      title: "HR Management System (HRMS)",
      description:
        "Our HRMS is a one-stop solution for all your human resource needs. From recruitment to employee development and beyond, we've got you covered.",
    },
    {
      icon: Code2,
      title: "Custom Softwares",
      description: "Based on you chalanged issues",
    },
  ];

  return (
    <section className="company-overview-services-section">
      <div className="company-overview-services-container">
        
        <div className="company-overview-left">
          <div className="company-overview-content">
            <h2>
              <span className="yellow-bar"></span>Alem Expect Solution
            </h2>
            <p>
              Alem Expect Solution is a leading technology company dedicated to
              providing innovative software, cloud, and IT consulting services.
              Our goal is to help businesses thrive in the digital world.
            </p>
            <p>
              We take pride in our specialization in healthcare systems. Our
              dedicated team of experts has accumulated a wealth of knowledge
              and experience in addressing the unique challenges of the
              healthcare industry. From hospitals to clinics, our solutions have
              empowered healthcare providers to deliver better patient care,
              streamline operations, and enhance overall efficiency.
            </p>
          </div>
        </div>

        {/* Right Column: Our Services List with Icons & Animations */}
        <div className="services-right-column">
          <h3>Our Services</h3>
          <ul className="services-list">
            {services.map((service, index) => (
              <li
                key={index}
                className="service-item"
                style={{ animationDelay: `${0.2 * index + 0.5}s` }}
              >
                <service.icon size={32} />
                <div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
