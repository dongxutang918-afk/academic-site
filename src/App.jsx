import React, { useState } from 'react';
import { 
  Mail, MapPin, ChevronLeft, ChevronRight, ArrowUpRight
} from 'lucide-react';

// 为了在当前预览环境中正常显示，暂时使用线上链接代替本地 import。
// 当你在本地电脑部署时，你可以把下面这行删掉，重新换回：
import avatarImg from './assets/avatar.jpg';
import pub1Img from './assets/chi25.jpg';
import pub2Img from './assets/sensys24.jpg';

import chi1 from './assets/chi/1.jpg';
import chi2 from './assets/chi/2.jpg';
import chi3 from './assets/chi/3.jpg';
import sensys1 from './assets/sensys/1.jpg';
import sensys2 from './assets/sensys/2.jpg';
import sensys3 from './assets/sensys/3.jpg';
import sensys4 from './assets/sensys/4.jpg';

import CHFC1 from './assets/chfc/1.jpg';
import CHFC2 from './assets/chfc/2.jpg';
import CHFC3 from './assets/chfc/3.jpg';
import CHFC4 from './assets/chfc/4.jpg';
import CHFC5 from './assets/chfc/5.jpg';

// --- 自定义 Github 图标 (完美避开 lucide-react 的打包报错) ---
const GithubIcon = ({ size = 18, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.5 3.3 6.6 6.5 7a4.8 4.8 0 0 0-1 3.02V22"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

// --- 数据配置区 ---
const PROFILE = {
  name: "Dongxu Tang",
  chineseName: "唐东旭",
  title: "M.S. Student in Computer Technology",
  institution: "Harbin Institute of Technology, Shenzhen (HITSZ)",
  advisor: "Prof. Yitian Shao",
  email: "dongxutang2000@outlook.com",
  location: "Shenzhen, China",
  github: "https://github.com/dongxutang918-afk",
  scholar: "#", // 替换为你的谷歌学术链接
  interests: ["Neuromorphic Decoding", "Tactile Interfaces", "Wearable Sensing", "Deep learning for Human-Machine Interaction"]
};

const NEWS = [
  { date: "May 2026", content: "My poster was shortlisted for the Excellent Poster Award! And I was invited to deliver a Young Forum presentation at the 5th China Conference on Force-Haptic Technology and Applications." },
  { date: "Apr. 2026", content: "Awarded the fully funded overseas scholarship by Harbin Institute of Technology." },
  { date: "Apr. 2025", content: "Attended CHI 2025 in Yokohama, Japan to present VibWalk." },
  { date: "Jan. 2025", content: "One paper (VibWalk) was accepted by CHI 2025!" },
  { date: "Nov. 2024", content: "Presented a demo on foot-wearable sensing at SenSys 2024 in Hangzhou." },
  { date: "Sep. 2024", content: "Started my Master's journey at HIT Shenzhen." }
];

const PUBLICATIONS = [
  {
    title: "SkinKin: A Wearable Skin Mechanosensation Dataset for Continuous Lower-Limb Kinematics During Cyclic and Non-Cyclic Activities",
    authors: "Dongxu Tang, Shih-Ying-Lei, J. Liao, and Y. Shao",
    venue: "IEEE Transactions on Neural Systems and Rehabilitation Engineering (TNSRE)",
    status: "In Preparation, 2026",
    links: { pdf: "#", code: "#", Dataset: "#"}
  },
  
  {
    title: "Neuromorphic Decoding of Lower-Limb Kinematics from Skin Mechanosensation for Proprioceptive Compensation",
    authors: "Dongxu Tang, Shih-Ying-Lei, and Y. Shao",
    venue: "IEEE Transactions on Neural Systems and Rehabilitation Engineering (TNSRE)",
    status: "In Preparation, 2026",
    links: { pdf: "#", code: "#" }
  },

  {
    title: "VibWalk: Mapping Lower-limb Haptic Experiences of Everyday Walking",
    authors: "Shih-Ying-Lei, Dongxu Tang, W. Hu, S. H. Yoon, and Y. Shao",
    venue: "Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems (CHI '25)",
    status: "2025",
    image: pub1Img,
    links: { Link: "https://doi.org/10.1145/3706598.3714254", Dataset: "https://huggingface.co/datasets/Tdongxu/Ground_material_classification/tree/main" }
  },
  {
    title: "Demo Abstract: A Foot-Wearable Acoustic Sensing System for Capturing Ground Information",
    authors: "Dongxu Tang*, Shih-Ying-Lei*, and Y. Shao",
    venue: "ACM Conference on Embedded Networked Sensor Systems (SenSys '24)",
    status: "2024",
    image: pub2Img,
    links: { Link: "https://doi.org/10.1145/3666025.3699387" }
  }
];

// ！！！支持多图的活动画廊配置区 ！！！
const GALLERY = [
  {
    images: [
      CHFC1,
      CHFC2,
      CHFC3,
      CHFC4,
      CHFC5,
    ],
    caption: "Invited Young Forum Presentation at China Force-Haptics 2026, Beijing."
  },
  {
    images: [
      chi1,
      chi2,
      chi3
    ],
    caption: "Attended CHI 2025, Yokohama."
  },
  {
    images: [
      sensys1,
      sensys2,
      sensys3,
      sensys4
    ],
    caption: "Oral & Demo Presentation in SenSys 2024, Hangzhou."
  }
];

// --- 子组件 ---
const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6 mt-12 text-gray-800">
    {children}
  </h2>
);

const PubItem = ({ pub }) => (
  <div className="mb-8 p-4 -mx-4 rounded-2xl transition-all duration-300 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-slate-100 flex flex-col md:flex-row gap-6 items-start group">
    <div className="w-full md:w-[28%] shrink-0">
      <div className={`w-full aspect-[3/2] rounded-lg flex items-center justify-center p-2 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] ${
        pub.image 
          ? "bg-slate-50 border border-slate-200 shadow-sm" 
          : "bg-slate-50/50 border-2 border-dashed border-slate-200"
      }`}>
        {pub.image ? (
          <img 
            src={pub.image} 
            alt="Publication Teaser" 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        ) : (
          <div className="flex flex-col items-center text-slate-400 opacity-70">
            {/* 使用一个简单的 SVG 文件图标占位 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">In Preparation</span>
          </div>
        )}
      </div>
    </div>
    <div className="flex-1">
      <div className="font-bold text-gray-900 text-lg leading-snug group-hover:text-blue-600 transition-colors duration-300">{pub.title}</div>
      <div className="text-gray-700 mt-1">
        {pub.authors.split(/(Dongxu Tang\*?)/g).map((part, i) => 
          part.startsWith('Dongxu Tang') ? (
            <strong key={i} className="font-bold text-gray-900 bg-blue-50 px-1 rounded">{part}</strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
      <div className="text-gray-500 italic mt-1">
        {pub.venue}, {pub.status}
      </div>
      <div className="flex flex-wrap gap-2.5 mt-4">
        {Object.entries(pub.links).map(([key, url]) => (
          <a key={key} href={url} target="_blank" rel="noreferrer" className="group/btn flex items-center gap-1.5 text-slate-600 hover:text-blue-600 text-xs font-semibold border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 transition-all duration-300 shadow-sm uppercase tracking-wide">
            {key}
            <ArrowUpRight size={12} className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

// 支持多图轮播的画廊卡片组件
const GalleryItem = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = item.images.length > 1;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % item.images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-sm border border-slate-100 bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      <div className="w-full aspect-[4/3] relative">
        <img 
          src={item.images[currentIndex]} 
          alt={item.caption} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        
        {/* 多图专属：左右切换箭头 */}
        {hasMultiple && (
          <>
            <button 
              onClick={handlePrev} 
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-md transform -translate-x-4 group-hover:translate-x-0 border border-white/10"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-md transform translate-x-4 group-hover:translate-x-0 border border-white/10"
            >
              <ChevronRight size={16} />
            </button>
            
            {/* 多图专属：图片数量指示小圆点 */}
            <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              {item.images.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-4 shadow-sm' : 'bg-white/40'}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 悬浮黑色遮罩与文字描述 (四分之一高度) */}
      {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 flex flex-col justify-end backdrop-blur-[2px]">
        <p className="text-white text-sm font-medium translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {item.caption}
        </p>
      </div> */}
      {/* 悬浮黑色遮罩与文字描述 (仅紧贴文字高度) */}
      {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent px-4 pb-3 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 flex flex-col justify-end backdrop-blur-[2px]">
        <p className="text-white text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out text-shadow-sm">
          {item.caption}
        </p>
      </div> */}
      {/* 悬浮黑色遮罩与文字描述 (极简渐变，无毛玻璃) */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
        <p className="text-white text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-md">
          {item.caption}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-100">
      {/* 调整了容器的间距和响应式比例 */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16">
        
        {/* 左侧栏 - 个人信息（略微加宽至 28%） */}
        <aside className="md:w-[32%] lg:w-[28%] shrink-0">
          <div className="sticky top-12 bg-slate-50 p-6 md:p-7 lg:p-8 rounded-3xl border border-slate-100 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-36 md:w-44 rounded-2xl overflow-hidden shadow-sm mb-6 border-4 border-white bg-white">
              <img 
                src={avatarImg}
                alt={PROFILE.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{PROFILE.name}</h1>
            <p className="text-lg text-gray-600 mb-6 font-medium">{PROFILE.chineseName}</p>
            
            {/* 重点修改：字号缩小至 text-sm/15px，加入 tracking-tight 收紧字距 */}
            <div className="space-y-3 mb-8 w-full text-sm lg:text-[15px]">
              <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
                <Mail size={16} className="text-gray-400 shrink-0" />
                {/* 重点修改：保留不换行，且加入超出隐藏的兜底保护 */}
                <a href={`mailto:${PROFILE.email}`} className="hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis tracking-tight" title={PROFILE.email}>
                  {PROFILE.email}
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <span className="tracking-tight">{PROFILE.location}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
                <GithubIcon size={16} className="text-gray-400 shrink-0" />
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-blue-600 tracking-tight">GitHub</a>
              </div>
            </div>

            <div className="w-full">
              <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Research Interests</h3>
              <ul className="space-y-2">
                {PROFILE.interests.map(item => (
                  <li key={item} className="text-gray-600 flex items-start gap-2 text-sm leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* 右侧栏 - 主内容（对应响应调整为 72%） */}
        <main className="md:w-[68%] lg:w-[72%] flex-1">
          <section>
            <p className="text-lg leading-relaxed text-gray-700">
              I am a Master’s student at <strong>{PROFILE.institution}</strong>, advised by <strong>{PROFILE.advisor}</strong>. 
              My research focuses on <strong>wearable sensing</strong>, <strong>neuromorphic signal representation</strong>, 
              and <strong>deep learning for human sensing systems</strong>.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              I work on multimodal biosignals and tactile information, with recent projects on 
              <strong> neuromorphic decoding of lower-limb kinematics</strong>, 
              wearable haptic sensing, and biomimetic electrotactile feedback. 
              I am broadly interested in human-machine interaction, rehabilitation engineering, and wearable devices.
            </p>
          </section>

          {/* News Section */}
          <section>
            <SectionTitle>News</SectionTitle>
            <ul className="space-y-4">
              {NEWS.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="font-bold text-gray-400 whitespace-nowrap min-w-[80px]">[{item.date}]</span>
                  <span className="text-gray-700">{item.content}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Publications Section */}
          <section id="publications">
            <SectionTitle>Publications</SectionTitle>
            <div>
              {PUBLICATIONS.map((pub, idx) => (
                <PubItem key={idx} pub={pub} />
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-900">Harbin Institute of Technology, Shenzhen</div>
                  <div className="text-gray-600">M.S. in Computer Technology</div>
                </div>
                <div className="text-gray-500 font-medium shrink-0 ml-4">2024.9 - Present</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-900">Dalian Maritime University</div>
                  <div className="text-gray-600">B.S. in Data Science and Big Data</div>
                </div>
                <div className="text-gray-500 font-medium shrink-0 ml-4">2019.9 - 2023.6</div>
              </div>
            </div>
          </section>

          {/* Honors Section */}
          <section>
            <SectionTitle>Honors & Awards</SectionTitle>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>First-Class Master's Scholarship, HIT Shenzhen, 2025</li>
              <li>Second-Class Master's Scholarship, HIT Shenzhen, 2024</li>
              <li>Outstanding Graduate of Liaoning Province, 2023</li>
              <li>Outstanding Graduation Thesis (2.28%), 2023</li>
            </ul>
          </section>

          {/* 参会照片与活动画廊区域 */}
          <section>
            <SectionTitle>Activities & Gallery</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GALLERY.map((item, idx) => (
                <GalleryItem key={idx} item={item} />
              ))}
            </div>
          </section>

          <footer className="mt-20 pt-8 border-t border-gray-100 text-gray-400 text-sm">
            © {new Date().getFullYear()} Dongxu Tang. Built with React & Tailwind.
          </footer>
        </main>
      </div>
    </div>
  );
}