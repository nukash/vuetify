<template>
  <div class="d-flex flex-column gap-4">
    <VTypography
      v-for="color in colors"
      :key="color"
      :color="color"
      variant="text-body-large"
    >
      Text in {{ color }} color
    </VTypography>

    <VTypography
      color="#FF9800"
      variant="text-body-large"
    >
      Custom color (hex)
    </VTypography>
  </div>
</template>

<script setup>
  const colors = [
    'primary',
    'secondary',
    'success',
    'error',
    'warning',
    'info',
  ]
</script>
