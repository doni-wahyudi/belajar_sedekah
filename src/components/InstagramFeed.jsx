import { useEffect } from 'react';
import { FaInstagram, FaCheckCircle } from 'react-icons/fa';

import ScrollReveal from './ScrollReveal';
import './InstagramFeed.css';

export default function InstagramFeed() {
  // Dynamically load the Elfsight platform script once
  useEffect(() => {
    const SCRIPT_ID = 'elfsight-platform-script';
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // cleanup not needed — elfsight script is intentionally persistent
    };
  }, []);

  return (
    <section className="instagram-feed-section section" id="instagram-live-feed">
      <div className="container">

        {/* Profile Bar Header */}
        <ScrollReveal>
          <div className="ig-profile-bar glass-card">
            <div className="ig-profile-left">
              <div className="ig-avatar-ring">
                <div className="ig-avatar-inner">
                  <FaInstagram />
                </div>
              </div>
              <div className="ig-profile-text">
                <div className="ig-handle-row">
                  <span className="ig-handle">@belajarsedekah.id</span>
                  <span className="ig-verified-badge" title="Official Account">
                    <FaCheckCircle />
                  </span>
                  <span className="ig-live-pill">
                    <span className="ig-live-dot"></span> LIVE FEED
                  </span>
                </div>
                <p className="ig-bio">
                  "Temanmu belajar, berbagi dan bertumbuh setiap hari 🪴" • Lampung 🇲🇨
                </p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/belajarsedekah.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-ig-follow"
            >
              <FaInstagram /> Ikuti di Instagram
            </a>
          </div>
        </ScrollReveal>



        {/* ===== ELFSIGHT LIVE INSTAGRAM FEED ===== */}
        <ScrollReveal delay={0.15}>
          <div className="ig-elfsight-wrapper">
            <div
              className="elfsight-app-ad3eec68-cac7-4262-8c5f-e840b149dde2"
              data-elfsight-app-lazy
            />
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <div className="ig-bottom-cta">
          <a
            href="https://www.instagram.com/belajarsedekah.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <FaInstagram /> Kunjungi Akun Resmi Instagram @belajarsedekah.id
          </a>
        </div>

      </div>
    </section>
  );
}
