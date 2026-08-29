import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  Sparkles, 
  CheckCircle2, 
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
    <section className="py-24 bg-white relative border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-red-800 text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5 text-red-700" />
            <span>Parent & Alumni Voice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Trusted by Generations of Families
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Read what parents, guardians, and alumni across Birgunj, Parwanipur, and Parsa say about their journey at Little Flower Secondary School.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {testimonialsList.map((t) => (
            <div
              key={t.id}
              className="bg-white border-2 border-rose-100 rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-red-400 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating Stars & Highlight Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-red-800 border border-rose-200">
                    {t.highlight}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                  "{t.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-rose-100 flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-red-700 shadow-xs"
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

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-800 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-red-700" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Answers to Common Questions
            </h3>
          </div>

          <div className="space-y-3 pt-4">
            {schoolFAQs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-rose-100 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-rose-50/50"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-red-700 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-rose-100 font-medium animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
