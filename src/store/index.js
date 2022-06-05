//permite sa adaptam codul la schimbari intr-o maniera declarativa
import { reactive } from 'vue'

//se creeaza un obiect numit state ce reprezinta o metoda de tip reactive
const state = reactive({
  user: null,
})

//se creeaza o metoda care verifica starea de logare a unui utilizator
const methods = {
  setUser(payload) {
    state.user = payload ? payload.user : null
  },
}

//pentru a avea acces la obiectul state si la metoda methods trebuie sa le exportam
export default {
  state,
  methods,
}
