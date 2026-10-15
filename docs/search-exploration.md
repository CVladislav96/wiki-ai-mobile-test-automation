# Wikipedia Article Search Exploration

## Environment and outcome

- App: `org.wikipedia`
- Device: Android emulator `sdk_gphone16k_x86_64` (API 37)
- Search query: `Software testing`
- Exact-match result opened: `Software testing`
- Article heading observed: `Software testing`

## Observed navigation

1. Started an Android Appium session and launched `org.wikipedia`.
2. Inspected the first-run onboarding screen, titled “All the world's knowledge,” and selected **Forward**.
3. Inspected “Data & Privacy” and selected **Forward**.
4. Inspected “Read in more than 300 languages”; the page showed English as the primary language. Selected **Forward**.
5. Inspected “Follow your curiosity” and selected **Skip** to finish onboarding without choosing topics.
6. On the home screen, selected the Search tab.
7. Inspected and dismissed the “A Faster way to Search” prompt with **Close**.
8. On the Search tab, selected the search card and entered `Software testing`.
9. Inspected the results. The first result title was exactly **Software testing**, with the description “Checking software against expectations.” Selected that result, not similarly named results.
10. Inspected the article screen. The article heading displayed **Software testing**.
11. Ended the Appium session.

## Locators used

Selectors below were taken from the live page source before use. XPath was used only where the source exposed no suitable resource ID or accessibility name for the relevant control or heading.

| Control or content | Locator strategy | Selector |
|---|---|---|
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

## Limitations and unresolved issues

- The introductory “A Faster way to Search” prompt appeared on the first visit to Search and had to be dismissed before the search card was available.
- The article's WebView was initially present before its content had rendered. A subsequent page-source read showed the article heading, which was then read directly and confirmed as **Software testing**.
- The result row and article heading did not expose a suitable resource ID or accessibility ID in the observed source, so their locators use exact text and the observed view structure.
- No unresolved issues prevented completion of the flow.
