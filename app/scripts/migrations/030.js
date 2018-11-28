// next version number
const version = 30

/*

Adds cachedAccountBalances to the account tracker.

*/

const clone = require('clone')

module.exports = {
  version,

  migrate: async function (originalVersionedData) {
    const versionedData = clone(originalVersionedData)
    versionedData.meta.version = version
    const state = versionedData.data
    const newState = transformState(state)
    versionedData.data = newState
    return versionedData
  },
}

function transformState (state) {
  if (!state.AccountTracker) {
    return state
  }

  const cachedAccountBalances = {}
  const accounts = state.AccountTracker.accounts

  let balance
  for (const accountId in state.AccountTracker.accounts) {
    balance = accounts[accountId].balance
    if (balance !== null && balance !== undefined) {
      cachedAccountBalances[accountId] = balance
    }
  }
  state.AccountTracker.cachedAccountBalances = cachedAccountBalances
  return state
}
