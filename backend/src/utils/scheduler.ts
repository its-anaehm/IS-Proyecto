import * as cron from "node-cron";
import { UserService } from "../services/user.service";


cron.schedule('* 17 * * Monday', async () =>{
    await UserService.sendEmailToUsers();
});