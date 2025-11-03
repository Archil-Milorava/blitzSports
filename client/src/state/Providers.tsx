'use client'

import { Provider } from 'jotai'
import { JSX } from 'react'

export const Providers = ({ children }: { children: JSX.Element}) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
