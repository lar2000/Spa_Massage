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
							  <label class="col-lg-2 col-form-label form-label" for="profile">Profile :</label>
							  <div class="col-2">
							<label role="button" style="cursor: pointer;">
								<img :src="profileImage" class="w-80" alt="Profile">
								<input type="file" class="d-none" id="profile" @change="handleFileUpload">
							</label>
						</div>
							<div class="col-lg-8">
								<select v-model="form.service_id" class="form-select" required>
									<option value="" disabled>ເລືອກໃຊ້ບໍລິການ</option>
									<option v-for="service in Services" :key="service.service_id" :value="service.service_id">
										{{ service.service_name }}
									</option>
								</select>
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-2 col-form-label form-label" for="name">Name :</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="name" v-model="form.staff_name" placeholder="Enter name..." required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-2 col-form-label form-label" for="surname">Surname :</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="surname" v-model="form.staff_surname" placeholder="Enter surname..." required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-2 col-form-label form-label" for="email">Email :</label>
							<div class="col-lg-10">
								<input type="email" class="form-control" id="email" v-model="form.email" placeholder="Enter email..." required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-2 col-form-label form-label" for="tell">Phone :</label>
							<div class="col-lg-10">
								<input type="number" class="form-control" id="tell" v-model="form.tell" placeholder="Enter Phone..." required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-2 col-form-label form-label" for="village">Village :</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="village" v-model="form.village" placeholder="Enter village..." required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-2 col -form-label" for="province">Countries :</label>
							<div class="col-lg-5">
								<select v-model="form.province" @change="updateProvinceName" class="form-select" required>
									<option value="" disabled>Select Province</option>
									<option v-for="province in provinces" :key="province.province_id" :value="province.province_id">
										{{ province.province_name }}
									</option>
								</select>
							</div>
							<div class="col-lg-5">
								<select v-model="form.district" class="form-select" required>
									<option value="" disabled>Select District</option>
									<option v-for="district in districts" :key="district.district_id" :value="district.district_id">
										{{ district.district_name }}
									</option>
								</select>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-lg-2 col-form-label form-label">&nbsp;</label>
							<div class="col-lg-10">
								<button type="submit" class="btn btn-primary" >Submit</button>
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
  data(){
	return {
	
	}
  },
	props: {
		form: Object,
		isEditing: Boolean,
		Services: Array,
		provinces: Array,
		districts: Array,
	},
	computed: {
    // Computed property to handle the profile image URL
		profileImage() {
			return this.form.profile ? URL.createObjectURL(this.form.profile) : '../../../public/assets/img/icon/user.png';
		}
	},
	methods: {
		handleFileUpload(event) {
		    this.form.profile = event.target.files[0];
		},
		resetForm() {
			this.$emit('reset-form');
			this.closeModal(); // Close modal after reset
		},
		addStaff() {
			this.$emit('add-staff');
			this.closeModal(); // Close modal after adding staff
		},
		updateStaff() {
			this.$emit('update-staff');
			this.closeModal(); // Close modal after updating staff
		},
		updateProvinceName() {
			this.$emit('fetch-districts', this.form.province);
				},
		closeModal() {
			const modal = document.getElementById("modal-dialog");
			const Modal = bootstrap.Modal.getInstance(modal);
			Modal.hide(); // Hide the modal
		},
},

};
</script>

<style scoped>

</style>