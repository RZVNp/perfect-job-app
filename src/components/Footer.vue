<template>
  <footer>
    <div class="container">

      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'Announces' }">PerfectJOB <img class="logo" src="@/assets/logo_vue_project.png" alt="" /></router-link>
          <ul>
            <li><a href="http://www.facebook.com" target="_blank"><img class="icon" src="../assets/facebook.png" alt=""/></a></li>
            <li><a href="http://www.youtube.com" target="_blank"><img class="icon" src="../assets/youtube.png" alt=""/></a></li>
            <li><a href="http://www.instagram.com" target="_blank"><img class="icon" src="../assets/instagram.png" alt=""/></a></li>
            <li><a href="http://www.twitter.com" target="_blank"><img class="icon" src="../assets/twitter.png" alt=""/></a></li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'Announces' }">Anunțuri</router-link>
            <router-link class="link" v-if="user" :to="{ name: 'NewAnnounces' }">Anunț Nou</router-link>
            <router-link class="link" v-if="!user" :to="{ name: 'Login' }">Autentificare/Înregistrare</router-link>
            <router-link class="link" v-if="user" @click="logout" :to="{ name: 'Announces' }">Deconectare
          </router-link>
          </ul>
        </div>
      </div>

      <div class="right">
        <p>Copyright 2022 Pocovnicu Răzvănel - Petruț</p>
        <h1>UAIC | Toate drepturile sunt rezervate</h1>
      </div>
    </div>
  </footer>
</template>

<script>
import { supabase } from '../supabase/supabaseInit'
import store from '../store/index'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: "footer",
  setup() {
    const user = computed(() => store.state.user)
    const router = useRouter()
     const logout = async () => {
      await supabase.auth.signOut()
      router.push({ name: 'Announces' })
    }
    return { logout, user }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/Footer.scss';
</style>

