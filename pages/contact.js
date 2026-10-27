import { Footer } from "@/components/Footer";
import Navbars from "@/components/Navbars";
import Send from "@/components/Send";
import { SingleSplitText } from "@/ui/SingleSplitText";
import localFont from "next/font/local";
import Head from "next/head";
import { useRef, useState } from "react";


const myFont = localFont({ src: "../fonts/old.otf" });
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });
  const trRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitting: false,
        success: false,
        error: "Please fill all required fields"
      });
      return;
    }

    setFormStatus({
      submitting: true,
      success: false,
      error: null
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          submitting: false,
          success: true,
          error: null
        });
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: error.message
      });
    }
  };

  return (
    <main>
       <Head>
        {/* Primary Meta Tags */}
        <title>Contact PiRhoTech | Get a Free Project Consultation</title>
        <link rel="canonical" href="https://pirhotech.com/contact" />
        <meta
          name="description"
          content="Tell us about your web app, mobile app, AI chatbot or automation project. Book a free consultation with PiRhoTech and get a clear plan, timeline and quote."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="apple-mobile-web-app-title" content="PiRhoTech" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        {/* Favicon */}
        
        {/* <link rel="manifest" href="/site.webmanifest" /> */}

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Contact PiRhoTech | Get a Free Project Consultation" />
        <meta
          property="og:description"
          content="Tell us about your web app, mobile app, AI chatbot or automation project. Book a free consultation with PiRhoTech and get a clear plan, timeline and quote."
        />
        <meta property="og:image" content="https://pirhotech.com/og-image.png" />
        <meta property="og:url" content="https://pirhotech.com/contact" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact PiRhoTech | Get a Free Project Consultation" />
        <meta
          name="twitter:description"
          content="Tell us about your web app, mobile app, AI chatbot or automation project. Book a free consultation with PiRhoTech and get a clear plan, timeline and quote."
        />
        <meta name="twitter:image" content="https://pirhotech.com/og-image.png" />

        {/* Keywords */}
        <meta
          name="keywords"
          content="software development company in Bangladesh, web development company Bangladesh, mobile app development company, Flutter app development, AI chatbot development, business automation services, custom software development, Shopify app development, offshore software development, PiRhoTech, Solidy.io"
        />

        {/* Author */}
        <meta name="author" content="PiRhoTech" />
      </Head>
      <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
      <div className="mt-[150px] flex justify-center main mb-[250px]">
        <div className="w-[82%]">
          <div className="flex flex-col">
            <h1 className="text-center sm:text-start text-[1.7rem] ss:text-[4rem] md:text-9xl mt-[50px] sm:mt-[100px] flex flex-col md:text-[5rem] lg:text-[6rem]">
              <SingleSplitText>{"Let's build greatest "}</SingleSplitText>
              <SingleSplitText>{"things together 🤗"}</SingleSplitText>
            </h1>
          </div>
          <div className="flex gap-[100px] md:gap-0 mt-[100px] flex-col md:flex-row justify-between flex-wrap">
            <div class="flex items-center w-full md:w-1/2 justify-start bg-transparent">
              <div className="w-full md:w-[550px] ">
                <div class="mx-auto w-full md:max-w-lg">
                  <h1 class="text-4xl font-medium">Contact us</h1>

                  {formStatus.success ? (
                    <div className="mt-10 p-4 bg-green-50 border border-green-500 rounded-sm text-green-700">
                      <h2 className="text-xl font-semibold mb-2">Message Sent Successfully!</h2>
                      <p>Thank you for contacting us. We'll get back to you soon.</p>
                      <button 
                        onClick={() => setFormStatus(prev => ({...prev, success: false}))}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      class="mt-10"
                    >
                      {formStatus.error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-500 rounded-sm text-red-700">
                          {formStatus.error}
                        </div>
                      )}
                      <div class="grid gap-6 sm:grid-cols-2">
                        <div class="relative z-0">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-hidden focus:ring-0"
                            placeholder=" "
                          />
                          <label class="absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
                            Your name
                          </label>
                        </div>
                        <div class="relative z-0">
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-hidden focus:ring-0"
                            placeholder=" "
                          />
                          <label class="absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
                            Your email
                          </label>
                        </div>
                        <div class="relative z-0 col-span-1 ss:col-span-2">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="5"
                            class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-hidden focus:ring-0"
                            placeholder=" "
                          ></textarea>
                          <label class="absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
                            Your message
                          </label>
                        </div>
                      </div>
                      <div className="mt-[30px] sm:mt-[50px]">
                        <button type="submit" disabled={formStatus.submitting}>
                          <Send>{formStatus.submitting ? "Sending..." : "Send Message"}</Send>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
            <h1
              style={{
                fontWeight: 100,
                fontFamily: "futura-pt, sans-serif",
                fontWeight: "300 500 700 900",
              }}
              className="text-3xl mlg:text-5xl w-full md:w-[37%] mlg:w-1/2 font-100"
            >
              {
                "We're here to bring your concept to life, manage your ongoing project, or expand your existing development team."
              }
            </h1>
          </div>
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
}
