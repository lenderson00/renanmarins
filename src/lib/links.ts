import { collection, deleteDoc, doc, DocumentData, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export type Link = {
  title: string;
  url: string;
}

export const createLink = async (link: Link) => {
  const linkRef = doc(firestore, 'links', `${link.title.trim().toLowerCase().replace(' ','.')}`);
  await setDoc(linkRef, link)
}

export const getAllLinks = async () => {
  const postRef = collection(firestore, 'links');
  const postQuery = query(postRef, orderBy('title', 'desc'))
  const postDocs = await getDocs(postQuery);
  return postDocs.docs.map(linkToJSON);
}


export const linkToJSON = (doc: DocumentData): Link => {
  const data = doc.data();

  return {
    ...data,
  }
}

export const deleteLink = async (title: string) => {
  const postRef = doc(firestore, 'links', `${title.trim().toLowerCase().replace(' ','.')}`);
  await deleteDoc(postRef)
}
type LinkUpdate = {
  id: string,title?:string, url?: string
}
export const updateLink = async ( link: LinkUpdate ) => {
  const linkRef = doc(firestore, 'links', `${link.id.trim().toLowerCase().replace(' ','.')}`);
  await setDoc(linkRef, { title: link.title, url: link.url }, { merge: true })
}