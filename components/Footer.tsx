export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">

        {/* Brand / Mission */}
        <div>
          <h3 className="text-white font-semibold text-lg">
            Nursing Platform
          </h3>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Supporting nurses and nursing students worldwide with professional
            guidance, leadership support, and a trusted community.
          </p>
        </div>

        {/* Guidance */}
        <div>
          <h4 className="text-white font-medium mb-4">
            Guidance
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/guidance/students" className="hover:text-white">Nursing Students</a></li>
            <li><a href="/guidance/career" className="hover:text-white">Career Development</a></li>
            <li><a href="/guidance/leadership" className="hover:text-white">Leadership</a></li>
            <li><a href="/guidance/wellbeing" className="hover:text-white">Wellbeing</a></li>
            <li><a href="/guidance/international" className="hover:text-white">International Nursing</a></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-white font-medium mb-4">
            Community
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/community" className="hover:text-white">Join the Community</a></li>
            <li><a href="/community/rules" className="hover:text-white">Community Guidelines</a></li>
            <li><a href="/about" className="hover:text-white">About the Founder</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-medium mb-4">
            Legal
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/legal/disclaimer" className="hover:text-white">Disclaimer</a></li>
            <li><a href="/legal/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/legal/terms" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Nursing Platform. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Educational content only – not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
