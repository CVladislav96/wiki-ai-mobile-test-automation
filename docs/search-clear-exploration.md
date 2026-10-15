# Wikipedia Search Query Clearing Exploration

## Environment and outcome

- App: `org.wikipedia`
- Device: Android emulator `sdk_gphone16k_x86_64` (API 37)
- Query entered: `Software testing`
- Clear action: tapped the query field's **Clear query** control.
- Outcome: the actual input text became empty. The active search suggestions disappeared, while the same query remained listed under **Recent searches**.

## Verified navigation and actions

1. Started an Android Appium session and launched `org.wikipedia`.
2. Inspected the current screen source. Wikipedia was already on its home screen, so onboarding was not shown and did not need to be completed.
3. Opened the Search tab.
4. Inspected the search screen source. The optional “A Faster way to Search” prompt was present; dismissed it with **Close**.
5. Inspected the resulting Search tab source and opened the search card.
6. Inspected the search screen source and entered `Software testing` in the search input.
7. Inspected the source after entry. It showed the query in the input and live suggestions, including **Software testing** with the description “Checking software against expectations,” and related suggestions.
8. Identified the clear control from that source and tapped it.
9. Inspected the source after clearing and queried the input element's text. The input's text was empty; its displayed “Search Wikipedia” text was the placeholder, not entered query text.
10. Observed that live suggestions were replaced by a **Recent searches:** section containing **Software testing**.
11. Ended the Appium session successfully.

## Verified locators

| Control | Strategy | Selector |
|---|---|---|
| Search tab | Resource ID | `org.wikipedia:id/nav_tab_search` |
| Search prompt **Close** | Accessibility ID | `Close` |
| Search card | Resource ID | `org.wikipedia:id/search_card` |
| Search input | Resource ID | `org.wikipedia:id/search_src_text` |
| Clear query button | Resource ID | `org.wikipedia:id/search_close_btn` |
| Clear query button (same control) | Accessibility ID | `Clear query` |

## Input and results observations

- Before clearing, page source showed the search input with `text="Software testing"` and `hint="Search Wikipedia"`.
- After clearing, page source showed the same input with `text="Search Wikipedia"`, `hint="Search Wikipedia"`, and `showing-hint="true"`. The element text read was also `Search Wikipedia`; because the source marked it as showing the hint, this was placeholder text. The actual query was empty.
- Before clearing, live suggestions included the exact article result and related titles.
- After clearing, the live suggestions were no longer displayed. The screen instead showed **Recent searches:** and retained **Software testing** as a recent-search item. This clearing action did not delete the search history.

## Limitations

- The observed behavior is from one Android emulator and one app session.
- On this run the onboarding flow was already complete; the onboarding Skip selector was not needed.
