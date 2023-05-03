import { db } from '../../../firebaseConfig'
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

 async function itinerary(req: any, res: any ) {
  const itinerariesCollectionRef = collection(db, 'itineraries');
  const { itineraryId } = req.query;
  try {
    // const { title: string } = req.body;
    // const activities = await db.collection('activities')

    if (req.method === 'PUT') {
      const docRef = doc(db, 'itineraries', itineraryId )
      await updateDoc(docRef, req.body)
      res.status(200).json({ message: 'itinerary was successfully updated' })
    } else if (req.method === 'GET') {
      const docRef = doc(db, 'itineraries', itineraryId );
      const docSnap = await getDoc(docRef)
      const response = docSnap.data()
      const dayArray = response?.dayOrder
      if (dayArray) {
        for (let i = 0; i < dayArray.length; i++) {
          const docRef = doc(db, 'days', dayArray[i].id );
          const docSnap = await getDoc(docRef)
          const hihi = docSnap.data()
          const replacement = { id: dayArray[i].id, ...hihi }
          dayArray[i] = replacement
        }
      }
      res.status(200).json(response);
    } else if (req.method === 'POST') {
      await addDoc(itinerariesCollectionRef, req.body)
      res.status(200).json({ message: 'your activity was successfully added' });
    } else if (req.method === 'DELETE') {
      const docRef = doc(db, 'itineraries', itineraryId )
      await deleteDoc(docRef)
      res.status(200).json({ message: 'your day was successfully deleted' });
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}

export default itinerary