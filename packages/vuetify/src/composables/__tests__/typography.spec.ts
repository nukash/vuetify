// Components
import { VTypography } from '@/labs/VTypography/VTypography'

// Utilities
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { createTypography } from '../typography'
import { createVuetify } from '@/framework'

describe('createTypography', () => {
  const vuetify = createVuetify({
    blueprint: {
      defaults: {},
    },
    typography: {
      variants: {
        'custom-variant': {
          fontSize: '99px',
          lineHeight: '100px',
          fontWeight: 900,
          letterSpacing: '1px',
        },
      } as any,
    },
  })

  it('should inject and use the default typography style', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        variant: 'body-medium',
      },
      slots: {
        default: () => 'Test text',
      },
    })

    expect(wrapper.text()).toBe('Test text')
    expect(wrapper.classes()).toContain('v-typography')
    expect(wrapper.classes()).toContain('body-medium')
  })

  it('should render with a custom variant', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        variant: 'custom-variant',
      },
      slots: {
        default: () => 'Custom Style',
      },
    })

    expect(wrapper.text()).toBe('Custom Style')
    expect(wrapper.classes()).toContain('v-typography')
    expect(wrapper.classes()).toContain('custom-variant')
  })

  it('should apply color class and style', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        variant: 'body-medium',
        color: 'primary',
      },
      slots: {
        default: () => 'Colored Text',
      },
    })

    expect(wrapper.text()).toBe('Colored Text')
    expect(wrapper.classes()).toContain('v-typography')
    expect(wrapper.classes()).toContain('text-primary')
  })

  it('should render with custom tag', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        tag: 'h2',
      },
      slots: {
        default: () => 'Heading',
      },
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('h2')
    expect(wrapper.text()).toBe('Heading')
  })

  it('should apply customVariant styles inline', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        variant: 'body-medium',
        customVariant: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
      slots: {
        default: () => 'Custom Style',
      },
    })

    expect(wrapper.text()).toBe('Custom Style')
    expect(wrapper.classes()).toContain('v-typography')
    expect(wrapper.classes()).toContain('body-medium')
    expect(wrapper.attributes('style')).toContain('font-size: 20px')
    expect(wrapper.attributes('style')).toContain('font-weight: bold')
  })

  it('should generate CSS variables for typography variables', () => {
    const typographyInstance = createTypography({
      variables: {
        'body-family': 'Inter',
        'heading-family': '"Open Sans", sans-serif',
      },
    })

    expect(typographyInstance).toBeTruthy()
    expect(typographyInstance!._css.value).toContain('@layer vuetify.typography')
    expect(typographyInstance!._css.value).toContain(':root {')
    expect(typographyInstance!._css.value).toContain(
      '--v-typography--body-family:Inter;',
    )
    expect(typographyInstance!._css.value).toContain(
      '--v-typography--heading-family:"Open Sans", sans-serif;',
    )
  })

  it('should use typography variables in fontFamily', () => {
    const typographyInstance = createTypography({
      variables: {
        'font-body': 'Inter',
      },
      variants: {
        'body-medium': {
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 400,
          letterSpacing: '0.25px',
          fontFamily: 'var:font-body',
        },
      },
    })

    expect(typographyInstance).toBeTruthy()
    expect(typographyInstance!._css.value).toContain(
      'font-family:var(--v-typography--font-body)',
    )
  })

  it('should accept direct CSS variables in fontFamily', () => {
    const typographyInstance = createTypography({
      variants: {
        'body-medium': {
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 400,
          letterSpacing: '0.25px',
          fontFamily: 'var(--my-custom-font)',
        },
      },
    })

    expect(typographyInstance).toBeTruthy()
    expect(typographyInstance!._css.value).toContain(
      'font-family:var(--my-custom-font)',
    )
  })

  it('should work with responsive and merge options', () => {
    const typographyInstance = createTypography({
      variables: {
        'body-family': 'Inter',
      },
      responsive: true,
      merge: true,
      variants: {
        'body-medium': {
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 400,
          letterSpacing: '0.25px',
          fontFamily: 'var:body-family',
        },
      },
    },
    ref({
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    }))

    expect(typographyInstance).toBeTruthy()
    expect(typographyInstance!._css.value).toContain(':root {')
    expect(typographyInstance!._css.value).toContain('--v-typography--body-family:Inter')
    expect(typographyInstance!._css.value).toContain('@media (min-width:')
    expect(typographyInstance!._css.value).toContain('font-family:var(--v-typography--body-family)')
  })
})
