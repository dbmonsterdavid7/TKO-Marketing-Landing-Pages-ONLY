import { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export default function TermsOfUse() {
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

        .terms-content {
          font-family: 'DM Sans', sans-serif;
          line-height: 1.75;
          font-weight: 300;
        }

        .hero-terms {
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

        .hero-terms h1 {
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

        .section ol {
          margin: 1rem 0 1.5rem 1.5rem;
          max-width: 70ch;
          color: rgba(255, 255, 255, 0.7);
        }

        .section ol li {
          margin-bottom: 0.75rem;
          padding-left: 0.5rem;
        }

        .section strong {
          color: white;
          font-weight: 500;
        }

        .uppercase {
          text-transform: uppercase;
          font-weight: 500;
          color: white;
        }

        @media (max-width: 768px) {
          .page-wrap { grid-template-columns: 1fr; }
          nav.sidebar-nav { display: none; }
        }
      ` }} />

      <div className="terms-content relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hero-terms">
            <div className="hero-eyebrow">Takeover Marketing LLC</div>
            <h1>Terms of<br />Use</h1>
            <p className="hero-meta">Effective Date: February 9, 2026</p>
          </div>

          <div className="page-wrap">
            <nav className="sidebar-nav">
              <p className="nav-title">Contents</p>
              <ul className="nav-list">
                <li><a href="#intro">Introduction</a></li>
                <li><a href="#acceptance">1. Acceptance</a></li>
                <li><a href="#access">2. Access</a></li>
                <li><a href="#policy">3. Policy</a></li>
                <li><a href="#sale">4. Sale Terms</a></li>
                <li><a href="#duration">5. Duration</a></li>
                <li><a href="#ip">6. Intellectual Property</a></li>
                <li><a href="#user-content">7. User Content</a></li>
                <li><a href="#dmca">8. Copyright</a></li>
                <li><a href="#feedback">9. Feedback</a></li>
                <li><a href="#risk">10. Assumption of Risk</a></li>
                <li><a href="#privacy">11. Privacy</a></li>
                <li><a href="#crm">12. CRM Services</a></li>
                <li><a href="#ai">13. AI Technologies</a></li>
                <li><a href="#termination">14. Termination</a></li>
                <li><a href="#warranty">15. No Warranty</a></li>
                <li><a href="#liability">16. Limitation of Liability</a></li>
                <li><a href="#indemnity">17. Indemnification</a></li>
                <li><a href="#disputes">18. Disputes</a></li>
                <li><a href="#misc">19. Miscellaneous</a></li>
                <li><a href="#sms">20. SMS/Text Messages</a></li>
                <li><a href="#protections">21. Protections</a></li>
                <li><a href="#contact">22. Contact</a></li>
              </ul>
            </nav>

            <main className="pb-24">
              <div className="section" id="intro">
                <h2>Introduction</h2>
                <p>Welcome to the Website. This Terms of Use Agreement (the "Agreement") is made and entered into by and between you and <strong>Takeover Marketing LLC</strong> (the "Company", "us", "we", or "our"). This Agreement sets forth the terms and conditions that govern your use of and access to the Website and any products, materials, and services provided by or on the Website (collectively, the "Services").</p>
              </div>

              <div className="section" id="acceptance">
                <h2>1. Acceptance of this Agreement</h2>
                <h3>1.1 Acceptance Through Using or Accessing the Services</h3>
                <p>By accessing or using the Services (or by clicking on "accept" or "agree" to this Agreement when prompted), you agree to be bound by the terms and conditions of this Agreement on behalf of yourself or the entity or organization that you represent. If you do not agree to the terms and conditions of this Agreement, you may not use or access the Services and must exit the Website immediately.</p>
                
                <h3>1.2 Eligibility Requirements to Use or Access the Services</h3>
                <p>To use the Website or any other Services, you must be: (i) at least 18 years old, and (ii) not a competitor of or using the Services for purposes that are competitive with the Company.</p>
                <p>By accessing or using the Services, you represent and warrant that you meet all the foregoing eligibility requirements. You also represent and warrant that you have the right, authority, and capacity to enter into this Agreement on your behalf or the entity or organization that you represent. If you do not meet all these requirements, you may not use or access the Services.</p>

                <h3>1.3 Changes to this Agreement</h3>
                <p>The Company reserves the right to change this Agreement from time to time in its sole discretion. Except for changes made for legal or administrative purposes, the Company will provide reasonable advance notice before the changes become effective. All changes will apply to your use of and access to the Services from the date the changes become effective and onwards. For new users, the changes will be effective immediately.</p>
                <p>Your continued use of or access to the Services following any changes to this Agreement shall constitute your acknowledgment of such changes and agreement to be bound by the terms and conditions of such changes. You should check this page frequently so that you are aware of any changes since they are binding on you.</p>
              </div>

              <div className="section" id="access">
                <h2>2. Access to the Services</h2>
                <h3>2.1 Changes to Your Access and the Services</h3>
                <p>The Services may change from time to time as the Company evolves, refines, or adds more features to the Services. The Company reserves the right to modify, withdraw, or discontinue the Services, in whole or in part, at any time without notice to you. You agree that the Company shall have no liability to you or any third party for any losses or damages caused by the Services not being available, in whole or in part, at any time or for any period.</p>

                <h3>2.2 Creating an Account</h3>
                <p>You may be required to register for an account and provide certain information about yourself to access the Services or certain features of the Services. You promise to provide us with accurate, complete, and updated information about yourself. The Company may have different types of accounts for different users. If you connect to any Services with a third-party service, you grant us permission to access and use your information from such service as permitted by that service to store your login credentials for that service. All information that you provide will be governed by our Privacy Policy. You consent to all actions that we may take with respect to your information consistent with our Privacy Policy.</p>

                <h3>2.3 Account Responsibilities</h3>
                <p>You are entirely responsible for maintaining the confidentiality of your password and account. You are also entirely responsible for any and all activities associated with your account. Your account is personal to you and you agree not to provide any other person with access to the Services or any portions of it using your username, password, or other security information. You should ensure that you exit from your account at the end of each session. You should use extra caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information. You may not transfer your account to anyone else without our prior written permission. You agree to notify the Company immediately of any actual or suspected unauthorized use of your account or any other breach of security. The Company will not be liable for any losses or damages arising from your failure to comply with the above requirements. You will be held liable for losses or damages incurred by the Company or any third party due to someone else using your account or password.</p>

                <h3>2.4 Termination or Deletion of an Account</h3>
                <p>The Company shall have the right to suspend or terminate your account at any time in our sole discretion for any or no reason, including if we determine that you have violated any terms or conditions of this Agreement.</p>
              </div>

              <div className="section" id="policy">
                <h2>3. Policy for Using the Services</h2>
                <h3>3.1 Prohibited Uses</h3>
                <p>You may use the Services for lawful purposes only and in accordance with this Agreement. You agree not to use the Services in any way that could damage the Services or general business of the Company. You may use the Services for any business or commercial purposes.</p>

                <h3>3.2 Prohibited Activities</h3>
                <p>You further agree not to engage in any of the following prohibited activities in connection with using the Services:</p>
                <ol type="a">
                  <li><strong>No Violation of Laws or Obligations.</strong> Violate any applicable laws or regulations (including intellectual property laws and right of privacy or publicity laws) or any contractual obligations.</li>
                  <li><strong>No Unsolicited Communications.</strong> Send any unsolicited or unauthorized advertising, promotional materials, spam, junk mail, chain letters, or any other form of unsolicited communications, whether commercial or otherwise.</li>
                  <li><strong>No Impersonation.</strong> Impersonate others or otherwise misrepresent your affiliation with a person or entity in an attempt to mislead, confuse, or deceive others.</li>
                  <li><strong>No Harming of Minors.</strong> Exploit or harm minors in any way, including exposing inappropriate content or obtaining personally identifiable information.</li>
                  <li><strong>Compliance with Content Standards.</strong> Upload, display, distribute, or transmit any material that does not comply with the Content Standards set out below in this Agreement.</li>
                  <li><strong>No Interference with Others' Enjoyment.</strong> Harass or interfere with anyone's use or enjoyment of the Services, or expose the Company or other users to liability or other harm.</li>
                  <li><strong>No Interference or Disabling of the Services.</strong> Use any device, software, or routine that interferes with the proper working of the Services, or take any action that may interfere with, disrupt, disable, impair, or create an undue burden on the infrastructure of the Services, including servers or networks connected to the Website.</li>
                  <li><strong>No Monitoring or Copying Material.</strong> Copy, monitor, distribute, or disclose any part of the Services by automated or manual processes, devices, or means. This includes, without limitation, using automatic devices such as robots, spiders, offline readers, crawlers, or scrapers to strip, scrape, or mine data from the Website; provided, however, that the Company conditionally grants to the operators of public search engines revocable permission to use spiders to copy materials from the Website for the sole purpose of and solely to the extent necessary for creating publicly available searchable indices of the materials, but not caches or archives of such materials.</li>
                  <li><strong>No Viruses, Worms, or Other Damaging Software.</strong> Upload, transmit, or distribute to or through the Services any viruses, Trojan horses, worms, logic bombs, or other materials intended to damage or alter the property of others, including attacking the Services via a denial-of-service or distributed denial-of-service attack.</li>
                  <li><strong>No Unauthorized Access or Violation of Security.</strong> Violate the security of the Services through (i) any attempt to gain unauthorized access to the Services or to other systems or networks connected to the Services, (ii) the breach or circumvention of encryption or other security codes or tools, or (iii) data mining or interference to any server, computer, database, host, user, or network connected to the Services.</li>
                  <li><strong>No Reverse Engineering.</strong> Reverse engineer, decompile, or otherwise attempt to obtain the source code or underlying information of or relating to the Services.</li>
                  <li><strong>No Collecting User Data.</strong> Collect, harvest, or assemble any data or information regarding any other user without their consent. This includes, without limitation, their emails, usernames, or passwords.</li>
                  <li><strong>No Other Interference.</strong> Otherwise attempt to interfere with the proper working of the Services.</li>
                  <li><strong>Attempt or Assist Others in Attempting.</strong> Attempt any of the foregoing or assist, permit, or encourage others to do or attempt any of the foregoing.</li>
                </ol>

                <h3>3.3 Geographic Restrictions</h3>
                <p>The Company is based in the United States of America, in the State of Michigan. The Services are for use by persons located in the United States & Canada only. By choosing to access the Services from any location other than the United States or Canada, you accept full responsibility for compliance with all local laws. The Company makes no representations that the Services or any of its content are accessible or appropriate outside of the United States or Canada.</p>
              </div>

              <div className="section" id="sale">
                <h2>4. Terms and Conditions of Sale</h2>
                <h3>4.1 Purchasing Process</h3>
                <p>Any steps taken from choosing Services to order submission form part of the purchasing process. The purchasing process includes these steps:</p>
                <ol type="a">
                  <li>By clicking on the checkout button, users open the third-party merchant checkout section, wherein they will have to specify their contact details and a payment method of their choice.</li>
                  <li>After providing all the required information, users must carefully review the order and, subsequently, confirm and submit it by using the relevant button or mechanism on the Website, hereby accepting these Terms and committing to pay the agreed-upon price.</li>
                </ol>

                <h3>4.2 Order Submission</h3>
                <p>When you submit an order, the following applies:</p>
                <ol type="a">
                  <li>The submission of an order determines contract conclusion and therefore creates for you the obligation to pay the price, taxes, and possible further fees and expenses, as specified on the order page.</li>
                  <li>In case the purchased Services requires active input from you, such as the provision of personal information or data, specifications or special wishes, the order submission creates an obligation for you to cooperate accordingly.</li>
                  <li>Upon submission of the order, users will receive a receipt confirming that the order has been received.</li>
                </ol>
                <p>All notifications related to the described purchasing process shall be sent to the email address provided by you for such purposes.</p>

                <h3>4.3 Prices</h3>
                <p>You are informed during the purchasing process and before order submission, about any fees, taxes and costs (including, if any, delivery costs) that you will be charged.</p>

                <h3>4.4 Methods of Payment</h3>
                <p>Information related to accepted payment methods are made available during the purchasing process. Some payment methods may only be available subject to additional conditions or fees. In such cases, related information can be found in the dedicated section of the Website. All payments are independently processed through third-party services. Therefore, the Website does not collect any payment information – such as credit card details – but only receives a notification once the payment has been successfully completed. If payment through the available methods fail or is refused by the payment service provider, the Company shall be under no obligation to fulfill the purchase order. Any possible costs or fees resulting from the failed or refused payment shall be borne by you.</p>

                <h3>4.5 Retention of Usage Rights</h3>
                <p>You do not acquire any rights to use the purchased Services until the total purchase price is received by the Company.</p>
              </div>

              <div className="section" id="duration">
                <h2>5. Contract Duration</h2>
                <h3>5.1 Subscriptions</h3>
                <p>Subscriptions allow you to receive Services continuously or regularly over a determined period of time. Paid subscriptions begin on the day the payment is received by the Company. In order to maintain subscriptions, you must pay the required recurring fee in a timely manner. Failure to do so may cause service interruptions.</p>

                <h3>5.2 Fixed-term Subscriptions</h3>
                <p>Paid fixed-term subscriptions start on the day the payment is received by the Company and last for the subscription period chosen by you or otherwise specified during the purchasing process. Once the subscription period expires, the Services shall no longer be accessible, unless you renew the subscription by paying the relevant fee. Fixed-term subscriptions may not be terminated prematurely and shall run out upon expiration of the subscription term.</p>

                <h3>5.3 Automatic Renewal</h3>
                <p>Subscriptions are automatically renewed through the payment method that you chose during purchase unless you cancel the subscription within the deadlines for termination specified in the relevant section of these Terms and/or Website. The renewed subscription will last for a period equal to the original term. You shall receive a reminder of the upcoming renewal with reasonable advance, outlining the procedure to be followed in order to cancel the automatic renewal.</p>

                <h3>5.4 Termination</h3>
                <p>Recurring subscriptions may be terminated at any time by sending a clear and unambiguous termination notice to the Company using the contact details provided in this document, or — if applicable — by using the corresponding controls inside the Website. Termination will be effective at the end of the current billing period.</p>

                <h3>5.5 Termination Notice</h3>
                <p>If the notice of termination is received by the Company before the subscription renews, the termination shall take effect as soon as the current period is completed.</p>
              </div>

              <div className="section" id="ip">
                <h2>6. Intellectual Property Rights</h2>
                <h3>6.1 Ownership of Intellectual Property</h3>
                <p>You acknowledge that all intellectual property rights, including copyrights, trademarks, trade secrets, and patents, in the Services and its contents, features, and functionality (collectively, the "Content"), are owned by the Company, its licensors, or other providers of such material. The Content is protected by U.S. and international intellectual property or proprietary rights laws. Neither this Agreement nor your access to the Services transfers to you any right, title, or interest in or to such intellectual property rights. Any rights not expressly granted in this Agreement are reserved by the Company and its licensors.</p>

                <h3>6.2 License to Use the Services</h3>
                <p>During the Term of this Agreement, the Company grants you a limited, non-exclusive, non-transferable, non-sublicensable, and revocable license to use and access the Content for any business or commercial use in accordance with this Agreement. The Content may not be used for any other purpose. This license will terminate upon your cessation of use of the Services or at the termination of this Agreement.</p>

                <h3>6.3 Certain Restrictions</h3>
                <p>The rights granted to you in this Agreement are subject to the following restrictions:</p>
                <ol type="a">
                  <li><strong>No Copying or Distribution.</strong> You shall not copy, reproduce, publish, display, perform, post, transmit, or distribute any part of the Content in any form or by any means except as expressly permitted herein or as enabled by a feature, product, or the Services when provided to you.</li>
                  <li><strong>No Modifications.</strong> You shall not modify, create derivative works from, translate, adapt, disassemble, reverse compile, or reverse engineer any part of the Content.</li>
                  <li><strong>No Exploitation.</strong> You shall not sell, license, sublicense, transfer, assign, rent, lease, loan, host, or otherwise exploit the Content or the Services in any way, whether in whole or in part.</li>
                  <li><strong>No Altering of Notices.</strong> You shall not delete or alter any copyright, trademark, or other proprietary rights notices from copies of the Content.</li>
                  <li><strong>No Competition.</strong> You shall not access or use the Content in order to build a similar or competitive website, product, or service.</li>
                  <li><strong>Systematic Retrieval.</strong> You shall not use any information retrieval system to create, compile, directly or indirectly, a database, compilation, collection or directory of the Content or other data from the Services.</li>
                </ol>

                <h3>6.4 Trademark Notice</h3>
                <p>All trademarks, logos, and service marks displayed on the Services are either the Company's property or the property of third parties. You may not use such trademarks, logos, or service marks without the prior written consent of their respective owners.</p>
              </div>

              <div className="section" id="user-content">
                <h2>7. User Content</h2>
                <h3>7.1 User Generated Content</h3>
                <p>The Services may contain message boards, chatrooms, profiles, forums, and other interactive features that allow users to post, upload, submit, publish, display, or transmit to other users or other persons content or materials (collectively, "User Content") on or through the Services.</p>
                <p>You are solely responsible for your User Content. Please consider carefully what you choose to share. All User Content must comply with the Content Standards set forth below. Any User Content you post on or through the Services will be considered non-confidential and non-proprietary. You assume all risks associated with the use of your User Content. This includes any reliance on its accuracy, completeness, reliability, or appropriateness by other users and third parties, or any disclosure of your User Content that personally identifies you or any third party. You agree that the Company shall not be responsible or liable to any third party for any User Content posted by you or any other user of the Services.</p>
                <p>You further agree that the Company shall not be responsible for any loss or damage incurred as the result of any interactions between you and other users. Your interactions with other users are solely between you and such users. If there is a dispute between you and any other user, we are under no obligation to become involved.</p>

                <h3>7.2 License</h3>
                <p>You hereby grant to the Company an irrevocable, non-exclusive, royalty-free and fully paid, transferable, perpetual, and worldwide license to reproduce, distribute, publicly display and perform, prepare derivative works of, incorporate into other works, and otherwise use and exploit your User Content, and to grant sublicenses of the foregoing rights, in connection with the Services and the Company's business including, without limitation, for promoting and redistributing part or all of the Services in any media formats and through any media channels.</p>
                <p>You represent and warrant that you have all the rights, power, and authority necessary to grant the rights granted herein to any User Content that you submit. You hereby irrevocably waive all claims and have no recourse against us for any alleged or actual infringement or misappropriation of any proprietary rights in any communication, content, or material submitted to us. Please note that all of the following licenses are subject to our Privacy Policy to the extent they relate to any User Content that contains any personally identifiable information.</p>

                <h3>7.3 Content Standards</h3>
                <p>You agree not to send, knowingly receive, upload, transmit, display, or distribute any User Content that does not comply with the following standards ("Content Standards"). User Content must not:</p>
                <ol type="a">
                  <li><strong>Violate Laws or Obligations.</strong> Violate any applicable laws or regulations (including intellectual property laws and right of privacy or publicity laws), or any contractual or fiduciary obligations.</li>
                  <li><strong>Promote Illegal Activity or Harm to Others.</strong> Promote any illegal activity; advocate, promote, or assist any unlawful act; or create any risk of any harm, loss, or damage to any person or property.</li>
                  <li><strong>Infringe Intellectual Property Rights.</strong> Infringe any copyright, trademark, patent, trade secret, moral right, or other intellectual property rights of any other person.</li>
                  <li><strong>Defamatory, Abusive, or Otherwise Objectionable Material.</strong> Contain any information or material that we deem to be unlawful, defamatory, trade libelous, invasive of another's privacy or publicity rights, abusive, threatening, harassing, harmful, violent, hateful, obscene, vulgar, profane, indecent, offensive, inflammatory, humiliating to other people (publicly or otherwise), or otherwise objectionable. This includes any information or material that we deem to cause annoyance, inconvenience, or needless anxiety, or be likely to upset, embarrass, alarm, or annoy another person.</li>
                  <li><strong>Promotion of Sexually Explicit Material or Discrimination.</strong> Promote sexually explicit or pornographic material, violence, or discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age.</li>
                  <li><strong>Fraudulent Information or Impersonation.</strong> Contain any information or material that is false, intentionally misleading, or otherwise likely to deceive any person including, without limitation, impersonating any person, or misrepresenting your identity or affiliation with any person or organization.</li>
                  <li><strong>Endorsement by the Company.</strong> Represent or imply to others that it is in any way provided, sponsored, or endorsed by the Company or any other person or entity, if that is not the case.</li>
                </ol>

                <h3>7.4 Monitoring and Enforcement</h3>
                <p>We reserve the right at all times, but are not obligated, to:</p>
                <ol type="a">
                  <li>Take any action with respect to any User Content that we deem necessary or appropriate in our sole discretion, including if we believe that such User Content violates the Content Standards or any other provision in this Agreement, or creates liability for the Company or any other person. Such action may include reporting you to law enforcement authorities.</li>
                  <li>Remove or reject any User Content for any or no reason in our sole discretion.</li>
                  <li>Disclose any User Content, your identity, or electronic communication of any kind to satisfy any law, regulation, or government request, or to protect the rights or property of the Company or any other person.</li>
                  <li>Terminate or suspend your access to all or part of the Services for any or no reason, including without limitation, any violation of this Agreement.</li>
                </ol>
                <p>We do not review User Content before it is posted on or through the Services, and therefore cannot ensure prompt removal of questionable User Content. Accordingly, the Company and its affiliates, and their respective officers, directors, employees or agents, assume no liability for any action or inaction regarding transmissions, communications, or content provided by any user or third party. The Company shall have no liability or responsibility to anyone for performance or non-performance of the activities described in this Section.</p>
              </div>

              <div className="section" id="dmca">
                <h2>8. Copyright Infringement (Digital Millennium Copyright Act Policy)</h2>
                <p>The Company respects the intellectual property of others and expects users of the Services to do the same. It is the Company's policy to terminate the users of our Services who are repeat infringers of intellectual property rights, including copyrights. If you believe that your work has been copied in a way that constitutes copyright infringement and wish to have the allegedly infringing material removed, please provide the following information in accordance with the Digital Millennium Copyright Act to our designated copyright agent:</p>
                <ol type="a">
                  <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf;</li>
                  <li>A description of the copyrighted work that you allege has been infringed;</li>
                  <li>A description of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled;</li>
                  <li>A description of where the material that you claim is infringing is located;</li>
                  <li>Your contact information, including your address, telephone number, and email address;</li>
                  <li>A statement that you have a good faith belief that use of the objectionable material is not authorized by the copyright owner, its agent, or under the law; and</li>
                  <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                </ol>
                <p>Please note that pursuant to 17 U.S.C. § 512(f), any misrepresentation of material fact in a written notification automatically subjects the complaining party to liability for any damages, costs, and attorneys' fees incurred by us in connection with the written notification and allegation of copyright infringement.</p>
                <p>Designated copyright agent for the Company: EMAIL: <strong>contact@tkovermarketing.com</strong></p>
              </div>

              <div className="section" id="feedback">
                <h2>9. Feedback to the Company</h2>
                <p>If you provide the Company with any feedback or suggestions regarding the Services ("Feedback"), you hereby assign to the Company all rights in such Feedback and agree that the Company shall have the right to use and fully exploit such Feedback and related information in any manner it deems appropriate. The Company will treat any Feedback that you provide to the Company as non-confidential and non-proprietary. You agree that you will not submit to the Company any information or ideas that you consider to be confidential or proprietary.</p>
              </div>

              <div className="section" id="risk">
                <h2>10. Assumption of Risk</h2>
                <p>The information presented on or through the Services is made available for general information purposes only. The Company does not warrant the accuracy, completeness, suitability, or quality of any such information. Any reliance on such information is strictly at your own risk. The Company disclaims all liability and responsibility arising from any reliance placed on such information by you or any other user to the Services, or by anyone who may be informed of any of its contents.</p>
              </div>

              <div className="section" id="privacy">
                <h2>11. Privacy</h2>
                <p>For information about how the Company collects, uses, and shares your information, please review our Privacy Policy.</p>
                <p>All text messaging originator opt-in data and consent information will not be shared with any third parties, excluding aggregators and providers of the Text Message services necessary to deliver the SMS service. Your mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.</p>
                <p>You agree that by using the Services you consent to the collection, use, and sharing (as set forth in the Privacy Policy) of such information.</p>
              </div>

              <div className="section" id="crm">
                <h2>12. White-Labeled HighLevel CRM Services</h2>
                <h3>12.1 Third-Party Platform</h3>
                <p>We provide white-labeled HighLevel CRM services to our clients. You acknowledge and agree that HighLevel CRM is a third-party platform that we provide access to under our brand. The actual software, servers, and infrastructure are owned and operated by GoHighLevel.</p>

                <h3>12.2 Limitation of Liability</h3>
                <p>We are not responsible for any issues, outages, data breaches, or other problems that may occur with the HighLevel platform. This includes but is not limited to: service interruptions or downtime, data loss or corruption, security breaches or unauthorized access to data, changes to the HighLevel platform's features or functionality, and any other technical issues related to the HighLevel platform.</p>

                <h3>12.3 Support for Platform Issues</h3>
                <p>For any issues related to the core functionality of the HighLevel platform, you acknowledge that you may need to contact GoHighLevel directly at gohighlevel.com.</p>

                <h3>12.4 Data Processing</h3>
                <p>When you use our white-labeled HighLevel CRM services, you acknowledge that your data may be processed according to GoHighLevel's own privacy policy and terms of service, in addition to our policies.</p>

                <h3>12.5 Service Continuity</h3>
                <p>We cannot guarantee the continued availability of the HighLevel platform or its features, as these decisions are made by GoHighLevel and are beyond our control.</p>

                <h3>12.6 Acceptance of Risk</h3>
                <p>By using our white-labeled HighLevel CRM services, you accept all risks associated with using a third-party platform and agree to hold us harmless for any issues arising from GoHighLevel's platform, services, or decisions.</p>
              </div>

              <div className="section" id="ai">
                <h2>13. AI Technologies and Services</h2>
                <h3>13.1 AI-Powered Features</h3>
                <p>Our Services may include or incorporate artificial intelligence ("AI") technologies, including but not limited to: AI-powered text and voice agents for customer support, automated content generation and recommendations, AI-enhanced analytics and reporting tools, AI-driven quality assurance systems, natural language processing capabilities, and voice recognition and speech-to-text conversion.</p>

                <h3>13.2 Your Interactions with AI Systems</h3>
                <p>By using our AI-powered features, you acknowledge and agree that: you may be interacting with automated AI systems rather than human agents in some instances; AI-generated responses and content are created through algorithmic processes; AI systems may analyze patterns in your data and interactions to provide personalized services; we will clearly disclose when you are interacting with an AI system versus a human agent; and you can request human intervention at any point during AI interactions.</p>

                <h3>13.3 Data Collection for AI Systems</h3>
                <p>Our AI systems collect and process data from your interactions with our Services. This includes text inputs and responses in chats or messages, voice recordings when you use voice-enabled features, usage patterns and preferences, content you create or share through our Services, and technical information about your use of the Services. All data collection and processing for AI purposes is subject to our Privacy Policy.</p>

                <h3>13.4 AI Training and Improvement</h3>
                <p>You acknowledge and agree that we may use data from your interactions with our Services to train, improve, and develop our AI systems, subject to the following conditions: we will anonymize and aggregate data when possible to protect your privacy; we implement appropriate security measures to protect any data used for AI training; we will not use your confidential business information to train AI systems without your explicit consent; and you can opt out of having your data used for AI training by contacting us at <strong>contact@tkovermarketing.com</strong>.</p>

                <h3>13.5 AI-Generated Content</h3>
                <p>When our Services generate content using AI technologies: we do not guarantee the accuracy, completeness, or appropriateness of AI-generated content; you are responsible for reviewing and verifying any AI-generated content before using it for business or other purposes; AI-generated content should not be relied upon as professional advice (legal, medical, financial, etc.); we reserve the right to monitor and moderate AI-generated content; and we may remove any AI-generated content that violates our policies or applicable laws.</p>

                <h3>13.6 AI Voice Technologies</h3>
                <p>When using our AI voice technologies and services: voice recordings may be processed to provide the requested service and to improve our systems; you will be notified before voice recording begins; voice data may be transcribed into text for further processing; we implement security measures to protect voice data from unauthorized access; and you can request deletion of your voice recordings by contacting <strong>contact@tkovermarketing.com</strong>.</p>

                <h3>13.7 Intellectual Property for AI-Generated Content</h3>
                <p>With respect to content generated by our AI technologies: the Company retains all intellectual property rights in the AI systems and technologies themselves; for content generated by our AI systems based on your inputs or instructions, you receive a license to use such content for your business purposes; this license is non-exclusive, worldwide, and royalty-free; you may not claim ownership of the underlying AI algorithms or models; we reserve the right to generate similar content for other users; and you are responsible for ensuring your use of AI-generated content does not infringe third-party rights.</p>

                <h3>13.8 AI Usage Limitations</h3>
                <p>You agree not to use our AI technologies to: generate, upload, or distribute content that violates our Content Standards or applicable laws; create deepfakes or other misleading synthetic media without proper disclosure; impersonate individuals without their consent; engage in automated spamming or harassment; attempt to manipulate, test boundaries, or evaluate the AI systems in ways that could cause harm; attempt to extract training data, model parameters, or proprietary information; or use the AI systems to develop competing products or services.</p>

                <h3>13.9 Transparency and Human Oversight</h3>
                <p>We are committed to responsible AI use, including: clear disclosure when content is AI-generated or when you are interacting with AI systems; maintaining human oversight and supervision of our AI systems; regular evaluation and testing of AI systems for bias, safety, and security; providing mechanisms for you to report concerns about AI-generated content or interactions; and offering options to request human intervention when interacting with AI systems.</p>

                <h3>13.10 Changes to AI Technologies</h3>
                <p>Our AI technologies are continuously evolving. We reserve the right to: modify, update, or discontinue any AI features without prior notice; change how our AI systems process or use data; introduce new capabilities or restrictions to our AI features; and adjust pricing for AI-powered features as technology and costs evolve. We will notify you of significant changes through updates to these Terms or direct communications.</p>

                <h3>13.11 Third-Party AI Technologies</h3>
                <p>Some of our AI-powered features may incorporate technologies from third-party providers. When using these features: your data may be processed according to both our terms and the third-party provider's terms; we have agreements with third-party AI providers to protect your data; we are not responsible for changes, discontinuations, or issues caused by third-party AI providers; and we will make reasonable efforts to notify you of significant changes to third-party AI services.</p>

                <h3>13.12 Assumption of Risk for AI Technologies</h3>
                <p>You acknowledge and accept that: AI technologies are rapidly evolving and may contain errors or limitations; AI systems may occasionally produce unexpected, inaccurate, or inappropriate outputs; the use of AI-generated content or decisions based on AI recommendations are at your own risk; we are continuously improving our systems but cannot guarantee perfect performance; and you will exercise appropriate caution and judgment when using AI-generated content.</p>
              </div>

              <div className="section" id="termination">
                <h2>14. Termination</h2>
                <h3>14.1 Termination</h3>
                <p>The Company may suspend or terminate your access or rights to use the Services at any time, for any reason, in our sole discretion, and without prior notice, including for any breach of the terms of this Agreement. Upon termination of your access or rights to use the Services, your right to access and use the Services will immediately cease. The Company will not have any liability whatsoever to you for any suspension or termination of your rights under this Agreement, including for termination of your account or deletion of your User Content. If you have registered for an account, you may terminate this Agreement at any time by contacting the Company and requesting termination.</p>

                <h3>14.2 Effect of Termination</h3>
                <p>Upon termination of this Agreement, any provisions that by their nature should survive termination shall remain in full force and effect. This includes, without limitation, ownership or intellectual property provisions, warranty disclaimers, and limitations of liability. Termination of your access to and use of the Services shall not relieve you of any obligations arising or accruing prior to termination or limit any liability that you otherwise may have to the Company or any third party. You understand that any termination of your access to and use of the Services may involve deletion of your User Content associated with your account from our databases.</p>
              </div>

              <div className="section" id="warranty">
                <h2>15. No Warranty</h2>
                <p className="uppercase">THE SERVICES ARE PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS. USE OF THE SERVICES IS AT YOUR OWN RISK. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES ARE PROVIDED WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT.</p>
                <p className="uppercase">WITHOUT LIMITING THE FOREGOING, THE COMPANY AND ITS LICENSORS DO NOT WARRANT THAT THE CONTENT IS ACCURATE, RELIABLE, COMPLETE, OR CORRECT; THAT THE SERVICES WILL MEET YOUR REQUIREMENTS; THAT THE SERVICES WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION, UNINTERRUPTED, ERROR-FREE, OR SECURE; THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; THAT THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR THAT THE SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR REQUIREMENTS OR EXPECTATIONS. TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE TO YOUR COMPUTER SYSTEM, MOBILE DEVICE, DATA, OR OTHER PROPRIETARY MATERIAL THAT MAY RESULT FROM YOUR USE OF THE SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES OR YOUR DOWNLOADING OF ANY MATERIAL POSTED ON THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICES ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES OR THIRD-PARTY LINKS, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY MONITOR ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES OR ANY OTHER USER.</p>
                <p className="uppercase">THE SERVICES WOULD NOT BE PROVIDED WITHOUT THESE LIMITATIONS. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US THROUGH THE SERVICES SHALL CREATE ANY WARRANTY, REPRESENTATION, OR GUARANTEE NOT EXPRESSLY STATED IN THIS AGREEMENT. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU. IF APPLICABLE LAW REQUIRES ANY WARRANTIES WITH RESPECT TO THE SERVICES, ALL SUCH WARRANTIES ARE LIMITED IN DURATION TO NINETY (90) DAYS FROM THE DATE OF FIRST USE.</p>
              </div>

              <div className="section" id="liability">
                <h2>16. Limitation of Liability</h2>
                <p className="uppercase">TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY OR ITS AFFILIATES, OR THEIR RESPECTIVE LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICES, ANY THIRD-PARTY LINK, OR ANY CONTENT ON THE SERVICES OR SUCH THIRD-PARTY LINK, INCLUDING, WITHOUT LIMITATION, ANY LOSS OF USE, REVENUE, OR PROFIT, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF DATA, LOSS OF GOODWILL, OR DIMINUTION IN VALUE, OR FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, OR PUNITIVE DAMAGES WHETHER ARISING OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, REGARDLESS OF WHETHER SUCH DAMAGE WAS FORESEEABLE AND WHETHER OR NOT THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. YOUR SOLE REMEDY FOR DISSATISFACTION WITH THE SERVICES IS TO STOP USING THE SERVICES.</p>
                <p className="uppercase">IN NO EVENT SHALL THE COMPANY'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION EXCEED THE GREATER OF (A) THE AMOUNT PAID BY YOU TO THE COMPANY IN THE SIX (6) MONTHS PRIOR TO THE EVENT GIVING RISE TO THE LIABILITY OR (B) ONE HUNDRED DOLLARS ($100.00).</p>
                <p className="uppercase">SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO THE ABOVE LIMITATION AND EXCLUSIONS MAY NOT APPLY TO YOU.</p>
              </div>

              <div className="section" id="indemnity">
                <h2>17. Indemnification</h2>
                <p>You agree to indemnify, defend, and hold harmless the Company and its affiliates and their respective officers, directors, employees, agents, affiliates, successors, and permitted assigns (collectively, "Indemnified Party") from and against any and all losses, claims, actions, suits, complaints, damages, liabilities, penalties, interest, judgments, settlements, deficiencies, disbursements, awards, fines, costs, fees, or expenses of whatever kind, including reasonable attorneys' fees, fees and other costs of enforcing any right to indemnification under this Agreement, and the cost of pursuing any insurance providers, arising out of or relating to your breach of this Agreement or your use or misuse of the Services including, but not limited to, your User Content or any actions taken by a third party using your account. The Company reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to assist and cooperate with our defense or settlement of these claims.</p>
              </div>

              <div className="section" id="disputes">
                <h2>18. Disputes</h2>
                <h3>18.1 Governing Law</h3>
                <p>All matters relating to this Agreement, and all matters arising out of or relating to this Agreement, whether sounding in contract, tort, or statute are governed by, and construed in accordance with, the laws of the State of Michigan, without giving effect to any conflict of law principles.</p>

                <h3>18.2 Dispute Resolution and Mandatory Arbitration</h3>
                <p className="uppercase">BY PURCHASING OR USING ANY OF OUR PRODUCTS OR SERVICES, YOU EXPRESSLY AGREE THAT YOU WILL RESOLVE ANY DISPUTE THROUGH BINDING ARBITRATION AND WAIVE YOUR RIGHT TO BRING OR PARTICIPATE IN ANY LAWSUIT AGAINST THE COMPANY.</p>
                <p>Any dispute, claim, or controversy arising out of or relating to this Agreement, the breach, termination, enforcement, interpretation, or validity thereof, or the use of the Services (collectively, "Disputes") SHALL BE SETTLED BY BINDING ARBITRATION and not in a court of law. The arbitration shall be administered by the American Arbitration Association in accordance with its Commercial Arbitration Rules in the State of Michigan, United States. The arbitration shall be conducted by a single arbitrator selected in accordance with the rules of the American Arbitration Association.</p>
                <p>The arbitrator's award shall be final and binding on all parties and may be entered and enforced in any court of competent jurisdiction. To the fullest extent permitted by applicable law, no arbitration under this Agreement shall be joined to an arbitration involving any other party subject to this Agreement, whether through class arbitration proceedings or otherwise. The prevailing party in the arbitration proceedings shall be awarded reasonable attorneys' fees, expert witness costs and expenses, and all other costs and expenses incurred directly or indirectly in connection with the proceedings, unless the arbitrator shall for good cause determine otherwise.</p>
                <p>All arbitrations shall proceed on an individual basis. You agree that you may bring claims against the Company in arbitration only in your individual capacities and in so doing you hereby waive the right to a trial by jury, to assert or participate in a class action lawsuit or class action arbitration (either as a named-plaintiff or class member), and to assert or participate in any joint or consolidated lawsuit or joint or consolidated arbitration of any kind. Notwithstanding anything to the contrary under the rules of the American Arbitration Association, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding. If a court decides that applicable law precludes enforcement of any of this paragraph's limitations as to a particular claim for relief, then that claim (and only that claim) must be severed from the arbitration and may be brought in court.</p>
                <p className="uppercase">YOU UNDERSTAND AND AGREE THAT BY ENTERING INTO THESE TERMS, YOU ARE WAIVING THE RIGHT TO TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.</p>

                <h3>18.3 Limitation to Time to File Claims</h3>
                <p className="uppercase">ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE SERVICES MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION AROSE; OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY WAIVED AND BARRED.</p>
              </div>

              <div className="section" id="misc">
                <h2>19. Miscellaneous</h2>
                <h3>19.1 Waiver</h3>
                <p>Except as otherwise set forth in this Agreement, no failure of the Company to exercise, or delay by the Company in exercising, any right, remedy, power, or privilege arising from this Agreement shall operate or be construed as a waiver thereof, nor shall any single or partial exercise of any right, remedy, power, or privilege hereunder preclude any other or further exercise thereof or the exercise of any other right, remedy, power, or privilege.</p>

                <h3>19.2 Severability</h3>
                <p>If any term or provision of this Agreement is found by a court of competent jurisdiction to be invalid, illegal, or unenforceable, such invalidity, illegality, or unenforceability shall not affect any other term or provision of this Agreement or invalidate or render unenforceable such term or provision in any other jurisdiction.</p>

                <h3>19.3 Entire Agreement</h3>
                <p>This Agreement, together with all documents referenced herein, constitutes the entire agreement between you and the Company with respect to the subject matter contained herein. This Agreement supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, with respect to the subject matter hereof.</p>

                <h3>19.4 Headings</h3>
                <p>Headings and titles of sections, clauses, and parts in this Agreement are for convenience only. Such headings and titles shall not affect the meaning of any provisions of the Agreement.</p>

                <h3>19.5 No Agency, Partnership or Joint Venture</h3>
                <p>No agency, partnership, or joint venture has been created between you and the Company as a result of this Agreement. You do not have any authority of any kind to bind the Company in any respect whatsoever.</p>

                <h3>19.6 Assignment</h3>
                <p>You shall not assign or delegate any of your rights or obligations under this Agreement without the prior written consent of the Company. Any purported assignment or delegation in violation of this Section shall be deemed null and void. No assignment or delegation shall relieve you of any of your obligations hereunder. The Company may freely assign or delegate its rights and obligations under this Agreement at any time. Subject to the limits on assignment stated above, this Agreement will inure to the benefit of, be binding on, and be enforceable against each of the parties hereto and their respective successors and assigns.</p>

                <h3>19.7 Export Laws</h3>
                <p>The Services may be subject to U.S. export control laws and regulations. You agree to abide by these laws and their regulations (including, without limitation, the Export Administration Act and the Arms Export Control Act) and not to transfer, by electronic transmission or otherwise, any materials from the Services to either a foreign national or a foreign destination in violation of such laws or regulations.</p>

                <h3>19.8 Force Majeure</h3>
                <p>The Company shall not be liable or responsible to you, nor be deemed to have defaulted under or breached this Agreement, for any failure or delay in performance when and to the extent such failure or delay is caused by or results from acts beyond the Company's reasonable control, including, without limitation: acts of God; flood, fire, earthquake, explosion, or other natural disaster; epidemic or pandemic; war, invasion, hostilities, terrorist threats or acts, riot or other civil unrest; government order, law, or actions; embargoes or blockades; national or regional emergency; strikes, labor stoppages or slowdowns, or other industrial disturbances; shortage of adequate power or telecommunications or transportation facilities; or any other similar events.</p>

                <h3>19.9 Compliance with Laws</h3>
                <p>You agree to comply with all applicable domestic and international laws, statutes, ordinances, and regulations regarding your use of the Services and your listing, purchase, solicitation of offers to purchase, and sale of items.</p>

                <h3>19.10 No Third-Party Beneficiaries</h3>
                <p>This Agreement is for the sole benefit of the parties hereto and their respective successors and permitted assigns and nothing herein, express or implied, is intended to or shall confer upon any other person or entity any legal or equitable right, benefit, or remedy of any nature whatsoever under or by reason of this Agreement.</p>
              </div>

              <div className="section" id="sms">
                <h2>20. SMS/Text Messages</h2>
                <h3>20.1 SMS Program Description</h3>
                <p>Our SMS program provides text messages for appointment reminders, events, receipts, customer service, and occasionally promotional messages when you opt in. Message frequency varies depending on your interaction with our services.</p>

                <h3>20.2 Opting Out</h3>
                <p>You can cancel the SMS service at any time. Simply text "STOP" to the shortcode (number provided). Upon sending "STOP," we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, or text "START" to resume receiving messages.</p>

                <h3>20.3 Help and Support</h3>
                <p>If you experience issues with the messaging program, reply with the keyword "HELP" for more assistance or email <strong>contact@tkovermarketing.com</strong>.</p>

                <h3>20.4 Carrier Liability</h3>
                <p>Carriers are not liable for delayed or undelivered messages.</p>

                <h3>20.5 Message and Data Rates</h3>
                <p>Message and data rates may apply for messages sent to you from us and from you to us. Message frequency varies. For questions about your text plan or data plan, contact your wireless provider.</p>

                <h3>20.6 Recurring Messages Disclosure</h3>
                <p>By opting into our SMS program, you authorize us to send recurring text messages to the mobile phone number you provide. Depending on your service selection, you may receive regular recurring messages. You are not required to agree to receive recurring messages as a condition of purchasing any goods or services.</p>

                <h3>20.7 Prohibited Content</h3>
                <p>Our SMS messages will never contain: phishing attempts, smishing, or social engineering to manipulate you into sharing private information; illegal content (all content complies with federal and state laws); or SHAFT content (sex, hate, alcohol, firearms, and tobacco) that does not follow federal and state law and regulations.</p>

                <h3>20.8 SMS Opt-In Data Protection</h3>
                <p>All text messaging originator opt-in data and consent information will not be shared with any third parties, excluding aggregators and providers of the Text Message services necessary to deliver the SMS service. Your mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.</p>

                <h3>20.9 Privacy for SMS Services</h3>
                <p>For privacy-related inquiries regarding our SMS service, please refer to our Privacy Policy.</p>
              </div>

              <div className="section" id="protections">
                <h2>21. Additional Protections and Liability Waivers</h2>
                <h3>21.1 Data Security Standards</h3>
                <p>The Company implements reasonable security measures to protect your personal information in accordance with industry standards. However, no method of transmission over the Internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

                <h3>21.2 Service Level Commitment</h3>
                <p>While the Company strives to maintain 99.9% uptime of the Services, we do not guarantee uninterrupted access to the Services and shall not be liable for any downtime or service interruptions.</p>

                <h3>21.3 Refund Policy</h3>
                <p>Unless otherwise specified at the time of purchase, all sales are final and non-refundable. In cases where a refund is granted at the Company's sole discretion, the refund will be issued using the original payment method.</p>

                <h3>21.4 Account Information Updates</h3>
                <p>You are responsible for promptly updating your account information if there are any changes to your contact information or billing information.</p>

                <h3>21.5 Reservation of Rights</h3>
                <p>All rights not expressly granted to you in this Agreement are reserved by the Company.</p>

                <h3>21.6 Waiver of Right to Sue</h3>
                <p className="uppercase">BY PURCHASING OR USING OUR PRODUCTS OR SERVICES, YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOU WAIVE ANY RIGHT TO SUE THE COMPANY IN COURT OR PARTICIPATE IN A CLASS ACTION LAWSUIT. You understand and agree that all disputes will be resolved exclusively through binding arbitration as described in Section 16.2. This waiver is intended to protect the Company from all forms of litigation, including predatory lawsuits and frivolous claims.</p>

                <h3>21.7 Protection Against Vexatious Litigation</h3>
                <p>You agree not to bring, participate in, or support any vexatious, frivolous, or predatory litigation against the Company. Any attempt to circumvent the arbitration provision through such litigation shall entitle the Company to recover all legal costs, attorney's fees, and expenses associated with defending against such actions, regardless of the outcome.</p>

                <h3>21.8 Covenant Not to Sue</h3>
                <p>You covenant and agree that you will not sue or file any action, claim, or legal proceeding against the Company or its employees, officers, directors, affiliates, or agents in any jurisdiction for any claims arising out of or in connection with your use of the Services, this Agreement, or any other matter related to the Company's products or services.</p>

                <h3>21.9 Acknowledgment</h3>
                <p className="uppercase">BY USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE TO BE BOUND BY ITS TERMS AND CONDITIONS.</p>
              </div>

              <div className="section" id="contact">
                <h2>22. Contact Information</h2>
                <p>All notices of copyright infringement claims should be sent to the designated copyright agent as provided in Section 8 (Copyright Infringement). All other feedback, comments, requests for technical support, and other communications relating to the Services should be directed to:</p>
                <p>Email: <strong>contact@tkovermarketing.com</strong></p>
                <p><strong>Last Updated: February 9, 2026</strong></p>
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
