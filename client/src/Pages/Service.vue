<template>
    <div id="content" class="app-content">
			<ol class="breadcrumb float-xl-end">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
				<li class="breadcrumb-item"><a href="javascript:;">CSS Helper</a></li>
				<li class="breadcrumb-item active">Predefined CSS Class</li>
			</ol>
			<h1 class="page-header">Service Page</h1>
      
    </div>
</template>

<script>
export default {
  name: 'ExVueService',

  data() {
	return {
	  
	};
  },

  mounted() {
	
  },

  methods: {
    methods: {
    async fetchStaff() {
        try {
            const response = await axios.get(`${api}/staff`);
            this.Staff = response.data;
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    },

    async fetchService() {
        try {
            const response = await axios.get(`${api}/service`);
            this.Services = response.data;
        } catch (error) {
            console.error("Error fetching service:", error);
        }
    },

    fetchProvinces() {
        axios.get(`${api}/provinces`)
            .then((response) => {
                this.provinces = response.data;
            })
            .catch((error) => {
                console.error("Error fetching provinces:", error);
            });
    },
    
    updateProvinceName() {
        const selectedProvince = this.provinces.find(
            (province) => province.province_id === this.form.province
        );
        if (selectedProvince) {
            this.form.province_name = selectedProvince.province_name;
        }
        this.fetchDistricts(this.form.province); 
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

    updateDistrictName() {
        const selectedDistrict = this.districts.find(
            (district) => district.district_id === this.form.district
        );
        if (selectedDistrict) {
            this.form.district_name = selectedDistrict.district_name;
        }
    },

    resetForm() {
        this.isEditing = false;
        this.editId = null;
        this.form = {
            staff_id: "",
            service_id: "",
            img: "",
            staff_name: "",
            staff_surname: "",
            email: "",
            tell: "",
            village: "",
            province: "",
            district: "",
        };
        this.districts = []; 
        this.provinces = []; 
    },

    showEditForm(staff) {
        this.isEditing = true;
        this.editId = staff.staff_id;
        this.form = { 
            staff_id: staff.staff_id,
            service_id: staff.service_id_fk,
            staff_name: staff.staff_name,
            staff_surname: staff.staff_surname,
            email: staff.email,
            tell: staff.tell,
            village: staff.village,
            province: staff.province,
            district: staff.district,
        };
        this.fetchDistricts(staff.province); // Fetch districts based on the selected province
    },

    async addStaff() {
        try {
            const payload = {
                staff_id: this.form.staff_id,
                service_id_fk: this.form.service_id,
                staff_name: this.form.staff_name,
                staff_surname: this.form.staff_surname,
                email: this.form.email,
                tell: this.form.tell,
                village: this.form.village,
                province: this.form.province,
                district: this.form.district,
            };
            console.log("Submitting payload:", payload);
            await axios.post(`${api}/staff`, payload);
            this.fetchStaff();
            this.resetForm();
        } catch (error) {
            console.error("Error adding staff:", error);
        }
    },

    async updateStaff() {
        try {
            await axios.put(`${api}/staff/${this.editId}`, this.form);
            this.fetchStaff();
            this.resetForm();
        } catch (error) {
            console.error("Error updating staff:", error);
        }
    },

    async deleteStaff(id) {
        if (confirm("Are you sure you want to delete this staff member?")) {
            try {
                await axios.delete(`${api}/staff/${id}`);
                this.fetchStaff();
            } catch (error) {
                console.error("Error deleting staff:", error);
            }
        }
    },
},

  },
};
</script>

<style lang="scss" scoped>

</style>