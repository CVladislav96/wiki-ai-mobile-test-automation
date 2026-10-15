# Latest verified full run

- Date: 15 October 2026.
- Result: **10 passed, 0 failed, 10 spec files** (one test per file).
- Full runner duration shown in the terminal: **9 minutes 2 seconds**.
- Recorded test interval: 15 October 2026 at 23:24:59 to 15 October 2026 at 23:33:39 (Europe/Chisinau). This interval excludes initial runner/session setup; it is not the full CLI duration.
- Device: Pixel 9 Android emulator, `sdk_gphone16k_x86_64`, Android 17 / API 37, 1080×2424, English UI.
- Execution: local WebdriverIO run with `maxInstances: 1`.

| Spec | Result | Recorded test duration |
| --- | --- | --- |
| `article-back.e2e.ts` | Passed | 30.9 s |
| `article-remove.e2e.ts` | Passed | 66.3 s |
| `article-save.e2e.ts` | Passed | 64.9 s |
| `saved-article-open.e2e.ts` | Passed | 63.2 s |
| `search-clear.e2e.ts` | Passed | 20.3 s |
| `search-no-results.e2e.ts` | Passed | 21.1 s |
| `search-replace.e2e.ts` | Passed | 34.9 s |
| `search.e2e.ts` | Passed | 28.2 s |
| `welcome.e2e.ts` | Passed | 1.0 s |
| `welcome.visual.e2e.ts` | Passed | 3.0 s |

Evidence was read from the latest ten distinct passing Allure result JSON files after the user's full-suite run. Their associated attachments and matching fixture containers were copied into an isolated local report input. Earlier attempts were retained in the original results directory. No tests were rerun to update this documentation/report.

This is one verified run on one emulator. It does not establish cross-device compatibility or long-term stability. The visual case passed against the reviewed baseline under its configured exclusions.
