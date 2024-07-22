
interface iTheme {
    palette: {
        mode: "dark" | "light"
    }
}

const mainTheme = (isDark: boolean): iTheme => ({
    palette: {
        mode: isDark ? 'dark' : 'light',
    },
})

export default mainTheme