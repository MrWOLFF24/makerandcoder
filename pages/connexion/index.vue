<template>
  <div>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '@/components/loginSignupForm/Login'

export default {
  middleware: 'isAuth',
  components: {
    LoginForm,
  }
}
</script>
