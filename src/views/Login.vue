<template>

  <div class="form-wrap">
<!-- Error Handing -->
    <div v-if="errorMsg" class="error">
      <p>{{ errorMsg }}</p>
    </div>

<!-- Login -->
    <form @submit.prevent="login" class="login">
      <router-link class="left-icon" :to="{ name: 'Announces' }"
          > <img class="arrow" src="@/assets/left-arrow-black.svg" alt="" />
          </router-link
        >
      <p class="login-register">
        Nu aveți încă un cont?
        <router-link class="router-link" :to="{ name: 'Register' }"
          >Înregistrare</router-link
        >
      </p>
      <h2>Autentificare PerfectJOB</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <img class="icon" src="@/assets/envelope-regular.svg" alt="" />
        </div>
        <div class="input">
          <input type="password" placeholder="Parolă" v-model="password" />
          <img class="icon" src="@/assets/lock-alt-solid.svg" alt="" />
        </div>
      </div>
      
      <button class="btn">Autentificare</button>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >V-ați uitat parola?</router-link
      >
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
//se importa instanta ref din biblioteca vue ce ajuta la adugarea unor referinte la elementele HTML
import { ref } from 'vue'
//se importa supabase (API) pentru a se putea realiza conectarea unui user in baza de date
import { supabase } from '../supabase/supabaseInit'
//se importa useRouter din biblioteca vue-router intrucat ajuta la conectarea intre URL-ul/Istoricul browserului si componentele Vue
import { useRouter } from 'vue-router'
export default {
  name: 'login',
  setup() {
    //se creeaza varaibilele folosite in procesul de login
    const router = useRouter()
    const email = ref(null)
    const password = ref(null)
    const errorMsg = ref(null)

    //functia de login 
    const login = async () => {
      //declaratia try...catch marcheaza un bloc try si un bloc catch, dacă codul din blocul try arunca o exceptie, atunci codul din blocul catch va fi executat
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        })
        if (error) throw error
        router.push({ name: 'Announces' })
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = null
        }, 5000);
      }
    }
    
    //declaratia return incheie executia functiei si specifica o valoare care trebuie returnata apelantului functiei
    return { email, password, errorMsg, login }
  },
}
</script>

<style lang="scss" scoped>
@import '../style/Login.scss';
</style>
