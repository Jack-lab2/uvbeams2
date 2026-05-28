import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="text-xl font-bold text-green-600 mb-2">UVBEAMS</div>
            <p className="text-sm text-gray-600">
              A modern home for research conference submission.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/guidelines"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Submission Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  About UVBEAMS
                </Link>
              </li>
            </ul>
          </div>

          {/* For Authors */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">For authors</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/register"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Create an Account
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Author Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
            <p className="text-sm text-gray-600 mb-1">
              Email:{" "}
              <a
                href="mailto:info@uvbeams.com"
                className="hover:text-green-600"
              >
                info@uvbeams.com
              </a>
            </p>
            <p className="text-sm text-gray-600">
              Website:{" "}
              <a
                href="https://www.uv.edu.ph/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-600"
              >
                www.uv.edu.ph
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {currentYear} UVBEAMS. All rights reserved.</p>
          <p className="text-center">
            Corner Colon & Jakosalem Streets, Cebu City 6000, Philippines
          </p>
          <a
            href="/assets/guidelines/UV.PrivacyNotice.pdf"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-600"
          >
            Privacy Notice
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
