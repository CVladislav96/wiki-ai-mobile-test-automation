# Wikipedia Android: ten-test suite design

This document defines one suite of **nine functional tests and one visual test**. Use it as the shared input for UI exploration, Page Object implementation, and a combined execution. The catalogue describes the current implementation; the locator reference consolidates verified device observations.

## Scope and environment

- Application: official Wikipedia Android app, `org.wikipedia`.
- APK: `wikipedia-50610-r-2026-10-06.apk`.
- Verified device: Pixel 9 emulator, `sdk_gphone16k_x86_64`, Android 17 / API 37, UDID `emulator-5554`, 1080×2424.
- Language: English. Match theme, orientation, font/display settings, and app version to the reviewed visual baseline.
- Account: no sign-in is needed. Use the dedicated local `Portfolio QA` collection for collection tests.
- Search data: `Software testing`, `Computer science`, and unmatched query `qzxvportfolio987654321`.
- Network access is needed for search and article loading. Tests check the displayed UI, not the server response or offline-download completion.

## Coverage catalogue

| ID | Spec in `test/specs/` | Arrange and act | Observable assertion |
| --- | --- | --- | --- |
| WIKI-01 | `welcome.e2e.ts` | Launch with fresh app data | Welcome heading is visible and reads All the world's knowledge |
| WIKI-02 | `search.e2e.ts` | Complete onboarding; search Software testing; open the exact result | Article heading is visible and has the exact expected text |
| WIKI-03 | `welcome.visual.e2e.ts` | Wait for welcome heading and Forward; compare the screen with its reviewed baseline | Zero mismatch under the configured comparison rules |
| WIKI-04 | `search-clear.e2e.ts` | Complete onboarding; enter Software testing; wait for a result; press Clear query | Input shows Search Wikipedia and its source node has showing-hint=true |
| WIKI-05 | `search-no-results.e2e.ts` | Complete onboarding; submit the unmatched query | Input contains that query; No results is displayed inside the results container |
| WIKI-06 | `search-replace.e2e.ts` | Search Software testing; clear it; enter Computer science; open the new exact result | New query, result, and article heading match Computer science |
| WIKI-07 | `article-back.e2e.ts` | Open Software testing from search; use Navigate up | Original query and exact result are restored |
| WIKI-08 | `article-save.e2e.ts` | Open Software testing; establish its membership in Portfolio QA; open the collection | Target article row and its scoped title are displayed in the collection |
| WIKI-09 | `saved-article-open.e2e.ts` | Independently establish saved membership; open the article from Portfolio QA | Correct article heading is visible with exact text |
| WIKI-10 | `article-remove.e2e.ts` | Independently establish membership; verify the article; uncheck Portfolio QA in the Save selector | Target article is absent when collection contents/empty state have loaded |

Implement and review the catalogue as a coherent batch. Keep one independent test per spec. Shared code belongs in Page Objects; one spec must not rely on another spec's output.

## Shared navigation and state

### Fresh launch and onboarding

WebdriverIO supplies `appium:noReset: false` and creates a session per spec. On the verified emulator this presents onboarding for each functional test. Use a dedicated test emulator because this resets Wikipedia app data. An MCP exploration session may open an already-initialized app; a new MCP session alone is not proof that data was reset.

The observed onboarding sequence is:

1. All the world's knowledge → Forward.
2. Data & Privacy → Forward.
3. Read in more than 300 languages → Forward.
4. Follow your curiosity → Skip.

Wait for the next heading after each transition. The welcome and visual cases stay on the first screen.

### Search and article navigation

Open the Search tab, dismiss the optional A Faster way to Search prompt with Close when present, then open the search card. Enter the query in the observed search field. Select the exact-title result, not an arbitrary row position. Article headings are accessible in the native hierarchy inside an `android.webkit.WebView`; wait for the heading to render rather than assuming the WebView container means the article has loaded.

Navigate up from an article to restore the search. The expected query remains Software testing and the matching result is displayed again.

### Query states

Before clearing, the input source contains `text="Software testing"` and `hint="Search Wikipedia"`. After clearing, it contains `text="Search Wikipedia"`, `hint="Search Wikipedia"`, and `showing-hint="true"`. The returned text is placeholder text. Confirm the showing-hint attribute on the specific input through XPath; do not require an empty getText() value or use the failing direct showing-hint attribute endpoint.

Clearing removes the live suggestions but can retain Software testing in Recent searches. The automated clearing test checks the field's cleared state; it does not assert that history is deleted or that the title disappears from the entire screen.

The unmatched query displays No results in `fragment_search_results`. Wait for this explicit state, not merely for a missing article row. The observation is based on displayed content; it is not an independent network-response verification.

For replacement, Software testing is cleared before Computer science is entered. Search descriptions observed during exploration were Checking software against expectations and Study of computation. The current tests assert the exact titles/headings, not those descriptions, which may change with live content.

### Collection setup, navigation, and cleanup

Use the article Save control. Create Portfolio QA through Create a new collection → name field → OK, or reuse that test-owned collection if it exists. Check its membership state before toggling. Do not delete an existing collection or unrelated contents.

Navigate through Saved → Collections → Portfolio QA. Dismiss the Share this collection with others introduction using Got it if it appears. Open the saved article through its verified row.

For removal, open the article's collection selector and uncheck only Portfolio QA. Wait for collection contents or the empty state before checking target absence. Visible row count does not establish the collection's total size; WIKI-10 does not infer that a collection must be empty from that count.

Save/open tests record whether they added membership and clean it up through `runWithCleanup`. The helper reports both failures if the test and cleanup fail. The collection itself is retained. Removal is the action under test for WIKI-10.

During exploration, save/remove confirmation messages were observed, but the automated suite verifies persistent collection UI state instead of relying solely on a transient snackbar. View collection became unavailable during exploration; the suite uses the stable Saved → Collections route.

## Verified locator reference

Use resource IDs and accessibility IDs when available. Text-based XPath is retained where the observed UI lacked a suitable identifier. Each XPath must be passed as a full expression. This consolidated reference retains the verified selectors from UI exploration; some are observation aids rather than assertions used by the current suite.

| Control or content | Strategy | Selector |
| --- | --- | --- |
| Welcome onboarding heading | XPath | `//android.widget.TextView[@text="All the world's knowledge"]` |
| Onboarding **Forward** button (welcome, Data & Privacy, and languages screens) | Accessibility ID | `Forward` |
| Data & Privacy onboarding heading | XPath | `//android.widget.TextView[@text='Data & Privacy']` |
| Language onboarding heading | XPath | `//android.widget.TextView[@text='Read in more than 300 languages']` |
| Follow your curiosity onboarding heading | XPath | `//android.widget.TextView[@text='Follow your curiosity']` |
| Onboarding **Skip** control (Follow your curiosity screen) | XPath | `//android.widget.TextView[@text='Skip']` |
| Search tab | Resource ID | `org.wikipedia:id/nav_tab_search` |
| “A Faster way to Search” prompt **Close** control | Accessibility ID | `Close` |
| Search card on the Search tab | Resource ID | `org.wikipedia:id/search_card` |
| Search input | Resource ID | `org.wikipedia:id/search_src_text` |
| Exact-match result row | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Software testing']]` |
| Article title heading | XPath | `//android.widget.TextView[@text='Software testing' and @heading='true']` |
| Clear query button | Resource ID | `org.wikipedia:id/search_close_btn` |
| Clear query button (same control) | Accessibility ID | `Clear query` |
| No-results message | XPath | `//android.widget.TextView[@text='No results']` |
| Results container containing the message | Resource ID | `org.wikipedia:id/fragment_search_results` |
| Recent-searches panel | Resource ID | `org.wikipedia:id/search_panel_recent` |
| Exact **Computer science** result row | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Computer science']]` |
| Article heading | XPath | `//android.widget.TextView[@text='Computer science' and @heading='true']` |
| Article **Navigate up** control | Accessibility ID | `Navigate up` |
| Article Save control | Resource ID | `org.wikipedia:id/page_save` |
| **Create a new collection** clickable row | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Create a new collection']]` |
| Collection name field | Resource ID | `org.wikipedia:id/text_input` |
| Create/confirm **OK** button | Resource ID | `android:id/button1` |
| Save confirmation message | Resource ID | `org.wikipedia:id/snackbar_text` |
| Saved tab | Resource ID | `org.wikipedia:id/nav_tab_reading_lists` |
| **Collections** tab | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Collections']]` |
| **Portfolio QA** collection row | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Portfolio QA']]` |
| Collection intro **Got it** | Resource ID | `org.wikipedia:id/buttonView` |
| Saved **Software testing** article row | XPath | `//android.widget.FrameLayout[@clickable='true'][.//android.widget.TextView[@resource-id='org.wikipedia:id/page_list_item_title' and @text='Software testing']]` |
| Checked **Portfolio QA** list toggle | XPath | `//android.view.View[@clickable='true' and @checkable='true'][.//android.widget.TextView[@text='Portfolio QA']]` |
| Empty collection message | Resource ID | `org.wikipedia:id/reading_list_empty_text` |

The empty input check additionally scopes the observed hint state to its verified resource ID:

```xpath
//*[@resource-id='org.wikipedia:id/search_src_text' and @showing-hint='true']
```

Scope the saved-article title lookup to the Software testing row. Search/result titles and collection names used in XPath are the fixed values in this plan; adding arbitrary input requires safe selector escaping.

## Visual acceptance

The baseline is a reviewed 1080×2424 image in `test/visual-baselines/`. Runtime images/diffs live in `.tmp/visual/`. `autoSaveBaseline` is false; an absent baseline is an error. Exclude system status/tool bars during comparison, then require zero mismatch under the configured rules. Approve baseline updates through image review, never as an automatic reaction to failure.

A correct functional heading does not prove the entire screen has the expected appearance. Conversely, matching this single baseline does not establish full visual coverage. Detection of an intentionally introduced visual change has not yet been demonstrated.

## Batch execution and acceptance

End any MCP session and stop the manually started Appium server before running the suite. WebdriverIO manages its own server and runs one worker at a time.

```powershell
npm run wdio
```

Accept the batch when all ten specs pass, cleanup completes, and the approved visual baseline remains unchanged. Collection cases have individual 120-second Mocha deadlines including setup and cleanup; other cases use 60 seconds. Element waits are separately bounded and do not use fixed pauses.

Inspect per-test evidence in Allure before changing code after a failure. Keep raw results for diagnosis. The latest verified full batch was **10 passed / 10 specs**; see [run details](latest-run.md). That one run does not establish long-term reliability or coverage on other devices.

## Maintenance boundaries

The suite does not yet test post-restart persistence, complete offline reading, account synchronization, editing, CI, or iOS. English text locators and live article data can change. Dependency audit issues remain disclosed in [README](../README.md).
