import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite plugin to strip version suffixes from package import specifiers
// e.g. "lucide-react" -> "lucide-react" and
// "@radix-ui/react-label" -> "@radix-ui/react-label"
function stripVersionImports() {
  return {
    name: 'strip-version-imports',
    async resolveId(source: string, importer: string | undefined) {
      if (typeof source !== 'string') return null
      const at = source.lastIndexOf('@')
      if (at > 0) {
        const after = source.slice(at + 1)
        if (/^[0-9]/.test(after)) {
          const stripped = source.slice(0, at)
          // Ask Vite to resolve the stripped id
          const resolved = await this.resolve(stripped, importer, { skipSelf: true })
          return resolved ? resolved.id : stripped
        }
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [stripVersionImports(), react()]
})
