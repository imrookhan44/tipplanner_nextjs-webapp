import React, { useState } from "react";
import axios from 'axios';
import Head from "next/head";
import styles from './AllDays.module.css'
import { Panel, Carousel } from 'rsuite';
import { useRouter } from 'next/router'
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed'
export async function getServerSideProps(context) {

  const daysResponse = await fetch(`http://localhost:3000/api/days`)
  const daysData = await daysResponse.json()

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
      daysData: daysData
    } // will be passed to the page component as props
  }
}

export default function AllDays(props: any) {
  const router = useRouter()
  const stopPropogation = (e) => {
    e.stopPropagation()
  }

  const redirectToDay = (dayId: any) => {
    router.push(`/days/${dayId}`)
  }

  return (
    <>
      <Head>
        <title>All Days</title>
      </Head>
      <div className={styles.centeredContainer}>
        <h1>All Days</h1>
      </div>
      <div className={styles.centeredContainer}>
      <div className={styles.cardsContainer}>
          {props.daysData.map((day: any, index: number) => {
            return (
              <div key={index} onClick={() => redirectToDay(day.id)} className={styles.cardContainer}>
                <Panel header={day.title} shaded bordered bodyFill style={{ width: 350 }} className={styles.dayPanel}>
                  <Carousel onClick={stopPropogation} className="custom-slider">
                    <InstagramEmbed url={day.thumbnailLink} width={200}/>
                    <iframe src={`https://www.google.com/maps/d/embed?${day.mapLink}`} width="200" height="200"></iframe>
                  </Carousel>
                  <Panel header={`User: ${day.owner}`}>
                    <p className={styles.textOverflow}>
                      {`Budget: ${day.budget}`}
                    </p>
                    <p className={styles.description}>
                      {`${day.description}`}
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