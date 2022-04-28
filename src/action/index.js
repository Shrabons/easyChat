import * as actiontype from "./type"

export const activeMan = (id) => {
    return {
        type: actiontype.ACTIVE_USER,
        payload : {
            manId: id
        }
    }

}