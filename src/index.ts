import { popBlack } from "./pop"
import {getBlackListCnt} from "./count";

async function main() {
    let total = await getBlackListCnt();

    const uin = window.prompt(`现在黑名单有 ${total} 人，想移除：`)
    if (uin === null) {
        alert("必须输入一个整数")
        return
    }
    const deleteNum = Number.parseInt(uin)
    if (Number.isNaN(deleteNum)) {
        alert(`${uin} 不能被解释为合法整数`)
        return
    }
    if (deleteNum <= 0) {
        alert("数字必须大于 0")
    }

    if (total < deleteNum) {
        alert(`当前黑名单中的人数 ${total} 少于 ${deleteNum}`)
        return
    }

    await popBlack(deleteNum, total)
}

// when press Ctrl+B invoke main
document.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey && ev.key === "b") {
        main()
    }
})