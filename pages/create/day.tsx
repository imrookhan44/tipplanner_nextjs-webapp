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

export default function CreateDay() {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()

  const [dayTitle, setDayTitle] = useState('');
  const dayTitleHandler = (event) => {
    setDayTitle(event);
  };
  const [description, setDescription] = useState('');
  const descriptionHandler = (event) => {
    setDescription(event);
  };
  const [budget, setBudget] = useState('');
  const budgetHandler = (event) => {
    setBudget(event);
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

  const [activityIds, setActivityIds] = useState([])

  const createDaySubmitHandler = async (event) => {
    event.preventDefault();

    const dayData = {
      title: dayTitle,
      draftMode: draftMode,
      budget: budget,
      mapLink: mapLink,
      thumbnailLink: thumbnailLink,
      tourGuide: tourGuide,
      description: description,
      likes: 0,
      owner: session?.user?.email,
      references: 0,
      views: 0,
      youtubeLink: youtubeLink,
      activityIds: activityIds,
      lastUpdatedAt: new Date()
    };

    const request = await axios({
      method: 'post',
      url: '/api/days',
      data: dayData
    }) 

    window.alert(request?.data?.message)

    router.reload()
  }
  return (
    <>
      <Head>
        <title>Create Day</title>
      </Head>
      <div className={styles.titleContainer}>
        <h1>Day Creator</h1>
      </div>
        <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`title`}</label>
              <Input
                type="text"
                value={dayTitle}
                onChange={dayTitleHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{'description'}</label>
              <Input as='textarea'
                value={description}
                onChange={descriptionHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`budget`}</label>
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
              <label className={styles.formLabel}>{`draft mode`}</label>
              <Toggle
                checked={draftMode}
                onChange={draftModeHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`tourGuide`}</label>
              <Toggle
                checked={tourGuide}
                onChange={tourGuideHandler}
              />
            </div>
            <div>
              <button onClick={createDaySubmitHandler}>Create Day</button>
            </div>
        </div>
      <div className={styles.linkContainer}>
      <Link href='/user/days'>
          <p>See Your Days →</p>
        </Link>
      </div>
  </>
  );
}