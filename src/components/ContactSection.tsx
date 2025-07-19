'use client';

import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";

const initialForm = { name: "", email: "", message: "" };

const ContactSection = () => {
  const [formData, setFormData] = useState(initialForm);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setStatusMessage("");

    setTimeout(() => {
      if (formData.name.toLowerCase().includes("error")) {
        setSubmitStatus("error");
        setStatusMessage(
          "There was a problem sending your message. Please try again."
        );
      } else {
        setSubmitStatus("success");
        setStatusMessage(
          "Message sent successfully! We will get back to you soon."
        );
        setFormData(initialForm);
      }
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 pt-20 pb-16 min-h-screen transition-colors duration-300 overflow-hidden"
    >
      {/* Blobs and vertical gradient overlay identical to Features */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="flex flex-col gap-10">
          <div className="rounded-2xl p-8 border border-white/20 shadow-2xl bg-white/10 dark:bg-black/20 backdrop-blur-lg transition">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <MapPin className="w-7 h-7 text-yellow-400" />
              Contact Us
            </h2>
            <ul className="space-y-5 mt-2 text-white">
              <li className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-yellow-400" />
                <a
                  href="https://maps.google.com/?q=Two Coins Corporation, Davao City, Philippines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Davao City, Philippines
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-yellow-400" />
                <a href="tel:+639175682595" className="hover:underline">
                  +63 917 568 2595{" "}
                  <span className="text-xs text-gray-200">(Globe)</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-yellow-400" />
                <a href="tel:+639338682888" className="hover:underline">
                  +63 933 868 2888{" "}
                  <span className="text-xs text-gray-200">(Smart/Sun)</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-yellow-400" />
                <a
                  href="mailto:info@twocoinsvehicles.com"
                  className="hover:underline"
                >
                  info@twocoinsvehicles.com
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-lg transition">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.775367057935!2d125.46104547475694!3d6.917437693082141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f9a7c78e9d78dd%3A0xdbf6fd34402a77aa!2sTwo%20Coins%20Corporation!5e0!3m2!1sen!2s!4v1749126997291!5m2!1sen!2s"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Davao City"
              className="min-h-[220px] w-full"
            ></iframe>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center">
          <div className="rounded-2xl p-8 border border-white/20 shadow-2xl bg-white/10 dark:bg-black/20 backdrop-blur-lg transition">
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">
              Send Us a Message
            </h2>
            <p className="text-white mb-7">
              Have questions or want a custom quote? We're here to help.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/20 dark:bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="John Doe"
                  required
                  disabled={submitStatus === "sending"}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/20 dark:bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="john.doe@example.com"
                  required
                  disabled={submitStatus === "sending"}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-white/20 dark:bg-black/30 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
                  placeholder="I'm interested in..."
                  required
                  disabled={submitStatus === "sending"}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitStatus === "sending"}
              >
                {submitStatus === "sending" && (
                  <Loader2 className="animate-spin w-5 h-5" />
                )}
                {submitStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
              {submitStatus === "success" && (
                <p className="mt-2 text-green-500 flex items-center gap-2 text-sm text-center">
                  <CheckCircle className="w-5 h-5" /> {statusMessage}
                </p>
              )}
              {submitStatus === "error" && (
                <p className="mt-2 text-red-500 flex items-center gap-2 text-sm text-center">
                  <XCircle className="w-5 h-5" /> {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Blob animation keyframes (if not already in your global CSS) */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1, 0.9) translate(20px, -10px); }
          66% { transform: scale(0.9, 1.1) translate(-10px, 20px); }
        }
        .animate-blob { animation: blob 12s infinite linear; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default ContactSection;