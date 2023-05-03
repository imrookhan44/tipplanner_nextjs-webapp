
import React, { useEffect, useState } from "react";
import { useSession, getSession } from 'next-auth/react'
import Head from 'next/head';
import Link from "next/link";
import { Panel, Dropdown, Modal, Button, PanelGroup, Input, Toggle, List } from "rsuite";
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from './ViewDayId.module.css'
import { Timestamp } from "@firebase/firestore"
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed'

export async function getServerSideProps(context) {
  const id = context.params.id
  
  const response = await fetch(`http://localhost:3000/api/days/${id}`)
  const dayData = await response.json()


  return {
    props: {
      data: dayData
    } // will be passed to the page component as props
  }
}

export default function ViewDay(props) {
  const day = props.data

  const getGoogleMapId = (link: string) => {
    if (!link) {
      return ''
    }
    const linkString = link
    const indexOfQuestionMark = linkString.indexOf('mid=')
    if (indexOfQuestionMark === -1) {
      return ''
    }
    const mapId = linkString.substring(indexOfQuestionMark)
    return mapId
  }
  const googleMapId = getGoogleMapId(day.mapLink)

  return (
    <>
      <Head>
        <title>{day.title}</title>
      </Head>
      <div className={styles.titleContainer}>
          <h1>{day.title}</h1>
          <Link href={`/user/${day.owner}`}>
            <h4 className={styles.user}>{day.owner}</h4>
          </Link>
      </div>
      <div>
      </div>
      <div className={styles.formContainer}>
          <List>
            <List.Item className={styles.centeredContainer}>
              <InstagramEmbed url={day.thumbnailLink} width={350} height={600}/>
            </List.Item>
            {day.youtubeLink &&
            <List.Item className={styles.centeredContainer}>
              <YouTubeEmbed url={day.youtubeLink} width={350} height={300}/>
            </List.Item> 
            }
            {googleMapId &&
            <List.Item className={styles.centeredContainer}>
               <iframe src={`https://www.google.com/maps/d/embed?${googleMapId}`} width="350" height="300"></iframe>
            </List.Item> 
            }
            <List.Item className={styles.centeredContainer}>
              <p className={styles.formLabel}>Description</p>
              <p className={styles.formInput}>{day.description}</p>
            </List.Item>
            <List.Item className={styles.centeredContainer}>
              <p className={styles.formLabel}>Budget</p>
              <p className={styles.formInput}>{day.budget}</p>
            </List.Item>
            <List.Item className={styles.centeredContainer}>
              <p className={styles.formLabel}>Duration</p>
              <p className={styles.formInput}>{day.duration}</p>
            </List.Item>
            <List.Item className={styles.centeredContainer}>
              <p className={styles.formLabel}>Tour Guide</p>
              <p className={styles.formInput}>{day.tourGuide ? 'true' : 'false'}</p>
            </List.Item>
          </List>

        </div>
        <PanelGroup accordion bordered>
          {props.data.activityIds.map((activity: any, index: any) => {
                  return (
                  <Panel key={index} header={activity.title}>
                    <Link href={`/activities/${activity.id}`}>
                      <p>See Activity Details</p>
                    </Link>
                  </Panel>
                  )
                }) 
                }
            </PanelGroup>
    </>
  )
}