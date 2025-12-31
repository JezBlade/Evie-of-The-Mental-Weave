<!-- Describe the purpose of this PR and the minimal verification steps -->

## Summary
This PR adds repository hardening artifacts: `.github/CODEOWNERS`, templates, a minimal CI workflow and a `dependabot.yml` where missing.

## Changes
- Add CODEOWNERS
- Add PULL_REQUEST_TEMPLATE.md, ISSUE_TEMPLATE.md, CONTRIBUTING.md
- Add `.github/workflows/ci.yml` (minimal build/test)
- Add `.github/dependabot.yml` (if missing)

## Verification
1. CI checks should run on this branch.
2. Review CODEOWNERS lines for correct owners.

If anything should be adjusted, request changes via this PR.
