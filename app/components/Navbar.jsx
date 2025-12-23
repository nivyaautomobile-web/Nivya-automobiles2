'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaCaretRight } from 'react-icons/fa';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { cars } from '../constants';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [mobileDropdown, setMobileDropdown] = useState({
    vehicles: false,
    services: false,
    truevalue: false,
    more: false,
  });

  const hoverTimeout = useRef({});

  const handleMouseEnter = (menu) => {
    clearTimeout(hoverTimeout.current[menu]);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = (menu) => {
    hoverTimeout.current[menu] = setTimeout(() => {
      if (openDropdown === menu) setOpenDropdown(null);
    }, 200);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileDropdown({
      vehicles: false,
      services: false,
      truevalue: false,
      more: false,
    });
  };

  // --- Data ---
  const models = cars.map((car) => ({
    subName: car.name,
    thumbnail: car.image,
    link: car.link,
  }));

  const navLinks = [
    { name: 'Vehicles', key: 'vehicles', hasMegaMenu: true },
    { name: 'TrueValue (Used-cars)', key: 'truevalue', hasDropdown: true },
    { name: 'Services', key: 'services', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'More', key: 'more', hasDropdown: true },
  ];

  return (
    <header className="fixed top-0 z-50 w-full text-black bg-white border-b shadow-sm backdrop-blur-xl font-nunito">
      <nav className="flex items-center justify-between h-20 px-4 mx-auto sm:px-5 md:px-6 lg:px-8 max-w-7xl">
        {/* LOGO */}
        <Link href="/" onClick={closeAllMenus} className="flex items-center space-x-2">
          <Image
            src="/nivya_logo.png"
            alt="Nivya Logo"
            width={120}
            height={60}
            className="transition-transform duration-500 ease-in-out hover:scale-105 sm:w-[130px]"
            priority
          />
        </Link>

        {/* DESKTOP MENU (visible from lg:769px) */}
        <ul className="items-center hidden gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.key && handleMouseEnter(link.key)}
              onMouseLeave={() => link.key && handleMouseLeave(link.key)}
            >
              <Link
                href={link.href || '#'}
                onClick={closeAllMenus}
                className="flex items-center gap-1 text-[15px] uppercase font-semibold tracking-wide transition-all duration-300 hover:text-blue-600"
              >
                {link.name}
                {(link.hasDropdown || link.hasMegaMenu) && (
                  <MdOutlineArrowDropDown className="ml-1 text-lg" />
                )}
              </Link>
              <span className="absolute bottom-0 left-0 w-0 transition-all duration-300 bg-blue-500 h-0.5 group-hover:w-full"></span>

              {/* --- DROPDOWNS --- */}
              {link.key === 'services' && openDropdown === 'services' && (
                <DropdownMenu>
                  <DropdownItem href="/book-a-service" onClick={closeAllMenus}>
                    Book a Service
                  </DropdownItem>
                </DropdownMenu>
              )}
              {link.key === 'truevalue' && openDropdown === 'truevalue' && (
                <DropdownMenu>
                  <DropdownItem href="/truevalue/buy-a-car" onClick={closeAllMenus}>
                    Buy a Car
                  </DropdownItem>
                  <DropdownItem href="/truevalue/sell-a-car" onClick={closeAllMenus}>
                    Sell a Car
                  </DropdownItem>
                </DropdownMenu>
              )}
              {link.key === 'more' && openDropdown === 'more' && (
                <DropdownMenu>
                  <DropdownItem href="/finance" onClick={closeAllMenus}>
                    Finance
                  </DropdownItem>
                  <DropdownItem href="/insurance" onClick={closeAllMenus}>
                    Insurance
                  </DropdownItem>
                  {/* <DropdownItem href="/accessories" onClick={closeAllMenus}>
                    Accessories
                  </DropdownItem> */}
                  <DropdownItem href="/career" onClick={closeAllMenus}>
                    Career
                  </DropdownItem>
                  {/* <DropdownItem href="/compare-cars" onClick={closeAllMenus}>
                    Compare Cars
                  </DropdownItem> */}
                </DropdownMenu>
              )}
            </li>
          ))}
        </ul>

        {/* MOBILE MENU BUTTON (visible until 768px) */}
        <button
          className="text-3xl text-black lg:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* --- DESKTOP VEHICLES MEGA MENU (visible from lg) --- */}
      {openDropdown === 'vehicles' && (
        <div
          className="absolute left-0 hidden w-full text-black bg-white border-t border-gray-100 shadow-2xl animate-slideDown lg:block"
          onMouseEnter={() => handleMouseEnter('vehicles')}
          onMouseLeave={() => handleMouseLeave('vehicles')}
        >
          <div className="grid gap-6 p-6 mx-auto lg:p-8 max-w-7xl xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setSelectedTab(0)}
                className={`w-full text-left px-5 py-3 rounded-full font-semibold transition-all flex items-center justify-between ${
                  selectedTab === 0
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Arena <FaCaretRight />
              </button>
            </div>
            <div className="grid col-span-4 gap-6 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
              {models.map((m) => (
                <Link key={m.subName} href={m.link} onClick={closeAllMenus} className="group">
                  <div className="flex flex-col items-center p-4 transition-all duration-300 shadow bg-gray-50 hover:bg-gray-700 hover:text-white rounded-xl hover:shadow-xl">
                    <Image
                      src={m.thumbnail}
                      alt={m.subName}
                      width={160}
                      height={100}
                      className="object-contain mb-3 transition-transform duration-500 group-hover:scale-110"
                    />
                    <h5 className="text-sm font-semibold text-center uppercase">
                      {m.subName}
                    </h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE MENU (up to 768px) --- */}
      {menuOpen && (
        <div className="fixed top-20 left-0 w-full bg-white border-t border-gray-200 shadow-2xl lg:hidden animate-slideDown overflow-y-auto max-h-[85vh] rounded-b-2xl">
          <ul className="flex flex-col p-5 space-y-3 text-black sm:space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.key === 'vehicles' ? (
                  <MobileDropdown
                    title="Vehicles"
                    open={mobileDropdown.vehicles}
                    toggle={() => toggleMobileDropdown('vehicles')}
                  >
                    <h4 className="mb-2 text-sm font-semibold text-blue-600 uppercase">
                      Arena Models
                    </h4>
                    <div className="flex gap-3 pb-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                      {models.map((m) => (
                        <Link
                          key={m.subName}
                          href={m.link}
                          onClick={closeAllMenus}
                          className="snap-center"
                        >
                          <div className="p-3 min-w-[130px] text-center rounded-lg bg-gray-50 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md">
                            <Image
                              src={m.thumbnail}
                              alt={m.subName}
                              width={90}
                              height={55}
                              className="object-contain mx-auto mb-2"
                            />
                            <p className="text-xs font-semibold text-gray-800 uppercase">
                              {m.subName}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </MobileDropdown>
                ) : link.key === 'services' ? (
                  <MobileDropdown
                    title="Services"
                    open={mobileDropdown.services}
                    toggle={() => toggleMobileDropdown('services')}
                  >
                    <DropdownItemMobile href="/finance" onClick={closeAllMenus}>
                      Finance
                    </DropdownItemMobile>
                    <DropdownItemMobile href="/book-a-service" onClick={closeAllMenus}>
                      Book a Service
                    </DropdownItemMobile>
                  </MobileDropdown>
                ) : link.key === 'truevalue' ? (
                  <MobileDropdown
                    title="TrueValue (Used Cars)"
                    open={mobileDropdown.truevalue}
                    toggle={() => toggleMobileDropdown('truevalue')}
                  >
                    <DropdownItemMobile href="/truevalue/buy-a-car" onClick={closeAllMenus}>
                      Buy a Car
                    </DropdownItemMobile>
                    <DropdownItemMobile href="/truevalue/sell-a-car" onClick={closeAllMenus}>
                      Sell a Car
                    </DropdownItemMobile>
                  </MobileDropdown>
                ) : link.key === 'more' ? (
                  <MobileDropdown
                    title="More"
                    open={mobileDropdown.more}
                    toggle={() => toggleMobileDropdown('more')}
                  >
                    <DropdownItemMobile href="/insurance" onClick={closeAllMenus}>
                      Insurance
                    </DropdownItemMobile>
                    {/* <DropdownItemMobile href="/accessories" onClick={closeAllMenus}>
                      Accessories
                    </DropdownItemMobile> */}
                    <DropdownItemMobile href="/career" onClick={closeAllMenus}>
                      Career
                    </DropdownItemMobile>
                  </MobileDropdown>
                ) : (
                  <Link
                    href={link.href || '#'}
                    onClick={closeAllMenus}
                    className="block text-base font-medium transition-all sm:text-lg hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* --- SMALL REUSABLE COMPONENTS --- */
function DropdownMenu({ children }) {
  return (
    <div className="absolute left-0 mt-3 bg-white/90 backdrop-blur-xl text-black rounded-xl shadow-2xl min-w-[220px] py-3 border border-gray-100 animate-fadeIn">
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function DropdownItem({ href, children, onClick }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="block px-5 py-2 text-sm font-medium transition-all rounded-md hover:bg-gray-500 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

function MobileDropdown({ title, open, toggle, children }) {
  return (
    <div className="w-full">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-2 text-base font-semibold text-gray-800 transition-all sm:text-lg hover:text-blue-600"
      >
        {title}
        <span
          className={`transform transition-transform duration-300 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▾
        </span>
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-3 space-y-2 border-l-2 border-gray-200 sm:pl-4">{children}</div>
      </div>
    </div>
  );
}

function DropdownItemMobile({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 text-sm font-medium text-gray-700 transition-all sm:text-base hover:text-blue-600"
    >
      {children}
    </Link>
  );
}
