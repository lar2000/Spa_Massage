<template>
	<div id="content" class="app-content">
		<!-- Existing content -->
		<!-- BEGIN breadcrumb -->
		<ol class="breadcrumb float-xl-end">
			<li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
			<li class="breadcrumb-item"><router-link to="/">imp</router-link></li>
			<li class="breadcrumb-item active">Managed Tables imp List</li>
		</ol>
		<!-- END breadcrumb -->
		<!-- BEGIN page-header -->
		<h1 class="page-header">ລາຍການ</h1>
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
            <div class="dt-search mb-2">
              <input type="date" class="form-control form-control-sm" v-model="searchDate" placeholder="Search by Date"/>
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
							<th class="text-nowrap">ຈຳນວນ</th>
							<th class="text-nowrap">ວ.ດ.ປ</th>
							<th class="text-nowrap">ຈັດການ</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(imp, index) in paginatedimp" :key="imp.id" class="odd gradeX">
							<td width="1%" class="fw-bold">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
							<td>{{ imp.ip_id }}</td>
							<td>{{ imp.ip_name }}</td>
							<td>{{ imp.amount }}</td>
							<td>{{ new Date(imp.date).toLocaleString('en-GB')}}</td>


								<div class="panel-heading">
									<div class="btn-group my-n1">
										<a href="javascript:;" class="btn-primary btn-sm dropdown-toggle"
											data-bs-toggle="dropdown">
											<i class="bx bx-dots-horizontal-rounded"></i>
										</a>
										<div class="dropdown-menu dropdown-menu-end">
											<a href="#modal-dialog" class="dropdown-item" data-bs-toggle="modal"
												@click="showEditForm(imp)">
												<i class="fas fa-pen-to-square" style="color: dodgerblue"></i>
												edit</a>
											<a href="javascript:;" class="dropdown-item"
												@click="Deleteimp(imp.ip_id)">
												<i class="fas fa-trash" style="color: red"></i>
												delete
											</a>
										</div>
									</div>
								</div>
						</tr>
					</tbody>
				</table>
				<Pagination :total="filteredimp.length" :currentPage="currentPage" :itemsPerPage="itemsPerPage" 
				@page-changed="changePage" />
			  </div>
			</div>
			
			<Modal :form="form" :isEditing="isEditing" 
				@reset-form="resetForm" 
				@add-imp="addimp" 
				@update-imp="updateimp"/>
	</div>
</template>
<script>
import api from "../../http";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "./ImpModal.vue";
import Pagination from "../PaginPages.vue";

export default {
	name: "ExVueimpPro",
	components: { Modal, Pagination },
	data() {
		return {
			imp: [],
			form: { 
				id: null, 
				ip_id: "",  
				ip_name: "", 
				amount: "", 
				date: "" 
        },
			isEditing: false,
			editId: null,
			currentPage: 1,
			itemsPerPage: 10,
			searchQuery: "",
      searchDate: "",
		};
	},
	mounted() {
		this.fetchimp();
	},
	computed: {
		paginatedimp() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			return this.filteredimp.slice(start, start + this.itemsPerPage);
		},
		filteredimp() {
      return this.imp.filter(imp => {
          const idMatch = imp.ip_id.toString().includes(this.searchQuery);
          const nameMatch = imp.ip_name.toLowerCase().includes(this.searchQuery.toLowerCase());
          const dateMatch = this.searchDate ? 
          new Date(imp.date).toLocaleDateString('en-GB') === new Date(this.searchDate).toLocaleDateString('en-GB') : true;

      return (idMatch || nameMatch) && dateMatch;
      });
   },
	},
	methods: {
		async fetchimp() {
			try {
				const response = await axios.get(`${api}/imp`);
				this.imp = response.data;
			} catch (error) {
				console.error("Error fetching imps:", error);
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
          ip_id: "", 
          ip_name: "", 
          amount: "", 
          date: "", 
        };
		},
		showEditForm(imp) {
			this.isEditing = true;
			this.editId = imp.id;
			this.form = { ...imp };
		},
		async addimp() {
			try {
				await axios.post(`${api}/imp`, this.form);
				Swal.fire("Success", "imp added successfully!", "success");
				this.fetchimp();
				this.resetForm();
			} catch (error) {
				Swal.fire("Error", "Failed to add imp.", "error");
			}
		},
		async updateimp() {
			try {
				await axios.put(`${api}/imp/${this.editId}`, this.form);
				Swal.fire("Success", "imp updated successfully!", "success");
				this.fetchimp();
				this.resetForm();
			} catch (error) {
				Swal.fire("Error", "Failed to update imp.", "error");
			}
		},
		async Deleteimp(id) {
			const confirmation = await Swal.fire({
				title: "Are you sure?",
				text: "The imp will be marked as inactive.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
			});
			if (confirmation.isConfirmed) {
				try {
					await axios.delete(`${api}/imp/${id}`);
					this.imp = this.imp.filter(imp => imp.id !== id);
					Swal.fire("Deleted!", "imp has been marked as inactive.", "success");
					this.fetchimp();
				} catch (error) {
					Swal.fire("Error", "Failed to delete imp.", "error");
				}
			}
		},
	},
};
</script>

<style></style>
