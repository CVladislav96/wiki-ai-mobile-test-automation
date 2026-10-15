# Additional Wikipedia Android Scenario Exploration

## Environment

- App: `org.wikipedia`
- Device: Android emulator `sdk_gphone16k_x86_64`, API 37, UDID `emulator-5554`
- The app was already past onboarding at launch; onboarding was not replayed and app data was not cleared.
- All selectors below were taken from the observed page source. Article headings appeared in the native accessibility hierarchy nested in an `android.webkit.WebView`; search, toolbar, dialog, and collection controls were native app UI.
- Appium session ended successfully.

## Scenario 6 — Replace the search query and open the new exact-match article

**Completed:** Yes.

**Preconditions and actions**

1. Opened the Search tab and search card. The optional introductory search prompt was absent.
2. Entered `Software testing`; the result list showed the exact title **Software testing**, with description “Checking software against expectations.”
3. Tapped the Clear query control, then entered `Computer science`.
4. Inspected the updated results: the exact-title row **Computer science** appeared with description “Study of computation.”
5. Opened that exact-title row. The article heading **Computer science** was displayed in the WebView content.

**Verified locator strategies and selectors**

| Control or content | Strategy | Selector |
|---|---|---|
| Search tab | Resource ID | `org.wikipedia:id/nav_tab_search` |
| Search card | Resource ID | `org.wikipedia:id/search_card` |
| Search input | Resource ID | `org.wikipedia:id/search_src_text` |
| Clear query | Resource ID | `org.wikipedia:id/search_close_btn` |
| Exact **Computer science** result row | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Computer science']]` |
| Article heading | XPath | `//android.widget.TextView[@text='Computer science' and @heading='true']` |

**Observed outcome and proposed assertions**

- The input changed from `Software testing` to `Computer science`.
- The exact new result and its description were present; the old results were replaced.
- The article WebView loaded and its heading text was **Computer science**.
- Proposed assertions: exact input text; displayed exact-match result; exact result title/description; displayed article heading with exact text.

**Independent-test setup and cleanup**

- Setup: complete onboarding only if the fresh app state presents it; open Search and the search card; enter `Software testing`; clear it with the verified clear control; enter `Computer science`.
- Cleanup: no persistent data was created by this scenario; return to a neutral screen if required. Do not depend on an app/session restart clearing search history.

## Scenario 7 — Return from the article to the original search

**Completed:** Yes.

**Preconditions and actions**

1. From the Search screen, cleared the current query and entered `Software testing`.
2. Inspected the results and opened the row with the exact title **Software testing**.
3. Inspected the article source and confirmed the heading was exposed inside the WebView hierarchy.
4. Used the article toolbar’s **Navigate up** control.
5. Inspected the restored Search screen.

**Verified locator strategies and selectors**

| Control or content | Strategy | Selector |
|---|---|---|
| Search input | Resource ID | `org.wikipedia:id/search_src_text` |
| Exact **Software testing** result row | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Software testing']]` |
| Article **Navigate up** control | Accessibility ID | `Navigate up` |

**Observed outcome and proposed assertions**

- After returning, the input still contained `Software testing`.
- The search results were restored, including the exact **Software testing** row and description “Checking software against expectations.”
- Proposed assertions: restored query text; exact result row displayed with its expected title/description.

**Independent-test setup and cleanup**

- Setup: complete onboarding if present, open Search and the search card, enter `Software testing`, wait for its exact result, and open it.
- Cleanup: return using **Navigate up**. Do not assume that a new session clears the search query or its recent-search entry.

## Scenario 8 — Save the article to a local reading list without signing in

**Completed:** Yes.

**Preconditions and actions**

1. Opened the exact **Software testing** article and confirmed its heading had loaded.
2. Tapped the article’s **Save** control. The app opened a collection sheet showing the article and “Collect the articles you love.”
3. Selected **Create a new collection**.
4. Entered `Portfolio QA` in the observed collection-name field and confirmed with **OK**.
5. Inspected the resulting article screen. The snackbar stated **Added Software testing to Portfolio QA.**
6. Did not sign in or join Wikipedia. The Saved screen later showed a sign-in/sync promotion, but local collection and article access were available without using it.

**Verified locator strategies and selectors**

| Control or content | Strategy | Selector |
|---|---|---|
| Article Save control | Resource ID | `org.wikipedia:id/page_save` |
| **Create a new collection** clickable row | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Create a new collection']]` |
| Collection name field | Resource ID | `org.wikipedia:id/text_input` |
| Create/confirm **OK** button | Resource ID | `android:id/button1` |
| Save confirmation message | Resource ID | `org.wikipedia:id/snackbar_text` |
| Saved tab | Resource ID | `org.wikipedia:id/nav_tab_reading_lists` |

**Observed outcome and proposed assertions**

- The app confirmed that **Software testing** was added to **Portfolio QA**.
- Proposed assertions: collection creation completed; confirmation text names the article and collection; Saved/Collections view contains **Portfolio QA** with the article.

**Independent-test setup and cleanup**

- Setup: create the dedicated local `Portfolio QA` collection through the article’s Save flow and add **Software testing**. The list must be established in the test itself; do not assume app/session restart resets local data.
- Cleanup: remove only **Software testing** from `Portfolio QA`. Leave the list itself and any unrelated lists/articles intact. Because this list persists locally, a rerun should check for an existing test-owned list and make only the target article’s state deterministic; do not delete an existing list or its other contents.

## Scenario 9 — Open the saved article from its reading list

**Completed:** Yes.

**Preconditions and actions**

1. After scenario 8, attempted to use the snackbar’s **View collection** action. The element lookup failed because the snackbar action was no longer available.
2. Did not repeat that failed lookup. Navigated to the Saved tab instead.
3. Inspected the Saved screen and selected the **Collections** tab.
4. Inspected the collection list and opened **Portfolio QA**.
5. The collection displayed its introductory “Share this collection with others” balloon. Dismissed it using **Got it**, the control exposed by the source.
6. Inspected the collection detail and opened the **Software testing** article row.
7. Inspected the article screen and confirmed the heading **Software testing** in the WebView content.

**Verified locator strategies and selectors**

| Control or content | Strategy | Selector |
|---|---|---|
| Saved tab | Resource ID | `org.wikipedia:id/nav_tab_reading_lists` |
| **Collections** tab | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Collections']]` |
| **Portfolio QA** collection row | XPath | `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Portfolio QA']]` |
| Collection intro **Got it** | Resource ID | `org.wikipedia:id/buttonView` |
| Saved **Software testing** article row | XPath | `//android.widget.FrameLayout[@clickable='true'][.//android.widget.TextView[@resource-id='org.wikipedia:id/page_list_item_title' and @text='Software testing']]` |
| Article heading | XPath | `//android.widget.TextView[@text='Software testing' and @heading='true']` |

**Observed outcome and proposed assertions**

- The local collection showed **Portfolio QA** and one article, **Software testing**.
- Opening the article row navigated to the article screen; its WebView heading was **Software testing**.
- Proposed assertions: the collection is displayed; its target article row is displayed; after tapping the row, the exact article heading is displayed.

**MCP error and recovery**

- The lookup for **View collection** used strategy `id` with selector `org.wikipedia:id/snackbar_action` and returned: `Element not found with strategy 'id' and selector 'org.wikipedia:id/snackbar_action'.`
- The action was not retried. The scenario was completed through Saved → Collections → **Portfolio QA** instead.

**Independent-test setup and cleanup**

- Setup: create/add the target article to `Portfolio QA` within the test, or establish an equivalent test-owned collection state without deleting existing list contents. Dismiss the collection intro only when it appears, using the observed **Got it** control.
- Cleanup: none required for the read-only navigation itself; remove only the target article if the scenario shares a test-owned list with save/remove coverage.

## Scenario 10 — Remove the article from the local reading list

**Completed:** Yes.

**Preconditions and actions**

1. From the saved **Software testing** article, tapped **Save** to open its collection selector.
2. Inspected the selector. The **Portfolio QA** row was checkable and marked checked.
3. Tapped only the **Portfolio QA** row to uncheck/remove this article from that collection.
4. Inspected the source. A snackbar stated **Software testing removed from Portfolio QA**.
5. Navigated up to the collection screen and inspected its empty state.

**Verified locator strategies and selectors**

| Control or content | Strategy | Selector |
|---|---|---|
| Article Save / collection selector | Resource ID | `org.wikipedia:id/page_save` |
| Checked **Portfolio QA** list toggle | XPath | `//android.view.View[@clickable='true' and @checkable='true'][.//android.widget.TextView[@text='Portfolio QA']]` |
| Removal confirmation message | Resource ID | `org.wikipedia:id/snackbar_text` |
| Collection **Navigate up** control | Accessibility ID | `Navigate up` |
| Empty collection message | Resource ID | `org.wikipedia:id/reading_list_empty_text` |

**Observed outcome and proposed assertions**

- The snackbar confirmed **Software testing removed from Portfolio QA**.
- The collection showed **0 of 0 articles available offline** and **You have no articles added to this collection.**
- Proposed assertions: removal confirmation; target row absent from the collection; the collection’s empty-state message displayed. The list itself remained in place.

**Independent-test setup and cleanup**

- Setup: create a test-owned `Portfolio QA` collection and add **Software testing** through the article Save flow within the test. Verify the list entry before removal.
- Cleanup: removal leaves the dedicated collection empty; retain the collection and do not delete unrelated lists or articles. Since collection state persists locally, make the test’s target-article membership explicit before asserting removal.
