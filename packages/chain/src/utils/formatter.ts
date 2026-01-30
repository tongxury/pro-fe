export const shorten = (value: string, options?: { keepLength?: number, }): string => {

    if (!value) return ''

    const keepLength = options?.keepLength || 4

    if (value.length <= keepLength * 2) {
        return value
    }

    const left = value.slice(0, keepLength)
    const right = value.slice(value.length - keepLength,)

    return `${left}...${right}`
}
