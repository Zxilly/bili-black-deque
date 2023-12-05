import {popBlack} from "./pop"
import {getBlackListCnt} from "./count";

async function manualRemove() {
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

    const current = await getBlackListCnt();

    alert(`处理完成，当前黑名单有 ${current} 人`)
}

async function configureAndSet() {
    let total = await getBlackListCnt()

    const uin = window.prompt(`当前黑名单有 ${total} 人，想保持在：`);
    if (uin === null) {
        alert("必须输入一个整数")
        return
    }

    const target = Number.parseInt(uin)
    if (Number.isNaN(target)) {
        alert(`${uin} 不能被解释为合法整数`)
        return
    }
    if (target <= 0) {
        alert("数字必须大于 0")
    }

    if (target > total) {
        console.warn(`当前黑名单中的人数 ${total} 少于 ${target}`)
    }

    localStorage.setItem(KEEP_TARGET, target.toString())
    localStorage.removeItem(LAST_TASK_DATE)

    await task()
}

async function task() {
    const keepTarget = localStorage.getItem(KEEP_TARGET);
    if (keepTarget === null) {
        return;
    }

    const target = Number.parseInt(keepTarget);
    if (Number.isNaN(target)) {
        console.error(`target ${keepTarget} is not a number`);
        return;
    }

    const lastTaskDate = localStorage.getItem(LAST_TASK_DATE);
    const today = new Date().toDateString();
    if (lastTaskDate === today) {
        return;
    }

    let total = await getBlackListCnt();

    if (total > target) {
        await popBlack(total - target, total);
    }

    localStorage.setItem(LAST_TASK_DATE, today);
}

// when press Ctrl+B invoke main
document.addEventListener("keydown", async (ev) => {
    if (ev.altKey && ev.key === "b") {
        await manualRemove()
    }

    if (ev.altKey && ev.key === "c") {
        await configureAndSet()
    }
})

const KEEP_TARGET = "keep-target";
const LAST_TASK_DATE = "last-task-date";

(async () => {
    await task()
})()