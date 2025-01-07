<template>
  <div class="modal fade" id="productModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">
            {{ isEditing ? "ແກ້ໄຂຂໍ້ມູນສິນຄ້າ" : isImporting ? "ນຳໃຊ້ຂໍ້ມູນສິນຄ້າ" : "ເພີ່ມຂໍ້ມູນສິນຄ້າ" }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit" class="form-horizontal" data-parsley-validate="true" name="demo-form">
            <div class="form-group">
              <label class="form-label fs-6">ຊື່ສິນຄ້າ:</label>
              <input type="text" class="form-control mb-2" v-model="form.pro_name" placeholder="..." required>

              <label class="form-label fs-6">ຂະໜາດ (ml):</label>
              <input type="number" class="form-control mb-2" v-model="form.size" placeholder="..." required>

              <label class="form-label fs-6">ຈຳນວນ:</label>
              <input type="text" id="amount" class="form-control mb-2" v-model="form.amount" placeholder="..." required @input="validateNumericInput('amount')">

              <label class="form-label fs-6">ລາຄາ (ກີບ):</label>
              <input type="text" id="price" class="form-control mb-2" v-model="form.price" placeholder="..." required @input="validateNumericInput('price')">

              <label class="form-label fs-6">ລາຄາລວມ (ກີບ):</label>
              <input type="number" class="form-control mb-2" v-model="form.total" readonly>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        pro_name: '',
        size: '',
        amount: '',
        price: '',
        total: 0,
        img: null,
      },
      isEditing: false,
      isImporting: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.isEditing) {
        this.updateproduct();
      } else if (this.isImporting) {
        this.importproduct();
      } else {
        this.addproduct();
      }
    },
    validateNumericInput(field) {
      this.form[field] = this.form[field].replace(/[^0-9.]/g, '');
    },
    updateproduct() {
      // Logic to update product
      console.log("Updating product:", this.form);
    },
    addproduct() {
      // Logic to add product
      console.log("Adding product:", this.form);
    },
    importproduct() {
      // Logic to import product
      console.log("Importing product:", this.form);
    },
  },
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
