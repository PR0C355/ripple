import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  //loadSpotify()
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className={styles.navbar}>
        <div >Ripple</div>
        <div className={styles.navlinks}>
          <a className={styles.navlinks} href="/create">Create</a>
          <a className={styles.navlinks} href="/listen">Listen</a>
          <a className={styles.navlinks} href="/login">Login</a>
        </div>
        <div >
          <img className={styles.usericon} src="favicon.ico" alt="User Profile" />
        </div>
        </div>
        {children}
        </body>
    </html>
  )
}

