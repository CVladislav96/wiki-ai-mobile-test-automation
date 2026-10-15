export async function runWithCleanup(
  action: () => Promise<void>,
  shouldCleanup: () => boolean,
  cleanup: () => Promise<void>,
): Promise<void> {
  let failed = false;
  let originalFailure: unknown;

  try {
    await action();
  } catch (error) {
    failed = true;
    originalFailure = error;
    throw error;
  } finally {
    if (shouldCleanup()) {
      try {
        await cleanup();
      } catch (cleanupError) {
        if (failed) {
          throw new AggregateError(
            [originalFailure, cleanupError],
            "The test failed and its cleanup also failed",
            { cause: originalFailure },
          );
        }
        throw cleanupError;
      }
    }
  }
}
