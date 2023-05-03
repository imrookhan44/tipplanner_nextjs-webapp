import { db } from '../../../firebaseConfig'
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

 async function activity(req: any, res: any ) {
  const activityCollectionRef = collection(db, 'activities');
  const { activityId } = req.query;
  try {

    if (req.method === 'PUT') {
      const docRef = doc(db, 'activities', activityId )
      await updateDoc(docRef, req.body)
      res.status(200).json({ message: 'activity was successfully updated' })
    } else if (req.method === 'GET') {
      const docRef = doc(db, 'activities', activityId );
      const docSnap = await getDoc(docRef)
      const response = docSnap.data()
      if (response) {
        response.id = activityId
      }
      res.status(200).json(response);
    } else if (req.method === 'POST') {
      await addDoc(activityCollectionRef, req.body)
      res.status(200).json({ message: 'your activity was successfully added' });
    } else if (req.method === 'DELETE') {
      const docRef = doc(db, 'activities', activityId )
      await deleteDoc(docRef)
      res.status(200).json({ message: 'your day was successfully deleted' });
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}

export default activity