# GitHub publication notes

Suggested repository name: `wiki-ai-mobile-tests`.

Suggested description: Android UI tests for Wikipedia with TypeScript, WebdriverIO, Appium, Allure, visual checks, and an AI-assisted MCP workflow.

Suggested topics: `appium`, `webdriverio`, `typescript`, `android-testing`, `test-automation`, `allure`, `visual-testing`, `mcp`.

## Content to publish

Include source/tests, the approved PNG baseline, configuration, package files/lockfile, MCP patch, exploration notes, and README. Exclude the APK, node_modules, generated reports/results, session caches, local environment files, and logs.

Before pushing, inspect `git status`, `git diff --cached --stat`, and `git diff --cached --check`. The local Git identity comes from the user's existing Git configuration. Repository visibility and GitHub ownership must be selected by the owner.

## Publish after local review

Create an empty GitHub repository under your chosen account, without generating another README or .gitignore. Replace YOUR_USERNAME with that account name:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/wiki-ai-mobile-tests.git
git push -u origin main
```

If origin already exists, inspect it with `git remote -v` rather than overwriting it blindly. No remote repository, push, Pages site, or public report hosting is created by the preparation process.

The generated Allure report remains local. It can be hosted separately later, after reviewing its content. The committed run summary provides a compact verified result for the portfolio. No CI badge is included because CI is not configured.

Dependency audit issues are disclosed in README. No LICENSE file has been added: package.json currently contains the scaffold's ISC value. Confirm the intended license before distributing your code under an explicit license; the APK and dependencies retain their own licenses.
