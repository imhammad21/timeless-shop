/** @type {import('tailwindcss').Config} */
export default {
content: [
'./index.html',
'./src/**/*.{js,jsx,ts,tsx}',
],
theme: {
extend: {
colors: {
brand: {
50: '#eefdf4',
100: '#d6f8e3',
200: '#b0efc9',
300: '#7fe3ab',
400: '#4bd288',
500: '#24bb6a',
600: '#179654',
700: '#147647',
800: '#125c3b',
900: '#0f4a32'
}
},
boxShadow: {
soft: '0 10px 30px -12px rgba(0,0,0,0.15)'
}
}
},
plugins: []
}