import { db } from '../../../firebaseConfig'
import { collection, getDocs, addDoc, doc, getDoc, query, where, limit } from "firebase/firestore";

 async function userActivities(req: any, res: any ) {
  const activityCollectionRef = collection(db, 'activities');
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
      res.status(200).json({hi: 'hi'});
    } else if (req.method === 'POST') {
      const queryUserActivities = query(activityCollectionRef, where('owner', '==', req.body.email))
      const docs = await getDocs(queryUserActivities)
      const docsArray: any[] = []
      docs.forEach((doc) => {
        const data = doc.data()
        const activityObject = { id: doc.id, ...data }
        docsArray.push(activityObject)
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

export default userActivities