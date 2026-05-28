import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FloatingInput = ({ id, type = "text", label, value, onChange }) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      required
      value={value || ""}
      className="peer w-full border-b-2 border-gray-300 py-2 focus:border-green-600 focus:outline-none placeholder-transparent"
      placeholder={label}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="absolute left-0 top-2 text-gray-400 text-base transition-all duration-300 ease-in-out origin-top-left pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5.5 peer-focus:scale-85 peer-focus:text-green-600 peer-valid:-translate-y-5.5 peer-valid:scale-85 peer-valid:text-green-600"    >
      {label}
    </label>
  </div>
);

function Submit() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Initialize modal state: if user exists, showModal is false
  const [showModal, setShowModal] = useState(!user);
  const [isLogin, setIsLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    title: "",
    abstract: "",
    keywords: "",
    track: "",
    authors: [
      {
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        affiliation: "",
        email: "",
        country: "",
        orcid: "",
        is_corresponding: false,
        is_presenter: false,
      },
    ],
  });

  const steps = ["Details", "Authors", "Uploads", "Declarations", "Review"];

  // Sync modal state if user login status changes
  useEffect(() => {
    setShowModal(!user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { first_name: formData.first_name, last_name: formData.last_name, email: formData.email };
      
    const endpoint = isLogin ? "/api/login" : "/api/register";

    try {
      const res = await axios.post(`http://localhost:8080${endpoint}`, payload);

      // Update global context
      login(
        res.data.user || {
          first_name: formData.first_name,
          email: formData.email,
        },
      );

      alert(res.data.message);
      setShowModal(false);
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Operation failed."));
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      {/* AUTH MODAL - Only renders if !user */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full relative">
            <Link
              to="/"
              className="absolute top-4 left-4 text-gray-400 hover:text-green-600 text-sm font-medium"
            >
              ← Home
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-6">
              {isLogin ? "Log in" : "Create an account"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput
                    id="first_name"
                    label="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    id="last_name"
                    label="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              )}
              <FloatingInput
                id="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              
              {/* Only render password if user is trying to Log In */}
              {isLogin && (
                <FloatingInput
                  id="password"
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
              >
                {isLogin ? "Log In" : "Register & Email Password"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 font-bold hover:underline"
              >
                {isLogin ? "Register" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* FORM UI */}
      <div
        className={`max-w-4xl mx-auto transition-all duration-500 ${showModal ? "blur-sm pointer-events-none" : ""}`}
      >
        {/* Steps Tracker */}
        <div className="flex justify-between mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          {steps.map((s, index) => (
            <div key={s} className="flex items-center gap-2 px-2">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 
          ${
            index <= currentStep
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
              >
                {index + 1}
              </span>
              {/* Hidden on mobile, visible on medium screens and up */}
              <span className="hidden md:block text-sm font-medium text-gray-600 whitespace-nowrap">
                {s}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold mb-8">Paper details</h2>

          <div className="">
            {/* Research Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Research Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              />
              <p className="text-xs text-gray-500 text-right">
                {formData.title?.split(/\s+/).filter(Boolean).length || 0} / 30
                words
              </p>
            </div>

            {/* Abstract */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Abstract *
              </label>
              <textarea
                id="abstract"
                rows="6"
                value={formData.abstract}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              ></textarea>
              <p className="text-xs text-gray-500 text-right">
                {formData.abstract?.split(/\s+/).filter(Boolean).length || 0} /
                250 words
              </p>
            </div>

            {/* Keywords and Track */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Keywords *
                </label>
                <input
                  id="keywords"
                  type="text"
                  value={formData.keywords}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
                />
                <p className="text-xs text-gray-500">
                  Comma-separated, e.g. "alignment, transformers, evaluation".
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Track *
                </label>
                <div className="relative">
                  <select
                    id="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 appearance-none focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none bg-white text-gray-700 cursor-pointer pr-10"
                  >
                    <option value="" disabled>
                      Select a track
                    </option>
                    <option value="Track A">Track A</option>
                    <option value="Track B">Track B</option>
                    <option value="Track C">Track C</option>
                  </select>
                  {/* Custom Chevron Icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="w-full bg-green-600 text-white px-6 py-3 mt-5 rounded-lg font-bold hover:bg-green-800 transition"
            >
              Save and continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Submit;