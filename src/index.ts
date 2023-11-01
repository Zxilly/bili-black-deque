import axios from "axios";
import fetchAdapter from "./adapter";

axios.defaults.adapter = fetchAdapter;

async function popBlack(num: number) {
    const result = (await axios.get<any>('https://api.bilibili.com/x/relation/blacks')).data;
    let total = result.data.total

}

async function main() {
    const uin = window.prompt("想保留的黑名单数量")
    if (uin === null) {
        alert("必须输入一个整数")
        return
    }
    const deleteNum = Number.parseInt(uin)
    if (Number.isNaN(deleteNum)) {
        alert(`${uin}不能被解释为合法整数`)
    }

    await popBlack(deleteNum)
}

// when press Ctrl+P invoke main
document.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey && ev.key === "b") {
        main()
    }
})