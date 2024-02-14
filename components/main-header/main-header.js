import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import logoImg from '@/assets/logo.png';

import styles from './main-header.module.css';
import MainHeaderBackground from './main-header-background';
import NavLink from '../nav-link/nav-link';

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          {/* 
            You should access it like it, because next.js returns image object
            which contains a property src which is our actual image src
        */}
          <Image
            src={logoImg}
            alt="A plate with food on it"
            //   ! priority property makes sure that this image is loaded as quickly as possible
            priority
          />
          Next Food
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
