const prefix: string = 'Check failed'

// Throw an error if the condition fails
export function check(
  condition: any,
  // Can provide a string, or a function that returns a string for cases where
  // the message takes a fair amount of effort to compute
  message?: string | (() => string),
): asserts condition {
  if (condition) {
    return
  }

  const provided: string | undefined = typeof message === 'function' ? message() : message

  // Options:
  // 1. message provided: `${prefix}: ${provided}`
  // 2. message not provided: prefix
  const value: string = provided ? provided : prefix
  throw new Error(value)
}
