<template>
    <RegisterForm></RegisterForm>
</template>

<script>
import RegisterForm from '@/components/loginSignupForm/Register'

export default {
  middleware: 'isAuth',
  components: {
    RegisterForm,
  }
}
</script>
