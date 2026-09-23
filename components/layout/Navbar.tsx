"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav-data";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <nav
            className="navbar-desktop navbar-desktop-left"
            aria-label="Principal"
          >
            {navLinks.slice(0, 2).map((link) => {
              const isActive = link.href === pathname;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`navbar-link ${isActive ? "is-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/" aria-label="Zentro" className="navbar-logo">
            <Image
              src="/brand/zentro-logo.png"
              alt="Zentro"
              fill
              sizes="(max-width: 1024px) 3.5rem, 5rem"
              className="object-contain"
              priority
            />
          </Link>

          <nav
            className="navbar-desktop navbar-desktop-right"
            aria-label="Principal"
          >
            {navLinks.slice(2).map((link) => {
              const isActive = link.href === pathname;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`navbar-link ${isActive ? "is-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="navbar-menu-btn"
        >
          <span className={`navbar-bar ${open ? "open" : ""}`} />
          <span className={`navbar-bar ${open ? "open" : ""}`} />
        </button>
      </header>

      <div
        id="mobile-nav-panel"
        aria-hidden={!open}
        className={`navbar-mobile-panel ${open ? "open" : ""}`}
      >
        <nav className="navbar-mobile-nav" aria-label="Principal">
          {navLinks.map((link, i) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={open ? 0 : -1}
                aria-current={isActive ? "page" : undefined}
                className={`navbar-mobile-link ${isActive ? "is-active" : ""}`}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
