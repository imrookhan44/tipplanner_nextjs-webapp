import React, { useContext, useState, useEffect } from "react";
import { useSession, getSession } from 'next-auth/react'
import axios from 'axios'
import Link from "next/link";
import Head from "next/head";

import { PanelGroup, Panel } from "rsuite";
import styles from './UserItineraries.module.css'

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
    url: `http://localhost:3000/api/itineraries/userItineraries`,
    data: session?.user
  }) 

  return {
    props: {
      arrayOfItineraries: request.data
    }, // will be passed to the page component as props
  }
}

export default function UserItineraries(props) {
  const { data: session, status } = useSession({ required: true })


  return (
    <>
      <Head>
        <title>Your Itineraries</title>
      </Head>
      <div className={styles.titleContainer}>
        <h1>Your Itineraries</h1>
        <div>{session?.user?.email}</div>
      </div>
      <div>
        {props?.arrayOfItineraries.map((itinerary: any, key: any) => {
          return (
              <Panel key={key} header={itinerary.title} shaded collapsible bordered>
                <div>
                  <Link href={`/user/itineraries/${itinerary.id}`}>Edit Itinerary</Link>
                </div>
              </Panel>
          )
        })}
        </div>
        <div className={styles.link}>
          <Link href='/create/itinerary'>
            <button>Create New Itinerary</button>
          </Link>
        </div>
    </>
  )
}


