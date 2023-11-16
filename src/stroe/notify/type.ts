import { reqNotify, enqNotify, deqNotify } from "./actions";

export type EnqType = {
  msg: string;
  disappearTime: number;
  uuid?: number;
  isErr?: boolean;
}

export type State = EnqType[];
export type ActionType = 
  | ReturnType<typeof reqNotify>
  | ReturnType<typeof enqNotify>
  | ReturnType<typeof deqNotify>
