# Latest verified full run

- Date: 16 October 2026 (Europe/Chisinau).
- Result: **10 tests passed, 0 failed, 4 spec files passed**.
- Full runner duration shown in the terminal: **00:08:13**.
- Recorded Allure test interval: 00:04:08 to 00:11:52 (Europe/Chisinau). This is not the full runner interval.
- Device: Pixel 9 Android emulator, `sdk_gphone16k_x86_64`, Android 17 / API 37, 1080×2424, English UI.
- Execution: local WebdriverIO run with `maxInstances: 1`.

| Spec | Test | Result | Recorded Allure duration |
| --- | --- | --- | ---: |
| `collections.e2e.ts` | saves Software testing to the local Portfolio QA collection | Passed | 60.5 s |
| `collections.e2e.ts` | opens Software testing from the local Portfolio QA collection | Passed | 69.2 s |
| `collections.e2e.ts` | removes Software testing from Portfolio QA | Passed | 68.0 s |
| `search.e2e.ts` | opens the exact-match Software testing article | Passed | 23.6 s |
| `search.e2e.ts` | clears the query and displays the search input hint | Passed | 35.5 s |
| `search.e2e.ts` | displays the no-results message for an unmatched query | Passed | 31.2 s |
| `search.e2e.ts` | opens the exact Computer science result after replacing the query | Passed | 40.9 s |
| `search.e2e.ts` | restores the original query and result | Passed | 38.0 s |
| `welcome.e2e.ts` | displays the welcome heading | Passed | 0.8 s |
| `welcome.visual.e2e.ts` | matches the welcome screen baseline | Passed | 2.6 s |

The ten scenarios are grouped into welcome (1), search (5), collections (3), and welcome visual (1). Search and collection suites renew the Appium session before subsequent tests and complete onboarding in a beforeEach hook. Collection cases prepare their own data and clean up membership they add. Recorded Allure durations follow reporter timing; do not sum them to infer full runner time or treat them as action-only measurements.

Evidence comes from this completed grouped-suite run and its ten passing Allure result JSON files. Associated attachments and matching fixture containers were copied into `.tmp/allure-grouped-latest` for an isolated local report; previous raw results remain intact. The visual baseline was not changed.

After all tests passed, the runner remained at the Appium-service process-tree shutdown step. Port 4723 was no longer listening; the remaining command was interrupted manually. Allure records ten passed tests, but the command did not exit normally. The 00:08:13 duration is the test-run summary printed before that shutdown wait.

This is one verified run on one emulator. It does not establish cross-device compatibility or long-term stability.
