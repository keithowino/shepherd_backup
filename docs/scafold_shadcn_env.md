## Vite + React + Tailwindcss v4 + Shadcn Manual Setup

> **Goal:** support registries.

### 1. Scaffold a standard Vite JavaScript project

```bash
npm create vite@latest shadcn-vite-js -- --template react
cd shadcn-vite-js
npm install
```

### 2. Install and configure Tailwind CSS v4

Tailwind v4 uses a Vite plugin and a single CSS import, removing the need for tailwind.config.js and postcss.config.js .

```bash
npm install tailwindcss @tailwindcss/vite
```

Update your vite.config.js to include the Tailwind plugin. You also need to add the path alias here for Vite to resolve imports correctly.

```text
~\client\vite.config.js
```

```js
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** https://vite.dev/config/ */
export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    build: {
      /**
       * Increase chunk size warning limit
       */
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          /**
           * manualChunks should be a function in Vite 8/Rolldown
           */
          manualChunks(id) {
            /**
             * React core
             */
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom") ||
              id.includes("node_modules/react-router-dom")
            ) {
              return "react-vendor";
            }
            /**
             * Cloudinary
             */
            if (id.includes("node_modules/cloudinary")) {
              return "cloudinary";
            }
            /**
             * Everything else goes to vendor
             */
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    plugins: [react(), tailwindcss()],
  };
});
```

### 3. Update the global CSS file

For now, replace its contents with:

```css
@import "tailwindcss";
```

### 4. Create jsconfig.json for the shadcn CLI

Since you are using JavaScript, the shadcn CLI reads jsconfig.json instead of tsconfig.json to resolve the @/ alias . Create this file in your project root:

```text
~\client\jsconfig.json
```

```json
{
	"compilerOptions": {
		"moduleResolution": "bundler",
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```

### 5. Initialize shadcn and force JavaScript output

Run the init command. It may warn about missing TypeScript config, but it will proceed using your jsconfig.json.

```bash
npx shadcn@latest init
```

If you have a preset from:

```text
https://ui.shadcn.com/create?template=vite
```

such as:

```bash
npx shadcn@latest init --preset b3lDlqdIO --template vite --pointer
```

edit to:

```bash
npx shadcn@latest init --preset b3lDlqdIO --pointer
```