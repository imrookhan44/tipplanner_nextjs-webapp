import React, { useContext, useState, useEffect } from "react";
import { useSession, getSession } from 'next-auth/react'
import axios from 'axios'
import Link from "next/link";
import Head from "next/head";

import { PanelGroup, Panel } from "rsuite";
import styles from './UserDays.module.css'


export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }


  const request = await axios({
    method: 'post',
    url: `http://localhost:3000/api/days/userDays`,
    data: session?.user
  }) 

  return {
    props: {
      arrayOfDays: request.data
    }, // will be passed to the page component as props
  }
}

export default function UserDays(props) {
  const { data: session, status } = useSession({ required: true })


  return (
    <>
      <Head>
        <title>Your Days</title>
      </Head>
      <div className={styles.titleContainer}>
        <h1>Your Days</h1>
        <div>{session?.user?.email}</div>
      </div>
      <div>
        {props?.arrayOfDays.map((day: any, key: any) => {
          return (
              <Panel key={key} header={day.title} shaded collapsible bordered>
                <div>
                  <Link href={`/user/days/${day.id}`}>Edit Day</Link>
                </div>
              </Panel>
          )
        })}
        </div>
        <div className={styles.link}>
          <Link href='/create/day'>
            <button>Create New Day</button>
          </Link>
        </div>
    </>
  )
}

