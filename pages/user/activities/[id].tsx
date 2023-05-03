
import React, { useEffect, useState } from "react";
import { useSession, getSession } from 'next-auth/react'
import Head from 'next/head';
import Link from "next/link";
import { Panel, Dropdown, Modal, Button } from "rsuite";
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from './ActivityId.module.css'
import { Timestamp } from "@firebase/firestore"
import {
  Input,
  Toggle
} from 'rsuite';

export async function getServerSideProps(context) {
  console.log("params:", context)
  const id = context.params.id
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }


  const response = await fetch(`http://localhost:3000/api/activities/${id}`)
  const activityData = await response.json()


  return {
    props: {
      data: activityData
    } // will be passed to the page component as props
  }
}


export default function EditActivity(props) {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  const { id } = router.query

  const [activityTitle, setActivityTitle] = useState(props?.data?.title || 'Activity Title');
  const activityTitleHandler = (event) => {
    setActivityTitle(event);
  };
  const [description, setDescription] = useState(props?.data?.description || 'Activity Description');
  const descriptionHandler = (event) => {
    setDescription(event);
  };
  const [budget, setBudget] = useState(props?.data?.budget || 'Activity Budget');
  const budgetHandler = (event) => {
    setBudget(event);
  };
  const [duration, setDuration] = useState(props?.data?.duration || 'Activity Duration');
  const durationHandler = (event) => {
    setDuration(event);
  };
  const [mapLink, setMapLink] = useState(props?.data?.mapLink || 'Activity Google Maps Link');
  const mapLinkHandler = (event) => {
    setMapLink(event);
  };
  const [thumbnailLink, setThumbnailLink] = useState(props?.data?.thumbnailLink || 'Activity Instagram link');
  const thumbnailLinkHandler = (event) => {
    setThumbnailLink(event);
  };
  const [youtubeLink, setYoutubeLink] = useState(props?.data?.youtubeLink || 'activity youtube link');
  const youtubeLinkHandler = (event) => {
    setYoutubeLink(event);
  };
  const [tripAdvisorLink, setTripAdvisorLink] = useState(props?.data?.tripAdvisorLink || 'activity trip advisor link');
  const setTripAdvisorLinkHandler = (event) => {
    setTripAdvisorLink(event);
  };
  const [googleLocationLink, setGoogleLocationLink] = useState(props?.data?.googleLocationLink || 'activity google location link');
  const setGoogleLocationLinkHandler = (event) => {
    setGoogleLocationLink(event);
  };
  const [yelpLink, setYelpLink] = useState(props?.data?.yelpLink || 'activity yelp link');
  const yelpLinkHandler = (event) => {
    setYelpLink(event);
  };
  const [draftMode, setDraftMode] = useState(props?.data?.draftMode);
  const draftModeHandler = () => {
    const newState = !draftMode
    setDraftMode(newState);
  };
  const [tourGuide, setTourGuide] = useState(props?.data?.tourGuide);
  const tourGuideHandler = () => {
    const newState = !tourGuide
    setTourGuide(newState);
  };
  const [rating, setRating] = useState(props?.data?.rating || 0);
  const ratingHandler = (event) => {
    setRating(event);
  };
  const [startTime, setStartTime] = useState(props?.data?.startTime || '')
  const startTimeHandler = (event) => {
    setStartTime(event);
  };
  const [endTime, setEndTime] = useState(props?.data?.endTime || '')
  const endTimeHandler = (event) => {
    setEndTime(event);
  };
  const [address, setAddress] = useState(props?.data?.address || '')
  const addressHandler = (event) => {
    setAddress(event);
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
      lastUpdatedAt: Timestamp.fromDate(new Date())
    };

    const request = await axios({
      method: 'put',
      url: `/api/activities/${id}`,
      data: activityData
    })

    router.reload()
  }

  const [isOpen, setIsOpen] = useState(false)

  const deleteActivityModalOpen = () => {
    setIsOpen(true)
  }

  const deleteActivityModalClose = () => {
    setIsOpen(false)
  }

  const deleteActivity = async () => {
    await axios({
      method: 'delete',
      url: `/api/activities/${id}`
    })

    router.push('/user/activities')
  }

  return (
    <>
      <Head>
        <title>{props.data.title}</title>
      </Head>
      <article>
        <div className={styles.titleContainer}>
          <h1>{props.data.title}</h1>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel}>{`title`}</label>
            <Input
              type="text"
              value={activityTitle}
              onChange={activityTitleHandler}
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
            <label className={styles.formLabel}>{`duration`}</label>
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
            <label className={styles.formLabel}>{`rating (? / 5)`}</label>
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
            <label className={styles.formLabel}>{`Thumbnail Link`}</label>
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
            <label className={styles.formLabel}>{`Draft Mode`}</label>
            <Toggle
              checked={draftMode}
              onChange={draftModeHandler}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel}>{`Tour Guide`}</label>
            <Toggle
              checked={tourGuide}
              onChange={tourGuideHandler}
            />
          </div>
          <div>
            <Button onClick={saveActivityEditSubmitHandler} appearance="primary">
              Save Edit
            </Button>
            <Button color="red" appearance="primary" onClick={deleteActivityModalOpen}>
              Delete Activity
            </Button>
          </div>
          <Modal
            open={isOpen}
            onClose={deleteActivityModalClose}
          >
            <Modal.Header>
              <Modal.Title>Delete Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={deleteActivity} color="red" appearance="primary">
                Delete
              </Button>
              <Button onClick={deleteActivityModalClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </article>
      <div className={styles.titleContainer}>
        <Link href='/user/activities'>
          <p>See Your Activities →</p>
        </Link>
      </div>
    </>
  );
}