export const shortHash = hash => {
 if (!hash) return ''
 return `${hash.slice(0, 5)}...${hash.slice(-3)}`
}
