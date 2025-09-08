import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-3xl font-extrabold text-green-900 mb-6 border-b-4 border-yellow-400 inline-block pb-2">
        Privacy Policy
      </h1>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Your privacy is important to us at <span className="font-semibold text-green-700">Grocery App</span>.  
        This policy explains how we collect, use, and safeguard your personal information when you use our services.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect personal details like name, phone number, email, and delivery address 
            when you place an order. Payment details are processed securely through trusted gateways.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            Your data is used for processing orders, delivering groceries, sending updates, and improving our services.  
            We never sell or share your personal information with third parties without consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">3. Data Protection</h2>
          <p className="text-gray-600">
            We use strong encryption and secure servers to protect your data.  
            However, no online transaction is 100% secure, and we encourage you to use safe payment methods.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">4. Cookies</h2>
          <p className="text-gray-600">
            Our website uses cookies to enhance user experience and provide personalized recommendations.  
            You can disable cookies from your browser settings if preferred.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">5. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal data.  
            For any queries, please contact our support team.
          </p>
        </section>
      </div>

      <p className="mt-10 text-gray-700 font-medium">
        By using our services, you consent to this privacy policy.  
        Thank you for trusting <span className="text-green-700 font-semibold">Grocery App</span> with your shopping needs! 🥦
      </p>
    </div>
  );
};

export default PrivacyPolicy;
