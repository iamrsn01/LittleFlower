import React, { useState } from 'react';
import { 
  Users, 
  Mail, 
  Sparkles
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';

export const FacultySection: React.FC = () => {
  const { facultyMembers } = useSchoolData();
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = [
    'All',
    'Science & STEM',
    'Mathematics',
    'Computer & AI',
    'Languages & Literature',
    'Social Sciences',
    'Arts & Physical Ed'
  ];

  const filteredFaculty = selectedDept === 'All'
    ? facultyMembers
    : facultyMembers.filter(f => f.department === selectedDept);

  return (
    <section id="faculty" className="py-16 sm:py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs mb-3">
            <Users className="w-3.5 h-3.5 text-red-600" />
            <span>Academic Mentors &amp; Staff</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Our Team &amp; Faculty
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Meet the dedicated educators, mentors, and departmental leaders guiding students at Little Flower Secondary School.
          </p>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-red-600 text-white shadow-sm shadow-red-500/20 border border-red-600'
                  : 'bg-white text-slate-700 hover:text-red-600 hover:bg-red-50/50 border border-slate-200 shadow-xs'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Simplified Team Grid: Name, Department, Designation, Email */}
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 hover:border-red-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Avatar & Department Tag */}
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {member.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-600 font-bold text-base">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 truncate max-w-full">
                        {member.department}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate mt-1" title={member.name}>
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium truncate mt-0.5" title={member.role}>
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email (Basic detail) */}
                <div className="pt-3 border-t border-slate-100 mt-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 transition-colors font-medium truncate w-full group/link"
                    title={`Email ${member.name}: ${member.email}`}
                  >
                    <Mail className="w-3.5 h-3.5 text-red-500 shrink-0 group-hover/link:scale-110 transition-transform" />
                    <span className="truncate">{member.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto p-6 space-y-2">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No faculty members found</p>
            <p className="text-xs text-slate-500">There are no faculty listed under "{selectedDept}" yet.</p>
          </div>
        )}

      </div>
    </section>
  );
};
