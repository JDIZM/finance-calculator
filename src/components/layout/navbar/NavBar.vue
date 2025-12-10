<template>
  <header class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <img alt="Finance Calculator" class="logo" src="@/assets/logo.svg" width="40" height="40" />
        <span class="brand-name">Finance Tools</span>
      </div>

      <nav class="navbar-nav">
        <a href="/" class="nav-link">Home</a>
        <a href="/compound-interest" class="nav-link">Compound Interest</a>
        <a href="/mortgage" class="nav-link">Mortgage</a>
      </nav>

      <div class="navbar-actions">
        <ToggleTheme v-if="isClient" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ToggleTheme from '@/components/theme/toggle-theme/ToggleTheme.vue'

// Prevent hydration mismatch - only render theme toggle on client
const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})
</script>

<style lang="scss" scoped>
.navbar {
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    gap: 1rem;
  }
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-heading);
  flex-shrink: 0;

  .logo {
    display: block;
    width: 40px;
    height: 40px;

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
    }
  }

  .brand-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-heading);

    @media (max-width: 768px) {
      display: none;
    }
  }
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.25rem;
    justify-content: flex-start;
  }
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  position: relative;

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }

  &:hover {
    background: var(--color-background-soft);
    color: var(--color-heading);
  }

  &.router-link-active,
  &.router-link-exact-active {
    color: var(--color-primary);
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.75rem;
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      height: 2px;
      background: var(--color-primary);
      border-radius: 2px;

      @media (max-width: 768px) {
        bottom: 0;
      }
    }
  }
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}
</style>
