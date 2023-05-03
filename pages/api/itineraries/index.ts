import { db } from '../../../firebaseConfig'
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

 async function itineraries(req: any, res: any ) {
  const itinerariesCollectionRef = collection(db, 'itineraries');
  // const { id } = req.query;
  try {
    // const { title: string } = req.body;
    // const activities = await db.collection('activities')

    if (req.method === 'PUT') {
      // await db.collection('entries').doc(id).update({
      //   ...req.body,
      //   updated: new Date().toISOString(),
      // });
    } else if (req.method === 'GET') {
      // const doc = await db.collection('activities').doc(id).get();
      const queryForAllPublishedItineraries = query(itinerariesCollectionRef, where("draftMode", '==', false))
      const data = await getDocs(queryForAllPublishedItineraries) 
      const docsArray: any[] = []
      data.forEach((doc) => {
        const data = doc.data()
        const itineraryObject = { id: doc.id, ...data }
        docsArray.push(itineraryObject)
      })
      res.status(200).json(docsArray);
    } else if (req.method === 'POST') {
      await addDoc(itinerariesCollectionRef, req.body)
      res.status(200).json({ message: 'your itinerary was successfully added' });
    } else if (req.method === 'DELETE') {
      // await db.collection('entries').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}

export default itineraries