import { jsontrade } from "./jsontrade";

interface alarm {
    name: string,
    id: number,
    trades: jsontrade[]
}

export {
    alarm
}