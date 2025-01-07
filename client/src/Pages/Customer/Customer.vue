<template>
	<div id="content" class="app-content">
		<!-- Existing content -->
		<!-- BEGIN breadcrumb -->
		<ol class="breadcrumb float-xl-end">
			<li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
			<li class="breadcrumb-item"><router-link to="/">Customer</router-link></li>
			<li class="breadcrumb-item active">Managed Tables Customer List</li>
		</ol>
		<!-- END breadcrumb -->
		<!-- BEGIN page-header -->
		<h1 class="page-header">ລາຍການຂໍ້ມູນລູກຄ້າ</h1>
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
						<div class="dt-length mb-2 ms-2">
							<select name="status-filter" class="form-select form-select-sm" v-model="selectedStatus" @change="filterStatus">
								<option value="">All</option>
								<option value="0">Booking</option>
								<option value="1">In progress</option>
								<option value="2">Done</option>
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
							<th class="text-nowrap">ລະຫັດ</th>
							<th class="text-nowrap">ຊື່</th>
							<th class="text-nowrap">email</th>
							<th class="text-nowrap">ສະຖານະ</th>
							<th class="text-nowrap">ຈັດການ</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(customer, index) in paginatedcustomer" :key="customer.id" class="odd gradeX">
							<td width="1%" class="fw-bold">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
							<td>{{ customer.cust_id }}</td>
							<td>{{ customer.cust_name }} {{ customer.cust_surname }}</td>
							<td>{{ customer.email }}</td>
							<td>
							<span v-if="customer.status === 2" class="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">
							<i class="fa fa-circle fs-9px fa-fw me-5px"></i>Done</span>
							<span v-else-if="customer.status === 1" class="badge border border-primary text-primary px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">
							<i class="fa fa-circle fs-9px fa-fw me-5px"></i>In progress</span>
							<span v-else class="badge border border-warning text-warning px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">
								<i class="fa fa-circle fs-9px fa-fw me-5px"></i>Booking</span>
							</td>
								<div class="panel-heading">
									<div class="btn-group my-n1">
										<a href="javascript:;" class="btn-primary btn-sm dropdown-toggle"
											data-bs-toggle="dropdown">
											<i class="bx bx-dots-horizontal-rounded"></i>
										</a>
										<div class="dropdown-menu dropdown-menu-end">
											<a href="#modal-dialog" class="dropdown-item" data-bs-toggle="modal"
												@click="showEditForm(customer)">
												<i class="fas fa-pen-to-square" style="color: dodgerblue"></i>
												edit</a>
											<a href="javascript:;" class="dropdown-item"
												@click="DeleteCustomer(customer.cust_id)">
												<i class="fas fa-trash" style="color: red"></i>
												delete
											</a>
										</div>
									</div>
								</div>
						</tr>
					</tbody>
				</table>
				<Pagination :total="filteredcustomer.length" :currentPage="currentPage" :itemsPerPage="itemsPerPage" 
				@page-changed="changePage" />
			  </div>
			</div>
			
			<Modal :form="form" :isEditing="isEditing" 
				@reset-form="resetForm" 
				@add-customer="addcustomer" 
				@update-customer="updatecustomer"/>
	</div>
</template>
<script>
import api from "../../http";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "./CustModal.vue";
import Pagination from "../PaginPages.vue";

export default {
	name: "ExVueCustomer",
	components: { Modal, Pagination },
	data() {
		return {
			customer: [],
			form: { 
				id: null, 
				cust_id: "",  
				cust_name: "", 
				cust_surname: "", 
				email: "" 
        },
			isEditing: false,
			editId: null,
			selectedStatus: "",
			currentPage: 1,
			itemsPerPage: 10,
			searchQuery: "",
		};
	},
	mounted() {
		this.fetchcustomer();
	},
	computed: {
		paginatedcustomer() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			return this.filteredcustomer.slice(start, start + this.itemsPerPage);
		},
		filteredcustomer() {
			return this.customer.filter(customer => {
				const idMatch = customer.cust_id.toString().includes(this.searchQuery);
				const statusMatch = this.selectedStatus === "" || customer.status.toString() === this.selectedStatus;
				const nameMatch = `${customer.cust_name} ${customer.cust_surname}`.toLowerCase().includes(this.searchQuery.toLowerCase());
				return (idMatch || nameMatch) && statusMatch;
			});
		},
	},
	methods: {
		async fetchcustomer() {
			try {
				const response = await axios.get(`${api}/customer`);
				this.customer = response.data;
			} catch (error) {
				console.error("Error fetching customers:", error);
			}
		},
		updatePageLength(event) {
			this.itemsPerPage = Number(event.target.value);
			this.currentPage = 1;
		},
		changePage(page) {
			this.currentPage = page;
		},
		resetForm() {
			this.isEditing = false;
			this.editId = null;
			this.form = { 
          id: null, 
          cust_id: "", 
          cust_name: "", 
          cust_surname: "", 
          email: "" 
        };
		},
		showEditForm(customer) {
			this.isEditing = true;
			this.editId = customer.cust_id;
			this.form = { ...customer };
		},
		async addcustomer() {
			try {
				await axios.post(`${api}/customer`, this.form);
				Swal.fire("Success", "Customer added successfully!", "success");
				this.fetchcustomer();
				this.resetForm();
			} catch (error) {
				Swal.fire("Error", "Failed to add customer.", "error");
			}
		},
		async updatecustomer() {
			try {
				await axios.put(`${api}/customer/${this.editId}`, this.form);
				Swal.fire("Success", "Customer updated successfully!", "success");
				this.fetchcustomer();
				this.resetForm();
			} catch (error) {
				Swal.fire("Error", "Failed to update customer.", "error");
			}
		},
		async DeleteCustomer(id) {
			const confirmation = await Swal.fire({
				title: "Are you sure?",
				text: "The customer will be marked as inactive.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
			});
			if (confirmation.isConfirmed) {
				try {
					await axios.delete(`${api}/customer/${id}`);
					this.customer = this.customer.filter(customer => customer.id !== id);
					Swal.fire("Deleted!", "Customer has been marked as inactive.", "success");
					this.fetchcustomer();
				} catch (error) {
					Swal.fire("Error", "Failed to delete customer.", "error");
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
