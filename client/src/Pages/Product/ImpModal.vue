<template>
	<div class="modal fade" id="modal-dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="importModalLabel">
						{{ isEditing ? "ແກ້ໄຂຂໍ້ມູນ" : "add" }}
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetForm" aria-hidden="true"></button>
				</div>
				<div class="modal-body">
					<form @submit.prevent="isEditing ? updateimp() : addimp()" class="form-horizontal" data-parsley-validate="true" name="demo-form">
						<div class="form-group row mb-3">
							<label class="col-lg-3 col-form-label form-label" for="name">ຊື່ :</label>
							<div class="col-lg-9">
								<input type="text" class="form-control" id="name" v-model="form.ip_name" placeholder="Enter name..." required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-3 col-form-label form-label" for="surname">ຈຳນວນ :</label>
							<div class="col-lg-9">
								<input type="number" class="form-control" id="surname" v-model="form.amount" required />
							</div>
						</div>
						<div class="form-group row mb-3">
							<label class="col-lg-3 col-form-label form-label" for="email">ວ.ດ.ປ :</label>
							<div class="col-lg-9">
								<input type="datetime-local" class="form-control" id="date" v-model="form.date" required />
							</div>
						</div>
						<div class="form-group row">
							<label class="col-lg-3 col-form-label form-label">&nbsp;</label>
							<div class="col-lg-9">
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
  name: "ExVueImpModal",
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
		addimp() {
			this.$emit('add-imp');
			this.closeModal(); // Close modal after adding import
		},
		updateimp() {
			this.$emit('update-imp');
			this.closeModal(); // Close modal after updating import
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