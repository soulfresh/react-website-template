
export function silenceLogs(level = 'log') {
  // @ts-ignore
  jest.spyOn(console, level).mockImplementation(() => {})
}

export function silenceAllLogs() {
  ;['error', 'warn', 'info', 'log', 'debug'].forEach(silenceLogs)
}

export function mostRecentCall(mockFunc) {
  return mockFunc.mock.calls.slice(-1)[0]
}
