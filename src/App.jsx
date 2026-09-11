import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const letterMessage = `Dear Amoy,

I just want you to know how much I appreciate you. Thank you for always being there and for all the little things you do that make me happy. I’m really thankful that I get to have you in my life.

I hope you always remember how special you are to me. I love you, always.

Nagmamahal,
Kakat`;

const Typewriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span style={{ whiteSpace: 'pre-wrap' }}>{currentText}</span>;
};

export default function App() {
  const [kisses, setKisses] = useState([]);
  const [daysLoved, setDaysLoved] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);
  const [isKeepsakeUnlocked, setIsKeepsakeUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isPasscodeError, setIsPasscodeError] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [lovedReasons, setLovedReasons] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLetterRevealed, setIsLetterRevealed] = useState(false);
  const [isArtGalleryOpen, setIsArtGalleryOpen] = useState(false);
  const [activeArtIndex, setActiveArtIndex] = useState(0);
  const [heartAnimId, setHeartAnimId] = useState(0);
  const [igComments, setIgComments] = useState({});
  const [currentComment, setCurrentComment] = useState("");
  const [totalKissesCount, setTotalKissesCount] = useState(0);
  const [kissesPopUpText, setKissesPopUpText] = useState("");
  const audioRef = useRef(null);

  const [igLikes, setIgLikes] = useState(new Set());
  const igPosts = [
    { src: '/images/art1.jpg', caption: "You are the best thing that's ever been mine. 🤍" },
    { src: '/images/art2.jpg', caption: "I could look at you for a long time." },
    { src: '/images/art3.jpg', caption: "You’re honestly so pretty." },
    { src: '/images/art4.jpg', caption: "I hope you know how beautiful you are." },
    { src: '/images/art5.jpg', caption: "Still amazed by how pretty you are." },
    { src: '/images/art6.jpg', caption: "ganda naman ng baby ko na yan" },
    { src: '/images/art7.jpg', caption: "Sometimes I just look at you and think, “grabe ka gwapa.”" },
    { src: '/images/art8.jpg', caption: "gwapa oyyy" },
    { src: '/images/art9.jpg', caption: "gwapa japon kaayo miskan dragon na" },
    { src: '/images/art10.jpg', caption: "Grabe ka gwapa diri." }
  ];

  const toggleIgLike = () => {
    setIgLikes(prev => {
      const next = new Set(prev);
      if (next.has(activeArtIndex)) {
        next.delete(activeArtIndex);
      } else {
        next.add(activeArtIndex);
      }
      return next;
    });
  };

  const handleDoubleTap = () => {
    setIgLikes(prev => {
      const next = new Set(prev);
      next.add(activeArtIndex); // double tap always likes
      return next;
    });
    setHeartAnimId(Date.now());
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!currentComment.trim()) return;
    
    setIgComments(prev => {
      const currentPostComments = prev[activeArtIndex] || [];
      return {
        ...prev,
        [activeArtIndex]: [
          ...currentPostComments,
          { id: Date.now(), user: 'my_isay', text: currentComment.trim() }
        ]
      };
    });
    setCurrentComment("");
  };

  const handleDeleteComment = (commentId) => {
    setIgComments(prev => {
      const currentPostComments = prev[activeArtIndex] || [];
      return {
        ...prev,
        [activeArtIndex]: currentPostComments.filter(c => c.id !== commentId)
      };
    });
  };
  const lyricsContainerRef = useRef(null);

  const toggleLove = (id) => {
    setLovedReasons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const lyricsData = [
    { time: 0, text: "Yeah, yeah, yeah, yeah, yeah, yeah, yeah" },
    { time: 4, text: "Girl, I'll still kiss your head in the morning" },
    { time: 8, text: "Make you breakfast in bed while your yawning" },
    { time: 12, text: "And I don't do everything how you want it" },
    { time: 16, text: "But you can't say your man don't be on it" },
    { time: 20, text: "'Cause I know true love ain't easy (Ain't easy)" },
    { time: 24, text: "Girl, I know it's you 'cause you complete me (Complete me)" },
    { time: 28, text: "And I just don't want you leavin'" },
    { time: 32, text: "Even though I give you reasons" },
    { time: 36, text: "'Cause baby, sometimes I can tell just by your face" },
    { time: 40, text: "This part of us been gone for so long" },
    { time: 44, text: "And I know there's no replacing" },
    { time: 48, text: "What we had going on for so long" },
    { time: 52, text: "But when it hurts, I can make it better" },
    { time: 56, text: "Girl, if it works, it's gon' be forever" },
    { time: 60, text: "We been through the worst, made it through the weather" },
    { time: 64, text: "Our problems and the pain, pain, but love, don't change" },
    { time: 70, text: "Ooh, love, don't change, whoa, oh, yeah" },
    { time: 76, text: "Girl, you still hold me close when you see me" },
    { time: 80, text: "And you still make me know that you need me" },
    { time: 84, text: "And I know sometimes you don't believe me" },
    { time: 88, text: "But you stay on my mind so believe me" },
    { time: 92, text: "'Cause you have my heart, don't break it (Oh, no don't break it girl)" },
    { time: 96, text: "'Cause when times get tough, don't hate me (Oh)" },
    { time: 100, text: "And it all adds up, we gon' make it (Gotta make it)" },
    { time: 104, text: "'Cause when you mad, I know you can't fake it (Oh)" },
    { time: 108, text: "And baby, sometimes I can tell just by your face" },
    { time: 112, text: "This part of us been gone for so long (So long)" },
    { time: 116, text: "And I know there's no replacing" },
    { time: 120, text: "What we had going on for so long" },
    { time: 124, text: "But when it hurts, I can make it better" },
    { time: 128, text: "Girl, if it works, it's gon' be forever" },
    { time: 132, text: "We been through the worst, made it through the weather" },
    { time: 136, text: "Our problems and the pain, pain but love, don't change" },
    { time: 142, text: "Hold me down and I'm gon' do the same for you, girl" },
    { time: 146, text: "I been though a thing for you girl" },
    { time: 150, text: "I want this together even though it gets better or worse" },
    { time: 154, text: "'Cause baby, sometimes I can tell just by your face" },
    { time: 158, text: "This part of us been gone for so long (So long)" },
    { time: 162, text: "And I know there's no replacing" },
    { time: 166, text: "What we had going on for so long" },
    { time: 170, text: "But when it hurts, I can make it better" },
    { time: 174, text: "Girl, if it works, it's gon' be forever" },
    { time: 178, text: "We been through the worst, made it through the weather" },
    { time: 182, text: "Our problems and the pain, pain but love" },
    { time: 186, text: "But when it hurts, I can make it better" },
    { time: 190, text: "Girl, if it works, it's gon' be forever" },
    { time: 194, text: "We been through the worst, made it through the weather" },
    { time: 198, text: "Our problems and the pain, pain, our love, don't change" }
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log(e));
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds) => {
    const m = Math.floor(timeInSeconds / 60) || 0;
    const s = Math.floor(timeInSeconds % 60) || 0;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeLyricIndex = lyricsData.findIndex((lyric, idx) => {
    const nextLyric = lyricsData[idx + 1];
    return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
  });

  useEffect(() => {
    if (activeLyricIndex !== -1 && lyricsContainerRef.current) {
      const activeElement = lyricsContainerRef.current.children[activeLyricIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLyricIndex]);

  const carouselImages = igPosts.map(post => post.src);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 4th anniversary on Sept 6, 2026 means start date was Sept 6, 2022
    const startDate = new Date('2022-09-06T00:00:00');
    
    const calculateDays = () => {
      const now = new Date();
      const difference = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
      setDaysLoved(difference);
    };
    
    calculateDays();
    const timer = setInterval(calculateDays, 60000); // update occasionally
    return () => clearInterval(timer);
  }, []);

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode === '0104') {
      setIsPasscodeError(false);
      setIsKeepsakeUnlocked(true);
    } else {
      setIsPasscodeError(true);
      setTimeout(() => setIsPasscodeError(false), 500);
    }
  };

  const handleCardFlip = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  const closeKeepsake = () => {
    setIsKeepsakeOpen(false);
    setTimeout(() => {
      setIsKeepsakeUnlocked(false);
      setPasscode('');
      setFlippedCards(new Set());
    }, 400);
  };

  const keepsakeItems = [
    { id: 1, image: '/images/usa.jpg', note: 'Even in random moments like this, I’m always happy that I get to be with you.' },
    { id: 2, image: '/images/duha.jpg', note: 'I really like moments like this with you, kanang simple ra pero memorable gihapon.' },
    { id: 3, image: '/images/tulo.jpg', note: 'I’m happy nga naa ka to share this moment with me.' },
    { id: 4, image: '/images/upat.jpg', note: 'cute kay murag mag-same na ta og nawng' },
    { id: 5, image: '/images/lima.jpg', note: 'Nothing fancy, just us enjoying our time together.' },
    { id: 6, image: '/images/unom.jpg', note: 'Kathlene gamay og Nissah gamay.' },
    { id: 7, image: '/images/pito.jpg', note: 'kyot kyot happy motmot' },
    { id: 8, image: '/images/walo.jpg', note: 'Hopefully, daghan pa ta og places nga maadtoan and memories nga mabuhat together.' },
    { id: 9, image: '/images/siyam.jpg', note: 'Glad I have someone who matches my silliness' },
    { id: 10, image: '/images/pulo.jpg', note: 'I always want to rest beside you. Murag mas peaceful ko basta naa ko sa imong side.' },
  ];

  const cheesyLines = [
    "Wow ganahan ko ana, pun-e pa bi!",
    "Hala sige, nag-ihap ko pila imo ihatag na kiss ah.",
    "Isa pa nga? Parang kulang pa eh.",
    "Grabe siya mang-kiss oh, makilig man sad ta!",
    "Sige pa, ayaw pag-undang! Hahaha",
    "Wow, kalami sa kiss! Another one pls.",
    "Unli kiss ba ni? Pwede e-claim in person?",
    "Ayg sige'g click diha, kiss ko tinuod bi.",
    "Kiliga nako oy, murag tinuod.",
    "Ayiee, sweet kaayo siya oh.",
    "Daghanag kiss oy, naunsa diay ka? Hahaha",
    "More! More kisses para happy!",
    "Dawata ning kiss nako oh, mwah!",
    "Kiss na sweet gikan sa pinaka-sweet!",
    "Makabuang man sad ning mga kiss nimo oy.",
    "Asa man dapit ni e-kiss? Sa lips o sa cheeks?",
    "Lami-a sa kiss oy, puno'g gugma!",
    "Sipaa mang-kiss aning bataa oy.",
    "Sige pa, ayaw'g ka-ulaw, atoa ra bitaw ni.",
    "Ayaw pa-alkanse, click pa more!",
    "Dili pa ko satisfied, padayon sa pag click!",
    "Tinuora sad oy, ayaw sige'g dinhi sa screen!",
    "Ayg saba, nag-enjoy ko sa imong kisses.",
    "Gugma jud kaayo ba, sige lang og kiss.",
    "Paspasa mang-kiss oy, hinay-hinayi lang! Hahaha"
  ];

  const comboCountRef = useRef(0);
  const comboTimeoutRef = useRef(null);
  const hidePopUpTimeoutRef = useRef(null);

  const handleKissClick = () => {
    const audio = new Audio('https://actions.google.com/sounds/v1/human_voices/kiss.ogg');
    audio.play().catch(e => console.log("Audio play failed:", e));
    
    const id = Date.now() + Math.random();
    const newKiss = { id, left: Math.random() * 80 + 10 + '%' };
    setKisses(prev => [...prev, newKiss]);
    
    // Combo Counter Logic
    comboCountRef.current += 1;
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);

    comboTimeoutRef.current = setTimeout(() => {
      const count = comboCountRef.current;
      const randomLine = cheesyLines[Math.floor(Math.random() * cheesyLines.length)];
      setKissesPopUpText(`${count} kisses! ${randomLine}`);
      comboCountRef.current = 0; // reset for next combo
      
      if (hidePopUpTimeoutRef.current) clearTimeout(hidePopUpTimeoutRef.current);
      hidePopUpTimeoutRef.current = setTimeout(() => setKissesPopUpText(""), 4000);
    }, 800);

    setTimeout(() => {
      setKisses(prev => prev.filter(k => k.id !== id));
    }, 2000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <nav className="navbar">
        <div className="logo">
          <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          Evermore
        </div>
        <ul className="nav-links">
          <li onClick={() => scrollToSection('our-story')}>Our Story</li>
          <li onClick={() => scrollToSection('reasons')}>Reasons I Love You</li>
          <li onClick={() => scrollToSection('scrapbook')}>Memory Scrapbook</li>
          <li onClick={() => scrollToSection('love-letter')}>Love Letter</li>
          <li onClick={() => scrollToSection('sweet-notes')}>Sweet Notes</li>
        </ul>
        <div className="nav-actions">
          <button className="btn-outline" onClick={handleKissClick}>
            <svg className="heart-outline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
            Tap for a Kisses
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="our-story" className="hero">
        <div className="hero-content">
          <div className="pill-badge">
            <svg className="heart-icon-small" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            FOUR YEARS AND COUNTING
          </div>
          <h1 className="hero-title">My Favorite Person in the Whole Universe</h1>
          <p className="hero-desc">
            A little place made for you, with some of my favorite things about you and our favorite memories together.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setIsLetterOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              Read My Heart's Letter
            </button>
            <button className="btn-secondary" onClick={() => setIsKeepsakeOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Open Keepsake Box
            </button>
            <button className="btn-tertiary" onClick={() => scrollToSection('soundtrack')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              Play Our Song
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-val">{daysLoved.toLocaleString()}</span>
              <span className="stat-label">Days Loved</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="polaroid-wrapper clickable-polaroid" onClick={() => setIsArtGalleryOpen(true)} style={{ cursor: 'pointer', transition: 'transform 0.3s' }}>
            <div className="tape tape-yellow"></div>
            <div className="polaroid-inner">
              <div className="polaroid-image-placeholder" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
                {carouselImages.map((src, idx) => (
                  <img 
                    key={src}
                    src={src}
                    alt={`Memory ${idx + 1}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: idx === currentImageIdx ? 1 : 0,
                      transition: 'opacity 1s ease-in-out'
                    }}
                  />
                ))}
              </div>
              <div className="polaroid-caption">
                <span>my isay</span>
                <svg className="heart-icon-small" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons Section */}
      <section id="reasons" className="reasons">
        <div className="section-header-split">
          <div className="section-header-left">
            <span className="sub-title">LITTLE REASONS WHY</span>
            <h2 className="section-title">Why I Fall For You</h2>
          </div>
          <div className="section-header-right">
            <p>Because to know you is to love you. Every little thing you do, every little gesture,
            every sound, every little quirk of yours, is exactly why I fall for you.</p>
          </div>
        </div>
        <div className="reasons-grid">
          {/* Card 1 */}
          <div className="reason-card">
            <div className="reason-icon-wrapper pink-bg">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <span className="reason-number">REASON 01</span>
            <h3 className="reason-title">Eyes I Adore</h3>
            <p className="reason-desc">I love the way your eyes sparkle when you're happy. There's just something about them that I could never get tired of looking at.</p>
            <button 
              className={`love-this-btn ${lovedReasons[1] ? 'loved' : ''}`} 
              onClick={() => toggleLove(1)}
            >
              <svg viewBox="0 0 24 24" fill={lovedReasons[1] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
              {lovedReasons[1] ? 'Loved!' : 'Love this'}
            </button>
          </div>
          {/* Card 2 */}
          <div className="reason-card">
            <div className="reason-icon-wrapper rose-bg">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
            </div>
            <span className="reason-number">REASON 02</span>
            <h3 className="reason-title">Your Beautiful Heart</h3>
            <p className="reason-desc">The endless warmth and tender kindness you have left wherever you are.</p>
            <button 
              className={`love-this-btn ${lovedReasons[2] ? 'loved' : ''}`} 
              onClick={() => toggleLove(2)}
            >
              <svg viewBox="0 0 24 24" fill={lovedReasons[2] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
              {lovedReasons[2] ? 'Loved!' : 'Love this'}
            </button>
          </div>
          {/* Card 3 */}
          <div className="reason-card">
            <div className="reason-icon-wrapper yellow-bg">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M12 12l8.5-8.5M12 12l-8.5-8.5M12 12l8.5 8.5M12 12l-8.5 8.5"/></svg>
            </div>
            <span className="reason-number">REASON 03</span>
            <h3 className="reason-title">Simply Perfect</h3>
            <p className="reason-desc">In my eyes, you are the most perfect person I have ever seen. Everything about you is just right.</p>
            <button 
              className={`love-this-btn ${lovedReasons[3] ? 'loved' : ''}`} 
              onClick={() => toggleLove(3)}
            >
              <svg viewBox="0 0 24 24" fill={lovedReasons[3] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
              {lovedReasons[3] ? 'Loved!' : 'Love this'}
            </button>
          </div>
          {/* Card 4 */}
          <div className="reason-card">
            <div className="reason-icon-wrapper pink-bg">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="reason-number">REASON 04</span>
            <h3 className="reason-title">Unwavering Support</h3>
            <p className="reason-desc">Holding my hand through all of it. You are steady, a safe space. There is nothing in the world changing that.</p>
            <button 
              className={`love-this-btn ${lovedReasons[4] ? 'loved' : ''}`} 
              onClick={() => toggleLove(4)}
            >
              <svg viewBox="0 0 24 24" fill={lovedReasons[4] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
              {lovedReasons[4] ? 'Loved!' : 'Love this'}
            </button>
          </div>
        </div>
      </section>

      {/* Scrapbook Section */}
      <section id="scrapbook" className="scrapbook">
        <div className="section-header-center">
          <span className="sub-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: 16, height: 16, display: 'inline', marginRight: 4, verticalAlign: 'text-bottom'}}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> LIVING MEMORIES</span>
          <h2 className="section-title">Moving Moments & Cherished Times</h2>
          <p>Every little clip holds a memory we'll always keep. Watching these brings me right back to our best days.</p>
        </div>
        
        <div className="scrapbook-grid">
          {[
            { video: "/videos/video1.mp4", tapeColor: "tape-pink", title: "4th Anniversary", desc: "Four beautiful years down, and a lifetime of forever to go." },
            { video: "/videos/video2.mp4", tapeColor: "tape-pink-light", title: "My Special Day", desc: "Thank you for making my birthdays extra special. The best gift is having you." },
            { video: "/videos/video3.mp4", tapeColor: "tape-yellow", title: "My Favorite Companion", desc: "Thank you for always going with me wherever I want to go. Every trip is better with you." },
            { video: "/videos/video4.mp4", tapeColor: "tape-pink-dark", title: "Happy Hearts Day", desc: "Every day with you feels like Valentine's. You will be my always." },
          ].map((item, i) => (
             <div className="mini-polaroid" key={i}>
                <div className={`tape ${item.tapeColor}`}></div>
                <div className="mini-polaroid-inner">
                  <div className="mini-polaroid-img-placeholder" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
                    <video 
                      src={item.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="mini-polaroid-caption">
                    <div>
                      <h4 className="mini-polaroid-title">{item.title}</h4>
                      <p className="mini-polaroid-desc">{item.desc}</p>
                    </div>
                    <button className="pin-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
                    </button>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* Letter Section */}
      <section id="love-letter" className="letter-section">
        <div className="letter-left">
           <div className={`letter-paper ${!isLetterRevealed ? 'envelope-closed' : 'envelope-open'}`}>
             {!isLetterRevealed ? (
               <div className="envelope-cover">
                 <h2 className="envelope-title">For My Love</h2>
                 <button className="envelope-seal-btn" onClick={() => setIsLetterRevealed(true)}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                 </button>
                 <p className="envelope-hint">Click the heart to open</p>
               </div>
             ) : (
               <div className="letter-content-revealed">
                 <div className="seal">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                 </div>
                 <span className="sub-title">WORDS DEEP WITHIN MY SOUL</span>
                 <h2 className="letter-title">A Letter From My Heart</h2>
                 
                 <h3 className="letter-salutation">My Dearest Love,</h3>
                 <p className="letter-body">
                   Thank you for being one of the most beautiful parts of my life. Thank you for staying, for understanding me, and for always finding a way to make even the simplest days feel a little more special.
                   <br/><br/>
                   I love how I can be completely myself when I’m with you. I can be silly, quiet, clingy, or just tired, and somehow, you still make me feel comfortable. You are the person I want beside me in my happiest moments and the one I want to rest with when the world feels a little too much.
                   <br/><br/>
                   Every picture we take, every random laugh, every little adventure, and even our simple moments mean more to me than you probably realize. They may seem small, but they are the memories I know I’ll always want to keep.
                   <br/><br/>
                   I may not always know the perfect words to say, but I hope you always remember this: I’m grateful for you, I’m proud of you, and I’m happy that I get to call you mine.
                   <br/><br/>
                   If I could choose someone to make more memories with, to laugh with, to be silly with, and to simply rest beside, I would still choose you.
                 </p>
                 <h4 className="letter-closing">Always yours, in every little moment.</h4>
                 <div className="letter-signature">
                    <div className="wax-seal">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
                    </div>
                    <span>Sealed with eternal devotion</span>
                 </div>
               </div>
             )}
           </div>
        </div>
        <div className="letter-right">
           <div id="soundtrack" className="soundtrack-card">
              <div className="soundtrack-header">
                 <span className="sub-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: 14, height: 14, display: 'inline', marginRight: 4, verticalAlign: 'text-bottom'}}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> OUR SOUNDTRACK</span>
                 {isPlaying && <span className="now-playing-badge">Now Playing</span>}
              </div>
              <div className="track-info">
                 <div className="album-art-container">
                    <img src="/images/kanta.jpg" alt="Album Art" className="album-art" onError={(e) => e.target.style.display = 'none'} />
                 </div>
                 <div>
                    <h4 className="track-title">Love Dont Change</h4>
                    <p className="track-artist">Jeremih</p>
                 </div>
              </div>
              <audio 
                ref={audioRef} 
                src="/music.mp3" 
                loop 
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              <div className="progress-bar-container">
                 <input 
                   type="range" 
                   className="scrub-slider"
                   min="0" 
                   max={duration || 100} 
                   value={currentTime} 
                   onChange={handleSeek} 
                 />
                 <div className="time-stamps" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem', fontWeight: '500' }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                 </div>
              </div>
              <div className="player-controls" style={{ marginBottom: '1.5rem' }}>
                 <button className="control-btn play-pause" onClick={togglePlay}>
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    )}
                 </button>
              </div>
              
              <div className="lyrics-container" ref={lyricsContainerRef}>
                {lyricsData.map((lyric, idx) => (
                  <p 
                    key={idx} 
                    className={`lyric-line ${idx === activeLyricIndex ? 'active' : ''}`}
                  >
                    {lyric.text}
                  </p>
                ))}
              </div>
           </div>

           <div id="sweet-notes" className="surprises-card">
              <span className="sub-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: 14, height: 14, display: 'inline', marginRight: 4, verticalAlign: 'text-bottom'}}><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg> LITTLE SURPRISES JUST FOR YOU</span>
              <button className="surprise-btn pink" onClick={handleKissClick}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
                Tap for a Virtual Hug & Kiss
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <button className="surprise-btn outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                Open Today's Secret Note
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
           </div>
        </div>
      </section>

      <footer className="footer">
         <div className="footer-left">
            <h4 className="footer-logo">Evermore & Always</h4>
            <p>A digital sanctuary lovingly created just for you to hold our cherished memories.</p>
         </div>
         <div className="footer-links">
            <a href="#">Our Story</a>
            <a href="#">Love Letter</a>
            <a href="#">Keepsake Photo</a>
         </div>
         <div className="footer-right">
            <button className="scroll-top-btn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
               Scroll to top
            </button>
         </div>
      </footer>
      
      {/* Floating Kisses */}
      {kisses.map(kiss => (
        <div key={kiss.id} className="floating-kiss" style={{ left: kiss.left }}>
          💋
        </div>
      ))}
      
      {/* Letter Modal */}
      {isLetterOpen && (
        <div className="letter-modal-overlay" onClick={() => setIsLetterOpen(false)}>
          <div className="letter-modal-paper" onClick={(e) => e.stopPropagation()}>
            <button className="close-letter-btn" onClick={() => setIsLetterOpen(false)}>×</button>
            <Typewriter text={letterMessage} delay={40} />
          </div>
        </div>
      )}

      {/* Keepsake Modal */}
      {isKeepsakeOpen && (
        <div className="keepsake-modal-overlay" onClick={closeKeepsake}>
          <div className="keepsake-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-keepsake-btn" onClick={closeKeepsake}>×</button>
            
            {!isKeepsakeUnlocked ? (
              <div className="passcode-container">
                <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <h3 className="passcode-title">Enter Passcode</h3>
                <p className="passcode-subtitle">Our special date unlocks these memories.</p>
                <form onSubmit={handlePasscodeSubmit}>
                  <input
                    type="password"
                    maxLength="4"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ''))}
                    className={`passcode-input ${isPasscodeError ? 'error shake' : ''}`}
                    placeholder="****"
                    autoFocus
                  />
                  <button type="submit" className="btn-primary passcode-submit">Unlock</button>
                </form>
              </div>
            ) : (
              <div className="scrapbook-container">
                <h3 className="scrapbook-title">Our Cherished Keepsakes</h3>
                <p className="scrapbook-subtitle">Click on any photo to reveal the note behind it.</p>
                <div className="keepsake-grid">
                  {keepsakeItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`flip-card ${flippedCards.has(index) ? 'flipped' : ''}`}
                      onClick={() => handleCardFlip(index)}
                    >
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                           <div className="polaroid-wrapper">
                             <div className="tape tape-yellow"></div>
                             <div className="polaroid-image-placeholder" style={{ position: 'relative', width: '100%', height: '100%', background: '#f3efea' }}>
                                <img 
                                  src={item.image} 
                                  alt={`Keepsake ${index + 1}`}
                                  onError={(e) => e.target.style.opacity = 0}
                                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', zIndex: 2 }}
                                />
                                <svg className="fallback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                             </div>
                           </div>
                        </div>
                        <div className="flip-card-back">
                           <div className="note-paper">
                              <p className="note-text">{item.note}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instagram Post Gallery Modal */}
      {isArtGalleryOpen && (
        <div className="ig-modal-overlay">
          <button className="ig-close-btn" onClick={() => setIsArtGalleryOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          
          <div className="ig-post-card">
            {/* Header */}
            <div className="ig-post-header">
              <div className="ig-user-info">
                <div className="ig-avatar">
                  <img src="/images/art1.jpg" alt="Profile" onError={(e) => { e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' }} />
                </div>
                <span className="ig-username">my_isay</span>
              </div>
              <button className="ig-more-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
              </button>
            </div>

            {/* Image Slider */}
            <div className="ig-post-image-wrapper" onDoubleClick={handleDoubleTap}>
              <img src={igPosts[activeArtIndex].src} alt={`Post ${activeArtIndex + 1}`} className="ig-post-image" onError={(e) => { e.target.style.opacity = 0; }} />
              
              {/* Big Heart Animation */}
              {heartAnimId > 0 && (
                <div key={heartAnimId} className="ig-big-heart">
                  <svg viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
              )}

              {/* Fallback */}
              <div className="ig-post-fallback">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                 <span>art{activeArtIndex + 1}.jpg</span>
              </div>
              
              {/* Controls */}
              {activeArtIndex > 0 && (
                <button className="ig-nav-btn ig-prev" onClick={() => setActiveArtIndex(prev => prev - 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
              )}
              {activeArtIndex < igPosts.length - 1 && (
                <button className="ig-nav-btn ig-next" onClick={() => setActiveArtIndex(prev => prev + 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              )}
              <div className="ig-pagination-badge">{activeArtIndex + 1}/{igPosts.length}</div>
            </div>

            {/* Actions */}
            <div className="ig-post-actions">
              <div className="ig-actions-left">
                <button className={`ig-action-icon ${igLikes.has(activeArtIndex) ? 'liked' : ''}`} onClick={toggleIgLike}>
                  {igLikes.has(activeArtIndex) ? (
                    <svg viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
                  )}
                </button>
                <button className="ig-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
                </button>
                <button className="ig-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
              <div className="ig-actions-right">
                <button className="ig-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                </button>
              </div>
            </div>

            {/* Likes */}
            <div className="ig-post-likes">
              {igLikes.has(activeArtIndex) ? 'Liked by you and 1,024 others' : '1,024 likes'}
            </div>

            {/* Caption */}
            <div className="ig-post-caption">
              <span className="ig-caption-user">my_isay</span> {igPosts[activeArtIndex].caption}
            </div>

            {/* Comments List */}
            <div className="ig-post-comments-list">
              {(igComments[activeArtIndex] || []).map(comment => (
                <div key={comment.id} className="ig-comment-item">
                  <div className="ig-comment-text-wrapper">
                    <span className="ig-caption-user">{comment.user}</span> {comment.text}
                  </div>
                  <button className="ig-comment-delete-btn" onClick={() => handleDeleteComment(comment.id)} title="Delete Comment">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Dots (IG Style) */}
            <div className="ig-post-dots">
              {igPosts.map((_, i) => (
                <span key={i} className={`ig-dot ${i === activeArtIndex ? 'active' : ''}`} />
              ))}
            </div>

            {/* Comment Input */}
            <form className="ig-comment-input-form" onSubmit={handleAddComment}>
              <input 
                type="text" 
                placeholder="Add a comment..." 
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                className="ig-comment-input"
              />
              <button 
                type="submit" 
                className="ig-comment-post-btn"
                disabled={!currentComment.trim()}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cheesy Kisses Popup */}
      {kissesPopUpText && (
        <div className="kisses-popup">
          <div className="kisses-popup-content">
            ❤️ {kissesPopUpText}
          </div>
        </div>
      )}
    </div>
  );
}