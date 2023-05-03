import React, { useState } from "react";
import axios from 'axios';
import Head from "next/head";
import styles from './AllActivities.module.css'
import { Panel, Carousel } from 'rsuite';
import { useRouter } from 'next/router'
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed'
export async function getServerSideProps(context) {

  const activitiesResponse = await fetch(`http://localhost:3000/api/activities`)
  const activitiesData = await activitiesResponse.json()
  console.log(activitiesData)

  // const daysResponse = await fetch(`http://localhost:3000/api/days`)
  // const daysData = await daysResponse.json()

  // const itinerariesResponse = await fetch(`http://localhost:3000/api/itineraries`)
  // const itinerariesData = await itinerariesResponse.json()

  // const getGoogleMapId = (link: string) => {
  //   if (!link) {
  //     return ''
  //   }
  //   const linkString = link
  //   const indexOfQuestionMark = linkString.indexOf('?')
  //   if (indexOfQuestionMark === -1) {
  //     return ''
  //   }
  //   const mapId = linkString.substring(indexOfQuestionMark + 1)
  //   return mapId
  // }
  // activitiesData.mapLink = getGoogleMapId(activitiesData.mapLink)


  return {
    props: {
      activitiesData: activitiesData
    } // will be passed to the page component as props
  }
}

export default function AllActivities(props: any) {
  const router = useRouter()
  const stopPropogation = (e) => {
    e.stopPropagation()
  }

  const redirectToActivity = (activityId: any) => {
    router.push(`/activities/${activityId}`)
  }

  return (
    <>
      <Head>
        <title>All Activities</title>
      </Head>
      <div className={styles.centeredContainer}>
        <h1>All Activities</h1>
      </div>
      <div className={styles.centeredContainer}>
        <div className={styles.cardsContainer}>
          {props.activitiesData.map((activity: any, index: number) => {
            return (
              <div key={index} onClick={() => redirectToActivity(activity.id)} className={styles.cardContainer}>
                <Panel header={activity.title} shaded bordered bodyFill style={{ width: 350 }}>
                  <Carousel onClick={stopPropogation} className="custom-slider">
                    <InstagramEmbed url={activity.thumbnailLink} width={200} />
                  </Carousel>
                  <Panel header={`User: ${activity.owner}`}>
                    <p className={styles.textOverflow}>
                      {`Address: ${activity.address}`}
                    </p>
                    <p className={styles.textOverflow}>
                      {`Duration: ${activity.duration}`}
                    </p>
                    <p className={styles.textOverflow}>
                      {`Budget: ${activity.budget}`}
                    </p>
                  </Panel>
                </Panel>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}