# Automated Quality Report

This site was generated and pushed after the maximum number of automated repair attempts. The following issue(s) were still flagged by the validator and may need a manual look:

Found unescaped quote characters in HTML attributes:
1. index.html: The 'font-heading' CSS variable definition contains a single-quoted string inside double quotes ('Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue') which breaks the attribute syntax.
2. style.css: Multiple occurrences of font-family definitions (e.g., --font-heading and .article-inner p) contain unescaped single quotes within double-quoted strings, causing CSS parsing errors.

Generated: 2026-08-05T21:26:20.546Z