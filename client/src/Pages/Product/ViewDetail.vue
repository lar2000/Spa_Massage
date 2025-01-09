<template>
    <div class="modal fade" id="viewModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
            <h5 class="title text-center" id="viewModalLabel">ລາຍລະອຽດ</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="align-contend-center">
            <div v-if="product" class="item item-thumbnail">
                <div v-if="product.img_path" class="item-image">
                <img :src="`http://localhost:5000/${product.img_path}`" class="img-fluid rounded shadow" alt="Product Image"/>
              </div>
              <div class="item-info">
				<h4 class="item-title">{{ product.protype_name }}: {{ product.pro_name }} <br> {{ product.size }} ml</h4>
                <p class="item-desc" :class="{ 'text-danger': product.amount < 10 }">
                stock: {{ product.amount }}
              </p>
					<div class="item-price">{{ product.price }} ກີບ</div>
				</div>
         </div>
            <div v-else class="text-center">
              <p>Loading...</p>
            </div>
          </div>
          <div class="modal-footer border-top-0 d-flex justify-content-end">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'ViewDetail',
    props: {
      product: Object
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  