import { SenderType } from "../enums/senderType";

export type Message = {
  sender: SenderType;
  message: string;
  createdAt: Date;
  id: string;
};
