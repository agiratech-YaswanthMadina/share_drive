import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React from "react"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Share Drive
      </Link>
      <ul>
        <CustomLink to="/About-us">About us</CustomLink>
        <CustomLink to="/Contact-us">Contact us</CustomLink>
        <CustomLink to="/Blog">Our Blog</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}