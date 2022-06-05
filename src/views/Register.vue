<template>
  <div class="form-wrap">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="error">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- Register -->
    <form @submit.prevent="register" 
    class="register">
<router-link class="left-icon" :to="{ name: 'Announces' }"
          > <img class="arrow" src="@/assets/left-arrow-black.svg" alt="" /></router-link
        >
      <p class="login-register">
    Aveți deja un cont?
    <router-link class="router-link" :to="{ name: 'Login' }">Autentificare</router-link>
   </p>
<h2>Creează un cont PerfectJOB</h2>
      <div class="inputs">
           <div class="input">
     <input type="text" required id="companyName" placeholder="Nume companie" v-model="companyName" />
     <img class="icon" src="@/assets/user-alt-light.svg" alt="">
    </div>
    <div class="input">
     <input type="text" required id="email" placeholder="Email" v-model="email" />
     <img class="icon" src="@/assets/envelope-regular.svg" alt="">
    </div>
     <div class="input">
     <input type="text" required id="phoneNumber" placeholder="Număr de telefon" v-model="phoneNumber" />
     <img class="icon" src="@/assets/phone-call.svg" alt="">
    </div>
    <div class="input">
     <input type="password" required id="password" placeholder="Parolă" v-model="password" />
     <img class="icon" src="@/assets/lock-alt-solid.svg" alt="">
    </div>
    <div class="input">
     <input type="password" required id="confirmPassword" placeholder="Confirmare parolă" v-model="confirmPassword" />
     <img class="icon" src="@/assets/lock-alt-solid.svg" alt="">
    </div>
      </div>
      <button  class="btn">Înregistrare</button>

      <div class="angle"></div>

      
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
//se importa instanta ref din biblioteca vue ce ajuta la adugarea unor referinte la elementele HTML
import { ref } from "vue";
//se importa supabase (API) pentru a se putea realiza crearea unui user in baza de date
import {supabase} from '../supabase/supabaseInit'
//se importa useRouter din biblioteca vue-router intrucat ajuta la conectarea intre URL-ul/Istoricul browserului si componentele Vue
import { useRouter } from "vue-router";

export default {
  name: "register",
  setup() {
    //se creeaza datele/varaibilele folosite in procesul de inregistrare a unui utilizator
    const router = useRouter();
    const companyName = ref(null);
    const email = ref(null);
    const phoneNumber = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    //acest tip de data este pentru tratarea erorilor 
    const errorMsg = ref(null);

    //functia de inregistrare a unui nou utilizator
    const register = async () => {
      //se verifica prin instructiunea if daca parolele introduse de catre utilizator la crearea contului corespund
      if (password.value === confirmPassword.value) {
        //declaratia try...catch marcheaza un bloc try si un bloc catch, dacă codul din blocul try arunca o exceptie, atunci codul din blocul catch va fi executat
        try {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if (error) throw error;
          router.push({ name: "Login" });
        } catch(error) {
          errorMsg.value = error.message;
          setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
        }
        return;
      }
      //in cazul in care parolele nu corespund, va aparea un mesaj de informare
      errorMsg.value = "Error: Passwords do not match"
      //mesajul de informare dispare dupa cum este setat in metoda setTimeout
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    };
    
    //declaratia return incheie executia functiei si specifica o valoare care trebuie returnata apelantului functiei
    return { companyName, email, phoneNumber, password, confirmPassword, errorMsg, register };
  },
};
</script>

<style lang="scss" scoped>
@import '../style/Register.scss';
</style>