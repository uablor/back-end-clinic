import { Province } from "./province";

export interface ProvinceRepository {
    getAll(id: number): Promise<Province[]>;
}