<script setup>
import { ref, onMounted } from "vue";

const currencies = ref([
  { code: "USD", text: "American Dollar" },
  { code: "EUR", text: "Euro" },
  { code: "GBP", text: "Pound" },
]);

const cryptoCoins = ref([]);

onMounted(() => {
  const url =
    "https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD";
  fetch(url)
    .then((response) => response.json())
    .then(({ Data }) => {
      //destructoring for access to the Data Object
      cryptoCoins.value = Data.LIST;
      console.log(cryptoCoins.value);
    });
});
</script>

<template>
  <div class="container">
    <h1 class="title"><span>Cryptocurrency</span> Quoter System</h1>
  </div>

  <div class="content">
    <form class="form">
      <div class="field">
        <label for="currency">Currency:</label>
        <select id="currency">
          <option value="">-- Select --</option>

          <option v-for="currency in currencies" :value="currency.code">
            {{ currency.text }}
          </option>
        </select>
      </div>

      <div class="field">
        <label for="cryptoCoin">Crypto:</label>
        <select id="cryptoCoin">
          <option value="">-- Select --</option>

          <option v-for="cryptoCoin in cryptoCoins" :value="cryptoCoin.SYMBOL">
            {{ cryptoCoin.NAME }}
          </option>
        </select>
      </div>

      <input type="submit" value="Quote Crypto" />
    </form>
  </div>
</template>

<style scoped></style>
