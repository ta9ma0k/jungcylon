/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_AIP_ID: string
  readonly VITE_AIP_PLACEMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}