<template>
  <div v-if="appReady" class="app">
    <Navigation v-if="!navigation" />
    <router-view />
    <Footer v-if="!navigation && !hideFooter" />
  </div>
</template>

<script>
//se importa componentele Navigation și Footer
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
//se importa instanta ref din biblioteca vue ce ajuta la adugarea unor referinte la elementele HTML
import { ref } from "vue";
//se importa supabase (API) pentru a se putea realiza conectarea unui user in baza de date
import {supabase} from './supabase/supabaseInit'
//store este folosit pentru componentele vue, acestea preiau starea definita in store si se actualizeaza in mod reactiv
import store from './store/index'
export default {
  name: "App",
  components: {
    Navigation,
    Footer,
  },
  data() {
     return {
      navigation: null,
      hideFooter: null,
    };
  },
  setup() {
    const appReady = ref(null);
    //se verifica daca utilizatorul este deja autentificat
    const user = supabase.auth.user();
    //daca utilizatorul nu exista, trebuie pregatita aplicatia
    if (!user) {
      appReady.value = true;
    }
    //urmatoarea instructiune se ruleaza atunci cand exista o schimbare a starii de autentificare 
    //daca utilizatorul este autentificat, aplicatia de va declansa
    //lansarea aplicatiei
    supabase.auth.onAuthStateChange((_, session) => {
      console.log("hello");
      store.methods.setUser(session);
      appReady.value = true;
    });
    //declaratia return incheie executia functiei si specifica o valoare care trebuie returnata apelantului functiei
    return { appReady };
  },
  //created este apelat pentru a declansa actiunile din methods
  created() {
    this.checkRoute();
    this.hideFooterRoute();
  },
  //metodele Vue sunt obiecte asociate cu instantele Vue
  //functiile sunt definite in interiorul obiectului methods 
  //metodele sunt utile atunci cand trebuie efectuata o actiune cu directiva v-on spre exemplu, asupra unui element pentru a gestiona evenimente
  //functiile definite in interiorul obiectului methods pot fi apelate in continuare pentru a efectua actiuni
   methods: {
     //aceasta metoda este folosita pentru a ascunde anumite componente in functie de ruta pe care utilizatorul se afla in aplicatie
     //daca utilizatorul este in paginile Login, Register sau ForgotPassword, componenta navigation va fi ascunsa
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
    //aceasta metoda este folosita pentru a ascunde anumite componente in functie de ruta pe care utilizatorul se afla in aplicatie
    //daca utilizatorul este in paginile NewAnnounces componenta footer va fi ascunsa
    hideFooterRoute() {
      if (this.$route.name === "NewAnnounces") {
        this.hideFooter = true;
        return;
      }
      this.hideFooter = false;
      }
    },
    //watcher este o caracteristica care permite urmarirea unei componente si efectuarea unor actiuni specificate atunci cand valoarea componentei se schimbă 
    //este o modalitate mai generica de a observa si de a reactiona la modificarile datelor din instanta vue
  watch: {
    $route() {
      this.checkRoute();
      this.hideFooterRoute();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Andada+Pro&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Andada Pro', serif;
  font-weight: 400;
}
.app {
  min-height: 100vh;
  position: relative;
  background-color: #fff;
  
}




</style>

