# Wikipedia Search with No Matching Results

## Query and outcome

- App: `org.wikipedia`
- Device: Android emulator `sdk_gphone16k_x86_64` (API 37, UDID `emulator-5554`)
- Query: `qzxvportfolio987654321`
- Observed outcome: the Search screen displayed **No results**. Its exact text was confirmed from the matching UI element. No article was opened.

## Verified navigation and actions

1. Started an Android Appium session and launched `org.wikipedia`.
2. Inspected the current screen source. The app was already on its home/Search-tab screen; onboarding was not present.
3. Inspected the screen source and selected the Search tab.
4. The Search screen source showed the search card and no introductory prompt, so no prompt dismissal was needed.
5. Inspected the screen source and selected the search card.
6. The search input appeared with its placeholder and the screen showed a Recent searches section. Entered `qzxvportfolio987654321` in the observed search input.
7. Inspected the resulting page source. It showed the query in the input and **No results** inside the `org.wikipedia:id/fragment_search_results` container.
8. Located the exact **No results** text using its source-verified XPath and read its text to confirm the displayed message.
9. Ended the Appium session successfully.

## Verified locators

| Control or content | Locator strategy | Selector |
|---|---|---|
| Search tab | Resource ID | `org.wikipedia:id/nav_tab_search` |
| Search card | Resource ID | `org.wikipedia:id/search_card` |
| Search input | Resource ID | `org.wikipedia:id/search_src_text` |
| No-results message | XPath | `//android.widget.TextView[@text='No results']` |
| Results container containing the message | Resource ID | `org.wikipedia:id/fragment_search_results` |
| Recent-searches panel | Resource ID | `org.wikipedia:id/search_panel_recent` |

## Distinguishing no results from other states

- The input source showed `text="qzxvportfolio987654321"` and `showing-hint="false"`, confirming the query was entered rather than displaying placeholder text.
- The exact **No results** `TextView` was displayed within the search-results container. Its text was retrieved directly and confirmed as `No results`.
- The inspected results container contained the no-results view, not a loading indicator or network-error message.
- The Recent searches panel was present but empty in the inspected source; the message was not a search-history entry.

## Limitations

- The observation was made on one Android emulator and does not independently verify the server response.
- No network diagnostics were collected; the no-results conclusion is based on the app's displayed results state and its page source.
- On this run onboarding was already complete and the optional introductory search prompt did not appear.
