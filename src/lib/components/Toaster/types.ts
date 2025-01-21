
export type ToastAction = {
    label: string,
    onclick: () => void
}

export type ToastParams = {
    duration?: number,
    header?: string,
    body?: string,
    actions?: Array<ToastAction>
}