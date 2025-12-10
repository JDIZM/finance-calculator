<template>
  <main class="home-view">
    <div class="hero-section">
      <h1 class="hero-title">Finance Tools & Calculators</h1>
      <p class="hero-subtitle">Plan your financial future with our interactive tools</p>
    </div>

    <section class="projection-section">
      <projection-chart
        title="Compound Interest Projection"
        subtitle="See how your investments could grow over time"
        :default-initial-deposit="5000"
        :default-monthly-contribution="500"
        :default-years="25"
        :default-interest-rate="5.0"
      />
    </section>

    <section class="calculators-grid">
      <router-link to="/compound-interest-calculator" class="calculator-card">
        <div class="card-icon">💰</div>
        <h3 class="card-title">Compound Interest Calculator</h3>
        <p class="card-description">
          Calculate returns on your investments with compound interest over time
        </p>
        <span class="card-cta">Try it now →</span>
      </router-link>

      <router-link to="/mortgage-calculator" class="calculator-card">
        <div class="card-icon">🏠</div>
        <h3 class="card-title">Mortgage Calculator</h3>
        <p class="card-description">
          Plan your property purchase with detailed mortgage calculations
        </p>
        <span class="card-cta">Try it now →</span>
      </router-link>
    </section>

    <section class="info-section">
      <div class="info-card">
        <h3>Why use compound interest?</h3>
        <p>
          Compound interest allows your investments to grow exponentially over time. The interest you
          earn is reinvested, generating even more interest in subsequent periods.
        </p>
      </div>
      <div class="info-card">
        <h3>Start investing early</h3>
        <p>
          Time is your greatest advantage when investing. Starting early, even with small amounts,
          can lead to significant growth due to the power of compounding.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ProjectionChart from '@/components/common/projection-chart/ProjectionChart.vue'
</script>

<style scoped lang="scss">
.home-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.hero-section {
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 3rem;

  .hero-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-heading);
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--color-text);
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
}

.projection-section {
  margin-bottom: 4rem;
}

.calculators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.calculator-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--color-primary);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-heading);
    margin-bottom: 0.5rem;
  }

  .card-description {
    font-size: 1rem;
    color: var(--color-text);
    line-height: 1.6;
    flex-grow: 1;
  }

  .card-cta {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-top: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover .card-cta {
    transform: translateX(4px);
  }
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.info-card {
  padding: 2rem;
  background: var(--color-background-soft);
  border-radius: 12px;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-heading);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: var(--color-text);
    line-height: 1.7;
  }
}
</style>
