import { District } from "./district";

export interface DistrictRepository {
    getAll(id: number): Promise<District[]>
    findOne(id: number): Promise<District | null>
}