<template>
<div class="content">

<div class="main" v-if="data.length > 0">

  <div class="box">

 <div @click="toggleFilterMenu" class="filter">
    <span class="filterStart" 
      >Filtrare joburi<span class="filtered" v-if="filteredAnnounce"
        >: {{ filteredAnnounce }}</span
      ></span
    >
    <i class="fas fa-angle-down"></i>
    <ul v-show="filterMenu" class="filter-menu">
      <li @click="filteredAnnounces">Full Time</li>
      <li @click="filteredAnnounces">Part Time</li>
      <li @click="filteredAnnounces">Șterge filtrul</li>
    </ul>
  </div>
 


<div class="search">
  <input type="text" placeholder="Caută un job!">
  <i class="fas fa-search"></i>
</div>

</div>

</div>

  <div v-if="dataLoaded" class="dataLoaded">
    <!-- No Data -->
    <div v-if="data.length === 0" class="noData">
      <h1>Nu există niciun anunț...</h1>
      <router-link :to="{ name: 'NewAnnounces' }" class="link"
        >Creează un anunț</router-link
      >
    </div>

    <!-- Data -->

    <div v-else class="data">
      <router-link
        class="link"
        :to="{ name: 'View-Announces', params: { jobId: job.id } }"
        v-for="(job, index) in data"
        :key="index"
      >
        <!-- Full Time Image -->
        <img
          v-if="job.jobType === 'fullTime'"
          src="@/assets/fullTime.png"
          class="img"
          alt=""
        />
        <!-- Part Time Image -->
        <img v-else src="@/assets/partTime.png" class="img" alt="" />

        <p class="jobType">
          {{ job.jobType }}
        </p>

        <h1 class="jobName">
          {{ job.jobName }}
        </h1>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
//se importa instanta ref din biblioteca vue ce ajuta la adugarea unor referinte la elementele HTML
import { ref } from 'vue'
//se importa supabase (API) pentru realizarea conexiunii cu baza de date
import { supabase } from '../supabase/supabaseInit'
export default {
  name: 'Announces',
  data() {
    return {
      filterMenu: null,
      filteredAnnounce: null,
    }
  },
  components: {},

  setup() {
    //se creeaza date/varaibile
    const data = ref([])
    const dataLoaded = ref(null)

   
    //functie de obtinere a datelor din backend in frontend 
    const getData = async () => {
      //declaratia try...catch marcheazt un bloc try si un bloc catch, dacă codul din blocul try arunca o exceptie, atunci codul din blocul catch va fi executat
      try {
        //se extrag datele din tabela "announces" prin metoda select
        const { data: announces, error } = await supabase
          .from('announces')
          .select('*')
        if (error) throw error
        data.value = announces
        dataLoaded.value = true
      } catch (error) {
        console.warn(error.message)
      }
    }

    //se ruleaza functia de extragere a datelor
    getData()
    //declaratia return incheie executia functiei si specifica o valoare care trebuie returnata apelantului functiei
    return { data, dataLoaded }
  },
  //metodele Vue sunt obiecte asociate cu instantele Vue
  //functiile sunt definite in interiorul obiectului methods 
  //metodele sunt utile atunci cand trebuie efectuata o actiune cu directiva v-on spre exemplu, asupra unui element pentru a gestiona evenimente
  //functiile definite in interiorul obiectului methods pot fi apelate in continuare pentru a efectua actiuni
  methods: {
    //metoda de comutare a meniului de filtrare 
    //in momentul apasarii apare lista filtrelor
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu
    },
    //metoda de vizualizare a filtrului aplicat si stergere a acestuia de catre utilizator
    filteredAnnounces(e) {
      if (e.target.innerText === 'Șterge filtrul') {
        this.filteredAnnounce = null
        return
      }
      else 
      this.filteredAnnounce = e.target.innerText
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../style/Announces.scss';
</style>
