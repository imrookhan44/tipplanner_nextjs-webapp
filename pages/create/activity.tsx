import React, { useState } from "react";
import axios from 'axios';
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CreateActivity.module.css'

import {
  Input,
  Toggle
} from 'rsuite';

export default function CreateActivity() {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  const [activityTitle, setActivityTitle] = useState('');
  const activityTitleHandler = (event) => {
    setActivityTitle(event);
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
  const [tripAdvisorLink, setTripAdvisorLink] = useState('');
  const setTripAdvisorLinkHandler = (event) => {
    setTripAdvisorLink(event);
  };
  const [googleLocationLink, setGoogleLocationLink] = useState('');
  const setGoogleLocationLinkHandler = (event) => {
    setGoogleLocationLink(event);
  };
  const [yelpLink, setYelpLink] = useState('');
  const yelpLinkHandler = (event) => {
    setYelpLink(event);
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
  const [rating, setRating] = useState(5);
  const ratingHandler = (event) => {
    setRating(event);
  };
  const [startTime, setStartTime] = useState('')
  const startTimeHandler = (event) => {
    setStartTime(event);
  };
  const [endTime, setEndTime] = useState('')
  const endTimeHandler = (event) => {
    setEndTime(event);
  };
  const [address, setAddress] = useState('')
  const addressHandler = (event) => {
    setAddress(event);
  };
  const [streetAddressTwo, setStreetAddressTwo] = useState('')
  const addressTwoHandler = (event) => {
    setStreetAddressTwo(event);
  };
  const [addressCity, setAddressCity] = useState('')
  const addressCityHandler = (event) => {
    setAddressCity(event);
  };
  const [addressState, setAddressState] = useState('')
  const addressStateHandler = (event) => {
    setAddressState(event);
  };
  const [addressZipcode, setAddressZipcode] = useState('')
  const addressZipcodeHandler = (event) => {
    setAddressZipcode(event);
  };
  const [addressCountry, setAddressCountry] = useState('')
  const addressCountryHandler = (event) => {
    setAddressZipcode(event);
  };



  const saveActivityEditSubmitHandler = async (event) => {
    event.preventDefault();

    const activityData = {
      title: activityTitle,
      draftMode: draftMode,
      budget: budget,
      duration: duration,
      mapLink: mapLink,
      thumbnailLink: thumbnailLink,
      tripAdvisorLink: tripAdvisorLink,
      googleLocationLink: googleLocationLink,
      yelpLink: yelpLink,
      rating: rating,
      startTime: startTime,
      endTime: endTime,
      address: address,
      tourGuide: tourGuide,
      description: description,
      owner: session?.user?.email,
      youtubeLink: youtubeLink,
      lastUpdatedAt: new Date()
    };

    const request = await axios({
      method: 'post',
      url: '/api/activities',
      data: activityData
    }) 

    window.alert(request?.data?.message)

    router.reload()
  }

  return (
    <>
      <Head>
        <title>Create Activity</title>
      </Head>
      <div className={styles.titleContainer}>
        <h1>Activity Creator</h1>
      </div>
      <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Title`}</label>
              <Input
                type="text"
                value={activityTitle}
                onChange={activityTitleHandler}
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
              <label className={styles.formLabel}>{`Budget (ex. USD $5000)`}</label>
              <Input
                type="text"
                value={budget}
                onChange={budgetHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Rating (? / 5)`}</label>
              <Input
                type="number"
                value={rating}
                onChange={ratingHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Start Time (00:00 - 23:59)`}</label>
              <Input
                type="text"
                value={startTime}
                onChange={startTimeHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`End Time (00:00 - 23:59)`}</label>
              <Input
                type="text"
                value={endTime}
                onChange={endTimeHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Address`}</label>
              <Input
                type="text"
                value={address}
                onChange={addressHandler}
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
              <Input as='textarea'
                value={thumbnailLink}
                onChange={thumbnailLinkHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Youtube Link`}</label>
              <Input as='textarea'
                value={youtubeLink}
                onChange={youtubeLinkHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Trip Advisor Link`}</label>
              <Input as='textarea'
                value={tripAdvisorLink}
                onChange={setTripAdvisorLinkHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Google Location Link`}</label>
              <Input as='textarea'
                value={googleLocationLink}
                onChange={setGoogleLocationLinkHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`Yelp Link`}</label>
              <Input as='textarea'
                value={yelpLink}
                onChange={yelpLinkHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`draft mode`}</label>
              <Toggle checked={draftMode} onChange={draftModeHandler}/>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.formLabel}>{`tourGuide`}</label>
              <Toggle checked={tourGuide} onChange={tourGuideHandler}/>
            </div>
            <div>
            </div>
        </div>
      <div className={styles.formContainer}>
        <div>
          <button onClick={saveActivityEditSubmitHandler}>Create Activity</button>
        </div>
        <Link href='/user/activities'>
          <p>See Your Activities →</p>
        </Link>
      </div>
  </>
  );
}