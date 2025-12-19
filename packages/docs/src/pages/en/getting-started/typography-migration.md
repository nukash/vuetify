---
meta:
  nav: Typography migration
  title: Typography migration
  description: Guide for migrating from legacy SCSS typography to MD3 typography system
  keywords: typography, migration, md3, scss, upgrade
related:
  - /getting-started/upgrade-guide/
  - /styles/text-and-typography/
---

# Typography Migration Guide: SCSS to MD3

This guide maps the legacy Vuetify typography variants from `styles/settings/_variables.scss` to the new Material Design 3 (MD3) variants in `composables/typography.ts`.

## Quick Reference

| Legacy Variant (SCSS) | MD3 Variant (JS) | CSS Class | Notes |
|----------------------|------------------|-----------|-------|
| `h1` | `display-large` | `.text-display-large` | Largest display text |
| `h2` | `display-medium` | `.text-display-medium` | Medium display text |
| `h3` | `display-small` | `.text-display-small` | Small display text |
| `h4` | `headline-large` | `.text-headline-large` | Large headline |
| `h5` | `headline-medium` | `.text-headline-medium` | Medium headline |
| `h6` | `headline-small` | `.text-headline-small` | Small headline |
| `subtitle-1` | `body-large` | `.text-body-large` | Primary body text |
| `subtitle-2` | `label-large` | `.text-label-large` | Emphasized smaller text |
| `body-1` | `body-large` | `.text-body-large` | Primary body text |
| `body-2` | `body-medium` | `.text-body-medium` | Secondary body text |
| `button` | `label-large` | `.text-label-large` | Button/action text |
| `caption` | `body-small` | `.text-body-small` | Smallest body text |
| `overline` | `label-small` | `.text-label-small` | Small label text |

## Detailed Comparison

### Display Variants (formerly Headings h1-h3)

#### h1 → display-large

**Legacy (SCSS):**
```scss
'h1': (
  'size': 6rem,           // 96px
  'weight': 300,
  'line-height': 1,
  'letter-spacing': -.015625em
)
```

**MD3 (JS):**
```ts
'display-large': {
  fontSize: '57px',
  lineHeight: '64px',
  fontWeight: 400,
  letterSpacing: '-0.25px'
}
```

#### h2 → display-medium

**Legacy (SCSS):**
```scss
'h2': (
  'size': 3.75rem,        // 60px
  'weight': 300,
  'line-height': 1,
  'letter-spacing': -.0083333333em
)
```

**MD3 (JS):**
```ts
'display-medium': {
  fontSize: '45px',
  lineHeight: '52px',
  fontWeight: 400,
  letterSpacing: '0px'
}
```

#### h3 → display-small

**Legacy (SCSS):**
```scss
'h3': (
  'size': 3rem,           // 48px
  'weight': 400,
  'line-height': 1.05,
  'letter-spacing': normal
)
```

**MD3 (JS):**
```ts
'display-small': {
  fontSize: '36px',
  lineHeight: '44px',
  fontWeight: 400,
  letterSpacing: '0px'
}
```

### Headline Variants (formerly Headings h4-h6)

#### h4 → headline-large

**Legacy (SCSS):**
```scss
'h4': (
  'size': 2.125rem,       // 34px
  'weight': 400,
  'line-height': 1.175,
  'letter-spacing': .0073529412em
)
```

**MD3 (JS):**
```ts
'headline-large': {
  fontSize: '32px',
  lineHeight: '40px',
  fontWeight: 400,
  letterSpacing: '0px'
}
```

#### h5 → headline-medium

**Legacy (SCSS):**
```scss
'h5': (
  'size': 1.5rem,         // 24px
  'weight': 400,
  'line-height': 1.333,
  'letter-spacing': normal
)
```

**MD3 (JS):**
```ts
'headline-medium': {
  fontSize: '28px',
  lineHeight: '36px',
  fontWeight: 400,
  letterSpacing: '0px'
}
```

#### h6 → headline-small

**Legacy (SCSS):**
```scss
'h6': (
  'size': 1.25rem,        // 20px
  'weight': 500,
  'line-height': 1.6,
  'letter-spacing': .0125em
)
```

**MD3 (JS):**
```ts
'headline-small': {
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: 400,
  letterSpacing: '0px'
}
```

### Body Variants

#### body-1 / subtitle-1 → body-large

**Legacy (SCSS) - body-1:**
```scss
'body-1': (
  'size': 1rem,           // 16px
  'weight': 400,
  'line-height': 1.5,
  'letter-spacing': .03125em
)
```

**Legacy (SCSS) - subtitle-1:**
```scss
'subtitle-1': (
  'size': 1rem,           // 16px
  'weight': normal,
  'line-height': 1.75,
  'letter-spacing': .009375em
)
```

**MD3 (JS):**
```ts
'body-large': {
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
  letterSpacing: '0.5px'
}
```

#### body-2 → body-medium

**Legacy (SCSS):**
```scss
'body-2': (
  'size': .875rem,        // 14px
  'weight': 400,
  'line-height': 1.425,
  'letter-spacing': .0178571429em
)
```

**MD3 (JS):**
```ts
'body-medium': {
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 400,
  letterSpacing: '0.25px'
}
```

#### caption → body-small

**Legacy (SCSS):**
```scss
'caption': (
  'size': .75rem,         // 12px
  'weight': 400,
  'line-height': 1.667,
  'letter-spacing': .0333333333em
)
```

**MD3 (JS):**
```ts
'body-small': {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 400,
  letterSpacing: '0.4px'
}
```

### Label Variants

#### button / subtitle-2 → label-large

**Legacy (SCSS) - button:**
```scss
'button': (
  'size': .875rem,        // 14px
  'weight': 500,
  'line-height': 2.6,
  'letter-spacing': .0892857143em
)
```

**Legacy (SCSS) - subtitle-2:**
```scss
'subtitle-2': (
  'size': .875rem,        // 14px
  'weight': 500,
  'line-height': 1.6,
  'letter-spacing': .0071428571em
)
```

**MD3 (JS):**
```ts
'label-large': {
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  letterSpacing: '0.1px'
}
```

#### (new) → label-medium

**MD3 (JS):**
```ts
'label-medium': {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  letterSpacing: '0.5px'
}
```

#### overline → label-small

**Legacy (SCSS):**
```scss
'overline': (
  'size': .75rem,         // 12px
  'weight': 500,
  'line-height': 2.667,
  'letter-spacing': .1666666667em,
  'text-transform': uppercase
)
```

**MD3 (JS):**
```ts
'label-small': {
  fontSize: '11px',
  lineHeight: '16px',
  fontWeight: 500,
  letterSpacing: '0.5px'
}
```

> **Note:** The legacy `overline` variant had `text-transform: uppercase`. This is not included in the MD3 `label-small` variant by default. Apply `text-transform: uppercase` manually if needed.

## Migration Steps

### 1. Update Class Names in Templates

Replace legacy class names with MD3 equivalents:

```html
<!-- Before -->
<h1 class="text-h1">Title</h1>
<p class="text-body-1">Content</p>
<span class="text-caption">Small text</span>

<!-- After -->
<h1 class="text-display-large">Title</h1>
<p class="text-body-large">Content</p>
<span class="text-body-small">Small text</span>
```

### 2. Custom Variants

If you had custom typography in SCSS:

```scss
// Before (SCSS)
$typography: (
  'custom-heading': (
    'size': 2rem,
    'weight': 600,
    'line-height': 1.2,
    'letter-spacing': 0
  )
);
```

Migrate to JS configuration:

```ts
// After (JS)
createVuetify({
  typography: {
    variants: {
      'custom-heading': {
        fontSize: '32px',
        lineHeight: '38px',
        fontWeight: 600,
        letterSpacing: '0px'
      }
    }
  }
})
```

### 3. Typography Variables

The new system supports CSS custom property variables:

```ts
createVuetify({
  typography: {
    variables: {
      'heading-font': '"Inter", sans-serif',
      'body-font': '"Roboto", sans-serif',
    },
    variants: {
      'display-large': {
        fontFamily: 'var:heading-font',
        // ... other styles
      }
    }
  }
})
```

### 4. Responsive Typography

The new system includes built-in responsive classes:

```html
<!-- Responsive variant classes -->
<h1 class="text-display-large text-sm-display-medium text-lg-display-large">
  Responsive Title
</h1>
```

The format is `text-{breakpoint}-{variant}`, for example:
- `text-md-body-large` - applies `text-body-large` styles at `md` breakpoint and up
- `text-lg-headline-small` - applies `text-headline-small` styles at `lg` breakpoint and up

## Key Differences

| Feature | Legacy (SCSS) | MD3 (JS) |
|---------|---------------|----------|
| Configuration | SCSS variables | JS options |
| Units | rem/em | px |
| Line height | Unitless ratio | px values |
| Responsive | Manual | Built-in breakpoint classes |
| Runtime changes | Not supported | Reactive |
| SSR | Requires compilation | CSS injection |
| Scoping | Global | Optional scoping via `scoped` option |

## Breaking Changes

1. **Class name format**: All typography classes now use `text-` prefix (e.g., `text-display-large` instead of `text-h1`)
2. **No text-transform by default**: The `overline` → `label-small` migration loses `text-transform: uppercase`
3. **Different sizing**: MD3 variants follow Material Design 3 specifications which differ from MD2
4. **Removed variants**: `subtitle-1`, `subtitle-2`, `button`, `caption`, and `overline` as distinct names are removed; use the equivalent MD3 variants
