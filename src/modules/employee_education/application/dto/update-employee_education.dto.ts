import { PartialType } from "@nestjs/mapped-types";
import { CreateEducationDto } from "./create-employee_education.dto";

export class UpdateEducationDto extends PartialType(CreateEducationDto) { }