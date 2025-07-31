import { Province } from "src/modules/province/domain/province";

export interface DistrictProps {
    id: number;
    name: string;
    name_en: string;
    province : Province
}