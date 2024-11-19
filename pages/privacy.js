import { Footer } from "@/components/Footer";
import Navbars from "@/components/Navbars";
import { SingleSplitText } from "@/ui/SingleSplitText";
import SplitLine from "@/ui/SplitLine";
import React,{useRef,useEffect,useState} from "react";

const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(false);
  const trRef = useRef();
  const memRef = useRef();
  const mainRef = useRef();
  return (
    <main>
      <Navbars loading={loading} setLoading={setLoading} trRef={trRef}  />
      <div className="mt-[100px] py-10 px-6">
        <div className="w-[87%] mx-auto rounded-lg shadow-lg p-8">
          <h1 className="text-7xl font-bold text-white mb-6 text-start">
            <SingleSplitText>Privacy Policy</SingleSplitText>
          </h1>

          <section className="mb-6">
            <h1 className="text-2xl font-semibold text-white mb-4">
              1. Information We Collect
            </h1>
            <p className="text-white leading-relaxed">
              We collect only the following personal information from you:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white">
              <li>
                <span className="font-medium">Name:</span> To identify and
                address you.
              </li>
              <li>
                <span className="font-medium">
                  Contact Information (Phone Number):
                </span>{" "}
                To communicate with you about your inquiries or services.
              </li>
              <li>
                <span className="font-medium">Email Address:</span> To provide
                updates, respond to queries, or deliver requested information.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-white leading-relaxed">
              The information we collect is used solely for:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white">
              <li>Responding to inquiries or requests.</li>
              <li>Providing updates about our services.</li>
              <li>Maintaining communication with you.</li>
            </ul>
            <p className="mt-4 text-white">
              We do not share, sell, or rent your information to third parties.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Data Protection
            </h2>
            <p className="text-white leading-relaxed">
              We prioritize the security of your personal information. To
              prevent unauthorized access or disclosure, we have implemented
              suitable physical, electronic, and managerial procedures to
              safeguard the information we collect online.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Your Rights
            </h2>
            <p className="text-white leading-relaxed">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white">
              <li>
                <span className="font-medium">Access:</span> Request access to
                the information we have about you.
              </li>
              <li>
                <span className="font-medium">Correction:</span> Request
                corrections to any inaccurate or incomplete information.
              </li>
              <li>
                <span className="font-medium">Deletion:</span> Request the
                deletion of your data.
              </li>
            </ul>
            <p className="mt-4 text-white">
              To exercise these rights, please contact us at{" "}
              <span className="font-medium">[Insert Contact Email]</span>.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Cookies and Tracking
            </h2>
            <p className="text-white leading-relaxed">
              Pihrotech.com does not use cookies or tracking technologies to
              collect additional personal data.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Third-Party Services
            </h2>
            <p className="text-white leading-relaxed">
              We do not share your personal information with third-party
              services unless required to comply with legal obligations or to
              protect our rights.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-white leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with the updated effective date. We
              encourage you to review this page periodically to stay informed.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Contact Us
            </h2>
            <p className="text-white leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or
              the way we handle your information, please contact us at:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <span className="underline text-blue-600">
                  hello@pihrotech.com
                </span>
              </li>
              <li>
                <span className="font-medium">Phone:</span> [Insert Your
                Business Phone Number]
              </li>
            </ul>
          </section>
        </div>
      </div>
       <Footer loading={loading} setLoading={setLoading} trRef={trRef} />
      <div
        className={`fixed inset-0 bg-[#18181b] h-[150dvh] w-full opacity-80 transition-all duration-300 ${
          loading ? " opacity-[1]" : "opacity-[0] pointer-events-none"
        }`}
        style={{ zIndex: 99999999999999, backgroundColor: "#18181b" }}
        ref={trRef}
      />
    </main>
  );
};

export default PrivacyPolicy;
