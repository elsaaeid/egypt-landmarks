// Minimal krpano types for development. Expand as needed.
interface KrpanoInstance {
  options?: any;
  destroy?: () => void;
}

declare global {
  interface Window {
    embedpano?: (opts: any) => KrpanoInstance | null;
    krpano_instances?: Record<string, KrpanoInstance>;
  }
}

export {};
