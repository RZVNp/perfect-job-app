<template>
   <div class="reset-password">
     <Modal @close="toggleModal" :modalActive="modalActive">
       <div class="modal-content">
         <h1>A fost trimis un mesaj pentru schimbarea parolei la adresa de email introdusă.</h1>
         <p>Vă mulțumim!</p>
       </div>
     </Modal>
    <div class="form-wrap">
      <form class="reset">
        <router-link class="left-icon" :to="{ name: 'Announces' }"
          > <img class="arrow" src="@/assets/left-arrow-black.svg" alt="" /></router-link
        >
        <h2>Schimbă parola</h2>
        <p>V-ați uitat parola? Introduceți adresa de email pentru schimbarea acesteia!</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <img class="icon" src="@/assets/envelope-regular.svg" alt="">
          </div>
        </div>
        
        <button class="btn" type="button" @click="toggleModal">Schimbare</button>
        <router-link class="forgot-password" :to="{ name: 'Login' }"
        >Anulează</router-link
      >
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
//se face import la componenta modal care este folosita in momentul actiunii de schimbare a parolei unui utilizator
import Modal from "../components/Modal.vue";
//se importa instanta ref din biblioteca vue ce ajuta la adugarea unor referinte la elementele HTML
import {ref} from "vue";
export default {
 name: "ForgotPassword",
 components: {
   Modal,
 },
 setup() {
   //se initializeaza metoda modalActive ca fiind falsa pentru inceput
   const modalActive = ref(false);
  //se creeaza functia care declanseaza componenta modal
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };
   //declaratia return incheie executia functiei si specifica o valoare care trebuie returnata apelantului functiei
   return {modalActive, toggleModal};
 },

 
};
</script>

<style lang="scss" scoped>
@import '../style/ForgotPassword.scss';
</style>
