import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import { Panel, Carousel } from 'rsuite';
import { InstagramEmbed, YouTubeEmbed } from 'react-social-media-embed'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import nextPageIcon from '../public/images/nextPageIcon.svg'
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, query, orderBy, limit, where } from "firebase/firestore";
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

  // const activitiesResponse = await fetch(`http://localhost:3000/api/activities/activitiesForHome`)
  // const activitiesData = await activitiesResponse.json()

  const activitiesCollectionRef = collection(db, 'activities');
  const queryForHomePage = query(activitiesCollectionRef, where('draftMode', '==', false), limit(3))
  const data = await getDocs(queryForHomePage) 
  
  const activitiesDocsArray: any[] = []
  data.forEach((doc) => {
    const data = doc.data()
    const activityObject = { id: doc.id, ...data }
    activitiesDocsArray.push(activityObject)
  })

  // const daysResponse = await fetch(`http://localhost:3000/api/days/daysForHome`)
  // const daysData = await daysResponse.json()

  // const itinerariesResponse = await fetch(`http://localhost:3000/api/itineraries/itinerariesForHome`)
  // const itinerariesData = await itinerariesResponse.json()

  const getGoogleMapId = (link: string) => {
    if (!link) {
      return ''
    }
    const linkString = link
    const indexOfQuestionMark = linkString.indexOf('?')
    if (indexOfQuestionMark === -1) {
      return ''
    }
    const mapId = linkString.substring(indexOfQuestionMark + 1)
    return mapId
  }

  // activitiesData.mapLink = getGoogleMapId(activitiesData.mapLink)



  return {
    props: {
      activitiesData: [], // activitiesDocsArray,
      daysData: [], // daysData,
      itinerariesData: [], // itinerariesData

    } // will be passed to the page component as props
  }
}

export default function Home(props: any) {
  const router = useRouter()
  const stopPropogation = (e) => {
    e.stopPropagation()
  }

  console.log(props)

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
        <title>TI Planner</title>
      </Head>
      <section className={styles.centeredContainer}>
        <h1>TI Planner</h1>
      </section>
      <section className={styles.centeredContainer}>
        <Link href='/activities'>
          <h2>All Activities →</h2>
        </Link>
        <div className={styles.cardsContainer}>
          {props?.activitiesData && props.activitiesData.map((activity: any, index: number) => {
            return (
              <div key={index} onClick={() => redirectToActivity(activity.id)} className={styles.cardContainer}>
                <Panel header={activity.title} shaded bordered bodyFill style={{ width: 350 }}>
                  <Carousel onClick={stopPropogation} className="custom-slider">
                    <InstagramEmbed url={activity.thumbnailLink} width={200}/>
                    {/* <iframe src={`https://www.google.com/maps/d/embed?${activity.mapLink}`} width="200" height="200"></iframe> */}
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
         <Link href='/days'>
          <h2>All Days →</h2>
        </Link>
        <div className={styles.cardsContainer}>
          {props?.daysData && props.daysData.map((day: any, index: number) => {
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
        <Link href='/itineraries'>
          <h2>All Itineraries →</h2>
        </Link>
        <div className={styles.cardsContainer}>
          {props?.itinerariesData && props.itinerariesData.map((itinerary: any, index: number) => {
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