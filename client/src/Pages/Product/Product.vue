<template>
    <div id="content" class="app-content">
		<!-- Existing content -->
		<!-- BEGIN breadcrumb -->
		<ol class="breadcrumb float-xl-end">
			<li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
			<li class="breadcrumb-item"><router-link to="/">product</router-link></li>
			<li class="breadcrumb-item active">Managed Tables product List</li>
		</ol>
		<!-- END breadcrumb -->
		<!-- BEGIN page-header -->
		<h1 class="page-header">ລາຍການຂໍ້ມູນສິນຄ້າ</h1>
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
										<i class="fas fa-user-plus"></i>
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
							<th width="1%" data-orderable="false">#</th>
							<th class="text-nowrap">id</th>
							<th class="text-nowrap">ຊື່</th>
							<th class="text-nowrap">ຈຳນວນ</th>
							<th class="text-nowrap">ລາຄາ</th>
							<th class="text-nowrap">ລາຄາລວມ</th>
							<th class="text-nowrap">ຈັດການ</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(product, index) in paginatedproduct" :key="product.pro_id" class="odd gradeX">
							<td width="1%" class="fw-bold">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
							<td width="1%" class="with-img">
								<img v-if="product.img_path" :src="`http://localhost:5000/${product.img_path}`" class="rounded h-30px my-n1 mx-n1"/>
							</td>
							<td>{{ formatproductId(product.pro_id) }}</td>
							<td>{{ product.pro_name }}</td>
							<td>{{ product.amount }}</td>
							<td>{{ product.price }}</td>
							<td>{{ product.total }}</td>
							<td>
								<div class="panel-heading">
									<div class="btn-group my-n1">
										<a href="javascript:;" class="btn-primary btn-sm dropdown-toggle"
											data-bs-toggle="dropdown">
											<i class="bx bx-dots-horizontal-rounded"></i>
										</a>
										<div class="dropdown-menu dropdown-menu-end">
											<a href="#modal-dialog" class="dropdown-item" data-bs-toggle="modal"
												@click="showEditForm(product)">
												<i class="fas fa-pen-to-square" style="color: dodgerblue"></i>
												edit</a>
											<a href="javascript:;" class="dropdown-item"
												@click="deleteproduct(product.pro_id)">
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
				<Pagin :total="filteredproduct.length" :currentPage="currentPage" :itemsPerPage="itemsPerPage" 
				@page-changed="changePage" />
			  </div>
			</div>
			
			<Modal :form="form" :isEditing="isEditing" 
				@reset-form="resetForm" 
				@add-product="addproduct" 
				@update-product="updateproduct"/>
	</div>
</template>

<script>
import axios from 'axios';
import api from '../../http';
import Swal from 'sweetalert2';
import Modal from './ProModal.vue'
import Pagin from '../PaginPages.vue'

export default {
  name: 'ExVueProduct',
  components: {
	Modal,
	Pagin,
  },

  data() {
		return {
			product: [],
			form: {
				pro_id: "",
				pro_name: "",
				amount: 0,
				price: 0,
				total: 0,
				img_path: "",
			
			},
			isEditing: false,
			editId: null,
			currentPage: 1,
			itemsPerPage: 10,
			searchQuery: "",
		};
	},

	mounted() {
		this.fetchproduct();
	},
	computed: {
		paginatedproduct() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			return this.filteredproduct.slice(start, start + this.itemsPerPage);
		},
		filteredproduct() {
			return this.product.filter(product => {
				const productId_Match = product.pro_id.toString().includes(this.searchQuery);
				const productName_Match = `${product.pro_name} ${product.pro_surname}`.toLowerCase().includes(this.searchQuery.toLowerCase());
				return productId_Match || productName_Match;
			});
		},
	},
	watch: {
		'form.amount': 'calculateTotal',
		'form.price': 'calculateTotal',
	},

	methods: {
		formatproductId(id) {
			return String(id).padStart(10, '0'); // Pads the ID to 10 characters with leading zeros
			},
		async fetchproduct() {
			try {
				const response = await axios.get(`${api}/product`);
				this.product = response.data;
			} catch (error) {
				console.error("Error fetching product:", error);
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
				pro_name: "",
				amount: 0,
				price: 0,
				total: 0,
				img_path: "",
			};
		},

		showEditForm(product) {
			this.isEditing = true;
			this.editId = product.pro_id;
			this.form = {
				pro_id: product.pro_id,
				pro_name: product.pro_name,
				amount: product.amount,
				price: product.price,
				total: product.total,
				img_path: product.img_path,
			};
    },

		async addproduct() {
			try {
				const formData = new FormData();
				formData.append('pro_id', this.form.pro_id);
				formData.append('pro_name', this.form.pro_name);
				formData.append('amount', this.form.amount);
				formData.append('price', this.form.price);  // Add date if necessary
				formData.append('total', this.form.total);   // Add date if necessary

				const imgInput = document.getElementById('img');  // Ensure this ID matches your input field ID
				if (imgInput.files.length > 0) {
				formData.append('img_path', imgInput.files[0]);  // Use 'img_path' instead of 'img'
				}

				await axios.post(`${api}/product`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
				});
				await Swal.fire("Success", "Product added successfully!", "success");
				this.fetchproduct();
				this.resetForm();
			} catch (error) {
				Swal.fire("Error", "Error adding product!", "error");
				console.error(error);
			}
			},

		async updateproduct() {
			try {
				const formData = new FormData();
				formData.append('pro_id', this.form.pro_id);
				formData.append('pro_name', this.form.pro_name);
				formData.append('amount', this.form.amount);
				formData.append('price', this.form.price);  // Add date if necessary
				formData.append('total', this.form.total);  // Add date if necessary

				const imgInput = document.getElementById('img');  // Ensure this ID matches your input field ID
				if (imgInput.files.length > 0) {
				formData.append('img_path', imgInput.files[0]);  // Use 'img_path' instead of 'img'
				}

				await axios.put(`${api}/product/${this.editId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
				});
				await Swal.fire("Success", "Product updated successfully!", "success");
				this.fetchproduct();
				this.resetForm();
			} catch (error) {
				Swal.fire("Error", "Error updating product!", "error");
				console.error(error);
			}
			},


		async deleteproduct(id) {
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
					await axios.delete(`${api}/product/${id}`);
					this.product = this.product.filter(product => product.pro_id !== id);
					await Swal.fire("Deleted!", "product has been deleted.", "success");
				} catch (error) {
					Swal.fire("Error", "Error deleting product!", "error");
					console.error(error);
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>

</style>