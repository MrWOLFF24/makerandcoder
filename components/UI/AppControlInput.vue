<template>
  <div class="field">
    <label class="label"><slot /></label>
    <div class="control has-icons-right">
      <input class="input"
      v-if="controlType === 'input'"
      :placeholder="placeholder"
      :type="typeInput"
      v-validate="'required'"
      :name="inputName"
      :class="{'is-danger': errors.has(inputName) }"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)">
      <span class="icon is-small is-right">
      <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has(inputName) }"></i>
      </span>
    </div>
    <textarea class="textarea"
      :class="{'is-danger': errors.has(inputName) }"
      placeholder="Ici le contenu de votre tutoriel"
      v-validate="'required'"
      :name="inputName"
      v-if="controlType === 'textarea'"
      rows="10"
      :value="value"
      @input="$emit('input', $event.target.value)"></textarea>
    <p class="help is-danger" v-show="errors.has(inputName)">{{ errors.first(inputName) }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppInputControl',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: false
    },
    typeInput: {
      type: String,
      required: false
    },
    inputName: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>

</style>


