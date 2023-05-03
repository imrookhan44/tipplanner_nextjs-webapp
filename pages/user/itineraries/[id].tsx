import React, { useEffect, useState } from "react";
import { useSession, getSession } from 'next-auth/react'
import Head from 'next/head';
import Link from "next/link";
import { Panel, Dropdown, Modal, Button } from "rsuite";
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from './ItineraryId.module.css'
import { Timestamp } from "firebase/firestore";
import {
  Input,
  Toggle
} from 'rsuite';

export async function getServerSideProps(context) {
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

  const response = await fetch(`http://localhost:3000/api/itineraries/${id}`)
  const itineraryData = await response.json()

  const request = await axios({
    method: 'post',
    url: `http://localhost:3000/api/days/userDays`,
    data: session?.user
  }) 

  return {
    props: {
      data: itineraryData,
      userDays: request.data
    }, // will be passed to the page component as props
  }
}


export default function EditItinerary(props) {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  const { id } = router.query


  const [itinTitle, setItinTitle] = useState(props?.data?.title);
  const itinTitleHandler = (event) => {
    setItinTitle(event);
  };
  const [description, setDescription] = useState(props?.data?.description);
  const descriptionHandler = (event) => {
    setDescription(event);
  };
  const [budget, setBudget] = useState(props?.data?.budget);
  const budgetHandler = (event) => {
    setBudget(event);
  };
  const [duration, setDuration] = useState(props?.data?.duration);
  const durationHandler = (event) => {
    setDuration(event);
  };
  const [mapLink, setMapLink] = useState(props?.data?.mapLink);
  const mapLinkHandler = (event) => {
    setMapLink(event);
  };
  const [thumbnailLink, setThumbnailLink] = useState(props?.data?.thumbnailLink);
  const thumbnailLinkHandler = (event) => {
    setThumbnailLink(event);
  };
  const [youtubeLink, setYoutubeLink] = useState(props?.data?.youtubeLink);
  const youtubeLinkHandler = (event) => {
    setYoutubeLink(event);
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

  const [daysRefArrayInItinerary, setDaysRefArrayInItinerary] = useState(props?.data?.dayOrder)

  const removeDayInArray = (index: number) => {
    const newArrayforDisplay = [...daysRefArrayInItinerary]
    newArrayforDisplay.splice(index, 1)
    setDaysRefArrayInItinerary(newArrayforDisplay)

  }

  const addDayToItinerary = (index: number) => {
    const newDay = props.userDays[index]
    const newArrayforDisplay = [...daysRefArrayInItinerary]
    newArrayforDisplay.push(newDay)
    setDaysRefArrayInItinerary(newArrayforDisplay)

  }

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
      owner: session?.user?.email,
      youtubeLink: youtubeLink,
      lastUpdatedAt: Timestamp.fromDate(new Date())
    };

    const request = await axios({
      method: 'put',
      url: `/api/itineraries/${id}`,
      data: itineraryData
    }) 

    router.reload()
  }

  const [isOpen, setIsOpen] = useState(false)

  const deleteItineraryModalOpen = () => {
    setIsOpen(true)
  }

  const deleteItineraryModalClose = () => {
    setIsOpen(false)
  }

  const deleteItinerary = async () => {
    await axios({
      method: 'delete',
      url: `/api/itineraries/${id}`
    }) 

    router.push('/user/itineraries')
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
            <div className={styles.activityPanel}>
              <div className={styles.subHeaderContainer}>
                <h3>Days</h3>
              </div>
              {daysRefArrayInItinerary.map((day: any, key: any) => {
                return (
                  <div key={key} className={styles.dayContainer}>
                    <div className={styles.panelContainer}>
                      <Panel className={styles.dayPanel} header={day.title} shaded collapsible bordered>
                        <div>
                          <Link href={`/user/days/${day.id}`}>Edit Day</Link>
                        </div>
                      </Panel>
                      <Button  appearance="ghost" color='red' onClick={() => removeDayInArray(key)}>Remove</Button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={styles.inputContainer}>
              <Dropdown title="Add Day" appearance="primary" color='green'>
                  {props?.userDays.map((userDay: any, index: any) => {
                    return (<Dropdown.Item key={index} onClick={() => addDayToItinerary(index)}>{userDay.title}</Dropdown.Item>)})}
              </Dropdown>
            </div>
            <div>
              <Button onClick={saveItineraryEditSubmitHandler} appearance="primary">
                Save Edit
              </Button>
              <Button color="red" appearance="primary" onClick={deleteItineraryModalOpen}>
                Delete Itinerary
              </Button>
            </div>
            <Modal
        open={isOpen}
        onClose={deleteItineraryModalClose }
      >
        <Modal.Header>
          <Modal.Title>Delete Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteItinerary} appearance="primary" color='red'>
            Delete
          </Button>
          <Button onClick={deleteItineraryModalClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      </article>
      <div className={styles.titleContainer}>
        <Link href='/user/itineraries'>
          <p>See Your Itineraries →</p>
        </Link>
      </div>
    </>
  );
}