import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "cmstc.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : `https://localhost:56604`;

export default defineConfig({
    root: path.resolve(__dirname, 'src'),
    build: {
        outDir: path.resolve(__dirname, './dist'),
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: path.resolve(__dirname, 'src/index.html')
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/js'),
            '@scss': path.resolve(__dirname, './src/scss')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
               // additionalData: `@import "@/scss/app.scss";`
            }
        }
    },
    plugins: [react()],
    server: {
        proxy: {
            '^/css/site.css': {
                target,
                secure: false
            },
            '^/lib/bootstrap/dist/css/bootstrap.min.css': {
                target,
                secure: false
            },
            '^/lib/bootstrap/dist/js/bootstrap.bundle.min.js': {
                target,
                secure: false
            },
            '/Identity/Admin/UsersList': {
                target,
                secure: false
            },
            '^/Identity/Account/Register': {
                target,
                secure: false
            },
            '^/Identity/Account/Login': {
                target,
                secure: false
            },
            '^/Identity/Account/Logout': {
                target,
                secure: false
            },
            '^/Identity/Account/Manage': {
                target,
                secure: false
            },
            '^/favicon.ico': {
                target,
                secure: false
            },
            '^/Privacy': {
                target,
                secure: false
            },
            '^/Home': {
                target,
                secure: false
            },
            '^/Index': {
                target,
                secure: false
            },
            '^/Users': {
                target,
                secure: false
            },
            '^/Configs': {
                target,
                secure: false
            },
            '^/Context': {
                target,
                secure: false
            },
            '^/api/Weatherforecast': {
                target,
                secure: false
            },
            '^/api/Home': {
                target,
                secure: false
            },
            '^/api/Users': {
                target,
                secure: false
            },
            '^/api/Configs': {
                target,
                secure: false
            },
            '^/api/Context': {
                target,
                secure: false
            },
            '^/api/Themes': {
                target,
                secure: false
            },
            '^/api/Books': {
                target,
                secure: false
            },
            '^/api/Chapters': {
                target,
                secure: false
            },
            '^/api/Pages': {
                target,
                secure: false
            },
            '^/api/Contents': {
                target,
                secure: false
            },
            '^/api/Pictures': {
                target,
                secure: false
            }
        },
        port: parseInt(env.DEV_SERVER_PORT || '56604'),
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
});

/*
 proxy: {
            '^/.*': {
                target,
                changeOrigin: true
            },
            '^/css/site.css': {
                target,
                secure: false
            },
            '^/lib/bootstrap/dist/css/bootstrap.min.css': {
                target,
                secure: false
            },
            '^/lib/bootstrap/dist/js/bootstrap.bundle.min.js': {
                target,
                secure: false
            },
            '/Identity/Admin/UsersList': {
                target,
                secure: false
            },
            '^/Identity/Account/Register': {
                target,
                secure: false
            },
            '^/Identity/Account/Login': {
                target,
                secure: false
            },
            '^/Identity/Account/Logout': {
                target,
                secure: false
            },
            '^/Identity/Account/Manage': {
                target,
                secure: false
            },
            '^/favicon.ico': {
                target,
                secure: false
            },
            '^/Privacy': {
                target,
                secure: false
            },
            '^/Home': {
                target,
                secure: false
            },
            '^/Index': {
                target,
                secure: false
            },
            '^/Users': {
                target,
                secure: false
            },
            '^/Configs': {
                target,
                secure: false
            },
            '^/Context': {
                target,
                secure: false
            },
            '^/api/Weatherforecast': {
                target,
                secure: false
            },
            '^/api/Home': {
                target,
                secure: false
            },
            '^/api/Users': {
                target,
                secure: false
            },
            '^/api/Configs': {
                target,
                secure: false
            },
            '^/api/Context': {
                target,
                secure: false
            },
            '^/api/Themes': {
                target,
                secure: false
            },
            '^/api/Books': {
                target,
                secure: false
            },
            '^/api/Chapters': {
                target,
                secure: false
            },
            '^/api/Pages': {
                target,
                secure: false
            },
            '^/api/Contents': {
                target,
                secure: false
            },
            '^/api/Pictures': {
                target,
                secure: false
            }
*/