import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const jobsCollection = collection(db, "jobs");

// Job type definition
interface Job {
  id?: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  matched: number;
  applicants: number;
  status: string;
  isActive: boolean;
  postedDate: string;
  matchedCandidates: number;
}

// Create a job
export const createJob = async (jobData: Job): Promise<string> => {
  try {
    const docRef = await addDoc(jobsCollection, jobData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding job: ", error);
    throw error;
  }
};

// Read all jobs
export const getJobs = async (): Promise<(Job & { id: string })[]> => {
  try {
    const querySnapshot = await getDocs(jobsCollection);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Job & { id: string })
    );
  } catch (error) {
    console.error("Error fetching jobs: ", error);
    throw error;
  }
};

// Read a single job by ID
export const getJobById = async (id: string): Promise<Job & { id: string }> => {
  try {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Job & { id: string };
    } else {
      throw new Error("Job not found");
    }
  } catch (error) {
    console.error("Error fetching job: ", error);
    throw error;
  }
};

// Update a job
export const updateJob = async (
  id: string,
  updatedData: Partial<Job>
): Promise<void> => {
  try {
    const docRef = doc(db, "jobs", id);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error("Error updating job: ", error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "jobs", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting job: ", error);
    throw error;
  }
};
