<template>
  <div class="debt-repayment">
    <h3>Debt Repayment</h3>
    <label>
      Is the principal borrowed?
      <input
        type="checkbox"
        name="debt-repayment"
        id="debt-repayment"
        :checked="isDebtRepayment"
        v-model="isDebtRepayment"
        @change="$emit('isDebtRepayment', isDebtRepayment)"
      />
    </label>

    <div class="debt-repayment-options" v-if="isDebtRepayment">
      <label>
        Interest Rate of the loaned principal
        <input
          type="number"
          placeholder="0"
          min="0"
          step="1"
          :value="props.rate"
          @input="handleInterestChange"
        />
      </label>
      <div class="select-type">
        <p>Choose the type of debt. Do you want to pay back the principal or only the interest?</p>
        <label>
          <input
            type="radio"
            name="type"
            value="interestOnly"
            :checked="props.type === 'interestOnly'"
            @change="handleTypeChange('interestOnly')"
          />
          Interest Only
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="repayment"
            @change="handleTypeChange('repayment')"
            :checked="props.type === 'repayment'"
          />
          Repayment
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'rate', payload: number): void
  (event: 'type', payload: 'interestOnly' | 'repayment'): void
  (event: 'isDebtRepayment', payload: boolean): void
}>()

const props = defineProps<{
  type: 'interestOnly' | 'repayment'
  rate: number
}>()

const isDebtRepayment = ref(false)

const handleInterestChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('rate', Number(target.value))
}

const handleTypeChange = (type: 'interestOnly' | 'repayment') => {
  emit('type', type)
}
</script>

<style lang="scss" scoped>
.debt-repayment {
  label {
    display: block;
    margin-bottom: 1rem;
  }
}

.debt-repayment-options {
  input {
    display: block;
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
}

.select-type {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    display: inline-block;
    width: 50px;
  }
}
</style>
