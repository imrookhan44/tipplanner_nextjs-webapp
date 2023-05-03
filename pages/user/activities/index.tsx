import React, { useContext, useState, useEffect } from "react";
import { useSession, getSession } from 'next-auth/react'
import axios from 'axios'
import Link from "next/link";
import Head from "next/head";

import { PanelGroup, Panel } from "rsuite";
import styles from './UserActivities.module.css'


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
    url: `http://localhost:3000/api/activities/userActivities`,
    data: session?.user
  }) 

  return {
    props: {
      arrayOfActivities: request.data
    }, // will be passed to the page component as props
  }
}

export default function UserActivities(props) {
  const { data: session, status } = useSession({ required: true })


  return (
    <>
      <Head>
        <title>Your Activities</title>
      </Head>
      <div className={styles.titleContainer}>
        <h1>Your Activities</h1>
        <div>{session?.user?.email}</div>
      </div>
      <div>
        {props.arrayOfActivities.length > 0 && props?.arrayOfActivities.map((activity: any, key: any) => {
          return (
              <Panel key={key} header={activity.title} shaded collapsible bordered>
                <div>
                  <Link href={`/user/activities/${activity.id}`}>Edit Activity</Link>
                </div>
              </Panel>
          )
        })}
        </div>
        <div className={styles.link}>
          <Link href='/create/activity'>
            <button>Create New Activity</button>
          </Link>
        </div>
    </>
  )
}

