import { db } from '../../../firebaseConfig'
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

 async function days(req: any, res: any ) {
  const dayCollectionRef = collection(db, 'days');
  const { dayId } = req.query;
  try {
    if (req.method === 'PUT') {
      const docRef = doc(db, 'days', dayId )
      await updateDoc(docRef, req.body)
      res.status(200).json({ message: 'day was successfully updated' })
    } else if (req.method === 'GET') {
      const docRef = doc(db, 'days', dayId );
      const docSnap = await getDoc(docRef)
      const response = docSnap.data()
      if (response) {
        response.id = dayId
      }
      res.status(200).json(response);
      const activityArray = response?.activityIds
      if (activityArray) {
        for (let i = 0; i < activityArray.length; i++) {
          const docRef = doc(db, 'activities', activityArray[i].id );
          const docSnap = await getDoc(docRef)
          const hihi = docSnap.data()
          const replacement = { id: activityArray[i].id, ...hihi }
          activityArray[i] = replacement
        }
      }
      res.status(200).json(response);
    } else if (req.method === 'POST') {
      await addDoc(dayCollectionRef, req.body)
      res.status(200).json({ message: 'your day was successfully added' });
    } else if (req.method === 'DELETE') {
      const dayDoc = doc(db, 'days', dayId)
      await deleteDoc(dayDoc)
      res.status(200).json({ message: 'your day was successfully deleted' });
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}

export default days