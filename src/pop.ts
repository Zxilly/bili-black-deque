import axios from "axios";

const csrf_token = document.cookie.split('; ')!!.find(row => row.startsWith('bili_jct'))!!.split('=')[1];

export async function popBlack(num: number, total: number) {
    const last_page = Math.ceil(total / 50)
    const toRemove: any[] = []

    for (let current_page = last_page; current_page > 0; current_page--) {
        const resp = (await axios.get<any>('https://api.bilibili.com/x/relation/blacks', {
            params: {
                ps: 20,
                pn: current_page
            },
            withCredentials: true
        })).data

        const list = resp.data.list

        list.reverse();

        for (const user of list) {
            const id = user['mid']
            toRemove.push(id)

            if (toRemove.length >= num) {
                break;
            }
        }

        if (toRemove.length >= num) {
            break;
        }
    }

    console.log(JSON.stringify(toRemove))

    console.log("收集完成，准备解除")

    console.groupCollapsed("解除请求细节")
    for (let id of toRemove) {
        const params = new URLSearchParams()
        params.append("fid", id)
        params.append("csrf", csrf_token)
        params.append("act", "6")
        params.append("re_src", "116")

        let retries = 3;
        while (retries > 0) {
            const resp = (await axios.post<any>("https://api.bilibili.com/x/relation/modify", params, {
                withCredentials: true
            })).data
            console.debug(JSON.stringify(resp))
            if (resp.code === 0) {
                break;
            }
            retries--;
            console.log("限流中，等待2秒")
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    console.groupEnd()
}

