import { logger } from './logger.js'
import { Worker as MermaidxWorker } from './worker-mermaidx.js'
import { Worker as PuppeteerWorker } from './worker.js'

// Selects the mermaid renderer. `KROKI_MERMAID_RENDERER=mermaidx` (default,
// browserless, via `uvx mermaidx`) or `puppeteer` (legacy headless-Chromium
// fallback). Fail closed: an unrecognized or missing value selects the default.
export function resolveRenderer(value = process.env.KROKI_MERMAID_RENDERER) {
  const normalized = (value ?? '').toString().trim().toLowerCase()
  if (normalized === 'puppeteer') {
    return 'puppeteer'
  }
  return 'mermaidx'
}

export function createWorker(renderer = resolveRenderer()) {
  if (renderer === 'puppeteer') {
    logger.info('Using puppeteer (headless Chromium) renderer for mermaid')
    return new PuppeteerWorker()
  }
  logger.info('Using mermaidx renderer for mermaid')
  return new MermaidxWorker()
}
