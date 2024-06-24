import { createGlobalStyle } from "styled-components"
import { noralize } from "./normalize.ts"
import { base } from "./base.ts"

const globalStyles = createGlobalStyle`
    ${noralize}
    ${base}
`

export default globalStyles