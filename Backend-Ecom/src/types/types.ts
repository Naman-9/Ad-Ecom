export interface newUserRequesstBody{
    name: string;
    email: string;
    photo: string;
    gender: "male" | "female";
    _id: string;
    dob: Date;
}