<template>
	<div class="modal fade" id="modal-dialog">
	  <div class="modal-dialog">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="productModalLabel">
			  {{ isImporting ? "ນຳເຂົ້າສິນຄ້າ" : isEditing ? "ແກ້ໄຂຂໍ້ມູນສິນຄ້າ" : "ເພີ່ມຂໍ້ມູນສິນຄ້າ" }}
			</h5>
			<button type="button" class="btn-close" data-bs-dismiss="modal" @click="resetForm" aria-hidden="true"></button>
		  </div>
		  <div class="modal-body">
			<form @submit.prevent="handleSubmit" class="form-horizontal" data-parsley-validate="true" name="demo-form">
			  <div class="row">
				<div class="col-md-4 align-content-center" style="position: relative;">
				  <label role="button" style="cursor: pointer;">
					<img :src="imgImage" class="cursor-pointer rounded w-100">
					<input type="file" class="d-none" id="img" @change="handleFileUpload">
				  </label>
				</div>
				<div v-if="isImporting" class="col-md-8">
				  <label class="form-label fs-6">ລະຫັດສິນຄ້າ (pro_id):</label>
				  <input list="productList" v-model="form.pro_id" class="form-control mb-2" placeholder="Input or search ID" required>
				   <datalist id="productList">
						<option v-for="prod in product" :key="prod.pro_id" :value="prod.pro_id">
						{{ prod.pro_id }}
						</option>
					</datalist>
				  <label class="form-label fs-6">ຈຳນວນ:</label>
				  <input type="number" v-model="form.amount" class="form-control mb-2" placeholder="Enter Amount" required>
				</div>
				<div v-else class="col-md-8">
				  <div>
					<label class="form-label fs-6">ຊື່ສິນຄ້າ:</label>
					<input type="text" class="form-control mb-2" v-model="form.pro_name" placeholder="..." required>
					<label class="form-label fs-6">ຂະໜາດ(ml):</label>
					<input type="number" class="form-control mb-2" v-model="form.size" placeholder="..." required>
					<label class="form-label fs-6">ຈຳນວນ:</label>
					<input type="text" id="amount" class="form-control mb-2" v-model="form.amount" placeholder="1234..." required
					  @input="validateNumericInput('amount')" />
					  <label class="form-label fs-6">ປະເພດ:</label>
					<select v-model="form.protype_id" class="form-select" required>
						<option value="" disabled>ເລືອກ</option>
						<option v-for="type in Product_type" :key="type.protype_id" :value="type.protype_id">
							{{ type.protype_name }}
						</option>
					</select>
					<label class="form-label fs-6">ລາຄາ:(ກີບ)</label>
					<input type="text" id="price" class="form-control mb-2" v-model="form.price" placeholder="1234..." required
					  @input="validateNumericInput('price')" />
					<label class="form-label fs-6">ລາຄາລວມ:(ກີບ)</label>
					<input type="number" class="form-control mb-2" v-model="form.total" readonly>
				  </div>
				</div>
			  </div>
			  <div class="modal-footer">
				<button type="submit" class="btn btn-primary">Submit</button>
				<button type="button" class="btn btn-danger ms-4" @click="resetForm" data-bs-dismiss="modal">Close</button>
			  </div>
			</form>
		  </div>
		</div>
	  </div>
	</div>
</template>
<script>
import Swal from 'sweetalert2';

export default {
  name: "ExVueProModal",
  data() {
    return {};
  },
  props: {
    form: Object,
    product: Array,
    Product_type: Array,
    isEditing: Boolean,
    isImporting: Boolean,
  },
  computed: {
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
      this.closeModal();
    },
    validateNumericInput(field) {
      const value = this.form[field];
      this.form[field] = value.replace(/[^0-9.]/g, '');
    },
    validateForm() {
      if (this.form.amount <= 0 || this.form.price <= 0) {
        Swal.fire("Error", "Amount and Price must be greater than 0.", "error");
        return false;
      }
      return true;
    },
    handleSubmit() {
      if (this.isEditing) {
        this.updateproduct();
      } else if (this.isImporting) {
        this.importproduct();
      } else {
        this.addproduct();
      }
    },
    addproduct() {
      if (!this.validateForm()) return;
      this.$emit('add-product');
      this.closeModal();
    },
    updateproduct() {
      if (!this.validateForm()) return;
      this.$emit('update-product');
      this.closeModal();
    },
    importproduct() {
      this.$emit('import-product');
      this.closeModal();
    },
    closeModal() {
      const modal = document.getElementById("modal-dialog");
      const Modal = bootstrap.Modal.getInstance(modal);
      Modal.hide();
    },
  }
};
</script>
  
  <style scoped>
  </style>
  