/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/daisyui/dist/**/*.js',
        './node_modules/react-daisyui/dist/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#8000ff',
                paragraphGray: '#7987a1',
                secondaryDark: '#180030',
                lightGray: '#fafafa',
                secondaryLight: '#2b1343',
                white: {
                    default: '#ffffff',
                    50: 'rgba(255, 255, 255, 0.5)'
                },
                primaryLight: '#fbf7ff',
                black: '#171717',
                headingDark: '#180030',
                darkGray: {50: 'rgba(175, 175, 175, 0.5)'},
                headingLight: '#e9e9e9',
            },
            fontFamily: {
                inherit: 'inherit',
                poppins: ['Poppins',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'system-ui',
                    'Arial',
                    'sans-serif']
            }
        },
    },
    plugins: [ require("daisyui")],
}

