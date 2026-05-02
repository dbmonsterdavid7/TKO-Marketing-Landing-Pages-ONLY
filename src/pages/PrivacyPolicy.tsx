import { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export default function PrivacyPolicy() {
  useEffect(() => {
    // Active nav highlighting on scroll
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-list li');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(li => li.classList.remove('active'));
          const id = entry.target.id;
          const link = document.querySelector(`.nav-list a[href="#${id}"]`);
          if (link) link.parentElement?.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));

    // Smooth scroll for sidebar links
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id!);
        if (element) {
          const offset = 100; // Offset for sticky header
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleNavClick);

    return () => {
      sections.forEach(s => observer.unobserve(s));
      document.removeEventListener('click', handleNavClick);
    };
  }, []);

  return (
    <>
      <Navigation />
      
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --accent: #A60724;
          --mid: #1c1c1c;
          --muted: #555;
          --border: #2a2a2a;
        }

        .privacy-content {
          font-family: 'DM Sans', sans-serif;
          line-height: 1.75;
          font-weight: 300;
        }

        .hero-privacy {
          padding: clamp(4rem, 10vw, 8rem) 0 clamp(2rem, 5vw, 4rem);
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .hero-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hero-eyebrow::before {
          content: '';
          display: inline-block;
          width: 2rem;
          height: 1px;
          background: var(--accent);
        }

        .hero-privacy h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 9vw, 7rem);
          line-height: 0.95;
          letter-spacing: 0.02em;
          color: white;
          margin-bottom: 1.5rem;
        }

        .hero-meta {
          font-size: 0.82rem;
          color: var(--muted);
          letter-spacing: 0.05em;
        }

        .page-wrap {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto;
          align-items: start;
        }

        nav.sidebar-nav {
          position: sticky;
          top: 80px;
          height: calc(100vh - 80px);
          overflow-y: auto;
          padding: 2.5rem 2rem 2.5rem 0;
          border-right: 1px solid var(--border);
        }

        .nav-title {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.25rem;
        }

        .nav-list { list-style: none; }
        .nav-list li { border-left: 2px solid var(--border); margin-bottom: 0.1rem; }
        .nav-list li.active { border-left-color: var(--accent); }

        .nav-list a {
          display: block;
          padding: 0.45rem 0.85rem;
          font-size: 0.8rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1.4;
        }

        .nav-list a:hover,
        .nav-list li.active a { color: white; }

        .section {
          padding-top: 3.5rem;
          margin-bottom: 0.5rem;
        }

        .section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          letter-spacing: 0.04em;
          color: white;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }

        .section h3 {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 2rem 0 0.75rem;
        }

        .section p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          max-width: 70ch;
        }

        .section ul {
          list-style: none;
          margin: 0.75rem 0 1.25rem;
          padding: 0;
          max-width: 70ch;
        }

        .section ul li {
          position: relative;
          padding-left: 1.4rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .section ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.75em;
          width: 6px;
          height: 6px;
          background: var(--accent);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }

        .highlight-card {
          background: var(--mid);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: 4px;
          padding: 1.25rem 1.5rem;
          margin: 1.25rem 0;
          max-width: 70ch;
        }

        .data-table {
          width: 100%;
          max-width: 70ch;
          border-collapse: collapse;
          margin: 1rem 0 1.5rem;
          font-size: 0.85rem;
        }

        .data-table th {
          text-align: left;
          padding: 0.6rem 1rem;
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
        }

        .data-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border);
          color: rgba(255, 255, 255, 0.7);
          vertical-align: top;
        }

        .cookie-block {
          background: var(--mid);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1.25rem 1.5rem;
          margin: 1rem 0;
          max-width: 70ch;
        }

        @media (max-width: 768px) {
          .page-wrap { grid-template-columns: 1fr; }
          nav.sidebar-nav { display: none; }
        }
      ` }} />

      <div className="privacy-content relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hero-privacy">
            <div className="hero-eyebrow">Takeover Marketing LLC</div>
            <h1>Privacy<br />Policy</h1>
            <p className="hero-meta">Last updated: April 03, 2026</p>
          </div>

          <div className="page-wrap">
            <nav className="sidebar-nav">
              <p className="nav-title">Contents</p>
              <ul className="nav-list">
                <li><a href="#overview">Overview</a></li>
                <li><a href="#definitions">Definitions</a></li>
                <li><a href="#data-collected">Data Collected</a></li>
                <li><a href="#opt-in">Opt-In &amp; Contact</a></li>
                <li><a href="#cookies">Cookies</a></li>
                <li><a href="#use">Use of Your Data</a></li>
                <li><a href="#retention">Retention</a></li>
                <li><a href="#transfer">Data Transfer</a></li>
                <li><a href="#delete">Your Rights</a></li>
                <li><a href="#disclosure">Disclosure</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#children">Children</a></li>
                <li><a href="#changes">Policy Changes</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </nav>

            <main className="pb-24">
              {/* Overview */}
              <div className="section" id="overview">
                <h2>Overview</h2>
                <p>This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service, and tells You about Your privacy rights and how the law protects You.</p>
                <p>We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
                <p className="mt-4 font-medium text-white italic">Text messaging originator opt-in data and consent will not be shared with any third parties.</p>
              </div>

              {/* Interpretation & Definitions */}
              <div className="section" id="definitions">
                <h2>Definitions</h2>
                <h3>Interpretation</h3>
                <p>Words with capitalized initial letters have meanings defined below. These definitions apply whether the terms appear in singular or plural form.</p>

                <h3>Key Terms</h3>
                <table className="data-table">
                  <thead>
                    <tr><th>Term</th><th>Meaning</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Account</td><td>A unique account created for You to access our Service or parts of our Service.</td></tr>
                    <tr><td>Affiliate</td><td>An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares or equity interest.</td></tr>
                    <tr><td>Company</td><td>Takeover Marketing LLC, 33534 Carly Ct. Also referred to as "We," "Us," or "Our."</td></tr>
                    <tr><td>Cookies</td><td>Small files placed on Your device by a website, containing details of Your browsing history among other uses.</td></tr>
                    <tr><td>Country</td><td>Michigan, United States</td></tr>
                    <tr><td>Device</td><td>Any device that can access the Service — computer, cell phone, or digital tablet.</td></tr>
                    <tr><td>Personal Data</td><td>Any information that relates to an identified or identifiable individual. Also called "Personal Information."</td></tr>
                    <tr><td>Service</td><td>The Website.</td></tr>
                    <tr><td>Service Provider</td><td>Any individual employed by the Company to facilitate or provide the Service. We do not share data with third-party service providers.</td></tr>
                    <tr><td>Usage Data</td><td>Data collected automatically from the use of the Service or its infrastructure.</td></tr>
                    <tr><td>Website</td><td>Takeover Marketing, accessible at <a href="https://tkovermarketing.com/" target="_blank" className="text-[#A60724] underline">tkovermarketing.com</a></td></tr>
                    <tr><td>You</td><td>The individual accessing or using the Service, or the legal entity on whose behalf that individual acts.</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Data Collected */}
              <div className="section" id="data-collected">
                <h2>Collecting Your Data</h2>
                <p>We collect several different types of information for various purposes to provide and improve Our Service to You.</p>
                <p>While using Our Service, We may ask You to provide personally identifiable information that can be used to contact or identify You. This may include, but is not limited to:</p>
                <ul>
                  <li>First name and last name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                </ul>

                <h3>Usage Data</h3>
                <p>Usage Data is collected automatically when using the Service and may include information such as Your device's IP address, browser type and version, pages visited, time and date of Your visit, time spent on pages, unique device identifiers, and other diagnostic data.</p>
                <p>When You access the Service through a mobile device, We may also collect information about the type of mobile device, mobile device unique ID, mobile operating system, mobile browser type, and other diagnostic data.</p>
              </div>

              {/* Opt-In & Contact */}
              <div className="section" id="opt-in">
                <h2>Opt-In &amp; Contact</h2>
                <div className="highlight-card">
                  <p>By providing Your first and last name, email address, and phone number, and opting in to receive communications from Us, You consent to being contacted by the Company using the information You have provided. We may use this information to reach out to You by email, phone call, or SMS regarding Our services, offers, updates, and other relevant communications.</p>
                  
                  <h3 className="mt-6 mb-2 text-white font-medium uppercase text-[10px] tracking-widest">SMS/Text Message Program</h3>
                  <p className="text-sm">Users opt-in to Our SMS program by providing their mobile number through Our contact forms or during the purchase process. By opting in, You agree to receive text messages related to Your inquiries, orders, and marketing updates.</p>
                  <ul className="mt-2">
                    <li><strong>Message Frequency:</strong> Message frequency varies based on Your interaction with Our Service.</li>
                    <li><strong>Opt-Out:</strong> You can cancel the SMS service at any time. Just text "STOP" to the short code or number from which You received the message. After You send the SMS message "STOP" to Us, We will send You an SMS message to confirm that You have been unsubscribed.</li>
                    <li><strong>Help:</strong> For help, You can reply with the keyword "HELP" or contact Us directly at <a href="mailto:contact@tkovermarketing.com" className="text-[#A60724] underline">contact@tkovermarketing.com</a>.</li>
                  </ul>
                  
                  <p className="mt-4 font-medium text-white">No mobile information or personal data will be shared with third parties or affiliates for any purpose. We maintain a strict policy against sharing, selling, or renting Your data to any third party.</p>
                </div>
              </div>

              {/* Cookies */}
              <div className="section" id="cookies">
                <h2>Tracking &amp; Cookies</h2>
                <p>We use Cookies and similar tracking technologies — including beacons, tags, and scripts — to track activity on Our Service and store certain information.</p>
                <p>Cookies can be <strong>Persistent</strong> (remain on Your device when offline) or <strong>Session</strong> (deleted when You close Your browser). Where required by law, non-essential cookies are used only with Your consent, which You may withdraw at any time.</p>

                <h3>Cookie Types</h3>

                <div className="cookie-block">
                  <p className="font-medium text-white mb-2">Necessary / Essential Cookies</p>
                  <p className="text-xs text-zinc-500 mb-1">Type: <span className="text-zinc-400">Session Cookies</span> &nbsp;·&nbsp; Administered by: <span className="text-zinc-400">Us</span></p>
                  <p className="text-sm text-zinc-400">Essential to provide services available through the Website and to authenticate users. Cannot be disabled without affecting core functionality.</p>
                </div>

                <div className="cookie-block">
                  <p className="font-medium text-white mb-2">Cookies Policy / Notice Acceptance Cookies</p>
                  <p className="text-xs text-zinc-500 mb-1">Type: <span className="text-zinc-400">Persistent Cookies</span> &nbsp;·&nbsp; Administered by: <span className="text-zinc-400">Us</span></p>
                  <p className="text-sm text-zinc-400">Identify if users have accepted the use of cookies on the Website.</p>
                </div>

                <div className="cookie-block">
                  <p className="font-medium text-white mb-2">Functionality Cookies</p>
                  <p className="text-xs text-zinc-500 mb-1">Type: <span className="text-zinc-400">Persistent Cookies</span> &nbsp;·&nbsp; Administered by: <span className="text-zinc-400">Us</span></p>
                  <p className="text-sm text-zinc-400">Allow Us to remember choices You make — such as login details or language preference — to provide a more personalized experience.</p>
                </div>
              </div>

              {/* Use of Data */}
              <div className="section" id="use">
                <h2>Use of Your Data</h2>
                <p>The Company uses the collected data for various purposes:</p>
                <ul>
                  <li><strong>To provide and maintain our Service</strong>, including monitoring usage.</li>
                  <li><strong>To manage Your Account</strong> and its associated functionalities.</li>
                  <li><strong>For contract performance</strong> — fulfilling purchases or other agreements made through the Service.</li>
                  <li><strong>To contact You</strong> by email, phone, SMS, or push notification regarding updates, security notices, or service-related communications.</li>
                  <li><strong>To provide news and offers</strong> about goods, services, or events similar to what You have already inquired about, unless You opt out.</li>
                  <li><strong>To manage Your requests</strong> submitted to Us.</li>
                  <li><strong>For analytics and improvement</strong> — identifying usage trends and improving our Service, products, and marketing internally.</li>
                </ul>

                <h3>Data Sharing</h3>
                <p className="mt-4 font-medium text-white italic">We do not share Your personal data or mobile information with any third parties or affiliates. All information collected is used strictly for internal purposes to provide and improve Our Service.</p>
              </div>

              {/* Retention */}
              <div className="section" id="retention">
                <h2>Data Retention</h2>
                <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy:</p>
                <table className="data-table">
                  <thead><tr><th>Category</th><th>Retention Period</th></tr></thead>
                  <tbody>
                    <tr><td>User Accounts</td><td>Duration of account relationship + up to 24 months after closure.</td></tr>
                    <tr><td>Support Tickets &amp; Correspondence</td><td>Up to 24 months from ticket closure.</td></tr>
                    <tr><td>Chat Transcripts</td><td>Up to 24 months for quality assurance.</td></tr>
                    <tr><td>Website Analytics (cookies, IP, device IDs)</td><td>Up to 24 months from collection.</td></tr>
                    <tr><td>Server Logs (IP, access times)</td><td>Up to 24 months for security and troubleshooting.</td></tr>
                  </tbody>
                </table>
                <p>Data may be retained beyond these periods for legal obligation, legal claims, Your explicit request, or technical backup limitations. When retention periods expire, data is securely deleted or anonymized.</p>
              </div>

              {/* Transfer */}
              <div className="section" id="transfer">
                <h2>Data Transfer</h2>
                <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. We do not transfer Your Personal Data to third parties.</p>
              </div>

              {/* Delete / Rights */}
              <div className="section" id="delete">
                <h2>Your Rights</h2>
                <p>You have the following rights regarding Your Personal Data:</p>
                <ul>
                  <li><strong>Access:</strong> You have the right to request a copy of the Personal Data We hold about You.</li>
                  <li><strong>Update:</strong> You have the right to request that We correct or update any inaccurate or incomplete Personal Data.</li>
                  <li><strong>Delete:</strong> You have the right to request that We delete Your Personal Data, subject to certain legal obligations.</li>
                  <li><strong>Unsubscribe:</strong> You have the right to opt-out of marketing communications at any time by using the "unsubscribe" link in emails or texting "STOP" to SMS messages.</li>
                </ul>
                <p>To exercise any of these rights, please contact Us at <a href="mailto:contact@tkovermarketing.com" className="text-[#A60724] underline">contact@tkovermarketing.com</a>. We will respond to Your request within a reasonable timeframe.</p>
                <p className="mt-4 text-xs italic">Please note that We may need to retain certain information when We have a legal obligation or lawful basis to do so.</p>
              </div>

              {/* Disclosure */}
              <div className="section" id="disclosure">
                <h2>Disclosure</h2>
                <p>The Company maintains a strict policy of non-disclosure. We do not share, sell, or disclose Your Personal Data to third parties.</p>
              </div>

              {/* Security */}
              <div className="section" id="security">
                <h2>Security</h2>
                <p>The security of Your Personal Data is important to Us. We implement a variety of security measures to maintain the safety of Your personal information:</p>
                <ul>
                  <li><strong>Encryption:</strong> We use industry-standard SSL/TLS encryption to protect data transmitted to and from Our Website.</li>
                  <li><strong>Secure Storage:</strong> Personal Data is stored on secure servers with restricted access.</li>
                  <li><strong>Access Controls:</strong> Access to Your Personal Data is limited to authorized employees who need the information to perform their jobs.</li>
                  <li><strong>Regular Audits:</strong> We periodically review Our security practices to ensure the ongoing protection of Your data.</li>
                </ul>
                <p>While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security. No method of transmission over the Internet or method of electronic storage is 100% secure.</p>
              </div>

              {/* Children */}
              <div className="section" id="children">
                <h2>Children's Privacy</h2>
                <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.</p>
              </div>

              {/* Changes */}
              <div className="section" id="changes">
                <h2>Policy Changes</h2>
                <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
                <p>You are advised to review this Privacy Policy periodically. Changes are effective when posted.</p>
              </div>

              {/* Contact */}
              <div className="section" id="contact">
                <h2>Contact Us</h2>
                <p>If You have any questions about this Privacy Policy, You can contact Us:</p>
                <div className="highlight-card">
                  <p>By email: <a href="mailto:contact@tkovermarketing.com" className="text-[#A60724] underline">contact@tkovermarketing.com</a></p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
