<template>
	<div class="modal fade" id="modal-dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staffModalLabel">
						{{ isEditing ? "ແກ້ໄຂຂໍ້ມູນພະນັກງານ" : "ເພີ່ມຂໍ້ມູນພະນັກງານ" }}
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetForm" aria-hidden="true"></button>
				</div>
				<div class="modal-body">
					<form @submit.prevent="isEditing ? updateStaff() : addStaff()" class="form-horizontal" data-parsley-validate="true" name="demo-form">
						<div class="form-group row mb-3">
							<label class="col-lg-4 col-form-label form-label" for="id">ID:</label>
							<div class="col-lg-8">
								<input type="text" class="form-control" id="id" v-model="form.staff_id" placeholder="Required" required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-4 col-form-label form-label" for="service">Service:</label>
							<div class="col-lg-8">
								<select v-model="form.service_id" class="form-select" required>
									<option value="" disabled>Select service</option>
									<option v-for="service in Services" :key="service.service_id" :value="service.service_id">
										{{ service.service_name }}
									</option>
								</select>
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-4 col-form-label form-label" for="name">Name:</label>
							<div class="col-lg-8">
								<input type="text" class="form-control" id="name" v-model="form.staff_name" placeholder="Enter name" required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-4 col-form-label form-label" for="surname">Surname:</label>
							<div class="col-lg-8">
								<input type="text" class="form-control" id="surname" v-model="form.staff_surname" placeholder="Enter surname" required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-4 col-form-label form-label" for="email">Email:</label>
							<div class="col-lg-8">
								<input type="email" class="form-control" id="email" v-model="form.email" placeholder="Enter email" required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-4 col-form-label form-label" for="tell">Phone:</label>
							<div class="col-lg-8">
								<input type="text" class="form-control" id="tell" v-model="form.tell" required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-4 col-form-label form-label" for="village">Village:</label>
							<div class="col-lg-8">
								<input type="text" class="form-control" id="village" v-model="form.village" required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-4 col -form-label" for="province">Province:</label>
							<div class="col-lg-8">
								<select v-model="form.province" @change="updateProvinceName" class="form-select" required>
									<option value="" disabled>Select Province</option>
									<option v-for="province in provinces" :key="province.province_id" :value="province.province_id">
										{{ province.province_name }}
									</option>
								</select>
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-4 col-form-label form-label" for="district">District:</label>
							<div class="col-lg-8">
								<select v-model="form.district" class="form-select" required>
									<option value="" disabled>Select District</option>
									<option v-for="district in districts" :key="district.district_id" :value="district.district_id">
										{{ district.district_name }}
									</option>
								</select>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-lg-4 col-form-label form-label">&nbsp;</label>
							<div class="col-lg-8">
								<button type="submit" class="btn btn-primary">Submit</button>
								<button type="button" class="btn btn-danger ms-4" @click="resetForm" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "ExVueModal",
	props: {
		form: Object,
		isEditing: Boolean,
		Services: Array,
		provinces: Array,
		districts: Array,
	},
	methods: {
		resetForm() {
			this.$emit('reset-form');
		},
		addStaff() {
			this.$emit('add-staff');
		},
		updateStaff() {
			this.$emit('update-staff');
		},
		updateProvinceName() {
			this.$emit('fetch-districts', this.form.province);
		},
	},
};
</script>

<style scoped>
/* Add any styles specific to the modal here */
</style>