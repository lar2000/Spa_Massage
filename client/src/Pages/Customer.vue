<template lang="">
    <div id="content" class="app-content">
			<!-- BEGIN breadcrumb -->
			<ol class="breadcrumb float-xl-end">
				<li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
				<li class="breadcrumb-item"><a href="javascript:;">CSS Helper</a></li>
				<li class="breadcrumb-item active">Predefined CSS Class</li>
			</ol>
		<div class="users-container">
      <h1 class="title" style="color: black;">Users List Page</h1>
      <div class="actions">
          <button class="btn btn-add" @click="openModal('Add')"><i class="bx bx-user-plus"></i></button>
      </div>
      <div class="table-responsive">
          <table class="table-users">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Village</th>
                      <th>District</th>
                      <th>Province</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="user in Users" :key="user.user_id">
                      <td>{{ user.user_id }}</td>
                      <td>{{ user.user_name }}</td>
                      <td>{{ user.user_surname }}</td>
                      <td>{{ user.village }}</td>
                      <td>{{ user.district }}</td>
                      <td>{{ user.province }}</td>
                      <td>
                          <button class="btn btn-edit" @click="editUser(user)">
                              <i class="bx bx-edit"></i>
                          </button>
                          <button class="btn btn-delete" @click="deleteUser(user.user_id)">
                              <i class="bx bx-trash"></i>
                          </button>
                      </td>
                  </tr>
                  <tr v-if="Users.length === 0">
                      <td colspan="7" class="text-center">No users found</td>
                  </tr>
              </tbody>
          </table>
      </div>

      <!-- Modal for Adding/Editing Users -->
      <div v-if="showModal" class="modal-overlay">
          <div class="modal">
              <h2>{{ modalTitle }}</h2>
              <form @submit.prevent="submitUser">
                  <div class="form-group">
                      <label for="id">ID:</label>
                      <input type="number" v-model="currentUser.user_id" placeholder="Enter ID" required />
                  </div>
                  <div class="form-group">
                      <label for="name">Name:</label>
                      <input type="text" v-model="currentUser.user_name" placeholder="Enter name" required />
                  </div>
                  <div class="form-group">
                      <label for="surname">Surname:</label>
                      <input type="text" v-model="currentUser.user_surname" placeholder="Enter surname" required />
                  </div>
                  <div class="form-group">
                      <label for="village">Village:</label>
                      <input type="text" v-model="currentUser.village" placeholder="Enter village" required />
                  </div>
                  <div class="form-group">
                      <label for="province">Province:</label>
                      <select v-model="currentProvince.province_id" @change="updateDistricts" required>
                        <option value="" disabled selected>Select province</option>
                        <option v-for="province in Province" :key="province.province_id" :value="province.province_id">
                          {{ province.province_name }}
                          </option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="district">District:</label>
                      <select v-model="currentDistrict.district_id" :disabled="!currentProvince.province_id" required>
                        <option value="" disabled selected>Select district</option>
                        <option v-for="district in filteredDistricts" :key="district.district_id" :value="district.district_id">
                          {{ district.district_name }}
                          </option>
                      </select>
                    </div>

                  <div class="modal-actions">
                      <button type="submit" class="btn btn-save">
                          {{ modalAction }}
                      </button>
                      <button type="button" class="btn btn-cancel" @click="closeModal">
                          Cancel
                      </button>
                  </div>
              </form>
          </div>
		</div>
      </div>
  </div>
</template>

<script>
import api from '../http'
import ax from "axios";
import Swat from "sweetalert2";

export default {
	name: "ExVueCustomer",
  data() {
	
      return {
          Users: [],
          Province: [],
          District: [],
          showModal: false,
          currentUser: {
              user_id: "",
              user_name: "",
              user_surname: "",
              village: "",
              district: "",
              province: "",
          },
          currentProvince: {
              province_id: "",
              province_name: "",
          },
          currentDistrict: {
              district_id: "",
              province_id_fk: "",
              district_name: "",
          },
          modalTitle: "",
          modalAction: "",
      };
  },
  mounted() {
      this.fetchUsers();
      this.fetchDistrict();
      this.fetchProvince();
  },
  computed: {
    filteredDistricts() {
      return this.District.filter(
        (district) => district.province_id_fk === this.currentProvince.province_id
      );
    },
  },
  methods: {
    //---------------------- ດຶງ ຂໍ້ມູນ ມາ ສະ ແດງ ----------------
      async fetchUsers() {
          try {
              const response = await ax.get(`${api}/users`);
              this.Users = response.data;
          } catch (error) {
              console.error("Error fetching users:", error);
          }
      },
      async fetchProvince() {
          try {
              const response = await ax.get(`${api}/province`);
              this.Province = response.data;
              console.log(response.data)
          } catch (error) {
              console.error("Error fetching province:", error);
          }
      },
      async fetchDistrict() {
          try {
              const response = await ax.get(`${api}/district`);
              this.District = response.data;
          } catch (error) {
              console.error("Error fetching district:", error);
          }
      },
      updateDistricts() {
      this.currentDistrict.district_id = ""; // Reset the selected district when province changes
    },
      //---------------------------- ຂຶ້ນ popup (ໜ້າ ຕ່າ ງ ລອຍ) -------------
      openModal(action, user = null) { 
          this.showModal = true;
          if (action === "Add") {
              this.modalTitle = "Add✍️User";
              this.modalAction = "Save";
              this.currentUser = {
                  user_id: "",
                  user_name: "",
                  user_surname: "",
                  village: "",
                  district: "",
                  province: "",
              };
              this.currentProvince.province_id = ""; // Reset province
              this.currentDistrict.district_id = ""; // Reset district

          } else if (action === "Edit") {
              this.modalTitle = "Edit✍️User";
              this.modalAction = "Update";
              this.currentUser = { ...user };
               // Find province_id and district_id based on names
              const province = this.Province.find(            // this.Province.find(...): ວົນ ຊໍ້າ ຜ່ານ Province array
                  (p) => p.province_name === user.province    // ສຳ ລັບ ແຕ່ ລະ ແຂວງ ( p) ຈະ ກວດ ສອບ ວ່າ province_name ຕົງ ກັບ ຄ່າ user.province ຫຼືບໍ່
              );                                              // ຫາກ ພົບ ການ ຈັບ ຄູ່ ວັດ ຖຸ ທັງ ໝົດ ຈະ ຖຶກ ສົ່ງ ຄືນ ให้ province
              this.currentProvince.province_id = province ? province.province_id : ""; //this.currentProvince.province_id province: หาก พบ การ จับ คู่ ระ บบ province_id จะ ตั้ง ค่า เป็น currentProvince.province_id หาก ไม่ พบ การ จับคู่ ระ บบ จะ ตั้ง ค่า สตริง ว่าง ( "")

              const district = this.District.find(
                  (d) => d.district_name === user.district
              );
              this.currentDistrict.district_id = district ? district.district_id : "";
          }
      },
      closeModal() {
          this.showModal = false;
      },
      
      async submitUser() {
        try {
            // Find the names of the selected province and district
            const selectedProvince = this.Province.find(
                (province) => province.province_id === this.currentProvince.province_id
            );
            const selectedDistrict = this.District.find(
                (district) => district.district_id === this.currentDistrict.district_id
            );

            // Update the currentUser object with the names
            this.currentUser.province = selectedProvince ? selectedProvince.province_name : "";
            this.currentUser.district = selectedDistrict ? selectedDistrict.district_name : "";

            const action = this.modalAction === "Save" ? "Add" : "Update";
            const confirm = await Swat.fire({
              title: `${action} confirm`,
              text: `Are you sure wan to ${action.toLowerCase()} this user?`,
              icon: 'question',
              iconColor: 'yellow',
              showCancelButton: true,
              confirmButtonText: `👍Yes!, ${action.toLowerCase()} it.`,
              confirmButtonColor: 'green',
              cancelButtonText:'👎Cancel',
              cancelButtonColor: 'red',

            })
            if (confirm.isConfirmed) {

              if (this.modalAction === "Save") {
                await ax.post(`${api}/users`, this.currentUser);
                Swat.fire('Added!', 'added successfully👌', 'success');
            } else {
                await ax.put(`${api}/users/${this.currentUser.user_id}`, this.currentUser);
                Swat.fire('Updated!', 'updated successfully👌', 'success');
            } 
            this.fetchUsers(); // Refresh the list
            this.closeModal(); // Close the modal
          } else {
            Swat.fire("Cancelled", `The ${action.toLowerCase()} action was cancelled.`, "info");
            this.closeModal();
          }
        } catch (error) {
            console.error("Error submitting user:", error);
            Swat.fire("Error!", "Something went wrong while submitting the user.", "error");
        }
    },

      editUser(user) {
          this.openModal("Edit", user);
      },
      async deleteUser(user_id) {
        //<<------------------JavaScript Confirm--------------->>

          // if (confirm("Are you sure you want to delete this user?")) {
          //     try {
          //         await ax.delete(`${api}/users/${user_id}`);
          //         this.fetchUsers();
          //     } catch (error) {
          //         console.error("Error deleting user:", error);
          //     }
          // }
          Swat.fire({
            title: 'Are you sure❓.',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: 'orange',
            showCancelButton: true,
            confirmButtonText: '👍Yes, delete it!',
            confirmButtonColor: 'green',
            cancelButtonText: '👎Cancel',
            cancelButtonColor: 'red',
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await ax.delete(`${api}/users/${user_id}`);
                Swat.fire('Deleted!', 'user has been deleted!', 'success');
                this.fetchUsers()
              } catch (error) {
                console.error("Error deleting user:", error);
                Swat.fire("Error!", "Unable to delete user.", "error");
              }
            }
          })
      },
  },
};
</script>
<style scoped>
/* Modern Styles */
.users-container {
  margin: 20px auto;
  padding: 10px;
  max-width: 1000px;
  font-family: "Arial", sans-serif;
  color: #333;
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 10px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-add {
  background-color: #28a745;
  color: #fff;
}

.btn-edit {
  background-color: #007bff;
  color: #fff;
}

.btn-delete {
  margin: 4px;
  background-color: #dc3545;
  color: #fff;
}

.table-responsive {
  overflow-x: auto;
}

.table-users {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.table-users th,
.table-users td {
  padding: 12px;
  border: 1px solid #ddd;
}

.table-users thead {
  background-color: #343a40;
  color: #fff;
}

.table-users tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.table-users tbody tr:hover {
  background-color: #e9ecef;
}

.text-center {
  text-align: center;
  font-size: 1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(216, 216, 216, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
}

.modal h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions .btn {
  width: 48%;
}
</style>