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
          max="99"
          step="any"
          :value="props.rate"
          @input="handleInterestChange"
        />
      </label>
      <div class="select-type">
        <p>Choose the type of debt. Do you want to pay back the principal or only the interest?</p>
        <label v-for="{ label, value } in radioButtons" :key="value">
          {{ label }}
          <input
            type="radio"
            name="type"
            :value="value"
            :checked="props.type === value"
            @change="handleTypeChange(value)"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: 'rate', payload: number): void
  (event: 'type', payload: 'interestOnly' | 'repayment'): void
  (event: 'isDebtRepayment', payload: boolean): void
}>()

const props = defineProps<{
  type: 'interestOnly' | 'repayment'
  rate: number
}>()

const radioButtons = [
  { value: 'interestOnly', label: 'Interest Only' },
  { value: 'repayment', label: 'Repayment' }
] as const

const isDebtRepayment = defineModel({ required: true, default: false })

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
