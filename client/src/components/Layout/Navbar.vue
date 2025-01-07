<template lang="">
   <!-- BEGIN #sidebar -->
		<div id="sidebar" class="app-sidebar" data-bs-theme="dark">
			<!-- BEGIN scrollbar -->
			<div class="app-sidebar-content" data-scrollbar="true" data-height="100%">
				<!-- BEGIN menu -->
				<div class="menu">
					<div class="menu-profile">
						<a href="javascript:;" class="menu-profile-link" data-toggle="app-sidebar-profile" data-target="#appSidebarProfileMenu">
							<div class="menu-profile-cover with-shadow"></div>
							<div class="menu-profile-image">
								<img src="../assets/img/user/user-13.jpg" alt="" />
							</div>
							<div class="menu-profile-info">
								<div class="d-flex align-items-center">
									<div class="flex-grow-1">
										Sean Ngu
									</div>
									<div class="menu-caret ms-auto"></div>
								</div>
								<small>Frontend developer</small>
							</div>
						</a>
					</div>
					<div id="appSidebarProfileMenu" class="collapse">
						<div class="menu-item pt-5px">
							<a href="javascript:;" class="menu-link">
								<div class="menu-icon"><i class="fa fa-cog"></i></div>
								<div class="menu-text">Settings</div>
							</a>
						</div>
						<div class="menu-item">
							<a href="javascript:;" class="menu-link">
								<div class="menu-icon"><i class="fa fa-pencil-alt"></i></div>
								<div class="menu-text"> Send Feedback</div>
							</a>
						</div>
						<div class="menu-item pb-5px">
							<a href="javascript:;" class="menu-link">
								<div class="menu-icon"><i class="fa fa-question-circle"></i></div>
								<div class="menu-text"> Helps</div>
							</a>
						</div>
						<div class="menu-divider m-0"></div>
					</div>
					<div class="menu-header">ເມນູ</div>
					<div class="menu-item fs-5">
					<router-link to="/" class="menu-link">
					<div class="menu-icon">
					<i class="fas fa-qrcode"></i>
					</div>
					<div class="menu-text">ໜ້າຫຼັກ</div>
					</router-link>
					</div>
					<div class="menu-item fs-5">
					 <router-link to="/booking" class="menu-link">
					 <div class="menu-icon">
					 <i class="fas fa-bookmark"></i>
					 </div>
					 <div class="menu-text">ຈອງບໍລິການ</div>
					 </router-link>
					 </div>
					 <div class="menu-item fs-5">
					 <router-link to="/booking" class="menu-link">
					 <div class="menu-icon">
					 <i class="fas fa-bed"></i>
					 </div>
					 <div class="menu-text">ເຂົ້າໃຊ້ບໍລິການ</div>
					 </router-link>
					 </div>
					 <div class="menu-item has-sub fs-5">
						<a href="javascript:void(0);" class="menu-link">
							<div class="menu-icon"><i class="fa-solid fa-star"></i></div>
							<div class="menu-text">ບໍລິການ</div>
							<div class="menu-caret"></div>
						</a>
						<div class="menu-submenu fs-14px">
							<div class="menu-item">
								<router-link to="/service_type" class="menu-link"><div class="menu-text">ປະເພດບໍລິການ</div></router-link>
							</div>
							<div class="menu-item">
								<router-link to="/service" class="menu-link"><div class="menu-text">ລາຍການບໍລິການ</div></router-link>
							</div>
						</div>
					</div>
					<div class="menu-item has-sub fs-5">
						<a href="javascript:void(0);" class="menu-link">
							<div class="menu-icon"><i class="fa-solid fa-file-lines"></i></div>
							<div class="menu-text">ລາຍງານ</div>
							<div class="menu-caret"></div>
						</a>
						<div class="menu-submenu fs-14px">
							<div class="menu-item">
								<router-link to="/company" class="menu-link"><div class="menu-text">ລາຍງານການຂາຍ</div></router-link>
							</div>
							<div class="menu-item">
								<router-link to="/type" class="menu-link"><div class="menu-text">ລາຍງານນຳເຂົ້າ</div></router-link>
							</div>
							<div class="menu-item">
								<router-link to="/model" class="menu-link"><div class="menu-text">ລາຍງານການສັ່ງຊື້</div></router-link>
							</div>
						</div>
					</div>
					<div class="menu-item has-sub fs-5">
						<a href="javascript:void(0);" class="menu-link">
							<div class="menu-icon"><i class="fa-solid fa-gears"></i></div>
							<div class="menu-text">ການຕັ້ງຄ່າ</div>
							<div class="menu-caret"></div>
						</a>
						<div class="menu-submenu fs-14px">
							<div class="menu-item has-sub fs-14px">
								<a href="javascript:;" class="menu-link">
									<div class="menu-text">ສະຕ໋ອກສິນຄ້າ</div>
									<div class="menu-caret"></div>
								</a>
								<div class="menu-submenu">
									<div class="menu-item">
										<router-link to="/product" class="menu-link">
										   <div class="menu-text">ສິນຄ້າ</div></router-link></div>
									<div class="menu-item">
										<router-link to="/set_product" class="menu-link">
										   <div class="menu-text">ເຊັດສິນຄ້າ</div></router-link></div>
								</div>
							</div>
							<div class="menu-item">
								<router-link to="/staff" class="menu-link"><div class="menu-text">ພະນັກງານ</div></router-link>
							</div>
							<div class="menu-item">
								<router-link to="/customer" class="menu-link"><div class="menu-text">ລູກຄ້າ</div></router-link>
							</div>
						</div>
					</div>
					
					<!-- BEGIN minify-button -->
					<div class="menu-item d-flex">
						<a href="javascript:;" class="app-sidebar-minify-btn ms-auto d-flex align-items-center text-decoration-none" data-toggle="app-sidebar-minify"><i class="fa fa-angle-double-left"></i></a>
					</div>
					<!-- END minify-button -->
				</div>
				<!-- END menu -->
			</div>
			<!-- END scrollbar -->
		</div>
		<div class="app-sidebar-bg" data-bs-theme="dark"></div>
		<div class="app-sidebar-mobile-backdrop"><a href="#" data-dismiss="app-sidebar-mobile" class="stretched-link"></a></div>
		<!-- END #sidebar -->
		
</template>
<script>
export default {

}
</script>
<style lang="">

</style>