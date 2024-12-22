<template lang="">
  <div id="app" class="app">
    <div class="login login-v2 fw-bold">
      <!-- BEGIN login-cover -->
      <div class="login-cover">
        <!-- <div
          class="login-cover-img"
          style="background-image: url(/assets/img/login-bg/cover-pattern.png)"
          data-id="login-cover-image"
        ></div> -->
        <div class="login-cover-bg"></div>
      </div>
      <!-- END login-cover -->
      <div class="login-container bg-factory text-dark rounded-3 py-3 pb-4">
		 <div class="text-center mb-3">
		<img src="../../assets/img/logo/PLC.png" class="navbar-logo bg-white rounded-pill w-40" />
        </div>
		<div class="login-header">
          <div class="brand">
            <div class="d-flex align-items-center text-white">
               <b class="me-3 ">PLC</b> ຍິນດີຕ້ອນຮັບ
            </div>
            <small class="text-white">ນຳໃຊ້ລະບົບ ຈັດການໂຮງງານຜະລິດອາຫານສັດ</small>
          </div>
          <div class="icon">
            <i class="fa-solid fa-user-lock"></i>
          </div>
        </div>
        <!-- END login-header -->
        <div class="login-content">
          <form action="index.html" method="GET">
            <div class="form-floating mb-20px">
              <input
                type="text"
                class="form-control fs-13px h-45px border-blue"
                placeholder="Email Address"
              />
              <label
                for="emailAddress"
                class="d-flex align-items-center text-gray-600 fs-13px"
                >Email Address</label
              >
            </div>
            <div class="form-floating mb-20px">
              <input
                type="password"
                class="form-control fs-13px h-45px border-blue"
                placeholder="Password"
              />
              <label
                for="emailAddress"
                class="d-flex align-items-center text-gray-600 fs-13px"
                >Password</label
              >
            </div>
            <div class="form-check mb-20px">
              <input
                class="form-check-input border-blue"
                type="checkbox"
                value="1"
                id="rememberMe"
              />
              <label
                class="form-check-label fs-13px text-gray-500"
                for="rememberMe"
              >
                Remember Me
              </label>
            </div>
            <div class="mb-20px">
              <button
                type="submit"
                class="btn btn-red d-block w-100 h-45px btn-lg"
              >
                Sign me in
              </button>
            </div>
            <div class="text-gray-500">
             ລະບົບ ຈັດການໂຮງງານຜະລິດອາຫານສັດ
             <span class='ms-5'>V 1.0</span> 
            </div>
          </form>
        </div>
        <!-- END login-content -->
      </div>
      <!-- END login-container -->
    </div>
    <!-- END login -->
  </div>
</template>
<script>
export default {
  name: "HomePage",
};
</script>
<style lang=""></style>
