import Link from "next/link";
import Image from "next/image";
import icon from "../../public/favicon.ico"
import GoogleButton from "react-google-button";
import styles from './NavBar.module.css';
import { useSession, signIn, signOut } from 'next-auth/react'
import SearchIcon from '@rsuite/icons/Search';
import { Input, InputGroup, Whisper, Tooltip } from 'rsuite';
import { useRouter } from 'next/router'
import { Dropdown, IconButton } from 'rsuite';
import MenuIcon from '@rsuite/icons/Menu';
import { useState } from "react";

export default function NavBar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [searchUser, setSearchUser] = useState('')

  const setSearchUserHandler = (ev: any) => {
    setSearchUser(ev)
  }

  const handleGoogleSignIn = () => {
    signIn()
  }

  const handleSignout = () => {
    signOut()
  }

  const goToUserPage = () => {
    router.push(`/user/${searchUser}`)
  }
 
  const handleKeyUp = (event: any) => {
    if (event.keyCode === 13) {
      router.push(`/user/${searchUser}`)
    }
  }
  
  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton {...props} ref={ref} icon={<MenuIcon />} circle color="blue" appearance="primary" />
    );
  };
  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={styles.homeIcon} href="/">
          <Image src={icon} width='40' alt="TI planner icon"/>
        </Link>
      </div>
      <div>
      <InputGroup inside style={styles} onKeyUp={handleKeyUp}>
        <Input type='text' value={searchUser} onChange={setSearchUserHandler} placeholder="Search for User"/>
        <InputGroup.Button onClick={goToUserPage}>
          <SearchIcon />
        </InputGroup.Button>
    </InputGroup>
      </div>
      <div>
      <Dropdown className={styles.navBarMenu} renderToggle={renderIconButton} placement="bottomEnd">
        <Dropdown.Item>
          <Link className={styles.homeIcon} href="/create">
            <span>Create</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item> 
          <Link className={styles.homeIcon} href="/user">
            <span>Your Plans</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
        {session ? <button onClick={handleSignout}>Sign Out</button> : <button onClick={handleGoogleSignIn}>Sign In</button>}
        </Dropdown.Item>
      </Dropdown>
      </div>
    </nav>
  );
}