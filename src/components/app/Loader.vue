
<template>
	<transition name="fade">
		<div v-if="show" class="preloader">
			<p>Добро пожаловать!</p>
			<div class="circles">
				<div class="circle"></div>
				<div class="circle"></div>
				<div class="circle"></div>
				<div class="circle"></div>
				<div class="circle"></div>
			</div>
		</div>
	</transition>
</template>
<script>
export default {
	name: 'preloader',
	data(){
		return {
			show: true
		}
	},
	mounted(){
		if(Boolean(this.show)) this.showToggle()
	},
	methods: {
		showToggle(){
			setTimeout(() => {
				this.show = false
			}, 700)
		}
	}
}
</script>

<style lang="scss">

.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 9999;
  .logo {
    width: 12.5rem;
    height: 12.5rem;
    background-repeat: no-repeat;
  }
  p {
    font: 600 1.5rem;
    margin-top: 1rem;
  }
  .circles {
    display: flex;
    margin-top: 1rem;
    .circle {
      width: 1.5rem;
      height: 1.5rem;
      margin: .75rem;
      background-color: c2;
      border-radius: 50%;
      animation-name: scaleIn;
      animation-duration: .7s;
      transform: scale(0);
      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: .05s;
      }
      &:nth-child(3) {
        animation-delay: .1s;
      }
      &:nth-child(4) {
        animation-delay: .15s;
      }
      &:nth-child(5) {
        animation-delay: .2s;
      }
    }
  }
}
</style>