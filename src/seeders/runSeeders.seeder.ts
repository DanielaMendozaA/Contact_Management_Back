import { Injectable } from "@nestjs/common";
import { ContactsSeeder } from "./contact.seeder";




@Injectable()
export class SeederRunner{
    constructor(
        private readonly contactSeeder: ContactsSeeder,
    ){}

    async runSeeds() : Promise<void>{
        await this.contactSeeder.run();
    }


}