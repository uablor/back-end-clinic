import { Gender } from "src/infrastructure/typeorm/employee.orm-entity";


export interface EmployeeResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  birth_date: string | null;
  gender: Gender | null;
  district_id: number | null;
  district: string | null;
  distinct_en: string | null;
  province_id: number | null;
  province: string | null;
  province_en: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
