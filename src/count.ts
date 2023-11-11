import axios from "axios";

export async function getBlackListCnt() {
    const result = (await axios.get<any>('https://api.bilibili.com/x/relation/blacks', {
        withCredentials: true
    })).data;
    return result.data.total as number
}