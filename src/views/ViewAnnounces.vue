<template>
  <div class="content">
    <!-- App Msg -->
    <div v-if="statusMsg || errorMsg" class="msg">
      <p class="status">
        {{ statusMsg }}
      </p>
      <p class="error">
        {{ errorMsg }}
      </p>
    </div>
 
    <div v-if="dataLoaded">
      <!-- General Announces Info -->
      <div class="dataLoaded">
        <div v-if="user" class="btnsUser">
          <div class="editMode" @click="editMode">
            <img class="img" src="@/assets/pencil-light.png" alt="" />
          </div>
          <div class="deleteAnnounces" @click="deleteAnnounces">
            <img class="img" src="@/assets/trash-light.png" alt="" />
          </div>
        </div>



        <img
          v-if="data.jobType === 'fullTime'"
          class="imgFullTime"
          src="@/assets/fullTime.png"
          alt=""
        />
        <img v-else class="imgPartTime" src="@/assets/partTime.png" alt="" />

        <span>
          {{ data.jobType }}
        </span>

        <div class="jobName">
          <input v-if="edit" type="text" v-model="data.jobName" />
          <h1 v-else>
            {{ data.jobName }}
          </h1>
        </div>
      </div>

      <!-- Requirements -->
      <div class="requirements">
        <!-- Full Time -->
        <div v-if="data.jobType === 'fullTime'" class="fullTime">
          <div v-for="(item, index) in data.requirements" :key="index">
            <div class="abilities">
                <label for="abilities"> Cerințe </label>
                <input
                  id="abilities"
                  v-if="edit"
                  type="text"
                  v-model="item.abilities"
                />
                <p v-else>{{ item.abilities }}</p>
              </div>
            <div class="details">
              <div class="experience">
                <label for="experience"> Experiență </label>
                <input
                  id="experience"
                  v-if="edit"
                  type="text"
                  v-model="item.experience"
                />
                <p v-else>{{ item.experience }}</p>
              </div>
              <div class="hours">
                <label for="hours"> Ore lucrate </label>
                <input
                  id="hours"
                  v-if="edit"
                  type="text"
                  v-model="item.hours"
                />
                <p v-else>{{ item.hours }}</p>
              </div>
              <div class="salary">
                <label for="salary"> Salariu </label>
                <input
                  id="salary"
                  v-if="edit"
                  type="text"
                  v-model="item.salary"
                />
                <p v-else>{{ item.salary }}</p>
              </div>
              <img
                v-if="edit"
                @click="deleteJob(item.id)"
                class="imgDeleteJob"
                src="@/assets/trash-light-green.png"
                alt=""
              />
            </div>
            <div class="description">
              <label for="description">Descriere Job</label>
              <input id="descriprion" v-if="edit" v-model="item.description" />
              <p v-else>{{ item.description }}</p>
            </div>
          </div>
          <button v-if="edit" @click="addJob" type="button" class="btn">
            Adaugă post
          </button>
        </div>

        <!-- Part Time -->
        <div v-else class="partTime">
          <div v-for="(item, index) in data.requirements" :key="index">
              <div class="abilities">
                <label for="abilities"> Cerințe </label>
                <input
                  id="abilities"
                  v-if="edit"
                  type="text"
                  v-model="item.abilities"
                />
                <p v-else>{{ item.abilities }}</p>
              </div>
            <div class="details">
              <div class="hoursNumber">
                <label for="partTimeType"> Numar ore </label>
                <select
                  v-if="edit"
                  id="partTimeType"
                  v-model="item.partTimeType"
                >
                  <option value="#">
                    Selectează numărul de ore pentru job-ul part time
                  </option>
                  <option value="2hours">2 ore</option>
                  <option value="4hours">4 ore</option>
                  <option value="6hours">6 ore</option>
                </select>
                <p v-else>{{ item.partTimeType }}</p>
              </div>
              <div class="experience">
                <label for="experience"> Experiență </label>
                <input
                  id="experience"
                  v-if="edit"
                  type="text"
                  v-model="item.experience"
                />
                <p v-else>{{ item.experience }}</p>
              </div>
              <div class="hours">
                <label for="hours"> Ore lucrate </label>
                <input
                  id="hours"
                  v-if="edit"
                  type="text"
                  v-model="item.hours"
                />
                <p v-else>{{ item.hours }}</p>
              </div>
              <div class="salary">
                <label for="salary"> Salariu </label>
                <input
                  id="salary"
                  v-if="edit"
                  type="text"
                  v-model="item.salary"
                />
                <p v-else>{{ item.salary }}</p>
              </div>
              <img
                v-if="edit"
                @click="deleteJob(item.id)"
                class="imgDeleteJob"
                src="@/assets/trash-light-green.png"
                alt=""
              />
            </div>
            <div class="description">
              <label for="description">Descriere Job</label>
              <input id="descriprion" v-if="edit" v-model="item.description" />
              <p v-else>{{ item.description }}</p>
            </div>
          </div>
          <button v-if="edit" @click="addJob" type="button" class="btn">
            Adaugă post
          </button>
        </div>
      </div>

      <!-- Update -->
      <button v-if="edit" @click="update" type="submit" class="btnUpdate">
        Actualizează
      </button>

      <div class="btnsNotUser">
      <button v-if="!user" type="button" class="btnMaterials">
        Vizualizare materiale auxiliare
      </button>
       <button v-if="!user" type="button" class="btnTest">
        Susține testul
      </button>
      </div>

        <div v-if="!user" class="files">
          <label for="materials" class="custom-file-input-materials"></label>
          <input
            id="materials"
            style="visibility: hidden"
            type="file"
            @change="onFileSelected"
          />
        </div>
      
     <button v-if="user" type="button" class="btnView">
        Vizualizați aplicările la acest job
      </button>


    </div>
  </div>

</template>

<script>
//se importa instanta ref din biblioteca vue ce ajuta la adugarea unor referinte la elementele HTML
//se importa proprietatea computed ce permite lucrarea cu datele din componentele vue intr-un mod eficient
import { ref, computed } from 'vue'
//se importa supabase (API) pentru realizarea conexiunii cu baza de date
import { supabase } from '../supabase/supabaseInit'
//se importa useRouter si useRoute din biblioteca vue-router intrucat ajuta la conectarea intre URL-ul/Istoricul browserului si componentele Vue
import { useRoute, useRouter } from 'vue-router'
//store este folosit pentru componentele vue, acestea preiau starea definita in store si se actualizeaza in mod reactiv
//ajuta sa vedem daca un user este sau nu conectat
import store from '../store/index'
//uid ofera un id unic pentru componentele vue
import { uid } from 'uid'
export default {
  name: 'view-announces',
  setup() {
    //se creeaza date/varaibile 
    const data = ref(null)
    const dataLoaded = ref(null)
    //este folosita pentru a afisa statusul unei actiuni efectuate de catre utilizator
    const errorMsg = ref(null)
    //reprezinta mesajul de eroare in cazul unei actiuni efectuate gresit de catre utilizator
    const statusMsg = ref(null)
    const route = useRoute()
    const router = useRouter()
    //ajuta sa vedem daca utilizatorul este conectat
    const user = computed(() => store.state.user)

    //se obtine ID-ul actual al rutei
    const currentId = route.params.jobId

    //functie prin care se obtin datele despre fiecare job
    const getData = async () => {
       //declaratia try...catch marcheaza un bloc try si un bloc catch, dacă codul din blocul try arunca o exceptie, atunci codul din blocul catch va fi executat
      try {
        //se extrag datele din tabela "announces" prin metoda select dupa id-ul curent
        const { data: announces, error } = await supabase
          .from('announces')
          .select('*')
          .eq('id', currentId)
        if (error) throw error
        data.value = announces[0]
        dataLoaded.value = true
      } catch (error) {
        errorMsg.value = error.message
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }
    //se ruleaza functia de extragere a datelor
    getData()

    //modul de editare al unui anunt
    const edit = ref(null)
    //functie care declanseaza modul editare al unui anunt
    const editMode = () => {
      edit.value = !edit.value
    }

    //functie de stergere al unui anunt din baza de date definitiv
    const deleteAnnounces = async () => {
      //declaratia try...catch marcheaza un bloc try si un bloc catch, dacă codul din blocul try arunca o exceptie, atunci codul din blocul catch va fi executat
      try {
        //se sterg datele din tabela "announces" prin metoda delete dupa id-ul curent
        const { error } = await supabase
          .from('announces')
          .delete()
          .eq('id', currentId)
        if (error) throw error
        router.push({ name: 'Announces' })
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }

    //funtie de adaugare a unui nou job la un anunt deja existent in baza de date
    const addJob = () => {
      //in cazul in care in campul "jobType" este actionata valoarea fullTime, se va afisa formularul de adaugare aferent unui job fullTime
      if (data.value.jobType === 'fullTime') {
        data.value.requirements.push({
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
      data.value.requirements.push({
        id: uid(),
        partTimeType: '',
        abilities: '',
        experience: '',
        hours: '',
        salary: '',
        description: '',
      })
    }

    //functie de stergere a unui job dintr-un anunt in modul EDITARE activat
    const deleteJob = (id) => {
      //se efectueaza pe baza de id unic
      //actiunea de stergere se poate realiza doar in cazul in care este respectat conditia din if
      //adica daca este completata cel putin o valoare in formular, se vor putea sterge altele
      if (data.value.requirements.length > 1) {
        data.value.requirements = data.value.requirements.filter(
          (abilities) => abilities.id !== id
        )
        return
      }
      //in cazul in care conditia din if nu este respectata, va fi afisat un mesaj de eroare corespunzator actiunii
      errorMsg.value =
        'Eroare: Job-ul nu poate fi șters! Trebuie să existe minim un job într-un anunț!'
        //mesajul de atentionare va disparea automat conform metodei setTimeout
      setTimeout(() => {
        errorMsg.value = false
      }, 5000)
    }

    //functie de actualizare a unui anunt dupa efectuarea unor actiuni in modul editare
    const update = async () => {
      //declaratia try...catch marcheazt un bloc try ti un bloc catch, dacă codul din blocul try arunca o exceptie, atunci codul din blocul catch va fi executat
      try {
        //se actualizeaza datele din tabela "announces" prin metoda update dupa id-ul curent
        const { error } = await supabase
          .from('announces')
          .update({
            jobName: data.value.jobName,
            requirements: data.value.requirements,
          })
          .eq('id', currentId)
        if (error) throw error
        edit.value = false
        statusMsg.value = 'Anunțul a fost actualizat cu succes!'
        setTimeout(() => {
          statusMsg.value = false
        }, 5000)
      } catch (error) {
        errorMsg.value`Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }
    //declaratia return incheie executia functiei si specifica o valoare care trebuie returnata apelantului functiei
    return {
      statusMsg,
      data,
      dataLoaded,
      errorMsg,
      edit,
      editMode,
      user,
      deleteAnnounces,
      addJob,
      deleteJob,
      update,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../style/ViewAnnounces.scss';
</style>
