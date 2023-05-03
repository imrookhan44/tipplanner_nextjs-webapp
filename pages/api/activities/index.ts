import { db } from '../../../firebaseConfig'
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

 async function activities(req: any, res: any ) {
  const activitiesCollectionRef = collection(db, 'activities');
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
      const queryForAllActivities = query(activitiesCollectionRef, where("draftMode", '==', false))
      const data = await getDocs(queryForAllActivities) 
      const docsArray: any[] = []
      data.forEach((doc) => {
        const data = doc.data()
        const activityObject = { id: doc.id, ...data }
        docsArray.push(activityObject)
      })
      res.status(200).json(docsArray);
    } else if (req.method === 'POST') {
      await addDoc(activitiesCollectionRef, req.body)
      res.status(200).json({ message: 'your activity was successfully added' });
    } else if (req.method === 'DELETE') {
      // await db.collection('entries').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}

export default activities