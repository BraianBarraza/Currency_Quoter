<script setup>
defineProps({
  quotation:{
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="result-container">
    <h2>Quotation</h2>

    <div class="result">
      <img
          :src="'https://www.cryptocompare.com/' + quotation.IMAGEURL"
          :alt="'Image Crypto' + quotation.NAME"
      />
      <div>
        <p>
          Actual Price: <span>{{ quotation.PRICE }}</span>
        </p>
        <p>
          Highest price of the day: <span>{{ quotation.HIGHDAY }}</span>
        </p>
        <p>
          Lowest price of the day: <span>{{ quotation.LOWDAY }}</span>
        </p>
        <p>
          Last 24 hours variation:
          <span>{{ quotation.CHANGEPCTHOUR }} %</span>
        </p>
        <p>
          Last actualization: <span>{{ quotation.LASTUPDATE }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>