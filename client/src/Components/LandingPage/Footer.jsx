import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  ChevronRight,
} from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: " Web and Mobile app Development" },
    { name: "Product Management" },
    { name: "Graphic Design" },
    { name: "Consultancy" },
  ];
return (
  <footer className="footer">
    <div className="container">
      <div className="footer-top">
        {/* Company Info */}
        <div className="footer-company-info">
          <h4>Alem Expect Solution</h4>
          <p>
            Addis Abeba Ethiopia <br />
            Gerji Mebrat Hail <br />
            Mag Building 204 office
          </p>
          <div className="footer-contact-list">
            <div className="contact-info-item">
              <Phone size={18} />
              <span>Phone-1: +251 911489191</span>
            </div>
            <div className="contact-info-item">
              <Phone size={18} />
              <span>Phone-2: +251 911701708</span>
            </div>
            <div className="contact-info-item">
              <Mail size={18} />
              <span>Email: info@alemsln.com</span>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          

          <div>
            <h4>Our Services</h4>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href}>
                    <ChevronRight size={16} style={{ marginRight: 6 }} />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="social">Social Links</h4>
            <div className="social-links">
              <a href="#">
                <Facebook size={24} />
              </a>
              <a href="#">
                <Twitter size={24} />
              </a>
              <a href="#">
                <Linkedin size={24} />
              </a>
              <a href="https://t.me/AlemSolution">
                <FaTelegramPlane size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright text-center">
        <p>&copy; {currentYear} Developed by ❤️Hayider. All rights reserved.</p> 
      </div>
    </div>
  </footer>
);
}
