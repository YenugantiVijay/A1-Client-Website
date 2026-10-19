# A1 Study Centre website

A dependency-free, responsive static website for A1 Study Centre in Guntur.

## Preview locally

Open `index.html` in a browser. For a local HTTP preview, run this from the project folder:

```powershell
py -m http.server 8000
```

Then visit <http://localhost:8000>.

No package installation or build step is required. The page uses Google Fonts and illustrative Unsplash photography, so those assets need an internet connection.

## Before publishing

- Confirm the listed opening hours and amenities with the centre.
- Confirm the subjects, student levels, and current tutoring arrangements before adding them to the page.
- The enquiry form is intentionally not connected to a backend and does not transmit or store form details. Configure a trusted submission endpoint before accepting web enquiries.
- The source website does not confirm WhatsApp availability, so this site links only to the verified telephone number.
- Review the external image and font providers and replace the illustrative stock photos with centre-owned photos if available.

## Deployment

Deploy the files as a static site with `index.html` as the entry point. No server-side runtime or environment variables are required. Do not publish to the business's live domain without the owner's authorization.
