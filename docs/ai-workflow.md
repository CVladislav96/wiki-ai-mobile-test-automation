# AI-assisted testing workflow

GitHub Copilot was used as a development assistant; `@gavrix/appium-mcp` exposed Appium tools for real device inspection. Normal tests execute without AI.

## Process

1. Start a local Appium server and connect Copilot to MCP.
2. Inspect the live page source and exercise the proposed flow.
3. Record verified locator strategies, transitions, outcomes, and blockers in exploration documents.
4. Generate independent TypeScript tests with shared Page Objects.
5. Review assertions, waits, reset behavior, and cleanup.
6. End MCP sessions, stop manual Appium, and run saved specs through WebdriverIO.
7. Diagnose failures from logs/Allure; keep only changes supported by evidence.

## Example exploration request

```text
Use appium-mcp to inspect Wikipedia search. Enter a query,
identify the clear-query control from the actual page source,
clear the query, and document the observed input and result state.
Do not invent selectors or change test code. Always end the session.
```

## Example authoring request

```text
Read the verified exploration notes and existing Page Objects.
Create an independent TypeScript/Mocha test with condition-based
waits and meaningful assertions. Reuse verified locators.
Do not use fixed pauses, invent UI behavior, or claim an unrun test passed.
Show the code for review before running it.
```

These are condensed workflow examples, not an exported chat transcript.

## Corrections made from observed failures

- An empty Zod schema prevented registration of `press_home_button`; the one-line fix is persisted with patch-package.
- APK auto-detection produced an ambiguous launch intent; the configuration now specifies the resolved `.DefaultIcon` component.
- A native-input `toHaveValue` check called an unsupported property endpoint; the verified text is checked instead.
- Direct `getAttribute("showing-hint")` failed; a source-backed XPath scopes that condition to the search input.
- The transient View collection snackbar was replaced with the observed Saved → Collections route.
- Collection flows exceeded 60 seconds, including cleanup. Their individual deadlines are 120 seconds; UI waits were not replaced with sleeps.

Generated code was reviewed and exercised. The three initial cases were expanded to ten. The dependency audit remains unresolved and is not presented as fixed.
