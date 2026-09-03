import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  HelpCircle, 
  ChevronDown
} from 'lucide-react';
import { testimonialsList, schoolFAQs } from '../data/schoolData';

export const TestimonialsSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-rose-50/25 to-white relative border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Side-by-Side 2-Column Equal Width Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDE: TRUSTED BY GENERATIONS OF FAMILIES (50% WIDTH) */}
          {/* ======================================================== */}
          <div className="space-y-6">
            
            {/* Left Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-red-800 text-xs font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5 text-red-700" />
                <span>Parent &amp; Alumni Voice</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display">
                Trusted by Generations of Families
              </h2>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                Read what parents, guardians, and alumni across Birgunj, Parwanipur, and Parsa say about their journey at Little Flower Secondary School.
              </p>
            </div>

            {/* Testimonials Stack */}
            <div className="space-y-4 pt-2">
              {testimonialsList.map((t) => (
                <div
                  key={t.id}
                  className="bg-white border-2 border-rose-100/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-red-300 transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Rating Stars & Highlight Pill */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-red-800 border border-rose-200">
                        {t.highlight}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-3 border-t border-rose-100/80 flex items-center gap-3">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-red-700 shadow-xs"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE: ANSWERS TO COMMON QUESTIONS (50% WIDTH)      */}
          {/* ======================================================== */}
          <div className="space-y-6">
            
            {/* Right Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-red-800 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-red-700" />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display">
                Answers to Common Questions
              </h3>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                Find clear information regarding admissions, age eligibility, bus routes, curriculum, and school regulations.
              </p>
            </div>

            {/* FAQs Accordion Stack */}
            <div className="space-y-3 pt-2">
              {schoolFAQs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border-2 border-rose-100/90 rounded-2xl overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-rose-50/50"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {faq.question}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-red-700 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-4.5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-rose-100 font-medium animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
