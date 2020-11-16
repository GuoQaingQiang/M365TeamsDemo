import React, { useEffect, useRef } from 'react';
import "./index.css";

type IM365Message = {
    success: (msg: string) => void,
    error: (msg: string) => void,
    warning: (msg: string) => void,
    addAndRemove: (msg: string, type: string) => void
}

let Timer: NodeJS.Timeout | null = null;

const M365Message: IM365Message = {
    addAndRemove(msg: string, type: string): void {
        Timer = null;
        clearTimeout(Timer as any);
        // let M365MessageNode = document.getElementById("M365Message");
        // if (Object.prototype.toString.call(M365MessageNode) !== "[object Null]") {
        //     (M365MessageNode as any).parentNode.removeChild(M365MessageNode);
        // }
        Timer = setTimeout(() => {
            let M365MessageNode = document.getElementById("M365Message");
            if (Object.prototype.toString.call(M365MessageNode) !== "[object Null]") {
                (M365MessageNode as any).parentNode.removeChild(M365MessageNode);
            }
            Timer = null;
            clearTimeout(Timer as any);
        }, 3000);
        const dom = document.createElement("div");
        dom.setAttribute("id", "M365Message");
        dom.setAttribute("class", "M365Message M365Message-success");
        dom.innerText = msg;
        document.body.appendChild(dom);
    },
    success(msg: string): void {
        this.addAndRemove(msg, 'success');
    },
    error(msg: string): void {
        this.addAndRemove(msg, 'error');
    },
    warning(msg: string): void {
        this.addAndRemove(msg, 'warning');
    }
}

export default M365Message;