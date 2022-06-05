<template>
<transition name="modal-animation">
 <div v-show="modalActive" class="modal">
  <transition name="modal-animation-inner">
   <div v-show="modalActive" class="modal-inner">
    <i @click="close" class="far fa-times-circle"></i>
    <!--Modal Content -->
    <slot />
    <router-link class="link" @click="close" :to="{ name: 'Login' }">Înapoi la pagina de autentificare</router-link>
   </div>
  </transition>
 </div>
</transition>
</template>

<script>
export default {
 props: ["modalActive"],
 setup(props, {emit}) {
  //se creeaza o functie care sa permita inchiderea componentei modal
  const close = () => {
   emit('close');
  };

  return{close};
 }
};
</script>

<style lang="scss" scoped>
@import '../style/Modal.scss';
</style>