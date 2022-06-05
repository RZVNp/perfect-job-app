<template>
  <div class="content">
    <!-- Status Message -->
    <div v-if="statusMsg || errorMsg" class="msg">
      <p class="status">{{ statusMsg }}</p>
      <p class="error">{{ errorMsg }}</p>
    </div>

    <!-- Create announces -->
    <div class="createAnnounces">
      
      <!-- Form -->
      <form @submit.prevent="createJob" class="form">
        <h1>Publică anunț</h1>

        <!-- Job Name -->
        <div class="jobName">
          <label for="job-name">Nume Job</label>
          <input type="text" required id="job-name" v-model="jobName" />
        </div>

        <!-- Job Type -->
        <div class="jobType">
          <label for="job-type">Tip Job</label>
          <select id="job-type" required @change="jobChange" v-model="jobType">
            <option value="select-job">Selectează tipul job-ul</option>
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
          </select>
        </div>

        <!-- Full Time Inputs -->
        <div v-if="jobType === 'fullTime'" class="fullTimeInputs">
          <div v-for="(item, index) in jobs" :key="index">
            <div class="abilities">
              <label for="abilities">Cerințe</label>
              <input required type="text" v-model="item.abilities" />
            </div>

            <div class="details">
              <div class="experience">
                <label for="experience">Experiență</label>
                <input required type="text" v-model="item.experience" />
              </div>
              <div class="hours">
                <label for="hours">Ore lucrate</label>
                <input required type="text" v-model="item.hours" />
              </div>
              <div class="salary">
                <label for="salary">Salariu</label>
                <input required type="text" v-model="item.salary" />
              </div>
              <img
                @click="deleteJob(item.id)"
                src="@/assets/trash-light-green.png"
                class="img"
                alt=""
              />
            </div>
            <div class="description">
              <label for="description">Descriere Job</label>
              <input type="text" required v-model="item.description" />
            </div>
            <div class="files">
              <label for="files">Atașare fișiere</label>
              <div>
                <label
                  for="materials"
                  class="custom-file-input-materials"
                ></label>
                <input
                  id="materials"
                  style="visibility: hidden"
                  type="file"
                  @change="onFileSelected"
                />
              </div>
              <div>
                <label for="test" class="custom-file-input-test"></label>
                <input
                  id="test"
                  style="visibility: hidden"
                  type="file"
                  @change="onFileSelected"
                />
              </div>
            </div>
          </div>
          <button @click="addJob" type="button" class="btn">
            Adaugă încă un post
          </button>
        </div>

        <!-- Part Time Inputs -->
        <div v-if="jobType === 'partTime'" class="partTimeInputs">
          <div v-for="(item, index) in jobs" :key="index">
            <div class="abilities">
              <label for="abilities">Cerințe</label>
              <input required type="text" v-model="item.abilities" />
            </div>
            <div class="details">
              <div class="hoursNumber">
                <label for="partTime-type">Numar ore</label>
                <select id="partTime-type" v-model="item.partTimeType">
                  <option value="#">
                    Selectează numărul de ore pentru job-ul part time
                  </option>
                  <option value="2hours">2 ore</option>
                  <option value="4hours">4 ore</option>
                  <option value="6hours">6 ore</option>
                </select>
              </div>

              <div class="experience">
                <label for="experience">Experiență</label>
                <input required type="text" v-model="item.experience" />
              </div>
              <div class="hours">
                <label for="hours">Ore lucrate</label>
                <input required type="text" v-model="item.hours" />
              </div>
              <div class="salary">
                <label for="salary">Salariu</label>
                <input required type="text" v-model="item.salary" />
              </div>
              <img
                @click="deleteJob(item.id)"
                src="@/assets/trash-light-green.png"
                class="img"
                alt=""
              />
            </div>
            <div class="description">
              <label for="description">Descriere Job</label>
              <input
                type="text"
                required
                class="p-2 w-full text-sky-800 focus:outline-none"
                v-model="item.description"
              />
            </div>
            <div class="files">
              <label for="files">Atașare fișiere</label>
              <div>
                <label
                  for="materials"
                  class="custom-file-input-materials"
                ></label>
                <input
                  id="materials"
                  style="visibility: hidden"
                  type="file"
                  @change="onFileSelected"
                />
              </div>
              <div>
                <label for="test" class="custom-file-input-test"></label>
                <input
                  id="test"
                  style="visibility: hidden"
                  type="file"
                  @change="onFileSelected"
                />
              </div>
            </div>
          </div>
          <button @click="addJob" type="button" class="btn">
            Adaugă încă un post
          </button>
        </div>

        <button type="submit" class="btn">Publică anunțul</button>
      </form>
    </div>
  </div>
</template>

<script>
//se importa instanta ref din biblioteca vue ce ajuta la adugarea unor referinte la elementele HTML
import { ref } from 'vue'
//uid ofera un id unic pentru componentele vue
import { uid } from 'uid'
//se importa supabase (API) pentru realizarea conexiunii cu baza de date
import { supabase } from '../supabase/supabaseInit'
export default {
  name: 'NewAnnounces',
  setup() {
    //se creeaza date/variabile
    const jobName = ref('')
    const jobType = ref('select-job')
    const jobs = ref([])
    //este folosita pentru a afisa statusul unei actiuni efectuate de catre utilizator
    const statusMsg = ref(null)
    //reprezinta mesajul de eroare in cazul unei actiuni efectuate gresit de catre utilizator
    const errorMsg = ref(null)

    //functie de adaugarea a unui nou job in anunt
    const addJob = () => {
      //in cazul in care in campul "jobType" este actionata valoarea fullTime, se va afisa formularul de adaugare aferent unui job fullTime
      if (jobType.value === 'fullTime') {
        jobs.value.push({
          id: uid(),
          abilities: '',
          experience: '',
          hours: '',
          salary: '',
          description: '',
        })
        return
      }
      //in caz contrar, va fi afisat formularul de adaugare pentru un job partTime
      jobs.value.push({
        id: uid(),
        partTimeType: '',
        abilities: '',
        experience: '',
        hours: '',
        salary: '',
        description: '',
      })
    }

    //functie de stergere a unui job din anunt
    const deleteJob = (id) => {
      //se efectueaza pe baza de id unic
      //actiunea de stergere se poate realiza doar in cazul in care este respectat conditia din if
      //adica daca este completata cel putin o valoare in formular, se vor putea sterge altele
      if (jobs.value.length > 1) {
        jobs.value = jobs.value.filter((jobs) => jobs.id !== id)
        return
      }
      //in cazul in care conditia din if nu este respectata, va fi afisat un mesaj de eroare corespunzator actiunii
      errorMsg.value =
        'Eroare: Nu puteți acționa butonul de ștergere deoarece nu există niciun post completat!'
      //mesajul de atentionare va disparea automat conform metodei setTimeout
      setTimeout(() => {
        errorMsg.value = false
      }, 5000)
    }

    //functie de modificare a introducerii tipului de job
    const jobChange = () => {
      jobs.value = []
      addJob()
    }

    //functie de creare a anuntului cu jobul dorit si adaugare in baza de date a acestuia
    const createJob = async () => {
      //declaratia try...catch marcheaza un bloc try si un bloc catch, dacă codul din blocul try arunca o exceptie, atunci codul din blocul catch va fi executat
      try {
        //folosind API supabase, se introduc in baza de date, in tabela "announces", datele aferente jobului din anuntul postat
        const { error } = await supabase.from('announces').insert([
          {
            jobName: jobName.value,
            jobType: jobType.value,
            requirements: jobs.value,
          },
        ])
        //se afiseaza un mesaj de atentionare cu privire la actiunea efectuata de catre utilizator
        //se reseteaza valorile campului la starea implicita
        if (error) throw error
        statusMsg.value = 'Anunțul a fost creat cu succes!'
        jobName.value = null
        jobType.value = 'select-job'
        jobs.value = []
        //mesajul de atentionare dispare automat conform metodei setTimeout
        setTimeout(() => {
          statusMsg.value = false
        }, 5000)
      } catch (error) {
        //in cazul in care formularul nu este completat corespunzator, se declanseaza un mesaj de eroare
        errorMsg.value = `Error: ${error.message}`
        //mesajul de atentionare dispare automat conform metodei setTimeout
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }
    //declaratia return incheie executia functiei si specifica o valoare care trebuie returnata apelantului functiei
    return {
      jobName,
      jobType,
      jobs,
      statusMsg,
      errorMsg,
      addJob,
      jobChange,
      deleteJob,
      createJob,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../style/NewAnnounces.scss';
</style>
