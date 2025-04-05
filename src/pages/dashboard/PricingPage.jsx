import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { useNavigate } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { TbX } from "react-icons/tb";


function Sidebar() {
  const navigate = useNavigate();
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [openFAQ, setOpenFAQ] = useState(null); // Track which FAQ is open

  const menuItems = [
    { name: "Dashboard", path: "home", icon: "/src/assets/dashboard.svg" },
    { name: "Portfolio", path: "portfolio", icon: "/src/assets/port.svg" },
    { name: "Opportunities", path: "opportunities", icon: "/src/assets/oppor.svg" },
    { name: "Messages", path: "messages", icon: "/src/assets/message.svg" },
    { name: "Profile", path: "profile", icon: "/src/assets/profile.svg" },
    { name: "Settings", path: "settings", icon: "/src/assets/settings.svg" },
  ];

  const pricingPlans = [
    { name: "Free", price: "Rs.0", features: ["Upload Upto 5 Songs per month", " View basic stats (plays & likes count)", "Engage with listeners through comments & likes"] },

    { name: "Pro", price: "Rs.1499", features: ["Unlimited Uploads", "Advanced analytics (audience insights, engagement tracking)", "Direct messaging with industry professionals & priority discovery listing"] }
  ];

  const faqs = [
    { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and bank transfers." },
    { question: "Is there a free trial available?", answer: "Yes, we offer a 14-day free trial for all plans." },
    { question: "Are there any hidden fees?", answer: "No, we are fully transparent with all pricing details." },
    { question: "Can I cancel my subscription at any time?", answer: "Yes, you can cancel at any time with no additional charges." },
    { question: "Do you offer discounts for long-term plans?", answer: "Yes, we offer discounts for yearly and multi-year plans." },
    { question: "What happens if I miss a payment?", answer: "Your account will be suspended, and you will have a 7-day grace period to make the payment." },
    { question: "How do I upgrade or downgrade my plan?", answer: "You can change your plan directly from your account settings." }
  ];

  const features = [
    { name: "Track Upload Limit", free: "5 tracks", pro: "Unlimited tracks" },
    { name: "Audio Quality", free: "Standard (128kbps)", pro: "High-quality (320kbps)" },
    { name: "Portfolio Customization", free: "	Basic themes only", pro: "Custom branding & premium themes" },
    { name: "Analytics & Insights", free: "Basic stats (plays & likes)", pro: "Advanced insights (audience demographics, engagement tracking)" },
    { name: "Monetization Options", free: false, pro: true },
    { name: "Direct Messaging", free: false, pro: true },
    { name: "Profile Visibility", free: "Standard listing", pro: "	Priority discovery & featured artist option" },
    { name: "Ad-Free Experience", free: false, pro: true },
    { name: "Support", free: "Community support only", pro: "24/7 priority support" },
    { name: "Exclusive Content Access", free: false, pro: true },
    { name: "Collaboration Tools", free: false, pro: true },
    { name: "Custom Song Links", free: false, pro: true },
    { name: "Website Integration", free: false, pro: true },
    { name: "Watermark-Free Downloads", free: false, pro: true },
    { name: "Advanced SEO Boost", free: false, pro: true },
  ];
  return (
    <div className="p-10 text-white w-full pb-36">
      <h2 className="text-center text-xl font-bold mb-6 sm:text-2xl xl:text-3xl">More Beats, More Features – Upgrade Your Flow!</h2>
      <div className="flex flex-col justify-center gap-16 items-center sm:flex-row sm:items-stretch">

        <div
          key={pricingPlans[0].name}
          className="bg-gray-300 border p-6 rounded-lg text-black w-full 2xl:w-[30%] cursor-pointer sm:w-[40%]"
          onClick={() => setSelectedPlan(pricingPlans[0].name)}
        >

          <div className="h-[70%]">
            <h3 className="text-xl font-bold">{pricingPlans[0].name}</h3>
            <p className="text-2xl font-semibold">{pricingPlans[0].price}</p>
            <ul className="mt-4 space-y-2">
              {pricingPlans[0].features.map((feature, index) => (
                <li key={index} className="text-sm"><FaCheck className="inline" /> {feature}</li>
              ))}
            </ul>
          </div>
        </div>
        <div
          key={pricingPlans[1].name}
          className="flex flex-col bg-[#70CCE2] border justify-between p-6 rounded-lg text-black w-full 2xl:w-[30%] cursor-pointer items-start sm:w-[40%]"
          onClick={() => setSelectedPlan(pricingPlans[1].name)}
        >
          <div className="h-[70%]">
            <h3 className="text-xl font-bold">{pricingPlans[1].name}</h3>
            <p className="text-2xl font-semibold">{pricingPlans[1].price}</p>
            <ul className="mt-4 space-y-2">
              {pricingPlans[1].features.map((feature, index) => (
                <li key={index} className="text-sm"><FaCheck className="inline" /> {feature}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setUpgradeModalOpen(true)}
            className="bg-black rounded-lg text-white mt-4 px-4 py-2"
          >
            Upgrade
          </button>
        </div>

      </div>

      {/* Compare Plans Section */}
      <div className="mt-10">
        <h3 className="text-2xl text-center font-bold mb-4">Compare Plans</h3>
        <table className="border-[#303030] border-2 border-collapse w-full">
          <thead>
            <tr className="border-[#303030] border-2">
              <th className="border-[#303030] border-2 p-3 w-1/3">Core Features</th>
              <th className="bg-[#191919] border-[#303030] border-2 p-3 w-1/3">Free</th>
              <th className="bg-[#172022] border p-3 w-1/3">Pro</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-[#303030] border-2">
                <td className="border-[#303030] border-2 p-3">{feature.name}</td>
                <td className="bg-[#191919] border-[#303030] border-2 p-3 text-center">
                  <div className="flex justify-center">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <FaCheck className="h-6 text-green-600 w-6" />
                      ) : (
                        <TbX className="h-6 text-red-600 w-6" strokeWidth={3} />
                      )
                    ) : (
                      feature.free
                    )}
                  </div>
                </td>
                <td className="bg-[#172022] border p-3 text-center">
                  <div className="flex justify-center">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <FaCheck className="text-green-600" />
                      ) : (
                        <TbX className="text-red-600" strokeWidth={3} />
                      )
                    ) : (
                      feature.pro
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <div className="mt-10">
        <h3 className="text-2xl text-center font-bold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="flex bg-[#191919] justify-between p-3 rounded-lg text-left text-lg w-full font-semibold items-center"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)} // Toggle FAQ open
              >
                {faq.question}
                <span
                  className={`transform transition-transform ${openFAQ === index ? "rotate-180" : ""}`}
                  style={{ display: "inline-block" }}
                >
                  <IoIosArrowUp />

                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out max-h-0 ${openFAQ === index ? "max-h-[1000px]" : ""}`}
              >
                <div className="bg-[#3a3a3a] p-3 rounded-lg mt-2">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isUpgradeModalOpen && (
        <div className="flex bg-[#0D0D0D]/60 justify-center p-8 fixed inset-0 items-center md:p-0 z-500" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="flex flex-col bg-white justify-around p-6 rounded-lg shadow-lg text-black w-full md:w-[50%] min-h-[30%] xl:w-[30%]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Level Up Your Music Game!</h2>
              <p className="mb-4">Unlock pro features, reach more fans, and make your sound unstoppable. Ready to vibe higher?</p>
            </div>

            <div className="flex justify-around gap-4 mt-4">
              <button className="bg-gray-500 rounded w-[50%] 2xl:w-[40%] px-2 py-2 xl:px-4" onClick={() => setUpgradeModalOpen(false)}>Not Now!</button>
              <button className="bg-[#70CCE2] rounded w-[50%] 2xl:w-[40%] hover:bg-[#5BB8CF] px-2 py-2 xl:px-4" onClick={() => { setUpgradeModalOpen(false); setSuccessModalOpen(true); }}>Boost Your Beat!</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal with Tick Animation */}
      {isSuccessModalOpen && (
        <div className="flex bg-[#0D0D0D]/60 justify-center fixed inset-0 items-center z-100" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg text-black text-center w-[350px] items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1 }}
              className="flex bg-green-800 h-16 justify-center rounded-full w-16 items-center mb-4"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                width="24"
                height="24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">You’re Pro Now!</h2>
            <p className="mb-4">Enjoy the exclusive {selectedPlan} perks.</p>
            <button className="bg-green-800 rounded text-white px-4 py-2" onClick={() => {
              setSuccessModalOpen(false)
              navigate(`/dashboard/portfolio`);
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
