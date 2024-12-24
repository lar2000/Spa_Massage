<template>
	<div class="modal fade" id="modal-dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="customerModalLabel">
						{{ isEditing ? "ແກ້ໄຂຂໍ້ມູນລູກຄ້າ" : "ເພີ່ມຂໍ້ມູນລູກຄ້າ" }}
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetForm" aria-hidden="true"></button>
				</div>
				<div class="modal-body">
					<form @submit.prevent="isEditing ? updatecustomer() : addcustomer()" class="form-horizontal" data-parsley-validate="true" name="demo-form">
						<div class="form-group row mb-3">
							<label class="col-lg-2 col-form-label form-label" for="name">Name :</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="name" v-model="form.cust_name" placeholder="Enter name..." required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-2 col-form-label form-label" for="surname">Surname :</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="surname" v-model="form.cust_surname" placeholder="Enter surname..." required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-2 col-form-label form-label" for="email">Email :</label>
							<div class="col-lg-10">
								<input type="email" class="form-control" id="email" v-model="form.email" placeholder="Enter email..." required />
							</div>
						</div>
                        <!-- <div class="text-center">
                            <a class="btn btn-social-icon btn-facebook mb-2"><i class='bx bxl-facebook-circle' ></i></a>
                            <a class="btn btn-social-icon btn-google mb-2  ms-2"><i class='bx bxl-google'></i></a>
                            <a class="btn btn-social-icon btn-instagram mb-2  ms-2"><i class='bx bxl-instagram'></i></a>
                            <a class="btn btn-social-icon btn-twitter mb-2  ms-2" ><i class='bx bxl-twitter'></i></a>
                            <a class="btn btn-social-icon btn-vk mb-2  ms-2"><i class='bx bxl-vk'></i></a>
                        </div> -->
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
  name: "ExVueCustModal",
  data(){
	return {
	
	}
  },
	props: {
		form: Object,
		isEditing: Boolean,
	},
	methods: {
		resetForm() {
			this.$emit('reset-form');
			this.closeModal(); // Close modal after reset
		},
		addcustomer() {
			this.$emit('add-customer');
			this.closeModal(); // Close modal after adding customer
		},
		updatecustomer() {
			this.$emit('update-customer');
			this.closeModal(); // Close modal after updating customer
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