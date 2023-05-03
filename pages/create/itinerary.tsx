import React, { useContext, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CreateItinerary.module.css'
import { useSession } from 'next-auth/react'

import {
  Input,
  Toggle
} from 'rsuite';

export default function CreateItinerary() {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()

  const [itinTitle, setItinTitle] = useState('');
  const itinTitleHandler = (event) => {
    setItinTitle(event);
  };
  const [description, setDescription] = useState('');
  const descriptionHandler = (event) => {
    setDescription(event);
  };
  const [budget, setBudget] = useState('');
  const budgetHandler = (event) => {
    setBudget(event);
  };
  const [duration, setDuration] = useState('');
  const durationHandler = (event) => {
    setDuration(event);
  };
  const [mapLink, setMapLink] = useState('');
  const mapLinkHandler = (event) => {
    setMapLink(event);
  };
  const [thumbnailLink, setThumbnailLink] = useState('');
  const thumbnailLinkHandler = (event) => {
    setThumbnailLink(event);
  };
  const [youtubeLink, setYoutubeLink] = useState('');
  const youtubeLinkHandler = (event) => {
    setYoutubeLink(event);
  };
  const [draftMode, setDraftMode] = useState(true);
  const draftModeHandler = () => {
    const newState = !draftMode
    setDraftMode(newState);
  };
  const [tourGuide, setTourGuide] = useState(false);
  const tourGuideHandler = () => {
    const newState = !tourGuide
    setTourGuide(newState);
  };

  const [daysRefArrayInItinerary, setDaysRefArrayInItinerary] = useState([])

  const saveItineraryEditSubmitHandler = async (event) => {
    event.preventDefault();

    const itineraryData = {
      title: itinTitle,
      dayOrder: daysRefArrayInItinerary,
      draftMode: draftMode,
      budget: budget,
      duration: duration,
      mapLink: mapLink,
      thumbnailLink: thumbnailLink,
      tourGuide: tourGuide,
      description: description,
      likes: 0,
      owner: session?.user?.email,
      references: 0,
      views: 0,
      youtubeLink: youtubeLink,
      lastUpdatedAt: new Date()
    };

    const request = await axios({
      method: 'post',
      url: '/api/itineraries',
      data: itineraryData
    }) 
    
    window.alert(request?.data?.message)

    router.reload()
  }
  return (
    <>
      <Head>
        <title>Create Itinerary</title>
      </Head>
      <div className={styles.titleContainer}>
        <h1>Itinerary Creator</h1>
      </div>
      <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Title`}</label>
              <Input
                type="text"
                value={itinTitle}
                onChange={itinTitleHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{'Description'}</label>
              <Input as='textarea'
                value={description}
                onChange={descriptionHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Duration`}</label>
              <Input
                type="text"
                value={duration}
                onChange={durationHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Budget`}</label>
              <Input
                type="text"
                value={budget}
                onChange={budgetHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Map Link`}</label>
              <Input as='textarea'
                value={mapLink}
                onChange={mapLinkHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Instagram Link`}</label>
              <Input
                value={thumbnailLink}
                onChange={thumbnailLinkHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Youtube Link`}</label>
              <Input
                value={youtubeLink}
                onChange={youtubeLinkHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Draft Mode`}</label>
              <Toggle
                checked={draftMode}
                onChange={draftModeHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`tour Guide`}</label>
              <Toggle
                checked={tourGuide}
                onChange={tourGuideHandler}
              />
            </div>
      </div>
      <div className={styles.formContainer}>
      <div>
        <button onClick={saveItineraryEditSubmitHandler}>+ Create Itinerary</button>
      </div>
      <Link href='/user/itineraries'>
          <p>See Your Itineraries →</p>
        </Link>
      </div>
  </>
  );
}