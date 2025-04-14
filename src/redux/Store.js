import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import LoginReducer from './MasterSlice' // or LoginSlice.js

const logger = createLogger()

const store = configureStore({
  reducer: {
    login: LoginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }).concat(thunk, logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
