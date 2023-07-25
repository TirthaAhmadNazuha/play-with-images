import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    reportCompressedSize: false,
  },
  esbuild: {
    jsxFactory: 'AmberJsx.createElement',
    jsxFragment: 'AmberJsx.Fragment',
    jsxImportSource: 'amber',
    jsxInject: "import { AmberJsx } from 'amber';\n",
  },
});
