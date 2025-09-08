import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-3xl font-extrabold text-green-900 mb-6 border-b-4 border-yellow-400 inline-block pb-2">
        Terms & Conditions
      </h1>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Welcome to <span className="font-semibold text-green-700">Grocery App</span>.  
        By accessing and using our platform, you agree to the following terms
        and conditions. Please read them carefully before making any purchase.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">1. Eligibility</h2>
          <p className="text-gray-600">
            You must be at least 18 years old or under the supervision of a parent/guardian 
            to use this platform and place orders.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">2. Products & Pricing</h2>
          <p className="text-gray-600">
            All prices are listed in INR. We strive to ensure product availability, 
            but in rare cases, items may be out of stock or replaced with similar products. 
            Prices are subject to change without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">3. Orders & Payments</h2>
          <p className="text-gray-600">
            Orders will be processed only after successful payment.  
            We accept major payment methods including UPI, debit/credit cards, and COD (where available).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">4. Delivery & Returns</h2>
          <p className="text-gray-600">
            Deliveries will be made within the estimated time. Perishable items once delivered 
            cannot be returned unless damaged or expired upon arrival.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-2">5. Limitation of Liability</h2>
          <p className="text-gray-600">
            Grocery App is not responsible for delays due to unforeseen circumstances such as weather, strikes, or technical issues.
          </p>
        </section>
      </div>

      <p className="mt-10 text-gray-700 font-medium">
        By continuing to use our platform, you acknowledge that you have read and agreed to these terms.  
        Thank you for shopping with <span className="text-green-700 font-semibold">Grocery App</span>! 🛒
      </p>
    </div>
  );
};

export default TermsAndConditions;
