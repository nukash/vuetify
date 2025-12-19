// composables/typography.ts
// Utilities
import { computed, inject, ref, watchEffect } from 'vue'
import { getOrCreateStyleElement, mergeDeep, toKebabCase } from '@/util'
import { IN_BROWSER } from '@/util/globals'

// Types
import type { App, ComputedRef, CSSProperties, InjectionKey, Ref } from 'vue'
import type { DisplayThresholds } from './display'

export type TypographyVariant = `${string}-${string}`
export type TypographyStyle = CSSProperties

function genDefaults (keepVariants = true): TypographyOptions {
  return {
    prefix: 'v-',
    scoped: false,
    merge: true,
    resetStyles: { textTransform: 'none' },
    responsive: true,
    variants: keepVariants ? {
      'display-large': { fontSize: '57px', lineHeight: '64px', fontWeight: 400, letterSpacing: '-0.25px' },
      'display-medium': { fontSize: '45px', lineHeight: '52px', fontWeight: 400, letterSpacing: '0px' },
      'display-small': { fontSize: '36px', lineHeight: '44px', fontWeight: 400, letterSpacing: '0px' },
      'headline-large': { fontSize: '32px', lineHeight: '40px', fontWeight: 400, letterSpacing: '0px' },
      'headline-medium': { fontSize: '28px', lineHeight: '36px', fontWeight: 400, letterSpacing: '0px' },
      'headline-small': { fontSize: '24px', lineHeight: '32px', fontWeight: 400, letterSpacing: '0px' },
      'body-large': { fontSize: '16px', lineHeight: '24px', fontWeight: 400, letterSpacing: '0.5px' },
      'body-medium': { fontSize: '14px', lineHeight: '20px', fontWeight: 400, letterSpacing: '0.25px' },
      'body-small': { fontSize: '12px', lineHeight: '16px', fontWeight: 400, letterSpacing: '0.4px' },
      'label-large': { fontSize: '14px', lineHeight: '20px', fontWeight: 500, letterSpacing: '0.1px' },
      'label-medium': { fontSize: '12px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' },
      'label-small': { fontSize: '11px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' },
    } : {},
    stylesheetId: 'vuetify-typography-stylesheet',
  }
}

function parseTypographyOptions (options: TypographyOptions = genDefaults()): InternalTypographyOptions {
  const merged = mergeDeep(genDefaults(options?.merge ?? true), options)
  for (const name in merged.variants) {
    if (!merged.variants[name]) {
      delete merged.variants[name]
    }
  }
  return merged as InternalTypographyOptions
}

export interface TypographyOptions {
  cspNonce?: string
  prefix?: string
  scoped?: boolean
  merge?: boolean
  resetStyles?: CSSProperties
  responsive?: boolean
  stylesheetId?: string
  variants?: Record<TypographyVariant, TypographyStyle | null>
  variables?: Record<string, string>
}

export interface InternalTypographyOptions {
  cspNonce?: string
  prefix: string
  scoped: boolean
  merge: boolean
  resetStyles: CSSProperties
  responsive: boolean
  stylesheetId: string
  variants: Record<TypographyVariant, TypographyStyle>
  variables?: Record<string, string>
}

function genTypographyVariables (variables: Record<string, string>): string {
  const lines: string[] = [':root{']
  for (const [key, value] of Object.entries(variables)) {
    lines.push(`--v-typography--${key}:${value};`)
  }
  lines.push('}')
  return lines.join('')
}

function stringifyStyle (style: TypographyStyle, variables?: Record<string, string>): string {
  return Object.entries(style)
    .map(([key, val]) => {
      const cssKey = toKebabCase(key)
      let cssValue = String(val)

      if (key === 'fontFamily' && variables) {
        if (cssValue.startsWith('var(')) {
          return `${cssKey}:${cssValue}`
        }
        if (variables[cssValue]) {
          cssValue = `var(--v-typography--${cssValue})`
        }
      }

      return `${cssKey}:${cssValue}`
    })
    .join('; ')
}

function genTypographyCss (
  prefix: string,
  scoped: boolean,
  resetStyles: CSSProperties,
  variants: Record<TypographyVariant, TypographyStyle | null>,
  variables?: Record<string, string>,
  responsive = false,
  thresholds?: DisplayThresholds,
): string {
  const content: string[] = []

  if (variables && Object.keys(variables).length > 0) {
    content.push(genTypographyVariables(variables))
  }

  content.push(`.${prefix}typography{${stringifyStyle(prefix, resetStyles)}}`)
  const scopedPrefix = scoped ? `.${prefix}typography` : ''

  for (const [variant, style] of Object.entries(variants)) {
    if (!style) continue
    content.push(`${scopedPrefix}.${variant}{${stringifyStyle(style, variables)}}`)
  }

  if (responsive && thresholds) {
    for (const [breakpoint, width] of Object.entries(thresholds)) {
      if (!width) continue // skip xs
      content.push(`@media (min-width: ${width}px){`)
      for (const [variant, style] of Object.entries(variants)) {
        if (!style) continue
        const [name, size] = variant.split(/-(.*)/) // split by first -
        const responsiveClass = `${name}-${breakpoint}-${size}`
        content.push(`${scopedPrefix}.${responsiveClass}{${stringifyStyle(style, variables)}}`)
      }
      content.push('}')
    }
  }

  return '@layer vuetify.typography {\n' + content.map(v => `  ${v}`).join('\n') + '\n}'
}

function upsertStyles (id: string, cspNonce: string | undefined, styles: string) {
  if (!IN_BROWSER) return

  const styleEl = getOrCreateStyleElement(id, cspNonce)

  if (!styleEl) return

  styleEl.innerHTML = styles
}

export interface TypographyInstance {
  variants: Ref<Record<TypographyVariant, TypographyStyle>>
}

export const TypographySymbol: InjectionKey<TypographyInstance> = Symbol.for('vuetify:typography')

export function createTypography (
  options?: TypographyOptions | false,
  thresholds?: Readonly<Ref<DisplayThresholds>>,
): TypographyInstance & { install: (app: App) => void, _css: ComputedRef<string> } | null {
  if (options === false) {
    return null
  }

  const parsedOptions = parseTypographyOptions(options)

  const variants = ref(parsedOptions.variants)

  const styles = computed(() =>
    genTypographyCss(
      parsedOptions.prefix,
      parsedOptions.scoped,
      parsedOptions.resetStyles,
      variants.value,
      parsedOptions.variables,
      parsedOptions.responsive,
      thresholds?.value
    )
  )

  watchEffect(() => {
    upsertStyles(parsedOptions.stylesheetId, parsedOptions.cspNonce, styles.value)
  })

  const instance: TypographyInstance = {
    variants,
  }

  function install (app: App) {
    // TODO: align with theme.ts
    app.provide(TypographySymbol, instance)
  }

  return { ...instance, _css: styles, install }
}

export function useTypography (): TypographyInstance {
  const typography = inject(TypographySymbol, null)
  if (!typography) {
    throw new Error(
      '[Vuetify] useTypography() must be used after createTypography() has been called',
    )
  }

  return typography
}
