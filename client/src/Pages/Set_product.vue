<template>
  <div id="content" class="app-content">
			<ol class="breadcrumb float-xl-end">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
				<li class="breadcrumb-item"><a href="javascript:;">CSS Helper</a></li>
				<li class="breadcrumb-item active">Predefined CSS Class</li>
			</ol>
			<h1 class="page-header">Set_product Page</h1>

      <template>
  <div id="content" class="app-content">
    <!-- other code ... -->
    <div class="mb-3">
      <label for="province" class="form-label">Province</label>
      <select v-model="form.province" @change="fetchDistricts(form.province)" class="form-select">
        <option value="" disabled>Select Province</option>
        <option v-for="province in provinces" :key="province.province_id" :value="province.province_id">
          {{ province.province_name }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="district" class="form-label">District</label>
      <select v-model="form.district" class="form-select" :disabled="!form.province">
        <option value="" disabled>Select District</option>
        <option v-for="district in districts" :key="district.district_id" :value="district.district_id">
          {{ district.district_name }}
        </option>
      </select>
    </div>
    <!-- other code ... -->
  </div>
</template>

    </div>
</template>

<script>
export default {
  name: 'ExVueSetProduct',

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