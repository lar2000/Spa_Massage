<template>
  <div id="content" class="app-content">
  <!-- Existing content -->
  <!-- BEGIN breadcrumb -->
  <ol class="breadcrumb float-xl-end">
    <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
    <li class="breadcrumb-item"><router-link to="/">set_product</router-link></li>
    <li class="breadcrumb-item active">Managed Tables set_product List</li>
  </ol>
  <!-- END breadcrumb -->
  <!-- BEGIN page-header -->
  <h1 class="page-header">ລາຍການຂໍ້ມູນຊຸດສິນຄ້າ</h1>
  <!-- END page-header -->

  <!-- BEGIN panel -->
  <div class="panel panel-inverse">
    <!-- BEGIN panel-heading -->
    <div class="panel-heading">
      <h4 class="panel-title">Data Table - Default</h4>
      <div class="panel-heading-btn">
        <a href="javascript:;" class="btn btn-xs btn-icon btn-default" data-toggle="panel-expand"><i
            class="fa fa-expand"></i></a>
        <a href="javascript:;" class="btn btn-xs btn-icon btn-success" data-toggle="panel-reload"><i
            class="fa fa-redo"></i></a>
        <a href="javascript:;" class="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i
            class="fa fa-minus"></i></a>
        <a href="javascript:;" class="btn btn-xs btn-icon btn-danger" data-toggle="panel-remove"><i
            class="fa fa-times"></i></a>
      </div>
    </div>
    <!-- END panel-heading -->
    <!-- BEGIN panel-body -->
    <div class="panel panel-body">
      <div class="row mt-2 justify-content-between">
        <div
          class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
          <div class="dt-length mb-2">
            <select name="data-table-default_length" class="form-select form-select-sm"
              @change="updatePageLength">
              <option v-for="length in [10, 25, 50, 100]" :key="length" :value="length">
                {{ length }}
              </option>
            </select>
          </div>
        </div>
        <div class="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
          <div class="dt-search mb-2">
            <input type="search" class="form-control form-control-sm" id="dt-search-0"
              placeholder="Search ID or name..." v-model="searchQuery"/>
          </div>
          <div class="actions mb-2">
            <tr>
              <td width="1%">
                <a href="#modal-dialog" class="btn btn-sm btn-success ms-2" data-bs-toggle="modal">
                  <i class="fas fa-plus"></i>
                </a>
              </td>
            </tr>
          </div>
        </div>
      </div>
      <table id="data-table-default" class="table table-striped table-bordered align-middle text-nowrap">
        <thead>
          <tr>
            <th width="1%">ລ/ດ</th>
            <th class="text-nowrap">id</th>
            <th class="text-nowrap">ຊື່</th>
            <th class="text-nowrap">ຈຳນວນ</th>
            <th class="text-nowrap">ບໍລິການ</th>
            <th class="text-nowrap">ຈັດການ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(set_product, index) in paginatedset_product" :key="set_product.set_id" class="odd gradeX">
            <td width="1%" class="fw-bold">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
            <td width="1%" class="with-img">
              <img v-if="set_product.img_path" :src="`http://localhost:5000/${set_product.img_path}`" class="rounded h-30px my-n1 mx-n1"/>
            </td>
            <td>{{ formatset_productId(set_product.set_id) }}</td>
            <td>{{ set_product.set_name }}</td>
            <td>{{ set_product.amount }}</td>
            <td>{{ set_product.price }}</td>
            <td>{{ set_product.total }}</td>
            <td>
              <div class="panel-heading">
                <div class="btn-group my-n1">
                  <a href="javascript:;" class="btn-primary btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown">
                    <i class="bx bx-dots-horizontal-rounded"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a href="#modal-dialog" class="dropdown-item" data-bs-toggle="modal"
                      @click="showEditForm(set_product)">
                      <i class="fas fa-pen-to-square" style="color: dodgerblue"></i>
                      edit</a>
                    <a href="javascript:;" class="dropdown-item"
                      @click="deleteset_product(set_product.set_id)">
                      <i class="fas fa-trash" style="color: red"></i>
                      delete
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagin :total="filteredset_product.length" :currentPage="currentPage" :itemsPerPage="itemsPerPage" 
      @page-changed="changePage" />
      </div>
    </div>
    
    <Modal :form="form" :isEditing="isEditing" 
      @reset-form="resetForm" 
      @add-set_product="addset_product" 
      @update-set_product="updateset_product"/>
</div>
</template>

<script>
import axios from 'axios';
import api from '../../http';
import Swal from 'sweetalert2';
import Modal from './SetModal.vue'
import Pagin from '../PaginPages.vue'

export default {
name: 'ExVueset_product',
components: {
Modal,
Pagin,
},

data() {
  return {
    set_product: [],
    form: {
      set_id: "",
      set_name: "",
      amount: 0,
      service: "",
    
    },
    isEditing: false,
    editId: null,
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: "",
  };
},

mounted() {
  this.fetchset_product();
},
computed: {
  paginatedset_product() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredset_product.slice(start, start + this.itemsPerPage);
  },
  filteredset_product() {
    return this.set_product.filter(set_product => {
      const set_productId_Match = set_product.set_id.toString().includes(this.searchQuery);
      const set_productName_Match = `${set_product.set_name} ${set_product.set_surname}`.toLowerCase().includes(this.searchQuery.toLowerCase());
      return set_productId_Match || set_productName_Match;
    });
  },
},

methods: {
  formatset_productId(id) {
    return String(id).padStart(10, '0'); // Pads the ID to 10 characters with leading zeros
    },
  async fetchset_product() {
    try {
      const response = await axios.get(`${api}/set_product`);
      this.set_product = response.data;
    } catch (error) {
      console.error("Error fetching set_product:", error);
    }
  },
  
  updatePageLength(event) {
    this.itemsPerPage = Number(event.target.value);
    this.currentPage = 1; // Reset to first page when items per page changes
  },

  changePage(page) {
    this.currentPage = page;
  },
  calculateTotal() {
    this.form.total = this.form.amount * this.form.price;
  },

  resetForm() {
    this.isEditing = false;
    this.editId = null;
    this.form = {
      set_name: "",
      amount: 0,
      service: "",
    };
  },

  showEditForm(set_product) {
    this.isEditing = true;
    this.editId = set_product.set_id;
    this.form = {
      set_id: set_product.set_id,
      set_name: set_product.set_name,
      amount: set_product.amount,
      service: set_product.service,
    };
  },

  async addset_product() {
    try {
      const formData = new FormData();
      formData.append('set_id', this.form.set_id);
      formData.append('set_name', this.form.set_name);
      formData.append('amount', this.form.amount);
      formData.append('service', this.form.service);  // Add date if necessary   // Add date if necessary

      await axios.post(`${api}/set_product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      });
      await Swal.fire("Success", "set_product added successfully!", "success");
      this.fetchset_product();
      this.resetForm();
    } catch (error) {
      Swal.fire("Error", "Error adding set_product!", "error");
      console.error(error);
    }
    },

  async updateset_product() {
    try {
      const formData = new FormData();
      formData.append('set_id', this.form.set_id);
      formData.append('set_name', this.form.set_name);
      formData.append('amount', this.form.amount);
      formData.append('service', this.form.service);  // Add date if necessary

      await axios.put(`${api}/set_product/${this.editId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      });
      await Swal.fire("Success", "set_product updated successfully!", "success");
      this.fetchset_product();
      this.resetForm();
    } catch (error) {
      Swal.fire("Error", "Error updating set_product!", "error");
      console.error(error);
    }
    },


  async deleteset_product(id) {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`${api}/set_product/${id}`);
        this.set_product = this.set_product.filter(set_product => set_product.set_id !== id);
        await Swal.fire("Deleted!", "set_product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Error deleting set_product!", "error");
        console.error(error);
      }
    }
  },
},
};
</script>

<style lang="scss" scoped>

</style>