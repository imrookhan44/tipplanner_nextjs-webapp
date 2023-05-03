import Link from "next/link";
import Image from "next/image";
import icon from "../../public/favicon.ico"
import styles from './Footer.module.css';
import { useSession, signIn, signOut } from 'next-auth/react'

import { Dropdown, IconButton } from 'rsuite';
import MenuIcon from '@rsuite/icons/Menu';

export default function NavBar() {

  return (
      <div className={styles.footerHeight}>

      </div>
  );
}