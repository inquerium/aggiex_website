import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Mail, User, Building2, ArrowRight, MessageSquare } from "lucide-react";

export default function ApplicationForm() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    affiliation: "",
    role: "",
    message: "",
    newsletterSubscribed: true,
    podcastNotifications: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit application
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Send verification email for accelerator application
        try {
          await fetch('/api/email/send-verification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              firstName: formData.firstName,
              source: 'application'
            }),
          });
        } catch (emailError) {
          console.error('Verification email failed:', emailError);
          // Don't fail the application if email fails
        }

        alert(result.message || "Application submitted successfully! We'll be in touch soon.");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          affiliation: "",
          role: "",
          message: "",
          newsletterSubscribed: true,
          podcastNotifications: true
        });
      } else {
        alert(result.error || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="w-full py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-maroon-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-200 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto space-y-8 mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium border border-maroon-100">
            <FileText className="h-4 w-4" />
            First Cohort Application
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Apply to the <span className="text-maroon-600">First AggieX Cohort</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Be part of history as we launch Texas A&M's first university-sponsored accelerator. 
              This is your chance to build the next billion-dollar startup with the full support of the Aggie network.
            </p>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <User className="h-6 w-6 text-maroon-600" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors"
                      placeholder="your.email@tamu.edu"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">We'll use this for the newsletter and application updates</p>
                </div>
              </div>

              {/* Texas A&M Affiliation */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-maroon-600" />
                  Texas A&M Affiliation
                </h3>
                
                <div>
                  <label htmlFor="affiliation" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Affiliation with Texas A&M *
                  </label>
                  <select
                    id="affiliation"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your affiliation</option>
                    <option value="current-student">Current Student</option>
                    <option value="alumni">Alumni</option>
                    <option value="faculty">Faculty/Staff</option>
                    <option value="researcher">Researcher</option>
                    <option value="partner">Strategic Partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Role in Accelerator */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <User className="h-6 w-6 text-maroon-600" />
                  Your Role
                </h3>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                    What role will you serve? *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your role</option>
                    <option value="founder">Founder/Co-Founder</option>
                    <option value="student-builder">Student Builder</option>
                    <option value="alumni-mentor">Alumni Mentor</option>
                    <option value="advisor">Advisor</option>
                    <option value="investor">Investor</option>
                    <option value="partner">Strategic Partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-maroon-600" />
                  Tell Us More
                </h3>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your startup idea, experience, or why you want to join AggieX. What unique value can you bring to the community?"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Share your story, startup idea, or what excites you about joining the first AggieX cohort.
                  </p>
                </div>
              </div>

              {/* Newsletter Preferences */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Mail className="h-6 w-6 text-maroon-600" />
                  Stay Connected
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="newsletterSubscribed"
                      name="newsletterSubscribed"
                      checked={formData.newsletterSubscribed}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        newsletterSubscribed: e.target.checked
                      }))}
                      className="mt-1 rounded border-gray-300 text-maroon-600 focus:ring-maroon-500"
                    />
                    <div>
                      <label htmlFor="newsletterSubscribed" className="block text-sm font-semibold text-gray-700">
                        Subscribe to AggieX Newsletter
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        Get weekly insights on startup news, founder spotlights, and exclusive AggieX updates.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="podcastNotifications"
                      name="podcastNotifications"
                      checked={formData.podcastNotifications}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        podcastNotifications: e.target.checked
                      }))}
                      className="mt-1 rounded border-gray-300 text-maroon-600 focus:ring-maroon-500"
                    />
                    <div>
                      <label htmlFor="podcastNotifications" className="block text-sm font-semibold text-gray-700">
                        Get Podcast Launch Notifications
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        Be the first to know when the AggieX Podcast launches with founder interviews and startup insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 bg-maroon-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-maroon-700 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  By submitting this application, you agree to receive updates about AggieX and the accelerator program.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 