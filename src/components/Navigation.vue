<template>
  <header :class="{ 'scrolled-nav': scrollNav }">
    <nav>

      <div class="branding">
        <router-link :to="{ name: 'Announces' }"><img src="@/assets/logo_vue_project.png" alt="" /></router-link>
        <router-link class="title" :to="{ name: 'Announces' }">PerfectJOB</router-link>
      </div>

      <ul v-show="!mobile" class="navigation">
        <router-link class="link" :to="{ name: 'Announces' }">Anunțuri</router-link>
        <router-link class="link" v-if="user" :to="{ name: 'NewAnnounces' }">Anunț Nou</router-link>
        <router-link class="link" v-if="!user" :to="{ name: 'Login' }">Autentificare/Înregistrare</router-link>
        <router-link class="link" v-if="user" @click="logout" :to="{ name: 'Announces' }">Deconectare</router-link>
      </ul>

      <div class="icon">
        <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{ 'icon-active': mobileNav }"></i>
      </div>

      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <router-link class="link" @click="toggleMobileNav" :to="{ name: 'Announces' }">Anunțuri</router-link>
          <router-link class="link" @click="toggleMobileNav" v-if="user" :to="{ name: 'NewAnnounces' }">Anunț Nou</router-link>
          <router-link class="link" @click="toggleMobileNav" v-if="!user" :to="{ name: 'Login' }">Autentificare/Înregistrare
          </router-link>
          <router-link class="link" v-if="user" @click="logout(); toggleMobileNav()" :to="{ name: 'Announces' }">Deconectare
          </router-link>
        </ul>
      </transition>

    </nav>
  </header>
</template>

<script>
//store este folosit pentru componentele vue, acestea preiau starea definita in store si se actualizeaza in mod reactiv
//ajuta sa vedem daca un user este sau nu conectat
import store from '../store/index'
//se importa proprietatea computed ce permite lucrarea cu datele din componentele vue intr-un mod eficient
import { computed } from 'vue'
//se importa supabase (API) pentru realizarea conexiunii cu baza de date
import { supabase } from '../supabase/supabaseInit'
//se importa useRouter din biblioteca vue-router intrucat ajuta la conectarea intre URL-ul/Istoricul browserului si componentele Vue
import { useRouter } from 'vue-router'
export default {
  name: 'navigation',
  setup() {
    //ajuta sa vedem daca utilizatorul este conectat
    const user = computed(() => store.state.user)

    const router = useRouter()

    //functie de logout al utilizatorilor folosind API supabase
    const logout = async () => {
      await supabase.auth.signOut()
      router.push({ name: 'Announces' })
    }
     //declaratia return incheie executia functiei si specifica o valoare care trebuie returnata apelantului functiei
    return { logout, user }
  },
  data() {
    return {
      scrollNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  //created este apelat pentru a declansa actiunile din methods
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  //metoda mounted este folosita pentru a trimite o solicitare HTTP pentru a prelua date pe care componentele le vor reda apoi
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  //metodele Vue sunt obiecte asociate cu instantele Vue
  //functiile sunt definite in interiorul obiectului methods 
  //metodele sunt utile atunci cand trebuie efectuata o actiune cu directiva v-on spre exemplu, asupra unui element pentru a gestiona evenimente
  //functiile definite in interiorul obiectului methods pot fi apelate in continuare pentru a efectua actiuni
  methods: {
    //metoda de comutare a componentei naviogation in momentul in care aplicatia este deschisa pe mobil
    //in locul meniului aflta in dreata pe componenta navigation va aparea un icon, iar in urma apasarii acestuia va aparea meniul practic ascuns
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    //este oe metoda ce face componenta navigation dinamica
    //in momentul in care pagina are continut amplu, la derularea in jos a paginii, componenta navigation isi modifica stilul
    updateScroll() {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        this.scrollNav = true
        return
      }
      this.scrollNav = false
    },
    //este o metoda prin care se verifica rezolutia ecranului pe care este vizualizata aplicatia pentru a reda componenta navigation in maniera stabilita
    //daca aplicatia este deschisa de pe desktop, componenta navigation va aparea cu toate meniurile disponibile
    //daca aplicatie este deschisa pe mobil de exemplu, meniul din dreapta va si ascuns sub un buton si va aparea in urma actionarii acestuia
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../style/Navigation.scss';
</style>
