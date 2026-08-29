import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  GraduationCap, 
  Printer, 
  ShieldCheck,
  Award,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import logoImg from '../assets/logo.png';

export const AdmissionsSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: 'Male',
    gradeApplying: 'Grade 9 (Secondary SEE Program)',
    prevSchool: '',
    prevGpa: '3.80',
    guardianName: '',
    guardianRelation: 'Father',
    guardianPhone: '',
    guardianEmail: '',
    scholarshipCategory: 'Merit Scholarship (GPA 3.6+ / BLE Topper)',
    extracurriculars: 'Cricket & Science Model Exhibition'
  });

  const [applicationId, setApplicationId] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit
      const generatedId = `LFS-ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setApplicationId(generatedId);
      setIsSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  const calculateEstimatedScholarship = (gpaStr: string) => {
    const gpa = parseFloat(gpaStr) || 0;
    if (gpa >= 3.8) return 'Up to 100% Tuition Waiver';
    if (gpa >= 3.5) return 'Up to 50% Tuition Waiver';
    if (gpa >= 3.2) return 'Up to 25% Tuition Waiver';
    return 'Merit & Sibling Concession Evaluated';
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="admissions" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Admissions 2026/27</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Online Admission Registration
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Apply online for Playgroup to Grade 9 at Little Flower Secondary School, Parwanipur, Parsa and receive an instant entrance schedule and scholarship evaluation.
          </p>
        </div>

        {/* Wizard Container Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {!isSubmitted ? (
            <>
              {/* Step Progress Bar */}
              <div className="mb-8 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between max-w-md mx-auto relative">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep >= 1 ? 'bg-red-600 text-white ring-4 ring-red-500/20' : 'bg-slate-100 text-slate-400 border border-slate-300'
                    }`}>
                      1
                    </div>
                    <span className={`text-[11px] font-bold ${currentStep >= 1 ? 'text-red-600' : 'text-slate-400'}`}>
                      Student Details
                    </span>
                  </div>

                  <div className={`flex-1 h-0.5 mx-2 ${currentStep >= 2 ? 'bg-red-500' : 'bg-slate-200'}`} />

                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep >= 2 ? 'bg-red-600 text-white ring-4 ring-red-500/20' : 'bg-slate-100 text-slate-400 border border-slate-300'
                    }`}>
                      2
                    </div>
                    <span className={`text-[11px] font-bold ${currentStep >= 2 ? 'text-red-600' : 'text-slate-400'}`}>
                      Guardian Contact
                    </span>
                  </div>

                  <div className={`flex-1 h-0.5 mx-2 ${currentStep >= 3 ? 'bg-red-500' : 'bg-slate-200'}`} />

                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === 3 ? 'bg-red-600 text-white ring-4 ring-red-500/20' : 'bg-slate-100 text-slate-400 border border-slate-300'
                    }`}>
                      3
                    </div>
                    <span className={`text-[11px] font-bold ${currentStep === 3 ? 'text-red-600' : 'text-slate-400'}`}>
                      Review & Submit
                    </span>
                  </div>

                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleNextStep} className="space-y-6">
                
                {/* STEP 1: Student Information */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-red-600" />
                      <span>Step 1: Student Academic & Personal Information</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Student Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) => handleInputChange('studentName', e.target.value)}
                          placeholder="e.g. Aryan Kumar Sah"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Date of Birth *</label>
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Gender</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Grade / Level Applying For *</label>
                        <select
                          value={formData.gradeApplying}
                          onChange={(e) => handleInputChange('gradeApplying', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        >
                          <option value="Grade 9 (Secondary SEE Program)">Grade 9 (Secondary SEE Program)</option>
                          <option value="Grade 6 (BLE Lower Secondary)">Grade 6 (BLE Lower Secondary)</option>
                          <option value="Grade 1 (Primary School)">Grade 1 (Primary School)</option>
                          <option value="UKG / LKG Level">UKG / LKG Level</option>
                          <option value="Nursery / Playgroup">Nursery / Playgroup</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Previous School Attended</label>
                        <input
                          type="text"
                          value={formData.prevSchool}
                          onChange={(e) => handleInputChange('prevSchool', e.target.value)}
                          placeholder="e.g. Parwanipur Model Academy"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Previous GPA / Percentage (%)</label>
                        <input
                          type="text"
                          value={formData.prevGpa}
                          onChange={(e) => handleInputChange('prevGpa', e.target.value)}
                          placeholder="e.g. 3.80 or 85%"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Parent & Guardian Details */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-red-600" />
                      <span>Step 2: Parent & Guardian Contact Information</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Parent / Guardian Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.guardianName}
                          onChange={(e) => handleInputChange('guardianName', e.target.value)}
                          placeholder="e.g. Mr. Rajesh Kumar Sah"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Relationship to Student</label>
                        <select
                          value={formData.guardianRelation}
                          onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        >
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Legal Guardian">Legal Guardian</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Primary Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.guardianPhone}
                          onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                          placeholder="e.g. +977 9845 128940"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                        <input
                          type="email"
                          value={formData.guardianEmail}
                          onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                          placeholder="e.g. rajesh.sah@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-medium"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <Upload className="w-4 h-4 text-red-600" />
                        <span>Upload Marksheet / Birth Certificate (Optional)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Document attachment simulated successfully!')}
                        className="px-3.5 py-1.5 rounded-lg text-xs bg-white text-red-600 font-bold border border-red-200 hover:bg-red-50 shadow-xs cursor-pointer"
                      >
                        Choose File
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Scholarship Calculator & Submission */}
                {currentStep === 3 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Step 3: Scholarship Estimate & Confirmation</span>
                    </h3>

                    {/* Live Scholarship Estimate Card */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-red-50/60 via-white to-amber-50/50 border border-red-200 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                          Estimated Merit Scholarship
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-red-600 border border-red-200 shadow-xs">
                          GPA: {formData.prevGpa || 'N/A'}
                        </span>
                      </div>

                      <div className="text-xl sm:text-2xl font-black text-red-600 font-display">
                        {calculateEstimatedScholarship(formData.prevGpa)}
                      </div>

                      <p className="text-xs text-slate-700 font-medium">
                        Based on your GPA of <strong>{formData.prevGpa || '3.80'}</strong>, you qualify for admission entrance interview and priority merit concession at Little Flower Secondary School.
                      </p>
                    </div>

                    {/* Summary */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 font-medium">
                      <div className="flex justify-between text-slate-700">
                        <span>Candidate Name:</span>
                        <strong className="text-slate-900">{formData.studentName || 'Aryan Kumar Sah'}</strong>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Level Applied:</span>
                        <strong className="text-red-600">{formData.gradeApplying}</strong>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Guardian Contact:</span>
                        <span className="text-slate-900">{formData.guardianName || 'Mr. Rajesh Kumar Sah'} ({formData.guardianPhone || '+977 9845 128940'})</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wizard Navigation Buttons */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-red-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentStep === 3 ? 'Submit Application & Generate Slip' : 'Continue to Next Step'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            </>
          ) : (
            /* Printable Certificate Receipt */
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-300 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-300 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Registration Confirmed</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  Welcome to Little Flower School, {formData.studentName || 'Applicant'}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium">
                  Your admission registration has been recorded in the Little Flower Secondary School administrative office in Parwanipur, Parsa.
                </p>
              </div>

              {/* Certificate Box */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-white border-2 border-red-500 text-left space-y-3 shadow-xl relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold">APPLICATION CODE</span>
                      <p className="text-base font-mono font-black text-red-600">{applicationId}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                    VERIFIED
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-700 font-medium">
                  <p><strong>Candidate:</strong> {formData.studentName || 'Aryan Kumar Sah'}</p>
                  <p><strong>Level Applied:</strong> {formData.gradeApplying}</p>
                  <p><strong>Campus Desk:</strong> Birgunj-21, Parwanipur, Parsa</p>
                  <p><strong>Assessment Date:</strong> Sunday to Friday (08:00 AM - 02:00 PM)</p>
                  <p><strong>Merit Concession:</strong> <span className="text-red-600 font-bold">{calculateEstimatedScholarship(formData.prevGpa)}</span></p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 shadow-md shadow-red-500/25 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Admission Slip</span>
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  Submit Another Form
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
