import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'monaco-themes': '/node_modules/monaco-themes/', // Adjust path accordingly
    },
    extensions: ['.js','.jsx', '.json'],  // Ensure JSON resolution
  },
  plugins: [react()],
})
