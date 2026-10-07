function LogoMark() {
  return (
    <span className="logo-duck" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="presentation">
        <g className="duck-bob">
          <ellipse className="duck-feet duck-feet-a" cx="19" cy="41" rx="4" ry="2" />
          <ellipse className="duck-feet duck-feet-b" cx="29" cy="41" rx="4" ry="2" />
          <ellipse cx="22" cy="30" rx="12" ry="9" fill="currentColor" />
          <ellipse cx="19" cy="29" rx="5" ry="4" fill="var(--surface-2)" opacity="0.55" />
          <circle cx="33" cy="18" r="7" fill="currentColor" />
          <polygon points="39,16 46,18.5 39,21" fill="var(--accent)" />
          <circle cx="35" cy="16.5" r="1.4" fill="var(--bg)" />
          <path d="M28 12 q2 -3 4 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </span>
  )
}

export default LogoMark
