# AI-assisted development of the ten-test suite

Use one [suite design](test-design.md) for the complete catalogue of nine functional tests and one visual test. The workflow below presents planning, exploration, implementation, review, and execution at suite level. The prompts are reusable examples, not an exported conversation or a claim that one model response produced the finished project.

GitHub Copilot acts as a development assistant. `@gavrix/appium-mcp` exposes Appium tools for real device inspection. The saved tests execute through WebdriverIO without AI calls.

## Workflow

1. Define the complete ten-case coverage matrix, test data, assertions, and independence rules in the suite design.
2. Inspect the UI with MCP across onboarding, search, articles, and collections. Record verified locators, conditional dialogs, and state transitions in the shared design.
3. Implement ten independent tests as a coherent batch in four feature specs: welcome (1), search (5), collections (3), and visual welcome (1). Reuse WelcomePage, SearchPage, ArticlePage, CollectionsPage, and setup/cleanup helpers.
4. Review the whole batch for meaningful assertions, safe collection setup, bounded waits, and absence of invented selectors.
5. Review the welcome-screen baseline separately. Missing/unreviewed images must not silently make a comparison pass.
6. End MCP sessions, stop manual Appium, and run the full suite with `npm run wdio`.
7. Diagnose failures from actual logs/Allure, correct the affected code, and rerun the necessary cases before final full-suite acceptance.
8. Generate the Allure report and record verified results and remaining limitations.

This is batch authoring and validation. With one emulator and `maxInstances: 1`, test execution is sequential.

## Suite exploration prompt

```text
Read AGENTS.md and docs/test-design.md. Use appium-mcp to verify
the UI flows needed for the entire ten-test suite:
- Welcome content and visual-screen readiness.
- Exact article search, query clearing, no results, query replacement,
  and return from an article to search.
- Saving, opening, and removing an article in Portfolio QA.

Inspect source before interacting with each new screen. Record actual
selectors, input/hint behavior, conditional prompts, outcomes, and blockers
in the shared design. Do not assume a new MCP session resets app data.
Do not invent selectors, sign in, or change unrelated saved content.
Report unverified flows explicitly. Always end sessions you create.
Do not modify test code during exploration.
```

## Batch implementation prompt

```text
Read AGENTS.md, docs/test-design.md, the configuration, and existing code.
Implement the complete ten-case catalogue as a coherent TypeScript,
WebdriverIO, Mocha suite with one independent it block per scenario.
Group them into welcome.e2e.ts (1), search.e2e.ts (5),
collections.e2e.ts (3), and welcome.visual.e2e.ts (1).

Reuse shared Page Objects. Establish each collection test's prerequisites
within that test and clean up membership it adds. Register beforeEach setup
that uses the fresh first session and reloads the session before subsequent
cases, then completes onboarding. Preserve both the primary
failure and any cleanup failure. Do not rely on test execution order.

Use the verified selectors and native hierarchy. Use condition-based waits,
native input text checks, and the source-backed XPath for showing-hint.
Do not invent controls, use fixed pauses, or hide failures with retries.
Keep visual baseline auto-creation disabled; request image review separately.

Show the complete implementation and explain independence and assertions.
Do not claim unexecuted tests passed. Do not publish or install packages.
```

## Whole-suite review and execution

Check that all ten planned cases exist, the collection title is scoped to
the target row, optional prompts are handled, and absence assertions are
made only after the destination view loads. A visible row count is not a
total collection count. Stop manual Appium before the runner starts its own.

```powershell
npm run wdio
npm run report:generate
npm run report:open
```

The report command reads the accumulated results folder. For a report of
one batch, use a fresh results folder before execution or an explicitly
selected run snapshot, as described in [README](../README.md#allure-reports).

## Implementation decisions supported by evidence

- The committed patch-package fix uses an empty parameter object for press_home_button registration.
- The launcher explicitly uses the resolved org.wikipedia/.DefaultIcon component.
- Native inputs use text checks because the value-property endpoint failed.
- The hint-state check uses source-backed XPath because direct attribute access failed.
- Collection navigation uses Saved → Collections, avoiding the short-lived View collection snackbar.
- Collection test bodies and cleanup receive individual 120-second deadlines. The shared beforeEach setup has a separate 120-second deadline; element waits remain bounded.

The latest grouped combined run passed all ten tests in four specs on one emulator.
See [run details](latest-run.md) for evidence and durations. Dependency audit
issues and other coverage limitations remain documented.
