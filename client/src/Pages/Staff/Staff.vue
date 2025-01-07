<template>
	<div id="content" class="app-content">
		<!-- Existing content -->
		<!-- BEGIN breadcrumb -->
		<ol class="breadcrumb float-xl-end">
			<li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
			<li class="breadcrumb-item"><router-link to="/">Staff</router-link></li>
			<li class="breadcrumb-item active">Managed Tables Staff List</li>
		</ol>
		<!-- END breadcrumb -->
		<!-- BEGIN page-header -->
		<h1 class="page-header">ລາຍການຂໍ້ມູນພະນັກງານ</h1>
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
							<th class="text-nowrap">ລະຫັດ</th>
							<th class="text-nowrap">ຊື່</th>
							<th class="text-nowrap">email</th>
							<th class="text-nowrap">ເບີໂທ</th>
							<th class="text-nowrap">ທີ່ຢູ່</th>
							<!-- <th class="text-nowrap">ໜ້າວຽກ</th> -->
							<th class="text-nowrap">ຈັດການ</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(staff, index) in paginatedStaff" :key="staff.staff_id" class="odd gradeX">
							<td width="1%" class="fw-bold">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
							<td width="1%" class="with-img">
								<img v-if="staff.profile" :src="`http://localhost:5000/${staff.profile}`" class="rounded h-30px my-n1 mx-n1"/>
							</td>
							<td>{{ staff.staff_id }}</td>
							<td>{{ staff.staff_name }} {{ staff.staff_surname }}</td>
							<td>{{ staff.email }}</td>
							<td>{{ staff.tell }}</td>
							<td>{{ staff.village }}, {{ staff.district_name }}, {{ staff.province_name }}</td>
							<!-- <td>{{ staff.service_name }}</td> -->
							<td>
								<div class="panel-heading">
									<div class="btn-group my-n1">
										<a href="javascript:;" class="btn-primary btn-sm dropdown-toggle"
											data-bs-toggle="dropdown">
											<i class="bx bx-dots-horizontal-rounded"></i>
										</a>
										<div class="dropdown-menu dropdown-menu-end">
											<a href="#modal-dialog" class="dropdown-item" data-bs-toggle="modal"
												@click="showEditForm(staff)">
												<i class="fas fa-pen-to-square" style="color: dodgerblue"></i>
												edit</a>
											<a href="javascript:;" class="dropdown-item"
												@click="deleteStaff(staff.staff_id)">
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
				<Pagination :total="filteredStaff.length" :currentPage="currentPage" :itemsPerPage="itemsPerPage" 
				@page-changed="changePage" />
			  </div>
			</div>
			
			<!-- <Modal :form="form" :isEditing="isEditing" :Services="Services" :provinces="provinces" :districts="districts"  -->
			<Modal :form="form" :isEditing="isEditing" :provinces="provinces" :districts="districts" 
				@reset-form="resetForm" 
				@add-staff="addStaff" 
				@update-staff="updateStaff"
				@fetch-districts="fetchDistricts" />
	</div>
</template>

<script>
import api from "../../http";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "./StaffModal.vue";
import Pagination from "../PaginPages.vue";

export default {
	name: "ExVueStaff",
	components: {
		Modal,
		Pagination,
	},
	data() {
		return {
			Staff: [],
			//Services: [],
			provinces: [],
			districts: [],
			form: {
				staff_id: "",
				//service_id: "",
				staff_name: "",
				staff_surname: "",
				email: "",
				tell: "",
				village: "",
				province: "",
				district: "",
				profile: "",
			},
			isEditing: false,
			editId: null,
			currentPage: 1,
			itemsPerPage: 10,
			searchQuery: "",
		};
	},

	mounted() {
		this.fetchStaff();
		//this.fetchService();
		this.fetchProvinces();
	},
	computed: {
		paginatedStaff() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			return this.filteredStaff.slice(start, start + this.itemsPerPage);
		},
		filteredStaff() {
			return this.Staff.filter(staff => {
				const staffId_Match = staff.staff_id.toString().includes(this.searchQuery);
				const staffName_Match = `${staff.staff_name} ${staff.staff_surname}`.toLowerCase().includes(this.searchQuery.toLowerCase());
				return staffId_Match || staffName_Match;
			});
		},
	},

	methods: {
		async fetchStaff() {
			try {
				const response = await axios.get(`${api}/staff`);
				this.Staff = response.data;
			} catch (error) {
				console.error("Error fetching staff:", error);
			}
		},
		// async fetchService() {
		// 	try {
		// 		const response = await axios.get(`${api}/service`);
		// 		this.Services = response.data;
		// 	} catch (error) {
		// 		console.error("Error fetching service:", error);
		// 	}
		// },
		async fetchProvinces() {
			try {
				const response = await axios.get(`${api}/provinces`);
				this.provinces = response.data;
			} catch (error) {
				console.error("Error fetching provinces:", error);
			}
		},

		async fetchDistricts(provinceId) {
			if (!provinceId) {
				this.districts = [];
				return;
			}
			try {
				const response = await axios.get(`${api}/district/${provinceId}`);
				this.districts = response.data;
			} catch (error) {
				console.error("Error fetching districts:", error);
			}
		},
		
		updatePageLength(event) {
			this.itemsPerPage = Number(event.target.value);
			this.currentPage = 1; // Reset to first page when items per page changes
		},

		changePage(page) {
			this.currentPage = page;
		},

		resetForm() {
			this.isEditing = false;
			this.editId = null;
			this.form = {
				staff_id: "",
				//service_id: "",
				staff_name: "",
				staff_surname: "",
				email: "",
				tell: "",
				village: "",
				province: "",
				district: "",
				profile: "",
			};
		},

		showEditForm(staff) {
			this.isEditing = true;
			this.editId = staff.staff_id;
			this.form = {
				staff_id: staff.staff_id,
				//service_id: staff.service_id_fk,
				staff_name: staff.staff_name,
				staff_surname: staff.staff_surname,
				email: staff.email,
				tell: staff.tell,
				village: staff.village,
				province: staff.province,
				district: staff.district,
				profile: staff.profile,
			};
			this.fetchDistricts(staff.province);
		},

		async addStaff() {
			try {
				const formData = new FormData();
				formData.append('staff_id', this.form.staff_id);
				//formData.append('service_id_fk', this.form.service_id);
				formData.append('staff_name', this.form.staff_name);
				formData.append('staff_surname', this.form.staff_surname);
				formData.append('email', this.form.email);
				formData.append('tell', this.form.tell);
				formData.append('village', this.form.village);
				formData.append('province', this.form.province);
				formData.append('district', this.form.district);
				
				const profileInput = document.getElementById('profile');
				if (profileInput.files.length > 0) {
					formData.append('profile', profileInput.files[0]);
				}

				await axios.post(`${api}/staff`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				await Swal.fire("Success", "Staff added successfully!", "success");
				this.fetchStaff();
				this.resetForm();
			} catch (error) {
				Swal.fire("Error", "Error adding staff!", "error");
				console.error(error);
			}
		},

		async updateStaff() {
			try {
				const formData = new FormData();
				formData.append('staff_id', this.form.staff_id);
				//formData.append('service_id_fk', this.form.service_id);
				formData.append('staff_name', this.form.staff_name);
				formData.append('staff_surname', this.form.staff_surname);
				formData.append('email', this.form.email);
				formData.append('tell', this.form.tell);
				formData.append('village', this.form.village);
				formData.append('province', this.form.province);
				formData.append('district', this.form.district);
				
				const profileInput = document.getElementById('profile');
				if (profileInput.files.length > 0) {
					formData.append('profile', profileInput.files[0]);
				}

				await axios.put(`${api}/staff/${this.editId}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				await Swal.fire("Success", "Staff updated successfully!", "success");
				this.fetchStaff();
				this.resetForm();
			} catch (error) {
				Swal.fire("Error", "Error updating staff!", "error");
				console.error(error);
			}
		},

		async deleteStaff(id) {
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
					await axios.delete(`${api}/staff/${id}`);
					this.Staff = this.Staff.filter(staff => staff.staff_id !== id);
					await Swal.fire("Deleted!", "Staff has been deleted.", "success");
				} catch (error) {
					Swal.fire("Error", "Error deleting staff!", "error");
					console.error(error);
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
