export const COMPANY_INFO = {
  name: "Kitchen Kraft Equipments",
  description: "Leading manufacturer of commercial kitchen equipment in Pune. Custom design, manufacturing, and installation services for restaurants, hotels, and food businesses.",
  contact: {
    phone: "+91 8830696290",
    whatsapp: "+91 8830696290", // Same as phone for WhatsApp
    email: "indiakitchenkraft@gmail.com",
    address: {
      street: "Katraj - Kondhwa Rd, near Khadi machine, Dandekar industrial estate",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pincode: "411048",
      full: "Katraj - Kondhwa Rd, near Khadi machine, Dandekar industrial estate, Kondhwa Budruk, Pune, Maharashtra 411048"
    },
    hours: {
      weekdays: "Monday - Friday: 10:00 AM to 6:00 PM",
      weekend: "Saturday: 10:00 AM to 4:00 PM, Sunday: Closed",
      display: "Mon-Fri: 10AM-6PM"
    }
  }
};

export const SITE_CONFIG = {
  url: "https://kitchenkraftequipments.com",
  name: "Kitchen Kraft Equipments",
  description: COMPANY_INFO.description
};

export const NAVIGATION = {
  main: [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      children: [
        {
          name: "Commercial Kitchen Design",
          href: "/services/commercial-kitchen-design",
          description: "Custom kitchen layouts optimized for efficiency"
        },
        {
          name: "Equipment Manufacturing",
          href: "/services/equipment-manufacturing",
          description: "Custom stainless steel equipment manufacturing"
        },
        {
          name: "Installation & Maintenance",
          href: "/services/installation-maintenance",
          description: "Professional installation and ongoing support"
        },
        {
          name: "Expert Consultation",
          href: "/services/consultation",
          description: "Professional advice and planning services"
        }
      ]
    },
    {
      name: "Products",
      href: "/products",
      children: [
        {
          name: "All Products",
          href: "/products",
          description: "Browse our complete product catalog"
        },
        {
          name: "Custom Manufacturing",
          href: "/products?type=manufacture",
          description: "Custom-built equipment solutions"
        },
        {
          name: "Premium Brands",
          href: "/products?type=resell",
          description: "Top-quality branded equipment"
        }
      ]
    },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ],
  footer: {
    products: [
      { name: "Commercial Refrigeration", href: "/products/refrigeration" },
      { name: "Cooking Equipment", href: "/products/cooking" },
      { name: "Food Preparation", href: "/products/preparation" },
      { name: "Storage Solutions", href: "/products/storage" },
      { name: "Dishwashing Systems", href: "/products/dishwashing" },
      { name: "Custom Manufacturing", href: "/products?type=manufacture" }
    ],
    services: [
      { name: "Kitchen Design", href: "/services/commercial-kitchen-design" },
      { name: "Equipment Manufacturing", href: "/services/equipment-manufacturing" },
      { name: "Installation Services", href: "/services/installation-maintenance" },
      { name: "Maintenance Support", href: "/services/maintenance" },
      { name: "Consultation", href: "/services/consultation" },
      { name: "Project Management", href: "/services/project-management" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/about#story" },
      { name: "Team", href: "/about#team" },
      { name: "Careers", href: "/careers" },
      { name: "News & Updates", href: "/news" },
      { name: "Case Studies", href: "/case-studies" }
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Get Quote", href: "/contact?type=quote" },
      { name: "Support Center", href: "/support" },
      { name: "Warranty", href: "/warranty" },
      { name: "FAQ", href: "/faq" }
    ]
  }
};

export const FORM_CONFIG = {
  contact: {
    fields: {
      name: { required: true, minLength: 2, maxLength: 50 },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      phone: { required: true, pattern: /^[\+]?[1-9][\d]{0,15}$/ },
      company: { required: false, maxLength: 100 },
      subject: { required: true, minLength: 5, maxLength: 100 },
      message: { required: true, minLength: 10, maxLength: 1000 },
      service: { required: false }
    },
    submitUrl: "/api/contact",
    redirectUrl: "/contact/thank-you"
  },
  quote: {
    fields: {
      name: { required: true, minLength: 2, maxLength: 50 },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      phone: { required: true, pattern: /^[\+]?[1-9][\d]{0,15}$/ },
      company: { required: true, minLength: 2, maxLength: 100 },
      projectType: { required: true },
      budget: { required: false },
      timeline: { required: false },
      description: { required: true, minLength: 20, maxLength: 1000 }
    },
    submitUrl: "/api/quote",
    redirectUrl: "/contact/quote-submitted"
  }
};

export const ERROR_MESSAGES = {
  required: "This field is required",
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  pattern: "Please enter a valid format",
  network: "Network error. Please try again.",
  server: "Server error. Please try again later.",
  validation: "Please check your input and try again",
  generic: "Something went wrong. Please try again."
};

export const SUCCESS_MESSAGES = {
  contact: {
    title: "Message Sent Successfully!",
    description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    action: "We'll be in touch soon"
  },
  quote: {
    title: "Quote Request Submitted!",
    description: "Thank you for your quote request. Our team will review your requirements and send you a detailed quote within 2 business days.",
    action: "Check your email for confirmation"
  },
  newsletter: {
    title: "Successfully Subscribed!",
    description: "You've been added to our newsletter. Stay tuned for updates and special offers.",
    action: "Welcome to our community"
  }
};