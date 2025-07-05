import { useState, useEffect } from 'react';
import './App.css';
import { FaBriefcase, FaGraduationCap, FaTools, FaFolder, FaEnvelope, FaLinkedin, FaGithub, FaDownload, FaCheck, FaMedal, FaLanguage, FaMapMarkerAlt, FaPhoneAlt, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Check which section is currently in view
      const sections = ['hero', 'experience', 'education', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Smooth scroll handler for nav links
  const handleNavClick = (e, section) => {
    e.preventDefault();
    closeMenu();
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <div className="App">
      {/* Header */}
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <a href="https://atifalin.in" style={{ textDecoration: 'none', color: 'inherit' }}>atifalin<span>.in</span></a>
              </motion.div>
            </div>
            
            <button className="mobile-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            
            <ul className={`nav-links ${isMenuOpen ? 'menu-open' : ''}`}>
              <li>
                <a 
                  href="#hero" 
                  className={activeSection === 'hero' ? 'active' : ''}
                  onClick={e => handleNavClick(e, 'hero')}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  className={activeSection === 'experience' ? 'active' : ''}
                  onClick={e => handleNavClick(e, 'experience')}
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#education" 
                  className={activeSection === 'education' ? 'active' : ''}
                  onClick={e => handleNavClick(e, 'education')}
                >
                  Education
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className={activeSection === 'skills' ? 'active' : ''}
                  onClick={e => handleNavClick(e, 'skills')}
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className={activeSection === 'projects' ? 'active' : ''}
                  onClick={e => handleNavClick(e, 'projects')}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={activeSection === 'contact' ? 'active' : ''}
                  onClick={e => handleNavClick(e, 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <motion.section id="hero" className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="container">
          <div className="hero-grid">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="pre-title">Production Planner & Supply Chain Leader</h4>
              <h1>Mohammed Atif Ali Neranki</h1>
              <h3>MBA | Supply Chain Management</h3>
              <p className="hero-description">
                Experienced and results-driven Production Planner blending advanced analytics, AI-driven insights, 
                and strategic vision to optimize operations across global and Indian markets.
              </p>
              
              <div className="hero-buttons">
                <a href="/files/Resume_Mohammed_Atif_Ali_Neranki.pdf" className="btn" download>
                  <FaDownload className="icon-left" /> Download Resume
                </a>
                <a href="#contact" className="btn btn-outline">
                  Contact Me
                </a>
              </div>
              
              <div className="social-links">
                <a href="http://www.linkedin.com/in/atifalin" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/Atifalin" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaGithub />
                </a>
                <a href="mailto:atifalin09@gmail.com" className="social-link">
                  <FaEnvelope />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="profile-image">
                <img src="/Mo.png" alt="Mohammed Atif Ali Neranki" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Experience Section */}
      <motion.section id="experience" className="section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <h2><FaBriefcase className="icon-title" /> Experience</h2>
          </motion.div>
          
          <div className="timeline">
            {/* Kruger Experience */}
            <div className="timeline-item">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="timeline-content"
              >
                <div className="timeline-marker">
                  <FaBriefcase />
                </div>
                <div className="card">
                  <span className="date">OCTOBER 2022 – CURRENT</span>
                  <h3>Production Planner</h3>
                  <h4>Kruger (Canada)</h4>
                  <ul className="experience-list">
                    <li>Managed annual inventory exceeding 398,000 tons (valued at over $318 million USD/year), overseeing assets worth nearly $1 billion USD over 3 years.</li>
                    <li>Leveraged AI-driven analytics and predictive modeling to optimize production schedules and inventory management, resulting in data-backed decision making and improved forecast accuracy.</li>
                    <li>Built interactive dashboards in Power BI and Excel for live inventory breakdowns, sales vs production, demand vs supply timelines, and real-time order processing.</li>
                    <li>Applied machine learning techniques to identify demand patterns, reduce wastage, and enhance supply chain agility.</li>
                    <li>Reduced inventory holding costs by 12% through implementation of AI-powered demand forecasting and process automation.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Kamloops Film Society Experience */}
            <div className="timeline-item right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="timeline-content"
              >
                <div className="timeline-marker">
                  <FaBriefcase />
                </div>
                <div className="card">
                  <span className="date">MARCH 2022 – AUGUST 2022</span>
                  <h3>Strategic Consultant</h3>
                  <h4>Kamloops Film Society</h4>
                  <ul className="experience-list">
                    <li>Presented post-COVID business models to Board of Directors.</li>
                    <li>Conducted research, gap analysis, and proposed new revenue models.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Jindal Steelworks Experience */}
            <div className="timeline-item">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="timeline-content"
              >
                <div className="timeline-marker">
                  <FaBriefcase />
                </div>
                <div className="card">
                  <span className="date">DECEMBER 2018 – MARCH 2019</span>
                  <h3>Marketing Intern</h3>
                  <h4>Jindal Steelworks (India)</h4>
                  <ul className="experience-list">
                    <li>Supported digital initiatives and process improvement in a large-scale manufacturing environment.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Education Section */}
      <motion.section id="education" className="section bg-light"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <h2><FaGraduationCap className="icon-title" /> Education & Certifications</h2>
          </motion.div>
          
          <div className="education-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="education-card"
            >
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-content">
                <span className="date">2020 - 2022</span>
                <h3>Master of Business Administration (MBA)</h3>
                <h4>Thompson Rivers University, Canada</h4>
                <p>
                  Specialization in Supply Chain Management with focus on Operations, Logistics, and Analytics.
                </p>
              </div>
            </motion.div>
            
            <div className="certifications">
              <h3>Certifications</h3>
              <div className="cert-grid">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="cert-card"
                >
                  <div className="cert-icon">
                    <FaMedal />
                  </div>
                  <h4>Six Sigma White Belt</h4>
                  <p>Six Sigma Global Institute</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="cert-card"
                >
                  <div className="cert-icon">
                    <FaMedal />
                  </div>
                  <h4>Google Analytics</h4>
                  <p>Google</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="cert-card"
                >
                  <div className="cert-icon">
                    <FaMedal />
                  </div>
                  <h4>Excel Data Analysis</h4>
                  <p>Microsoft</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Skills Section */}
      <motion.section id="skills" className="section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <h2><FaTools className="icon-title" /> Skills</h2>
          </motion.div>
          
          <div className="skills-grid">
            {/* Analytics & Data Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="skill-category"
            >
              <div className="skill-header">
                <div className="skill-icon">
                  <FaTools />
                </div>
                <h3>Analytics & Data</h3>
              </div>
              <ul className="skill-list">
                <li>
                  <div className="skill-name">
                    <span>Power BI</span>
                    <span>Advanced</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '90%'}}></div>
                  </div>
                </li>
                <li>
                  <div className="skill-name">
                    <span>Advanced Excel</span>
                    <span>Expert</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '95%'}}></div>
                  </div>
                </li>
                <li>
                  <div className="skill-name">
                    <span>AI-Driven Analytics</span>
                    <span>Intermediate</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '80%'}}></div>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            {/* Supply Chain Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="skill-category"
            >
              <div className="skill-header">
                <div className="skill-icon">
                  <FaTools />
                </div>
                <h3>Supply Chain</h3>
              </div>
              <ul className="skill-list">
                <li>
                  <div className="skill-name">
                    <span>Production Planning</span>
                    <span>Expert</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '95%'}}></div>
                  </div>
                </li>
                <li>
                  <div className="skill-name">
                    <span>Inventory Management</span>
                    <span>Advanced</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '90%'}}></div>
                  </div>
                </li>
                <li>
                  <div className="skill-name">
                    <span>S&OP</span>
                    <span>Advanced</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '85%'}}></div>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Languages */}
          <div className="languages">
            <h3>Languages</h3>
            <div className="language-grid">
              <div className="language-card">
                <div className="language-icon">
                  <FaLanguage />
                </div>
                <h4>English</h4>
                <p>Professional</p>
              </div>
              
              <div className="language-card">
                <div className="language-icon">
                  <FaLanguage />
                </div>
                <h4>Hindi</h4>
                <p>Native</p>
              </div>
              
              <div className="language-card">
                <div className="language-icon">
                  <FaLanguage />
                </div>
                <h4>Kannada</h4>
                <p>Native</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Projects Section */}
      <motion.section id="projects" className="section bg-light"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <h2><FaFolder className="icon-title" /> Projects</h2>
          </motion.div>
          
          <div className="projects-grid">
            {/* Supply Chain Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="project-card"
            >
              <div className="project-header">
                <div className="project-icon">
                  <FaFolder />
                </div>
                <div className="project-links">
                  <a href="https://github.com/Atifalin/supply-chain-dashboard" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </div>
              </div>
              <h3>AI-Powered Supply Chain Dashboard</h3>
              <p>
                Interactive Power BI dashboard integrating AI-driven inventory forecasting, 
                production planning optimization, and real-time supply chain analytics.
              </p>
              <div className="project-tags">
                <span>Power BI</span>
                <span>AI Analytics</span>
                <span>Supply Chain</span>
              </div>
            </motion.div>
            
            {/* Inventory Management System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="project-card"
            >
              <div className="project-header">
                <div className="project-icon">
                  <FaFolder />
                </div>
                <div className="project-links">
                  <a href="https://github.com/Atifalin/inventory-forecasting" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </div>
              </div>
              <h3>Advanced Inventory Management System</h3>
              <p>
                Excel-based inventory management system with automated forecasting, 
                reorder recommendations, and cost optimization calculations.
              </p>
              <div className="project-tags">
                <span>Excel VBA</span>
                <span>Inventory Management</span>
                <span>Forecasting</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Contact Section */}
      <motion.section id="contact" className="section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <h2><FaEnvelope className="icon-title" /> Contact Me</h2>
          </motion.div>
          
          <div className="contact-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-info"
            >
              <p className="contact-intro">
                I'm currently available for new opportunities in production planning, supply chain management, 
                or digital transformation roles. Feel free to reach out if you'd like to connect!
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>Kamloops, British Columbia, Canada</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p><a href="mailto:atifalin09@gmail.com">atifalin09@gmail.com</a></p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>Available upon request</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4>Connect with me</h4>
                <div className="social-links">
                  <a href="http://www.linkedin.com/in/atifalin" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/Atifalin" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaGithub />
                  </a>
                  <a href="https://atifalin.in" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaEnvelope />
                  </a>
                </div>
              </div>
              
              <div className="notice-period">
                <h4>Notice Period</h4>
                <p>Currently employed, able to join within 30 days of offer acceptance.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-form-container"
            >
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required></textarea>
                </div>
                
                <button type="submit" className="btn">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <a href="https://atifalin.in" style={{ textDecoration: 'none', color: 'inherit' }}>atifalin<span>.in</span></a>
            </div>
            
            <div className="footer-links">
              <a href="#hero">Home</a>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            
            <div className="social-links">
              <a href="http://www.linkedin.com/in/atifalin" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://github.com/Atifalin" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
              <a href="mailto:atifalin09@gmail.com" className="social-link">
                <FaEnvelope />
              </a>
            </div>
            
            <div className="copyright">
              &copy; {new Date().getFullYear()} <a href="https://atifalin.in" style={{ textDecoration: 'none', color: 'inherit' }}>atifalin.in</a> | Mohammed Atif Ali Neranki. All rights reserved. <br />
              Made with <FaHeart className="heart-icon" /> and React
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
