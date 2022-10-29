import { Address } from "../dashboard/dashboard.model"
import { TestList } from "../services/tests.service"

export interface UserTestOrder {
    _id:string,
    userId:string,
    userDetail:User,
    cart:TestList[],
    userAddress:Address,
    scheduleSlot:Date
}

export interface User {
    firstName: string,
    gender: string,
    DOB: Date,
    number: Number
  }

