<template>
	<div class="modal fade" id="modal-dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="set_productModalLabel">
						{{ isEditing ? "ແກ້ໄຂຂໍ້ມູນຊຸດສິນຄ້າ" : "ເພີ່ມຂໍ້ມູນຊຸດສິນຄ້າ" }}
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetForm" aria-hidden="true"></button>
				</div>
				<div class="modal-body">
					<form @submit.prevent="isEditing ? updateset_product() : addset_product()" class="form-horizontal" data-parsley-validate="true" name="demo-form">
							  <div class="row">
                                
                         <div class="row">
                            <div class="col-md-12">
                              <div>
                                <label  class="form-label fs-6">ຊື່ຊຸດສິນຄ້າ:</label>
                                <input type="text" class="form-control mb-2" v-model="form.set_name" placeholder="..." required>

                                <label  class="form-label fs-6">ຈຳນວນ:</label>
								<input type="text" id="amount" class="form-control" v-model="form.amount"
								 @input="validateNumericInput('amount')"/>

                                 <label class="form-label fs-6"></label>
                                <div class="checklist-grid">
                                    <div v-for="(service, index) in services" :key="index" class="form-check">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        :id="'service-' + index"
                                        :value="service"
                                        v-model="selectedServices"
                                    />
                                    <label class="form-check-label" :for="'service-' + index">
                                        {{ service }}
                                    </label>
                                    </div>
                                </div>
                                <!-- <div class="mt-3">
                                    <ul>
                                     <li v-for="(service, index) in selectedServices" :key="'selected-' + index">
                                        {{ service }}
                                    </li>
                                    </ul>
                                </div> -->
                                <div class="mt-2">
                                <button type="submit" class="btn btn-primary" >Submit</button>
								<button type="button" class="btn btn-danger ms-4" @click="resetForm" data-bs-dismiss="modal">Close</button>
                               </div>
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
  name: "ExVueSetModal",
  data(){
	return {
        services: [
            "service 1", "Service 2", "service 3", "Service 4",
            "service 5", "Service 6", "service 7", "Service 8"
        ], 
        selectedServices: [],
	}
  },
	props: {
		form: Object,
		isEditing: Boolean,
	},
	computed: {
    // Computed property to handle the img image URL
	},
	methods: {
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
		addset_product() {
			if (!this.validateForm()) return;
			this.$emit('add-set_product');
			this.closeModal(); // Close modal after adding set_product
		},
		updateset_product() {
			if (!this.validateForm()) return;
			this.$emit('update-set_product');
			this.closeModal(); // Close modal after updating set_product
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
.checklist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust column width */
  gap: 10px; /* Spacing between items */
}

.form-check {
  display: flex;
  align-items: center;
}

.form-check-label {
  margin-left: 8px; /* Space between checkbox and label */
}
</style>