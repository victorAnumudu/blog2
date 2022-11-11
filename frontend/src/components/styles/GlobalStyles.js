import { createGlobalStyle } from "styled-components"; // importing create global style module

export const GlobalStyles = createGlobalStyle`
html{
    scroll-behavior: smooth;
}
*{
margin : 0;
padding: 0;
box-sizing: border-box;
}
body{
    font-size: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}
img{
    width: 100%;
}

`;
