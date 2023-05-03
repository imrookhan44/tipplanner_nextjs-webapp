import { db } from '../../../../firebaseConfig'
import { collection, getDocs, addDoc, doc, getDoc, query, where } from "firebase/firestore";

 async function userItineraries(req: any, res: any ) {
  const itinerariesCollectionRef = collection(db, 'itineraries');
  // const { dayId } = req.query;
  try {
    // const { title: string } = req.body;
    // const activities = await db.collection('activities')

    if (req.method === 'PUT') {
      // await db.collection('entries').doc(id).update({
      //   ...req.body,
      //   updated: new Date().toISOString(),
      // });
    } else if (req.method === 'GET') {
      // const queryUserDays = query(dayCollectionRef, where('owner', '==', user.email))
      // const response = queryUserDays
    } else if (req.method === 'POST') {
      const queryUserItineraries = query(itinerariesCollectionRef, where('owner', '==', req.body.email), where('draftMode', '==', false))
      const docs = await getDocs(queryUserItineraries)
      const docsArray: any[] = []
      docs.forEach((doc) => {
        const data = doc.data()
        const dayObject = { id: doc.id, ...data }
        docsArray.push(dayObject)
      })
      res.status(200).json(docsArray);
    } else if (req.method === 'DELETE') {
      // await db.collection('entries').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}

export default userItineraries