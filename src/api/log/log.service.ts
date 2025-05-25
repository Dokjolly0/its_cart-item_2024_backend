import { LogModel } from "./log.model";
import { CreateLogDTO } from "./log.dto";
import { getIP } from "../../utils/fetch-ip";

class LogService {
  async createLog(title: string, message: string, userId: string): Promise<void> {
    try {
      const ipFetch: string | undefined = await getIP();
      const ip = ipFetch || "";

      const logData: CreateLogDTO = {
        ip,
        title,
        message,
        date: new Date(),
        userId,
      };

      const log = new LogModel(logData);
      await log.save();
      console.log("Log created succefully:", log);
    } catch (error) {
      console.error("Errore during log creation:", error);
      throw new Error("Errore during log creation");
    }
  }
}

export const logService = new LogService();
