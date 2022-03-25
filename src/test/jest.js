import { prettyDOM } from '@testing-library/react';

/**
 * Print an element DOM to the console.
 * @param {HTMLElement|HTMLElement[]|NodeList} el
 */
export function printElements(el) {
  if (el?.length !== undefined) {
    el.forEach(e => console.log(prettyDOM(e)));
  } else {
    console.log(prettyDOM(el));
  }
}

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
