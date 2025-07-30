import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Users,
  Bell,
  DollarSign,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-50 text-gray-800 font-inter">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 pt-20 pb-28">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-800 mb-6">
            Manage Corporate Credit Cards with Ease 💳
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A complete solution to issue cards, track spending, monitor expiries, and keep your team financially secure and informed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg transition duration-200"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 border px-6 py-3 rounded-xl text-blue-700 font-medium shadow transition duration-200"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <img
            src="https://undraw.co/api/illustrations/credit-card-concept.svg"
            alt="Credit Card Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">What You Can Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <CreditCard className="w-8 h-8 text-blue-600 mb-3" />,
              title: "Card Management",
              desc: "Issue, edit, or remove cards anytime. Monitor expiry, limits & usage.",
            },
            {
              icon: <Users className="w-8 h-8 text-blue-600 mb-3" />,
              title: "User Control",
              desc: "Assign roles, permissions, and monitor user actions securely.",
            },
            {
              icon: <DollarSign className="w-8 h-8 text-blue-600 mb-3" />,
              title: "Transactions",
              desc: "View real-time transactions with filters, categories, and analytics.",
            },
            {
              icon: <Bell className="w-8 h-8 text-blue-600 mb-3" />,
              title: "Smart Alerts",
              desc: "Get timely alerts on card expiries, unusual spending, and more.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        &copy; {new Date().getFullYear()} CreditCardPro Inc. · All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
