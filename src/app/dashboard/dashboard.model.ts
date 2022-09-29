export interface userProfile {
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    number:Number,
    DOB:Date,
    gender:string,
    password:string,
    confirm_password:string,
    address:Address[],
    familyMember:FamilyMember[]
}

export interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pinCode: Number;
    landmark: string;
}
export interface FamilyMember {
    memberFirstName: string;
    memberLastName: string;
    relation: string;
    memberMobile: Number;
    memberGender:string ;
    memberDOB: Date;
}