import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4 d-flex justify-content-between align-items-center">
      <div>
        <span>&copy; {new Date().getFullYear()} </span>
        <a
          href="https://thinkzone.in"
          target="_blank"
          rel="noopener noreferrer"
          className="ms-1 text-decoration-none"
        >
          Thinkzone
        </a>
      </div>
      <div className="text-muted small">Engineered by Thinkzone Developers</div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
