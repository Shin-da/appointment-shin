# Jeffmathew Systems Launch Checklist

## Final QA
- Verify all navigation links and section anchors work (`Services`, `Demo`, `Process`, `About`, `Contact`).
- Submit a full contact form test and confirm Formspree email delivery.
- Submit form with and without query params (example: `?src=demo_section`) and confirm hidden tracking values appear in submission.
- Test all demo links:
  - `primecut-demo/index.html`
  - `primecut-demo/booking.html`
  - `primecut-demo/admin.html`
- Verify mobile sticky CTA opens contact section correctly.

## Content and Trust
- Replace placeholder Messenger link with real profile URL.
- Confirm contact email is correct and monitored daily.
- Review package descriptions and remove anything you do not want to offer yet.
- Proofread hero and CTA copy for tone and consistency.

## Performance and UX
- Check layout on mobile (360px+), tablet, and desktop.
- Confirm buttons have visible hover/focus states.
- Ensure text contrast is readable in all sections.
- Confirm scroll animations still work and reduced-motion fallback remains usable.

## SEO Basics
- Confirm page title and meta description match target audience.
- Add/update favicon.
- Add Open Graph metadata for link previews (title, description, image).
- Ensure canonical URL is set when domain is final.

## Analytics and Lead Tracking
- Confirm hidden fields are present in form submissions:
  - `lead_source`
  - `page_variant`
  - `referrer`
  - `landing_path`
  - `campaign_source`
- Define your naming convention for `src` parameters (example: `hero_demo`, `demo_section`, `mobile_cta`).
- Keep a simple spreadsheet to track inquiry source, business type, and close status.

## Go Live
- Backup current project snapshot.
- Deploy to production host/domain.
- Run one live form test on production.
- Announce launch with one clear offer and one demo link.
