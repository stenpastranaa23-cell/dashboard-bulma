import { defineConfig } from "vite";
import path, { resolve } from 'node:path';
import * as glob from "glob";

const __dirname = import.meta.dirname;

// Cada .html del proyecto es una pagina (MPA)
function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob.sync('./**/*.html', { ignore: ['./dist/**', './node_modules/**'] })
            .map((file) => [
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file)
            ])
    );
}

export default defineConfig({
    appType: 'mpa',
    base: './', // rutas relativas: funciona en github.io/<repo>/
    build: {
        rolldownOptions: { input: obtenerHtmlFiles() }
    },
});
