import { Province } from "src/modules/province/domain/province"
import { DistrictProps } from "../interface/district.interface"

export class District{
    public id: number
    public name: string
    public name_en: string
    public province : Province
    constructor(props: DistrictProps) {
        this.id = props.id;
        this.name = props.name;
        this.name_en = props.name_en;
        this.province = props.province
    }
}