import React, { useEffect, useState } from "react";
import { useSession, getSession } from 'next-auth/react'
import Head from 'next/head';
import Link from "next/link";
import { Panel, Dropdown } from "rsuite";
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from './UserHome.module.css'

export default function UserHome(props) {
  const { data: session, status } = useSession({ required: true })
  return (
    <>
      <Head>
        <title>Your TIPlanner Plans</title>
      </Head>
      <div className={styles.titleContainer}>
        <h1>Your Plans</h1>
      </div>
      <div className={styles.linkContainer}>
        <h2>
          <Link href="/user/activities">Your Activities</Link>
        </h2>
        <h2>
          <Link href="/user/days">Your Days</Link>
        </h2>
        <h2>
          <Link href="/user/itineraries">Your Itineraries</Link>
        </h2>
      </div>
    </>
  )
}