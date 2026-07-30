# Automated Quality Report

This site was generated and pushed after the maximum number of automated repair attempts. The following issue(s) were still flagged by the validator and may need a manual look:

Broken internal link: index.html references 'contact_form.html' in nav and hero CTA, but the sitemap lists it as 'contact_form.html'. The file is present in the bundle, so this is not a missing file issue. However, the sitemap.xml contains an invalid XML declaration (single quotes instead of double quotes) which will break parsing by most tools. Additionally, index.html has unescaped ampersands ('&amp;') inside SVG path data attributes and text content where they are not required, potentially causing rendering issues in some browsers if not handled correctly by the parser.

Generated: 2026-07-30T21:19:49.569Z