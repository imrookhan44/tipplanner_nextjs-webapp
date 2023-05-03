import React, { useState } from "react";
import axios from 'axios';
import Head from "next/head";
import styles from './AllItineraries.module.css'
import { Panel, Carousel } from 'rsuite';
import { useRouter } from 'next/router'
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed'
export async function getServerSideProps(context) {

  const itinerariesResponse = await fetch(`http://localhost:3000/api/itineraries`)
  const itinerariesData = await itinerariesResponse.json()

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
      itinerariesData: itinerariesData
    } // will be passed to the page component as props
  }
}

export default function AllItineraries(props: any) {
  const router = useRouter()
  const stopPropogation = (e) => {
    e.stopPropagation()
  }

  const redirectToItinerary = (itineraryId: any) => {
    router.push(`/itineraries/${itineraryId}`)
  }
  //

  return (
    <>
      <Head>
        <title>All Itineraries</title>
      </Head>
      <div className={styles.centeredContainer}>
        <h1>All Itineraries</h1>
      </div>
      <div className={styles.centeredContainer}>
      <div className={styles.cardsContainer}>
          {props.itinerariesData.map((itinerary: any, index: number) => {
            return (
              <div key={index} onClick={() => redirectToItinerary(itinerary.id)} className={styles.cardContainer}>
                <Panel header={itinerary.title} shaded bordered bodyFill style={{ width: 350 }} className={styles.itineraryPanel}>
                  <Carousel onClick={stopPropogation} className="custom-slider">
                    <InstagramEmbed url={itinerary.thumbnailLink} width={200}/>
                  </Carousel>
                  <Panel header={`User: ${itinerary.owner}`}>
                    <p className={styles.textOverflow}>
                      {`Budget: ${itinerary.budget}`}
                    </p>
                    <p className={styles.description}>
                      {`${itinerary.description}`}
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