export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__meta">
          <span>An estimate, not a diagnosis.</span>

          <nav className="footer__links" aria-label="Footer">
            <a href="#studio">Estimator</a>
            <a href="#dataset">Dataset</a>
            <a href="#method">Method</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="footer__by">
            <span>Personal project by Rituraj Thakur</span>
            <div className="footer__social">
              <a
                href="https://github.com/riturajthakur1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rituraj Thakur on GitHub"
                className="footer__icon-link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/rituraj-thakur/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rituraj Thakur on LinkedIn"
                className="footer__icon-link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <span>© 2026</span>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          MindMetric
        </div>
      </div>
    </footer>
  );
}
