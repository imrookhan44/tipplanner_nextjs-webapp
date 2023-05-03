import { db } from '../../../firebaseConfig'
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

 async function days(req: any, res: any ) {
  const daysCollectionRef = collection(db, 'days');
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
      const queryForAllPublishedDays = query(daysCollectionRef, where("draftMode", '==', false))
      const data = await getDocs(queryForAllPublishedDays) 
      const docsArray: any[] = []
      data.forEach((doc) => {
        const data = doc.data()
        const dayObject = { id: doc.id, ...data }
        docsArray.push(dayObject)
      })
      res.status(200).json(docsArray);
    } else if (req.method === 'POST') {
      await addDoc(daysCollectionRef, req.body)
      res.status(200).json({ message: 'your day was successfully added' });
    } else if (req.method === 'DELETE') {
      // await db.collection('entries').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}

export default days