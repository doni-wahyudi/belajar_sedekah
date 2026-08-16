export default function Logo({ size = 'default', showTagline = true, light = false }) {
  return (
    <div className={`brand-logo ${size === 'large' ? 'brand-logo-large' : ''} ${size === 'small' ? 'brand-logo-small' : ''}`}>
      <div className="brand-logo-symbol">
        <svg viewBox="0 0 100 80" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Green Stylized Caring Hands / Leaves */}
          <path
            d="M20 32C28 42 42 48 58 46C70 44 80 34 82 28C76 34 65 40 52 38C38 36 28 26 20 32Z"
            fill="url(#greenGrad1)"
          />
          <path
            d="M32 24C40 34 54 38 68 36C78 34 86 26 88 20C82 26 72 30 60 28C48 26 38 18 32 24Z"
            fill="url(#greenGrad2)"
          />
          <path
            d="M45 15C52 23 64 26 76 24C83 22 90 15 92 10C86 16 77 19 66 17C56 15 49 10 45 15Z"
            fill="url(#greenGrad3)"
          />
          
          {/* Bottom Navy Blue Boat / Cradle */}
          <path
            d="M18 42C30 58 60 62 82 48C74 54 50 56 30 46C24 43 20 40 18 42Z"
            fill="url(#blueGrad1)"
          />
          <path
            d="M24 50C38 64 68 66 88 52C92 50 94 48 94 48C90 58 66 68 36 60C28 58 24 53 24 50Z"
            fill="url(#blueGrad2)"
          />
          
          {/* Head Dot on the right */}
          <circle cx="86" cy="48" r="5" fill="#14365D" />
          
          {/* Water reflection line */}
          <path
            d="M32 64C48 68 64 68 76 65C66 67 50 67 36 65C34 64.5 32 64 32 64Z"
            fill="#0284C7"
          />

          <defs>
            <linearGradient id="greenGrad1" x1="20" y1="28" x2="82" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8CC63F" />
              <stop offset="1" stopColor="#689F38" />
            </linearGradient>
            <linearGradient id="greenGrad2" x1="32" y1="20" x2="88" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A2D858" />
              <stop offset="1" stopColor="#7CB342" />
            </linearGradient>
            <linearGradient id="greenGrad3" x1="45" y1="10" x2="92" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B8E986" />
              <stop offset="1" stopColor="#8BC34A" />
            </linearGradient>
            <linearGradient id="blueGrad1" x1="18" y1="40" x2="82" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E3A8A" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="blueGrad2" x1="24" y1="48" x2="94" y2="68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#0F2444" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="brand-logo-text">
        <div className="brand-name">
          <span className="brand-belajar" style={{ color: light ? '#E2E8F0' : 'var(--text-nav-brand)' }}>Belajar</span>
          <span className="brand-sedekah">Sedekah</span>
        </div>
        {showTagline && (
          <span className="brand-tagline">Share, We Care</span>
        )}
      </div>
    </div>
  );
}
