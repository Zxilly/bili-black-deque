import { popBlack } from "./pop"

async function main() {
    const uin = window.prompt("想移除的黑名单数量")
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

    await popBlack(deleteNum)
}

// when press Ctrl+B invoke main
document.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey && ev.key === "b") {
        main()
    }
})