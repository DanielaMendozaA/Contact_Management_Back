import { IsNotEmpty, IsUUID } from "class-validator";
import { QueryDto } from "./query-contact.dto";

export class QueryContactByIdDto extends QueryDto{

  @IsNotEmpty()  
  @IsUUID()
  userId: string;

}
