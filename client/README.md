# Buymall Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

(1.) [Create React App](#create-react-app)
(2.) [Eslint](#eslint)
(3.) [Sass](#sass)
(4.) [Styling using Tailwindcss](#styling-using-tailwindcss)
(5.) [Animation using Framer Motion](#5-animation-using-framer-motion)
(7.) [Testing](#testing)
(8.) [Redux using the Redux Toolkit](#redux-using-the-redux-toolkit)

### Create React App

    ```bash
    npx create-react-app . --template typescript
    ```

    ```bash
    npm create vite@latest
    ```

### Eslint

    ```bash
    npm i --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
    npx eslint --init
    ```

### Prettier

    ```bash
    npm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier
    ```

### Sass

### Styling using Tailwindcss

    - Install:

        ```bash
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init -p
        ```

    - Add the following property to "tailwindcss.config":

        ```js
        module.exports = {
            content: ['./src/**/*.{js,jsx,ts,tsx}'],
        };
        ```

- Add the following code to "index.css":

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### (5.) Animation using Framer Motion

    npm i framer-motion

### Testing

npm i -D jest ts-jest ts-node @types/jest
npm i -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm i -D  jest-environment-jsdom identity-obj-proxy

npx jest --init

"build": "tsc -p tsconfig.prod.json && vite build",
"test": "NODE_ENV=test jest"

Testing react hooks:

    <!-- @testing-library/react": "^13.4.0", -->
    npm i @testing-library/react@^13.1
    npm install --save-dev @testing-library/react-hooks

Running Tests:

    npm test

### Redux using the Redux Toolkit

Why you might want to replace Redux: You might want to stay within the react domain or ship less code by avoiding the additional library dependencies

Why not to use Context API instead of Redux: The Context API is great for low frequency updates but not high frequency update.
All components that are consuming a particular context will re-render when any one property in the context changes
including components that are not consuming that one property that was updated.

    Low frequency updates: Authentication state, Theme(e.g. Theme mode(light/dark))
    High frequency updates: products management(favorite products etc), shopping cart management etc.

    npm i react-redux @reduxjs/toolkit

### Containerize

### Deployment

    npm run build
