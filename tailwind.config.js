/** @type {import('tailwindcss').Config} */
export default {
  // O MAIS IMPORTANTE: O Tailwind usa esta array para saber quais arquivos
  // ele deve escanear para encontrar as classes que você está usando.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Escaneia todos os seus componentes
  ],
  plugins: [],
};
