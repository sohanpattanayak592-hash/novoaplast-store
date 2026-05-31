import React from 'react'
import { motion } from 'framer-motion'
import { Truck, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react'

// Common wrapper for legal pages
const LegalPageWrapper = ({ title, icon: Icon, children }) => (
  <div className="min-h-screen pt-32 pb-24 px-4 bg-dark-950">
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card glow-ring-novo p-8 md:p-12"
      >
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-novo-500/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-novo-400" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">{title}</h1>
        </div>
        <div className="prose prose-invert prose-novo max-w-none">
          {children}
        </div>
      </motion.div>
    </div>
  </div>
)

export const AboutUs = () => (
  <LegalPageWrapper title="About Novoplast" icon={ShieldCheck}>
    <p className="text-xl text-white/80 leading-relaxed mb-8">
      Novoplast was born out of a simple frustration: Why do traditional paper posters tear, fade, and get ruined so easily?
    </p>
    
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div>
        <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Our Mission</h3>
        <p className="text-white/60">
          To revolutionize the way people decorate their spaces by providing indestructible, premium quality prints that last a lifetime. We believe your memories, passions, and inspirations deserve better than fragile paper.
        </p>
      </div>
      <div>
        <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">The Material</h3>
        <p className="text-white/60">
          Our proprietary 100% Non-Tearable Plastic Substrate is engineered to withstand water, sunlight, and rough handling. You can literally wash our posters with soap and water, and they'll look brand new.
        </p>
      </div>
    </div>

    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Why Choose Us?</h3>
    <ul className="space-y-4 text-white/70">
      <li><strong>Indestructible:</strong> Never worry about accidental tears or creases again.</li>
      <li><strong>Waterproof:</strong> Perfect for any room, including bathrooms and kitchens.</li>
      <li><strong>Premium Finish:</strong> Vibrant, UV-resistant inks that don't fade over time.</li>
      <li><strong>No Framing Needed:</strong> Rigid enough to be mounted directly on the wall.</li>
    </ul>
  </LegalPageWrapper>
)

export const ShippingPolicy = () => (
  <LegalPageWrapper title="Shipping Policy" icon={Truck}>
    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Processing Time</h3>
    <p className="text-white/70 mb-8">
      All orders are processed within 24-48 hours. Custom poster and sticker orders may take an additional 24 hours for design verification and printing.
    </p>

    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Delivery Estimates</h3>
    <ul className="space-y-4 text-white/70 mb-8">
      <li><strong>Metros:</strong> 2-4 business days</li>
      <li><strong>Rest of India:</strong> 4-7 business days</li>
    </ul>

    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Shipping Charges</h3>
    <p className="text-white/70 mb-8">
      We offer <strong>Free Shipping</strong> on all orders across India, with no minimum purchase requirement.
    </p>

    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Packaging</h3>
    <p className="text-white/70">
      Due to the premium nature of our non-tearable substrate, our posters are shipped flat in rigid, protective packaging to ensure they arrive in pristine condition without memory curls.
    </p>
  </LegalPageWrapper>
)

export const RefundPolicy = () => (
  <LegalPageWrapper title="Refund & Returns" icon={ShieldCheck}>
    <p className="text-white/70 mb-8">
      We stand behind the quality of our indestructible posters. If you're not satisfied, we're here to help.
    </p>

    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">7-Day Return Policy</h3>
    <p className="text-white/70 mb-8">
      You have 7 days from the date of delivery to request a return or exchange. To be eligible for a return, your item must be in the same condition that you received it.
    </p>

    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Exceptions</h3>
    <ul className="space-y-4 text-white/70 mb-8">
      <li><strong>Custom Products:</strong> Custom posters and personalized stickers are non-refundable unless they arrive damaged or defective.</li>
      <li><strong>Damaged on Arrival:</strong> Please record an unboxing video if the outer packaging appears damaged. We will replace damaged items immediately at no extra cost.</li>
    </ul>

    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Refund Process</h3>
    <p className="text-white/70">
      Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed back to your original method of payment within 5-7 business days.
    </p>
  </LegalPageWrapper>
)

export const ContactUs = () => (
  <LegalPageWrapper title="Contact Us" icon={Mail}>
    <p className="text-white/70 mb-12 text-lg">
      Have a question about an order, our materials, or want to place a bulk corporate order? We'd love to hear from you.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center flex-shrink-0 border border-white/10">
            <Mail className="w-5 h-5 text-novo-400" />
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-1">Email</h4>
            <a href="mailto:support@novoplast.com" className="text-white/60 hover:text-novo-400 transition-colors">support@novoplast.com</a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center flex-shrink-0 border border-white/10">
            <Phone className="w-5 h-5 text-novo-400" />
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-1">Phone / WhatsApp</h4>
            <a href="tel:+919876543210" className="text-white/60 hover:text-novo-400 transition-colors">+91 98765 43210</a>
            <p className="text-white/40 text-sm mt-1">Mon-Sat, 10 AM - 6 PM</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center flex-shrink-0 border border-white/10">
            <MapPin className="w-5 h-5 text-novo-400" />
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-1">Studio Address</h4>
            <p className="text-white/60">
              123 Creative Hub,<br />
              Andheri West,<br />
              Mumbai, Maharashtra 400053
            </p>
          </div>
        </div>
      </div>

      <div className="bg-dark-800/50 p-6 rounded-2xl border border-white/10">
        <h4 className="font-display font-bold text-xl text-white mb-6">Send a Message</h4>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will get back to you shortly.'); e.target.reset(); }}>
          <input type="text" placeholder="Your Name" className="input-default w-full" required />
          <input type="email" placeholder="Email Address" className="input-default w-full" required />
          <textarea placeholder="How can we help you?" rows="4" className="input-default w-full resize-none" required></textarea>
          <button type="submit" className="btn-novo w-full">Send Message</button>
        </form>
      </div>
    </div>
  </LegalPageWrapper>
)

export const PrivacyPolicy = () => (
  <LegalPageWrapper title="Privacy Policy" icon={ShieldCheck}>
    <p className="text-white/70 mb-4">Last Updated: May 2026</p>
    <p className="text-white/70 mb-8">
      Your privacy is critically important to us. At Novoplast, we have a few fundamental principles:
    </p>
    <ul className="space-y-4 text-white/70 mb-8">
      <li>We don't ask you for personal information unless we truly need it.</li>
      <li>We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.</li>
      <li>We don't store personal information on our servers unless required for the on-going operation of our services.</li>
    </ul>
    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">Payment Information</h3>
    <p className="text-white/70">
      All payments are processed securely through our payment partners. We do not store your credit card details or other sensitive payment information on our servers.
    </p>
  </LegalPageWrapper>
)

export const TermsOfService = () => (
  <LegalPageWrapper title="Terms of Service" icon={ShieldCheck}>
    <p className="text-white/70 mb-8">
      By accessing our website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
    </p>
    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">1. Custom Orders</h3>
    <p className="text-white/70 mb-8">
      For custom posters and stickers, you warrant that you hold the necessary rights to use the uploaded images. We reserve the right to refuse printing any material that violates copyright laws or is deemed inappropriate.
    </p>
    <h3 className="text-novo-400 font-display text-2xl font-bold mb-4">2. Color Accuracy</h3>
    <p className="text-white/70">
      While we strive to ensure the colors on your posters are as accurate as possible, please note that screen colors may vary from printed colors due to different monitor calibrations.
    </p>
  </LegalPageWrapper>
)
