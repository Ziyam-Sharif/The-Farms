import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Shield, ArrowRight, Sprout, Building, Phone, Mail } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  urduRole: string;
  img: string;
  objectPos: string;
  bio: string[];
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'huzaifa',
    name: 'Huzaifa Baig',
    role: 'Chief Executive Officer',
    urduRole: 'ورثہ',
    img: '/farms-images/team-huzaifa.jpg',
    objectPos: '50% 28%',
    bio: [
      "Huzaifa Baig is a young Pakistani entrepreneur, spices trader, turmeric supply chain expert and quality assurance specialist working to bring greater professionalism, transparency and quality to Pakistan's spice industry. As Chief Executive Officer of The Farm's, he represents a new generation of business leaders who believe agricultural products should reach consumers carrying a real commitment to quality, responsible sourcing and customer trust.",
      "Born on 11 September 2001, he completed his Matriculation in Arts privately in Islamabad, his Intermediate in Arts at National College, Karachi, and a Bachelor's degree in International Relations from the University of Karachi. Although his academic background sits in the social sciences, his professional interests have grown firmly around agriculture, spices, supply chains, product quality and entrepreneurship.",
      "His specialisation is the turmeric supply chain. Turmeric, coriander and red chilli are everyday essentials in Pakistani kitchens, yet their journey from field to packet passes through sourcing, cleaning, processing, storage, packaging and quality control — every stage capable of changing the final product. Huzaifa's focus is on looking beyond the finished packet and treating that entire journey as one system.",
      "For him, quality assurance is not a marketing statement but a responsibility that begins long before a product reaches the shelf: raw material selection, cleanliness, batch-to-batch consistency, proper storage, traceability and continuous improvement in operating standards. His long-term vision for The Farm's is simple — quality should become a habit, not a slogan, and a food business must earn consumer confidence repeatedly, not just once.",
    ],
  },
  {
    id: 'owais',
    name: 'Muhammad Rana Owais',
    role: 'Operations Director',
    urduRole: 'آپریشنز',
    img: '/farms-images/team-owais-face.jpg',
    objectPos: '46% 34%',
    bio: [
      "Muhammad Rana Owais directs processing operations and cold-milling technology at The Farm's estate. With deep experience in agricultural milling machinery, he ensures every batch of turmeric, coriander, and red chilli is milled strictly below 35°C.",
      "Under his supervision, raw crops harvested from Changa Manga, Kunri, and Naushahro Feroze undergo multi-stage cleaning, solar drying, and low-temperature grinding to protect volatile aromatic oils and natural color.",
      "He maintains strict batch logging and quality standards to guarantee zero fillers, husk, or synthetic dyes enter the processing line.",
    ],
  },
  {
    id: 'saad',
    name: 'Saad Sharif',
    role: 'General Manager',
    urduRole: 'انتظام',
    img: '/farms-images/team-saad-sq.jpg',
    objectPos: '50% 40%',
    bio: [
      "Saad Sharif manages nationwide logistics, direct farm distribution, and corporate retail partnerships across 40+ Pakistani cities including Karachi, Lahore, Islamabad, and Rawalpindi.",
      "He overlooks daily fulfillment, vacuum-sealed packaging integrity, and direct dispatch pipelines from farm storage to household kitchens.",
      "His focus ensures order dispatch within 24 hours while maintaining direct farm freshness and customer care transparency.",
    ],
  },
  {
    id: 'shabih',
    name: 'Syed Shabih ul Hassan',
    role: 'Head of Marketing',
    urduRole: 'مارکیٹنگ',
    img: '/farms-images/team-shabih-sq.jpg',
    objectPos: '50% 35%',
    bio: [
      "Syed Shabih ul Hassan leads brand communications, marketing, and direct customer engagement for The Farm's.",
      "He believes in transparent storytelling — educating Pakistani families about the difference between industrial high-RPM roasted spices and traditional cold-milled heirloom spices.",
      "He oversees community feedback, culinary chef partnerships, and authentic harvest updates.",
    ],
  },
  {
    id: 'riaz',
    name: 'Syed Riaz Ahmed',
    role: 'Head of Sales',
    urduRole: 'سیلز',
    img: '/farms-images/team-riaz.png',
    objectPos: '50% 22%',
    bio: [
      "Syed Riaz Ahmed commands wholesale distribution and key trade relationships in Jodiya Bazar and major commercial hubs.",
      "Having managed the supply of over 60% of Karachi's turmeric trade over the past five years, he brings unmatched commercial expertise to domestic and international sales.",
      "He now leads direct-to-kitchen retail distribution, making export-grade pure spices accessible to households nationwide.",
    ],
  },
];

export const AboutPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember>(TEAM_MEMBERS[0]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-24">
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-turmeric-500/10 via-turmeric-500/05 to-transparent border-b border-turmeric-500/15 py-12 sm:py-16 lg:py-24 text-center px-4 relative overflow-hidden">
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-turmeric-500/10 border border-turmeric-500/30 text-xs font-bold text-turmeric-500">
            <span className="font-serif text-sm">ورثہ</span> • Our Story
          </div>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-bold text-charcoal dark:text-paper tracking-tight leading-tight">
            The people behind the purity
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            A family-run team of farmers, traders and food people. Select a portrait to read their story.
          </p>
        </div>
      </section>

      {/* Main Team Showcase Grid */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Portrait Selectors */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-paper">Meet the team</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Select a portrait to read their story.</p>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4">
              {TEAM_MEMBERS.map((member) => {
                const isSelected = member.id === selectedMember.id;
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className={`cursor-pointer flex flex-col items-center rounded-2xl p-3 sm:p-4 text-center transition-all duration-300 border ${
                      isSelected
                        ? 'bg-turmeric-500/15 border-turmeric-500 shadow-turmeric-md scale-102'
                        : 'bg-paper dark:bg-slate-900 border-turmeric-500/20 hover:border-turmeric-500/50'
                    }`}
                  >
                    <div className="relative">
                      <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-turmeric-500 via-amber-400 to-chilli-500 blur-xs transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'
                      }`} />
                      <img
                        src={member.img}
                        alt={member.name}
                        style={{ objectPosition: member.objectPos }}
                        className={`relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 ${
                          isSelected ? 'border-turmeric-500' : 'border-paper dark:border-slate-900'
                        }`}
                      />
                    </div>
                    <span className="mt-2.5 sm:mt-3 font-serif font-bold text-xs sm:text-sm text-charcoal dark:text-paper leading-snug">
                      {member.name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-turmeric-600 dark:text-turmeric-400 mt-0.5">
                      {member.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Member Bio Detail */}
          <div className="lg:col-span-7">
            <article className="rounded-3xl glass-panel border border-turmeric-500/25 p-5 sm:p-8 lg:p-10 shadow-turmeric-xl space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-b border-turmeric-500/20 pb-5 sm:pb-6">
                <div className="relative">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-turmeric-500 via-amber-400 to-chilli-500 opacity-80 blur-sm" />
                  <img
                    src={selectedMember.img}
                    alt={selectedMember.name}
                    style={{ objectPosition: selectedMember.objectPos }}
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-paper dark:border-slate-900 shadow-turmeric-md shrink-0"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-serif text-xl sm:text-2xl text-turmeric-500">{selectedMember.urduRole}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Team Profile</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-paper">{selectedMember.name}</h3>
                  <p className="text-xs sm:text-sm font-bold text-turmeric-600 dark:text-turmeric-400">{selectedMember.role}</p>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {selectedMember.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-5 sm:pt-6 border-t border-turmeric-500/20 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/shop"
                  className="btn-shimmer text-midnight font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs flex items-center gap-2 shadow-turmeric-sm cursor-pointer"
                >
                  <span>Shop the Range</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/wholesale"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-turmeric-500/30 text-charcoal dark:text-paper hover:bg-turmeric-500/10 font-bold text-xs transition-colors cursor-pointer"
                >
                  Explore Wholesale
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Story Highlight — We supplied the industry */}
      <section className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="rounded-3xl glass-panel border border-turmeric-500/25 p-6 sm:p-8 lg:p-12 overflow-hidden relative shadow-turmeric-xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-turmeric-500">ورثہ • Our Legacy</span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold text-charcoal dark:text-paper leading-tight">
              We supplied the industry. Now we supply you.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              For years our turmeric went to Jodiya Bazar and to names like Shan, Mehran and Malka Foods — roughly 60% of the turmeric in Karachi passes through our hands. We started The Farm's so the same export-grade spice could reach home kitchens uncut.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-turmeric-600 dark:text-turmeric-400 font-bold text-xs sm:text-sm hover:underline cursor-pointer"
              >
                <span>Explore Pure Cold-Ground Spices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-turmeric-500/30 max-h-80">
            <img
              src="/farms-images/farm-field.jpg"
              alt="Turmeric Harvest Field Changa Manga"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
