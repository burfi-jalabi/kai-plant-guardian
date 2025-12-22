import { Sprout, Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { label: t('nav.about'), href: '#about' },
      { label: t('nav.services'), href: '#services' },
      { label: t('nav.howItWorks'), href: '#how-it-works' },
    ],
    support: [
      { label: t('settings.documentation'), href: '#' },
      { label: t('settings.faqs'), href: '#' },
      { label: t('settings.contactSupport'), href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">GrowSense AI</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/iguana.4731899/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-200 flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>support@growsense.ai</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5" />
                <span>Gujarat, India</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} GrowSense AI. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-slate-600 text-xs">
                Made with ❤️ for farmers & gardeners
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;