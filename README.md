# Wiki AI — Mobile Test Automation

Android UI automation for the official Wikipedia app: **9 functional tests and 1 visual test**, authored with help from GitHub Copilot and Appium MCP. Saved tests run through WebdriverIO without AI calls or a Copilot subscription.

**Latest verified full run:** 10 passed / 10 specs, 15 October 2026; approximately 9 minutes 2 seconds including runner/session setup. This is evidence from one emulator configuration, not a guarantee of stability across devices. See [run details](docs/latest-run.md).

## Stack and coverage

TypeScript · WebdriverIO 10 · Mocha · Appium 3 · UiAutomator2 · Allure · WebdriverIO visual service

| Spec in `test/specs/` | What it checks |
| --- | --- |
| `welcome.e2e.ts` | Welcome heading is visible and has the expected text |
| `search.e2e.ts` | Search for Software testing and open the exact article |
| `welcome.visual.e2e.ts` | Welcome screen matches the reviewed image baseline |
| `search-clear.e2e.ts` | Clear a query and verify that the input is showing its hint |
| `search-no-results.e2e.ts` | An unmatched query displays No results |
| `search-replace.e2e.ts` | Replace the query and open Computer science |
| `article-back.e2e.ts` | Return from an article with the query/result restored |
| `article-save.e2e.ts` | Save an article in the local Portfolio QA collection |
| `saved-article-open.e2e.ts` | Open an article from that collection |
| `article-remove.e2e.ts` | Remove the target article from that collection |

Each spec has one test and a separate Appium session. Collection tests establish their own prerequisites. Save/open tests clean up membership they add; the dedicated collection itself is retained. They do not require a Wikipedia account. Tests use a fresh app-data launch and will reset Wikipedia data on the selected emulator: use a dedicated test emulator.

## Local setup (Windows / PowerShell)

The verified environment used Node.js 24.15.0, npm 11.12.1, Java 17, and a Pixel 9 emulator running Android 17 / API 37 at 1080×2424 with English UI. Android SDK Platform Tools and Emulator must be installed. Set `JAVA_HOME`, `ANDROID_HOME`, and add Java/Android tools to `PATH`.

1. Clone this repository, open its root in VS Code, and install locked dependencies:

```powershell
npm ci
```

The postinstall script applies the committed MCP patch. Local Appium is installed through the dependency tree; do not infer the registered runtime driver from the npm development dependency alone.

2. Register the tested UiAutomator2 driver with the Appium installation used for tests, then check prerequisites:

```powershell
npx appium driver list --installed
# Run only if UiAutomator2 is not registered:
npx appium driver install uiautomator2@7.6.0
npx appium driver doctor uiautomator2
```

The tested server reported Appium 3.8.0 and registered UiAutomator2 7.6.0. The project also pins an npm driver dependency at 8.6.1; these are distinct installations. If another driver is already registered, inspect its compatibility rather than blindly reinstalling it.

3. Download the [official Wikipedia APK](https://releases.wikimedia.org/mobile/android/wikipedia/stable/wikipedia-50610-r-2026-10-06.apk) and place it at `apps/wikipedia-50610-r-2026-10-06.apk`. APKs are excluded from Git. See [Wikipedia's source repository](https://github.com/wikimedia/apps-android-wikipedia) for the app's source and licensing.

4. Start the emulator and check its ID:

```powershell
adb devices
```

[wdio.conf.ts](wdio.conf.ts) targets `emulator-5554`. Change `appium:udid` for another device. The launcher component is `org.wikipedia/.DefaultIcon`; the APK path is resolved from the project root.

## Run tests

Keep the emulator open. Stop any manually started Appium server on port 4723: the WebdriverIO service starts/stops its own server. One worker runs at a time.

```powershell
npm run wdio
# One spec:
npm run wdio -- --spec ./test/specs/search-clear.e2e.ts
# Several specs: separate arguments, not comma-separated paths.
npm run wdio -- --spec ./test/specs/article-back.e2e.ts ./test/specs/search-replace.e2e.ts
```

Most tests have a 60-second Mocha deadline. The three collection tests have individual 120-second deadlines including setup and cleanup. Element waits remain bounded independently.

## Allure reports

Allure CLI requires Java. Results and generated HTML stay local and are excluded from Git.

```powershell
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

`allure-results` accumulates previous attempts; `--clean` replaces the generated report, not the input results. For an isolated report, use an empty results directory before the run or generate from a deliberately selected run snapshot. The prepared local report uses a copy of the latest ten results in `.tmp/allure-latest`; older raw results remain intact. The [committed run summary](docs/latest-run.md) records that snapshot without bundling generated HTML.

## AI-assisted development

The project uses a [single design for all ten tests](docs/test-design.md): coverage planning → MCP UI exploration → shared Page Objects → batch implementation → full-suite execution and reporting. AI helped inspect real screens and author code, which was reviewed and corrected using execution evidence. See the [suite-level workflow and batch prompts](docs/ai-workflow.md).

For exploration, start Appium separately with `npx appium --address 127.0.0.1 --port 4723`, then start the server in [.vscode/mcp.json](.vscode/mcp.json) and enable its tools in Copilot Agent. The MCP configuration uses the local pinned package and inherits `ANDROID_HOME`. End the MCP session and stop the manual Appium server before normal tests.

The [MCP patch](patches/@gavrix+appium-mcp+0.3.0.patch) changes the empty `press_home_button` schema to fix tool registration. Keep `patches/` and the lockfile in source control.

## Visual baselines

Reviewed PNGs live in `test/visual-baselines/`; actual/diff images go to `.tmp/visual/`. `autoSaveBaseline` is false. Missing baselines fail the test. System status/tool bars are excluded during comparison; the test requires zero mismatch under those configured rules. Do not overwrite the baseline merely to make a failure pass.

Keep the emulator, resolution, orientation, language, theme, and app version consistent with the baseline. A matching screenshot does not replace the functional tests.

## Limitations

- Only the recorded Android emulator configuration has been exercised. CI and iOS runs are not implemented.
- Search/article loading depends on connectivity and live Wikipedia content.
- Coverage is focused; it does not prove offline availability, persistence after app restart, or complete app correctness.
- Some locators depend on English text and the observed view hierarchy.
- A single successful full run does not establish a flake rate. Intentional visual-change detection has not yet been demonstrated.
- Dependency vulnerabilities remain unresolved. The last recorded npm audit reported 37 affected packages (1 moderate, 29 high, 7 critical); that count is not a count of distinct exploitable attack paths. Review `npm audit` before wider use; do not apply `--force` indiscriminately.

## References and publication

Inspired by [Appium + MCP Server: Automate Mobile Tests with Plain English](https://www.youtube.com/watch?v=jgwNTCuCk9E). Appium MCP is provided by [gavrix/appium-mcp](https://github.com/gavrix/appium-mcp); this repository contains test code and a documented compatibility patch, not an original MCP-server implementation. This is an independent learning project, not an official Wikimedia project.

See [GitHub publication notes](docs/publishing.md).
