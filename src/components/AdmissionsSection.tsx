import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  Printer, 
  ShieldCheck,
  Calendar,
  FileText,
  AlertCircle,
  BookOpen,
  BadgePercent,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';
import logoImg from '../assets/logoBase64';

export const AdmissionsSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Callback Form State
  const [callbackData, setCallbackData] = useState({
    parentName: '',
    phone: '',
    grade: 'Nursery',
    preferredTime: 'Morning (08:30 AM - 11:30 AM)',
    query: ''
  });
  const [callbackSubmitted, setCallbackSubmitted] = useState<boolean>(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
  };

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

  const ageTableData = [
    { grade: 'Nursery', minAge: '2.5 years', ageDetail: '2 Yrs, 6 Mos', note: 'Early Care' },
    { grade: 'LKG', minAge: '3.5 years', ageDetail: '3 Yrs, 6 Mos', note: 'Junior KG' },
    { grade: 'UKG', minAge: '4.5 years', ageDetail: '4 Yrs, 6 Mos', note: 'Senior KG' },
    { grade: 'Class 1', minAge: '5.5 years', ageDetail: '5 Yrs, 6 Mos', note: 'Primary 1' },
    { grade: 'Class 2', minAge: '6.5 years', ageDetail: '6 Yrs, 6 Mos', note: 'Primary 2' },
    { grade: 'Class 3', minAge: '7.5 years', ageDetail: '7 Yrs, 6 Mos', note: 'Primary 3' },
    { grade: 'Class 4', minAge: '8.5 years', ageDetail: '8 Yrs, 6 Mos', note: 'Primary 4' },
    { grade: 'Class 5', minAge: '9.5 years', ageDetail: '9 Yrs, 6 Mos', note: 'Upper Primary' },
    { grade: 'Class 6', minAge: '10.5 years', ageDetail: '10 Yrs, 6 Mos', note: 'Lower Sec' },
    { grade: 'Class 7', minAge: '11.5 years', ageDetail: '11 Yrs, 6 Mos', note: 'Lower Sec' },
  ];

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
    <section id="admissions" className="py-14 sm:py-18 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative border-t border-slate-200">
      
      {/* Full Screen Width Container */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        
        {/* Section Top Header */}
        <div className="text-center max-w-4xl mx-auto space-y-2.5 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Admission Session 2026/27 • Parwanipur, Parsa</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Admission Guidelines &amp; Registration
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Review official school regulations, age qualification rules, and document requirements on the left, and complete your online registration form on the right.
          </p>
        </div>

        {/* Side-by-Side 2-Column Full Width Grid with Equalized Height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT SIDE (7 cols): 1. OFFICIAL GUIDELINES & AGE CRITERIA    */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col h-full space-y-4">
            
            {/* Left Header Title Bar */}
            <div className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-none border-l-4 border-red-600 flex items-center justify-between shadow-xs shrink-0">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-black tracking-wider uppercase font-display">
                  1. Official Guidelines &amp; Age Criteria
                </h3>
              </div>
              <span className="px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                LFSS CODE
              </span>
            </div>

            {/* 3 Directive Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Card 1: Prospectus Fee */}
              <div className="bg-white p-3.5 sm:p-4 rounded-none border-t-4 border-red-600 border-x border-b border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-4 h-4 text-red-600" />
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10.5px] font-black uppercase border border-amber-200">
                      Rs. 300/-
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display mb-1">
                    Prospectus &amp; Form
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Available from the School Office on payment of <strong>Rs. 300/-</strong> (non-refundable).
                  </p>
                </div>
              </div>

              {/* Card 2: Academic Year */}
              <div className="bg-white p-3.5 sm:p-4 rounded-none border-t-4 border-amber-500 border-x border-b border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[10.5px] font-black uppercase border border-blue-200">
                      Baisakh–Chaitra
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display mb-1">
                    Academic Year
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Session runs <strong>Baisakh to Chaitra (April–March)</strong>. Nursery &amp; LKG intake in March–April; other classes per vacancies.
                  </p>
                </div>
              </div>

              {/* Card 3: Transfer Certificate */}
              <div className="bg-white p-3.5 sm:p-4 rounded-none border-t-4 border-slate-800 border-x border-b border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <ShieldCheck className="w-4 h-4 text-slate-700" />
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[10.5px] font-black uppercase border border-slate-300">
                      TC Required
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display mb-1">
                    Transfer Admission
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Must provide a countersigned Transfer Certificate (TC) from a recognized English Medium School.
                  </p>
                </div>
              </div>

            </div>

            {/* UNIFIED SINGLE BOX: AGE MATRIX & BIRTH CERTIFICATES */}
            <div className="bg-white border border-slate-200 rounded-none shadow-xs overflow-hidden flex-1 flex flex-col">
              
              {/* Box Top Header Bar */}
              <div className="bg-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-amber-500 text-white font-black text-xs uppercase tracking-wider font-display">
                    AGE &amp; ELIGIBILITY
                  </span>
                  <h4 className="text-sm sm:text-base font-black tracking-wider uppercase font-display">
                    Age Criteria &amp; Mandatory Documentation
                  </h4>
                </div>
                <span className="text-xs sm:text-sm font-bold text-amber-400 hidden sm:inline-block">
                  Calculated on 1 Baishakh
                </span>
              </div>

              {/* Inside Single Box: 2-Column Responsive Layout */}
              <div className="p-4 sm:p-5 grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch flex-1">
                
                {/* Left Part: Minimum Age Requirement Matrix (7 cols) */}
                <div className="xl:col-span-7 space-y-3 flex flex-col justify-between h-full">
                  <div className="space-y-2.5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 shrink-0">
                      <h5 className="text-sm sm:text-base font-black text-slate-900 uppercase font-display flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-600 rounded-none" />
                        Minimum Age Requirement Matrix
                      </h5>
                      <span className="text-xs font-bold text-red-600 uppercase">Strict Adherence</span>
                    </div>

                    {/* Directive Note */}
                    <div className="p-3 bg-amber-50/70 border-l-4 border-amber-500 text-xs text-slate-800 leading-relaxed shrink-0">
                      <p>
                        Age is calculated strictly as of <strong>1 Baishakh</strong> of the admission year. Candidates below the minimum age are not eligible.
                      </p>
                    </div>

                    {/* Age Table */}
                    <div className="overflow-x-auto flex-1 flex flex-col">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-slate-900 text-white text-xs font-black uppercase tracking-wider font-display">
                            <th className="py-2 px-3">CLASS</th>
                            <th className="py-2 px-3">MINIMUM AGE</th>
                            <th className="py-2 px-3 text-right">STAGE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {ageTableData.map((item, idx) => (
                            <tr 
                              key={idx} 
                              className={`hover:bg-red-50/40 transition-colors ${
                                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                              }`}
                            >
                              <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-2 text-xs sm:text-[13px]">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-none" />
                                {item.grade}
                              </td>
                              <td className="py-2 px-3 font-bold text-red-600 text-xs sm:text-[13px]">
                                {item.minAge} <span className="text-[10.5px] font-normal text-slate-500">({item.ageDetail})</span>
                              </td>
                              <td className="py-2 px-3 text-right text-xs font-semibold text-slate-500">
                                {item.note}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Part: Submission of Birth Certificates (LKG to UKG) (5 cols) */}
                <div className="xl:col-span-5 bg-slate-50 p-4 sm:p-4.5 border border-slate-200 flex flex-col justify-between space-y-3 h-full">
                  <div className="space-y-3">
                    <div className="pb-2 border-b border-slate-200">
                      <h5 className="text-sm sm:text-base font-black text-slate-900 uppercase font-display flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-none" />
                        Submission of Birth Certificates
                      </h5>
                      <p className="text-xs text-slate-600 mt-1">
                        Mandatory for admission to classes <strong>LKG to UKG</strong>.
                      </p>
                    </div>

                    <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                      Acceptable Authority:
                    </p>

                    <div className="p-2.5 bg-white border border-slate-200 flex items-start gap-2 shadow-2xs">
                      <span className="w-4 h-4 bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      <p className="text-xs text-slate-800 leading-relaxed">
                        Official Birth Certificate from: <strong>Registrar of Nagarpalika / Gaunpalika / Panchayath / Nagar Nigam</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Strict NB Warning Box */}
                  <div className="p-3 bg-red-50 border-l-4 border-red-600 text-slate-800 space-y-1.5">
                    <p className="font-black text-red-700 uppercase tracking-wider text-xs sm:text-sm flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      Important Notice (NB):
                    </p>
                    <ul className="space-y-1 pl-3.5 list-disc text-xs text-slate-700 leading-relaxed">
                      <li>
                        <strong>a)</strong> Date of Birth once registered <strong>cannot be altered under any circumstances</strong>.
                      </li>
                      <li>
                        <strong>b)</strong> No other certificate type will be accepted.
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE (5 cols): 2. ONLINE REGISTRATION & CALLBACK       */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col h-full space-y-4 justify-between">
            
            {/* Right Header Title Bar */}
            <div className="bg-red-600 text-white p-3.5 sm:p-4 rounded-none border-l-4 border-amber-400 flex items-center justify-between shadow-xs shrink-0">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-white" />
                <h3 className="text-sm sm:text-base font-black tracking-wider uppercase font-display">
                  2. Online Registration Form
                </h3>
              </div>
              <span className="px-2.5 py-0.5 bg-white text-red-600 text-[10px] font-black uppercase tracking-wider">
                Step {currentStep} of 3
              </span>
            </div>

            {/* Form Container Card */}
            <div className="bg-white border border-slate-200 rounded-none p-5 sm:p-6 shadow-md relative overflow-hidden">
              
              {!isSubmitted ? (
                <>
                  {/* Step Progress Bar */}
                  <div className="mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center justify-between max-w-sm mx-auto relative">
                      
                      {/* Step 1 */}
                      <div className="flex flex-col items-center gap-1 z-10">
                        <div className={`w-7 h-7 rounded-none flex items-center justify-center text-xs font-bold transition-all ${
                          currentStep >= 1 ? 'bg-red-600 text-white ring-2 ring-red-500/20' : 'bg-slate-100 text-slate-400 border border-slate-300'
                        }`}>
                          1
                        </div>
                        <span className={`text-[10px] font-bold ${currentStep >= 1 ? 'text-red-600' : 'text-slate-400'}`}>
                          Student
                        </span>
                      </div>

                      <div className={`flex-1 h-0.5 mx-2 ${currentStep >= 2 ? 'bg-red-500' : 'bg-slate-200'}`} />

                      {/* Step 2 */}
                      <div className="flex flex-col items-center gap-1 z-10">
                        <div className={`w-7 h-7 rounded-none flex items-center justify-center text-xs font-bold transition-all ${
                          currentStep >= 2 ? 'bg-red-600 text-white ring-2 ring-red-500/20' : 'bg-slate-100 text-slate-400 border border-slate-300'
                        }`}>
                          2
                        </div>
                        <span className={`text-[10px] font-bold ${currentStep >= 2 ? 'text-red-600' : 'text-slate-400'}`}>
                          Guardian
                        </span>
                      </div>

                      <div className={`flex-1 h-0.5 mx-2 ${currentStep >= 3 ? 'bg-red-500' : 'bg-slate-200'}`} />

                      {/* Step 3 */}
                      <div className="flex flex-col items-center gap-1 z-10">
                        <div className={`w-7 h-7 rounded-none flex items-center justify-center text-xs font-bold transition-all ${
                          currentStep === 3 ? 'bg-red-600 text-white ring-2 ring-red-500/20' : 'bg-slate-100 text-slate-400 border border-slate-300'
                        }`}>
                          3
                        </div>
                        <span className={`text-[10px] font-bold ${currentStep === 3 ? 'text-red-600' : 'text-slate-400'}`}>
                          Submit
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Form Body */}
                  <form onSubmit={handleNextStep} className="space-y-4">
                    
                    {/* STEP 1: Student Details */}
                    {currentStep === 1 && (
                      <div className="space-y-3.5 animate-fadeIn">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Full Name of Student *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Aryan Kumar Sah"
                            value={formData.studentName}
                            onChange={(e) => handleInputChange('studentName', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs sm:text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Date of Birth *
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.dob}
                              onChange={(e) => handleInputChange('dob', e.target.value)}
                              className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Gender *
                            </label>
                            <select
                              value={formData.gender}
                              onChange={(e) => handleInputChange('gender', e.target.value)}
                              className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs bg-white"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Applying for Grade *
                          </label>
                          <select
                            value={formData.gradeApplying}
                            onChange={(e) => handleInputChange('gradeApplying', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs sm:text-sm bg-white font-medium"
                          >
                            <option value="Nursery">Nursery (Min 2.5 Years)</option>
                            <option value="LKG">LKG (Min 3.5 Years)</option>
                            <option value="UKG">UKG (Min 4.5 Years)</option>
                            <option value="Class 1">Class 1 (Min 5.5 Years)</option>
                            <option value="Class 2">Class 2 (Min 6.5 Years)</option>
                            <option value="Class 3">Class 3 (Min 7.5 Years)</option>
                            <option value="Class 4">Class 4 (Min 8.5 Years)</option>
                            <option value="Class 5">Class 5 (Min 9.5 Years)</option>
                            <option value="Class 6">Class 6 (Min 10.5 Years)</option>
                            <option value="Class 7">Class 7 (Min 11.5 Years)</option>
                            <option value="Grade 8 (BLE Preparation)">Grade 8 (BLE Preparation)</option>
                            <option value="Grade 9 (Secondary SEE Program)">Grade 9 (Secondary SEE Program)</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Previous School (If Transfer)
                            </label>
                            <input
                              type="text"
                              placeholder="English Medium School"
                              value={formData.prevSchool}
                              onChange={(e) => handleInputChange('prevSchool', e.target.value)}
                              className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Previous GPA / Score
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              min="2.0"
                              max="4.0"
                              placeholder="e.g. 3.85"
                              value={formData.prevGpa}
                              onChange={(e) => handleInputChange('prevGpa', e.target.value)}
                              className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Guardian Contact */}
                    {currentStep === 2 && (
                      <div className="space-y-3.5 animate-fadeIn">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Guardian Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Kumar Sah"
                            value={formData.guardianName}
                            onChange={(e) => handleInputChange('guardianName', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs sm:text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Relationship *
                            </label>
                            <select
                              value={formData.guardianRelation}
                              onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
                              className="w-full px-3.5 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs bg-white"
                            >
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Guardian">Local Guardian</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                              Mobile Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+977 9800000000"
                              value={formData.guardianPhone}
                              onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                              className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            placeholder="parent@example.com"
                            value={formData.guardianEmail}
                            onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs sm:text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Scholarship / Concession Consideration
                          </label>
                          <select
                            value={formData.scholarshipCategory}
                            onChange={(e) => handleInputChange('scholarshipCategory', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs bg-white"
                          >
                            <option value="Merit Scholarship (GPA 3.6+ / BLE Topper)">Merit Scholarship (High Academic GPA)</option>
                            <option value="Sibling Concession (Enrolled in LFSS)">Sibling Concession</option>
                            <option value="Underprivileged / Madhesh Quota">Underprivileged / Madhesh Quota</option>
                            <option value="None / General Admission">None (General Admission)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Review & Submit */}
                    {currentStep === 3 && (
                      <div className="space-y-3.5 animate-fadeIn">
                        <div className="bg-slate-50 border border-slate-200 p-3.5 text-xs space-y-1.5">
                          <p><strong>Applicant:</strong> {formData.studentName || 'Not specified'}</p>
                          <p><strong>Date of Birth:</strong> {formData.dob || 'Not specified'}</p>
                          <p><strong>Class Applying:</strong> {formData.gradeApplying}</p>
                          <p><strong>Guardian:</strong> {formData.guardianName} ({formData.guardianRelation}) - {formData.guardianPhone}</p>
                        </div>

                        <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
                          <p className="font-bold flex items-center gap-1 text-red-700 text-xs sm:text-sm">
                            <BadgePercent className="w-3.5 h-3.5" />
                            <span>Preliminary Merit Evaluation:</span>
                          </p>
                          <p className="text-red-800 font-bold">
                            {calculateEstimatedScholarship(formData.prevGpa)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="px-3.5 py-2 rounded-none text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-none text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-500/25 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{currentStep === 3 ? 'Confirm & Register' : 'Continue'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </form>
                </>
              ) : (
                /* SUCCESS RECEIPT STATE */
                <div className="py-6 text-center space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-none mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-slate-900 font-display">
                      Application Successfully Registered!
                    </h4>
                    <p className="text-xs text-slate-600">
                      Application ID: <span className="font-mono font-bold text-red-600">{applicationId}</span>
                    </p>
                  </div>

                  {/* Printable Slip Preview */}
                  <div className="p-4 border border-slate-200 bg-slate-50 text-left space-y-2 shadow-inner text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <img src={logoImg} alt="LFSS Logo" className="w-7 h-7 object-contain" />
                        <div>
                          <p className="font-bold text-xs text-slate-900">Little Flower Sec. School</p>
                          <p className="text-[10px] text-slate-500">Parwanipur, Parsa (Estd. 2005)</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9.5px] font-extrabold border border-emerald-200">
                        REGISTERED
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-700 text-[11px] font-medium">
                      <p><strong>Candidate:</strong> {formData.studentName || 'Aryan Kumar Sah'}</p>
                      <p><strong>Class Applied:</strong> {formData.gradeApplying}</p>
                      <p><strong>Campus Desk:</strong> Birgunj-21, Parwanipur, Parsa</p>
                      <p><strong>Prospectus Fee:</strong> Rs. 300/- (Payable at desk)</p>
                      <p><strong>Merit Concession:</strong> <span className="text-red-600 font-bold">{calculateEstimatedScholarship(formData.prevGpa)}</span></p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-2.5 pt-2">
                    <button
                      onClick={handlePrintCertificate}
                      className="px-4 py-2 rounded-none text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 shadow-md shadow-red-500/25 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Admission Slip</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setCurrentStep(1);
                      }}
                      className="px-4 py-2 rounded-none text-xs font-bold bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
                    >
                      New Form
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* 3. REQUEST AN ADMISSION CALLBACK FORM */}
            <div className="bg-white border border-slate-200 rounded-none p-4.5 sm:p-5 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-red-50 text-red-600 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-black tracking-wider uppercase font-display text-slate-900">
                      Request an Admission Callback
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Provide your contact info and our school will call you back.
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase border border-emerald-200 hidden sm:inline-block">
                  Quick Callback
                </span>
              </div>

              {!callbackSubmitted ? (
                <form onSubmit={handleCallbackSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 uppercase mb-0.5">
                          Parent / Guardian Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar Sah"
                          value={callbackData.parentName}
                          onChange={(e) => setCallbackData(prev => ({ ...prev, parentName: e.target.value }))}
                          className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 uppercase mb-0.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+977 9800000000"
                          value={callbackData.phone}
                          onChange={(e) => setCallbackData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 uppercase mb-0.5">
                          Child&apos;s Target Class *
                        </label>
                        <select
                          value={callbackData.grade}
                          onChange={(e) => setCallbackData(prev => ({ ...prev, grade: e.target.value }))}
                          className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs bg-white"
                        >
                          <option value="Nursery">Nursery</option>
                          <option value="LKG">LKG</option>
                          <option value="UKG">UKG</option>
                          <option value="Class 1">Class 1</option>
                          <option value="Class 2">Class 2</option>
                          <option value="Class 3">Class 3</option>
                          <option value="Class 4">Class 4</option>
                          <option value="Class 5">Class 5</option>
                          <option value="Class 6">Class 6</option>
                          <option value="Class 7">Class 7</option>
                          <option value="Grade 8 (BLE)">Grade 8 (BLE)</option>
                          <option value="Grade 9 (SEE)">Grade 9 (SEE)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 uppercase mb-0.5">
                          Preferred Callback Time *
                        </label>
                        <select
                          value={callbackData.preferredTime}
                          onChange={(e) => setCallbackData(prev => ({ ...prev, preferredTime: e.target.value }))}
                          className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs bg-white"
                        >
                          <option value="Morning (08:30 AM - 11:30 AM)">Morning (08:30 AM - 11:30 AM)</option>
                          <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                          <option value="Evening (03:00 PM - 05:30 PM)">Evening (03:00 PM - 05:30 PM)</option>
                          <option value="Anytime during School Hours">Anytime during School Hours</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 uppercase mb-0.5">
                        Query or Questions (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Inquiring about bus routes, fee structure, hostel, or merit concessions..."
                        value={callbackData.query}
                        onChange={(e) => setCallbackData(prev => ({ ...prev, query: e.target.value }))}
                        className="w-full px-3 py-2 rounded-none border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-none font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>Request Admission Callback</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-fadeIn">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 font-display">
                    Callback Request Registered!
                  </h4>
                  <p className="text-xs text-slate-600">
                    Thank you, <strong>{callbackData.parentName}</strong>. Our school admission counselor will call you at <strong className="text-emerald-700">{callbackData.phone}</strong> during <strong>{callbackData.preferredTime}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCallbackSubmitted(false);
                      setCallbackData({ parentName: '', phone: '', grade: 'Nursery', preferredTime: 'Morning (08:30 AM - 11:30 AM)', query: '' });
                    }}
                    className="mt-2 text-[11px] font-bold text-red-600 underline hover:text-red-800 cursor-pointer"
                  >
                    Submit Another Callback Request
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
