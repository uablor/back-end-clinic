import { ProvinceProps } from "../interface/province.interface";

export class Province{
    public id: number
    public name: string
    public name_en: string
    constructor(props: ProvinceProps) {
        this.id = props.id;
        this.name = props.name;
        this.name_en = props.name_en;
    }
}