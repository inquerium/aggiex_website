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
    podcastNotifications: true,
    programs: {
      coalition: true, // Default to coalition membership
      incubator: false,
      accelerator: false
    },
    coalitionRole: "",
    startupIdea: "",
    experience: "",
    leadershipExperience: "",
    orgInvolvement: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgramChange = (program) => {
    setFormData(prev => {
      const newPrograms = { ...prev.programs };
      
      if (program === 'coalition') {
        // Coalition can always be toggled
        newPrograms[program] = !newPrograms[program];
      } else if (program === 'incubator') {
        // If selecting incubator, unselect accelerator
        newPrograms.incubator = !newPrograms.incubator;
        if (newPrograms.incubator) {
          newPrograms.accelerator = false;
        }
      } else if (program === 'accelerator') {
        // If selecting accelerator, unselect incubator
        newPrograms.accelerator = !newPrograms.accelerator;
        if (newPrograms.accelerator) {
          newPrograms.incubator = false;
        }
      }
      
      return {
        ...prev,
        programs: newPrograms
      };
    });
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

        const successMessage = result.message || "Application submitted successfully! Welcome to the AggieX community.";
        
        if (formData.programs.incubator) {
          const shouldRedirect = window.confirm(
            `${successMessage}\n\nYou selected the Aggies Create Incubator. Would you like to continue to their application form now?`
          );
          
          if (shouldRedirect) {
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSdFQnMRvOZY0W_RKauzM5sO89bRJfyAKF8Ki3uRHuWwsyPaEw/viewform?usp=header',
              '_blank'
            );
          }
        } else {
          alert(successMessage + " We'll be in touch soon.");
        }
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          affiliation: "",
          role: "",
          message: "",
          newsletterSubscribed: true,
          podcastNotifications: true,
          programs: {
            coalition: true,
            incubator: false,
            accelerator: false
          },
          coalitionRole: "",
          startupIdea: "",
          experience: "",
          leadershipExperience: "",
          orgInvolvement: ""
        });
      } else {
        // Handle specific error types with better user messages
        if (result.type === 'duplicate_email') {
          alert("⚠️ Email Already Used\n\nAn application with this email address already exists. Please use a different email address or contact us if you need to update your existing application.\n\nContact: team@aggiex.org");
        } else if (result.type === 'duplicate_program') {
          alert("⚠️ Program Already Applied\n\nYou have already submitted an application for this program. Please contact us if you need to update your application.\n\nContact: team@aggiex.org");
        } else {
          alert(result.error || "Failed to submit application. Please try again.");
        }
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
            Join the AggieX Ecosystem
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Join the <span className="text-maroon-600">AggieX Coalition</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Be part of Texas A&M's unified startup ecosystem! Whether you want to join as a general member, 
              apply to our programs, or contribute as a mentor, there's a place for you in the AggieX community.
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
                    {formData.email === 'ruzi@tamu.edu' && (
                      <p className="text-sm text-blue-600 mt-1 font-medium">🧪 Test mode: Unlimited submissions allowed</p>
                    )}
                  </div>
              </div>

              {/* Program Selection - Only show for students */}
              {formData.affiliation === 'current-student' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-maroon-600" />
                    What Would You Like to Join?
                  </h3>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-yellow-600 text-lg">💡</div>
                      <div className="text-sm text-yellow-800">
                        <strong>Note:</strong> You can join the coalition and apply to one program (Incubator OR Accelerator). 
                        The Incubator is for early-stage ideas, while the Accelerator is for validated startups ready to scale.
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="coalition"
                        checked={formData.programs.coalition}
                        onChange={() => handleProgramChange('coalition')}
                        className="mt-1 rounded border-gray-300 text-maroon-600 focus:ring-maroon-500"
                      />
                      <div>
                        <label htmlFor="coalition" className="block text-sm font-semibold text-gray-700">
                          🎯 AggieX Coalition (General Member)
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          Join as a general member to stay connected, attend events, and be part of the community. 
                          <strong className="text-maroon-600"> We want everyone to be part of the coalition!</strong>
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start gap-3 ${formData.programs.accelerator ? 'opacity-50' : ''}`}>
                      <input
                        type="checkbox"
                        id="incubator"
                        checked={formData.programs.incubator}
                        onChange={() => handleProgramChange('incubator')}
                        disabled={formData.programs.accelerator}
                        className={`mt-1 rounded border-gray-300 text-maroon-600 focus:ring-maroon-500 ${
                          formData.programs.accelerator ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                      />
                      <div>
                        <label htmlFor="incubator" className={`block text-sm font-semibold ${
                          formData.programs.accelerator ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          🌱 Aggies Create Incubator (Fall 2025)
                        </label>
                        <p className={`text-sm mt-1 ${
                          formData.programs.accelerator ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          12-week program to form teams, build MVPs, and launch your startup idea.
                          <span className="text-maroon-600 font-medium"> You'll be redirected to their application form.</span>
                          {formData.programs.accelerator && (
                            <span className="block text-red-600 text-xs mt-1">
                              ⚠️ Please deselect Accelerator first
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start gap-3 ${formData.programs.incubator ? 'opacity-50' : ''}`}>
                      <input
                        type="checkbox"
                        id="accelerator"
                        checked={formData.programs.accelerator}
                        onChange={() => handleProgramChange('accelerator')}
                        disabled={formData.programs.incubator}
                        className={`mt-1 rounded border-gray-300 text-maroon-600 focus:ring-maroon-500 ${
                          formData.programs.incubator ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                      />
                      <div>
                        <label htmlFor="accelerator" className={`block text-sm font-semibold ${
                          formData.programs.incubator ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          🚀 AggieX Accelerator (Spring 2026)
                        </label>
                        <p className={`text-sm mt-1 ${
                          formData.programs.incubator ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Intensive growth program for validated startups ready to scale and raise funding.
                          {formData.programs.incubator && (
                            <span className="block text-red-600 text-xs mt-1">
                              ⚠️ Please deselect Incubator first
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Accelerator Only - For alumni, mentors, advisors, investors */}
              {(formData.affiliation === 'alumni' || formData.affiliation === 'faculty' || formData.affiliation === 'researcher' || formData.affiliation === 'partner' || formData.affiliation === 'other') && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-maroon-600" />
                    Accelerator Program
                  </h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-blue-600 text-lg">💼</div>
                      <div className="text-sm text-blue-800">
                        <strong>Alumni, Mentors, Advisors & Investors:</strong> You can apply to support the AggieX Accelerator program 
                        as a mentor, advisor, or investor. This program is open to all professionals who want to help 
                        Aggie entrepreneurs succeed.
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="accelerator"
                        checked={formData.programs.accelerator}
                        onChange={() => handleProgramChange('accelerator')}
                        className="mt-1 rounded border-gray-300 text-maroon-600 focus:ring-maroon-500"
                      />
                      <div>
                        <label htmlFor="accelerator" className="block text-sm font-semibold text-gray-700">
                          🚀 AggieX Accelerator (Spring 2026)
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          Support validated startups as a mentor, advisor, or investor in our intensive growth program.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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

              {/* Coalition-Specific Questions - Only for students */}
              {formData.programs.coalition && formData.affiliation === 'current-student' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <User className="h-6 w-6 text-maroon-600" />
                    Coalition Membership
                  </h3>
                  
                  <div>
                    <label htmlFor="coalitionRole" className="block text-sm font-semibold text-gray-700 mb-2">
                      What interests you most about the coalition?
                    </label>
                    <select
                      id="coalitionRole"
                      name="coalitionRole"
                      value={formData.coalitionRole}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select your interest</option>
                      <option value="events">Attending events and networking</option>
                      <option value="mentorship">Finding mentorship opportunities</option>
                      <option value="startup-ideas">Developing startup ideas</option>
                      <option value="community">Being part of the community</option>
                      <option value="leadership">Taking on leadership roles</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="orgInvolvement" className="block text-sm font-semibold text-gray-700 mb-2">
                      Are you involved in any student organizations? (Optional)
                    </label>
                    <textarea
                      id="orgInvolvement"
                      name="orgInvolvement"
                      value={formData.orgInvolvement}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about any student organizations, clubs, or groups you're involved with..."
                    />
                  </div>

                  <div>
                    <label htmlFor="leadershipExperience" className="block text-sm font-semibold text-gray-700 mb-2">
                      Any leadership experience? (Optional)
                    </label>
                    <textarea
                      id="leadershipExperience"
                      name="leadershipExperience"
                      value={formData.leadershipExperience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Share any leadership roles, project management, or team coordination experience..."
                    />
                  </div>
                </div>
              )}

              {/* Incubator Application Notice */}
              {formData.programs.incubator && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">📝</div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                          Aggies Create Incubator Application
                        </h3>
                        <p className="text-blue-800 mb-4">
                          Aggies Create has their own comprehensive application form. After submitting this coalition application, 
                          you'll be redirected to their official application form to complete the incubator application process.
                        </p>
                        <div className="text-sm text-blue-700">
                          <strong>What to expect:</strong>
                          <ul className="mt-2 space-y-1">
                            <li>• Complete this form to join the AggieX coalition</li>
                            <li>• You'll be redirected to Aggies Create's application form</li>
                            <li>• Their form includes detailed questions about your startup idea and team</li>
                            <li>• Both applications will be reviewed by their respective teams</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Program-Specific Questions - Only for students */}
              {formData.programs.accelerator && formData.affiliation === 'current-student' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-maroon-600" />
                    Program-Specific Information
                  </h3>
                  
                  <div>
                    <label htmlFor="startupIdea" className="block text-sm font-semibold text-gray-700 mb-2">
                      Do you have a startup idea? (Optional)
                    </label>
                    <textarea
                      id="startupIdea"
                      name="startupIdea"
                      value={formData.startupIdea}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Describe your startup idea, problem you're solving, or what you want to build..."
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                      Relevant experience or skills (Optional)
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Share any technical skills, business experience, or relevant background..."
                    />
                  </div>
                </div>
              )}

              {/* Mentor/Advisor/Investor Information */}
              {(formData.affiliation === 'alumni' || formData.affiliation === 'faculty' || formData.affiliation === 'researcher' || formData.affiliation === 'partner' || formData.affiliation === 'other') && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <User className="h-6 w-6 text-maroon-600" />
                    Professional Information
                  </h3>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                      Professional background and expertise (Required)
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Describe your professional background, industry experience, areas of expertise, and how you can help Aggie entrepreneurs..."
                    />
                  </div>

                  <div>
                    <label htmlFor="startupIdea" className="block text-sm font-semibold text-gray-700 mb-2">
                      How would you like to support AggieX? (Required)
                    </label>
                    <textarea
                      id="startupIdea"
                      name="startupIdea"
                      value={formData.startupIdea}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Mentoring, advising, investing, speaking, or other ways you'd like to contribute..."
                    />
                  </div>
                </div>
              )}

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
                      Join AggieX
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  By submitting this application, you agree to receive updates about AggieX and join our community.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 