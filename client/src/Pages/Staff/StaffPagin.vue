<template>
    <div class="row mt-2 justify-content-between">
    <div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto ms-auto">
      <div class="dt-info" aria-live="polite" role="status">
        Showing {{ start }} to {{ end }} of {{ total }} entries
      </div>
      <div class="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-2">
        <nav aria-label="pagination">
          <ul class="pagination">
            <li class="dt-paging-button page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link first" @click="goToPage(1)" :disabled="currentPage === 1" aria-label="First">«</button>
            </li>
            <li class="dt-paging-button page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link previous" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" aria-label="Previous">‹</button>
            </li>
            <li v-for="page in totalPages" :key="page" class="dt-paging-button page-item" :class="{ active: currentPage === page }">
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="dt-paging-button page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link next" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" aria-label="Next">›</button>
            </li>
            <li class="dt-paging-button page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link last" @click="goToPage(totalPages)" :disabled="currentPage === totalPages" aria-label="Last">»</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
</div>
</template>
  
  <script>
  export default {
    props: {
      total: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
      itemsPerPage: {
        type: Number,
        required: true,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.itemsPerPage);
      },
      start() {
        return (this.currentPage - 1) * this.itemsPerPage + 1;
      },
      end() {
        return Math.min(this.currentPage * this.itemsPerPage, this.total);
      },
    },
    methods: {
      goToPage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.$emit('page-changed', page);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any styles for pagination here */
  </style>