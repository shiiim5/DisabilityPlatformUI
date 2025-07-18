export interface HelperProfile {
 user:{
   id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string | Date;
  gender: number;
  address:string;
  zone: string | null;
  profileImage: string | null;
  createdAt: string;
 }
  bio: string | null;
  balance?: number; // Helper's current balance in EGP

}
