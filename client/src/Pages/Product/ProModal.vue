<template>
	<div class="modal fade" id="modal-dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="productModalLabel">
						{{ isEditing ? "ແກ້ໄຂຂໍ້ມູນສິນຄ້າ" : "ເພີ່ມຂໍ້ມູນສິນຄ້າ" }}
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetForm" aria-hidden="true"></button>
				</div>
				<div class="modal-body">
					<form @submit.prevent="isEditing ? updateproduct() : addproduct()" class="form-horizontal" data-parsley-validate="true" name="demo-form">
							  <div class="row">
                                
                         <div class="row">
                            <div class="col-md-4 align-content-center" style="position: relative;">
                                <label role="button" style="cursor: pointer;">
                                <img :src="imgImage" class=" cursor-pointer rounded w-100" >
                                <input type="file" class="d-none" id="img" @change="handleFileUpload">
                            </label>
                            </div>
                            <div class="col-md-8">
                              <div>
                                <label  class="form-label fs-6">ຊື່ສິນຄ້າ:</label>
                                <input type="text" class="form-control mb-2" v-model="form.pro_name" placeholder="..." required>

                                <label  class="form-label fs-6">ຈຳນວນ:</label>
								<input type="text" id="amount" class="form-control" v-model="form.amount"
								 @input="validateNumericInput('amount')"/>
                              
                                <label  class="form-label fs-6">ລາຄາ:</label>
								<input type="text" id="price" class="form-control" v-model="form.price"
								 @input="validateNumericInput('price')"/>

                                <label  class="form-label fs-6">ລາຄາລວມ:</label>
                                <input type="number" class="form-control mb-2" v-model="form.total" readonly>

                                <button type="submit" class="btn btn-primary" >Submit</button>
								<button type="button" class="btn btn-danger ms-4" @click="resetForm" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
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
  name: "ExVueProModal",
  data(){
	return {
	
	}
  },
	props: {
		form: Object,
		isEditing: Boolean,
	},
	computed: {
    // Computed property to handle the img image URL
		imgImage() {
			return this.form.img ? URL.createObjectURL(this.form.img) : '../../../public/assets/img/icon/imges.jpg';
		}
	},
	methods: {
		handleFileUpload(event) {
		    this.form.img = event.target.files[0];
		},
		resetForm() {
			this.$emit('reset-form');
			this.closeModal(); // Close modal after reset
		},
		validateNumericInput(field) {
			const value = this.form[field];

			this.form[field] = value.replace(/[^0-9.]/g, '');
		},

		// Validate entire form before submission
		validateForm() {
			if (this.form.amount <= 0 || this.form.price <= 0) {
			Swal.fire("Error", "Amount and Price must be greater than 0.", "error");
			return false;
			}
			return true;
		},
		addproduct() {
			if (!this.validateForm()) return;
			this.$emit('add-product');
			this.closeModal(); // Close modal after adding product
		},
		updateproduct() {
			if (!this.validateForm()) return;
			this.$emit('update-product');
			this.closeModal(); // Close modal after updating product
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