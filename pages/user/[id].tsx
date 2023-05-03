import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import { Panel, Carousel } from 'rsuite';
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed'
import styles from './userPlans.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import nextPageIcon from '../public/images/nextPageIcon.svg'
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

/*
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
*/
export async function getServerSideProps(context) {

  const { id } = context.query

  const activitiesResponse = await axios({
    method: 'post',
    url: `http://localhost:3000/api/users/activities`,
    data: { email: id }
  })

  const daysResponse = await axios({
    method: 'post',
    url: `http://localhost:3000/api/users/days`,
    data: { email: id }
  })
  const itinerariesResponse = await axios({
    method: 'post',
    url: `http://localhost:3000/api/users/itineraries`,
    data: { email: id }
  })


  return {
    props: {
      activitiesData: activitiesResponse.data,
      daysData: daysResponse.data,
      itinerariesData: itinerariesResponse.data
    } // will be passed to the page component as props
  }
}

export default function UserData(props: any) {
  const router = useRouter()
  const { id } = router.query
  const stopPropogation = (e) => {
    e.stopPropagation()
  }

  const redirectToActivity = (activityId: any) => {
    router.push(`/activities/${activityId}`)
  }
  const redirectToDay = (dayId: any) => {
    router.push(`/days/${dayId}`)
  }
  const redirectToItinerary = (itineraryId: any) => {
    router.push(`/itineraries/${itineraryId}`)
  }
  return (
    <>
      <Head>
        <title>{`User Plans`}</title>
      </Head>
      <section className={styles.centeredContainer}>
        <div>
          <h1 className={styles.textOverflow}>{`${id} Plans`}</h1>
        </div>
      </section>
      <section className={styles.centeredContainer}>
          <h2>Activities</h2>
        <div className={styles.cardsContainer}>
          {props.activitiesData.map((activity: any, index: number) => {
            return (
              <div key={index} onClick={() => redirectToActivity(activity.id)} className={styles.cardContainer}>
                <Panel header={activity.title} shaded bordered bodyFill style={{ width: 350 }}>
                  <Carousel onClick={stopPropogation} className="custom-slider">
                    <InstagramEmbed url={activity.thumbnailLink} width={200}/>
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
          <h2>Days</h2>
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
          <h2>Itineraries</h2>
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
          
      </section>
    </>
  );
}