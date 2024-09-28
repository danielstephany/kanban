
interface iTheme {
    palette: {
        mode: "dark" | "light"
        background: {default: string}
    },
    typography: {[key: string]: any}
}

const mainTheme = (isDark: boolean): iTheme => ({
    palette: {
        mode: isDark ? 'dark' : 'light',
        background: {
            default: isDark ? '#121212' : '#f4f4f4'
        }
    },
    typography: {
        h2: {
            fontSize: 36,
            fontWeight: 400
        },
        h3: {
            fontSize: 24,
            fontWeight: 500
        },
        h4: {
            fontSize: 20,
            fontWeight: 500
        },
        h5: {
            fontSize: 18,
            fontWeight: 500
        },
        h6: {
            fontSize: 16,
            fontWeight: 500
        },
    },
})

export default mainTheme