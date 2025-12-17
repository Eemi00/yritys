import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import '../styles/Navbar.css'

export default function Navbar() {

    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-logo">
                <span>Yritys</span>
            </div>

            <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Avaa/Sulje menu">
                {open ? (
                    <i className="fa-solid fa-xmark"></i>
                ) : (
                    <i className="fa-solid fa-bars"></i>
                )}
            </button>

            <ul className={`navbar-links ${open ? 'show' : ''}`}>
                <li>
                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Etusivu
                    </NavLink>
                </li>
            </ul>

            {open && <div className="menu-overlay" onClick={() => setOpen(false)}></div>}
        </nav>
    )
}