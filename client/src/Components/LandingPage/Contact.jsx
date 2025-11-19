import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <h2 className="section-header" id="contact">
        Contact Us
      </h2>
      <p className="contact-subtitle">
        For a face-to-face discussion or to learn more about our solutions,
        you're welcome to visit our office during business hours. Please
        schedule an appointment in advance to ensure that we can provide you
        with the attention you deserve.
      </p>
      <div className="container grid-2-cols">
        {/* Left Column: Contact Form */}
        <div className="card contact-form-container">
          <form>
            <div className="form-group">
              <label htmlFor="name"> Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
        {/* Right Column: Contact Information with Animations */}
        <div className="contact-info-container">
          <h3 style={{ marginBottom: "30px", color: "#212529" }}>
            Reach Out to Us
          </h3>
          <div className="flex-col" style={{ gap: "25px" }}>
            <div
              className="contact-info-item animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Mail size={24} />
              <span>info@alemsln.com</span>
            </div>
            <div
              className="contact-info-item animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Phone size={24} />
              <span>+251 911489191</span>
            </div>
            <div
              className="contact-info-item animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <MapPin size={24} />
              <span>
                Addis Abeba, Gerji Mebrat Hail Mag Building 204 office number
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
