<template>
	<!-- BEGIN #app -->
		<div id="app" class="fade show">
		<!-- BEGIN #-navbar -->
		<NavBar />
		<!-- Content -->
		<Content/>
		<!-- BEGIN #footer -->
		<AboutUs/>
		<!-- END #footer -->
	</div>
	<!-- END #app -->
</template>

<script>
import NavBar from './WebNavbar.vue';
import Content from './Pages/Content.vue';
import AboutUs from './Pages/AboutUs.vue';
export default {
    components: {
      NavBar,
      Content,
      AboutUs,
    },
  name: 'ExVueWebHomePage',

  data() {
	return {
	  
	};
  },

  mounted() {
	
  },

  methods: {
	
  },
};
</script>

<style lang="scss" scoped>

</style>