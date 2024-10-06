import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { flatRoutes } from 'remix-flat-routes';

export default defineConfig({
    plugins: [
        remix({
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
                unstable_singleFetch: true,
            },
            // https://github.com/kiliman/remix-flat-routes?tab=readme-ov-file#%EF%B8%8F-configuration
            // ignore all files in routes folder to prevent
            // default remix convention from picking up routes
            ignoredRouteFiles: ['**/*'],
            routes: async (defineRoutes) => {
                return flatRoutes('routes', defineRoutes);
            },
        }),
        tsconfigPaths(),
    ],
});

declare module '@remix-run/server-runtime' {
    // or cloudflare, deno, etc.
    interface Future {
        unstable_singleFetch: true;
    }
}
