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
        <title>PiRhoTech- Contact Us</title>
        <meta
          name="description"
          content=""
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon.ico"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logo.png"
        />
        <meta name="apple-mobile-web-app-title" content="PiRhoTech.com" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.ico"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="PirRhotech.com" />
        <meta
          property="og:description"
          content="Creative Agency Designing Tomorrow's Visions of the Future"
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PirRhotech.com" />
        <meta
          name="twitter:description"
          content="Creative Agency Designing Tomorrow's Visions of the Future"
        />
        <meta name="twitter:image" content="/logo.png" />

        {/* Keywords */}
        <meta
          name="keywords"
          content="Next.js, SEO, favicon, web development, branding"
        />

        {/* Author */}
        <meta name="author" content="Your Name or Company Name" />
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
                    <div className="mt-10 p-4 bg-green-50 border border-green-500 rounded text-green-700">
                      <h2 className="text-xl font-semibold mb-2">Message Sent Successfully!</h2>
                      <p>Thank you for contacting us. We'll get back to you soon.</p>
                      <button 
                        onClick={() => setFormStatus(prev => ({...prev, success: false}))}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
                        <div className="mb-4 p-3 bg-red-50 border border-red-500 rounded text-red-700">
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
                            class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0"
                            placeholder=" "
                          />
                          <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
                            Your name
                          </label>
                        </div>
                        <div class="relative z-0">
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0"
                            placeholder=" "
                          />
                          <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
                            Your email
                          </label>
                        </div>
                        <div class="relative z-0 col-span-1 ss:col-span-2">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="5"
                            class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0"
                            placeholder=" "
                          ></textarea>
                          <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
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
