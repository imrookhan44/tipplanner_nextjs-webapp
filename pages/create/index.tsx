import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Create.module.css'

export default function Create() {
  return (
    <>
      <Head>
        <title>Create on TIPlanner</title>
      </Head>
      <div className={styles.titleContainer}>
        <h1>Create on TIPlanner</h1>
      </div>
      <div className={styles.linkContainer}>
        <h2>
          <Link href="/create/activity">Create Activity</Link>
        </h2>
        <h2>
          <Link href="/create/day">Create Day</Link>
        </h2>
        <h2>
          <Link href="/create/itinerary">Create Itinerary</Link>
        </h2>
      </div>
  </>
  );
}