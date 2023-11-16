import { EnqType } from "./type";
import { Dispatch } from "redux";
export const NOTIFY = "notify_NOTIFY" as const;
export const ENQ_NOTIFY = "notify_ENQ_NOTIFY" as const;
export const DEQ_NOTIFY = "notify_DEQ_NOTIFY" as const;


export const notify = (msg: string, disappearTime = 3000): any => async (dispatch: Dispatch) => {
  dispatch(({ type: NOTIFY }));
  try {
    dispatch(enqNotify({ msg, disappearTime, uuid: Math.random() }));
    setTimeout(() => dispatch(deqNotify()) ,disappearTime);
  } catch(e) {
    console.log(e);
    dispatch(enqNotify({ msg: "Something was wrong!", disappearTime, uuid: Math.random(), isErr: true }));
  };
};

export const reqNotify = () => ({ type: NOTIFY });
export const enqNotify = ({ msg, disappearTime, uuid }: EnqType) => ({ type: ENQ_NOTIFY, payload: { msg, disappearTime, uuid } });
export const deqNotify = () => ({ type: DEQ_NOTIFY });