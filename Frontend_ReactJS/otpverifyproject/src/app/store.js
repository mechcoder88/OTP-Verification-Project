// Below Redux Store Code Link : "Redux Store Code Link : "https://redux-toolkit.js.org/rtk-query/overview"

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { OTPAuthApi } from '../services/OTPAuthApi'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [OTPAuthApi.reducerPath]: OTPAuthApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(OTPAuthApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)