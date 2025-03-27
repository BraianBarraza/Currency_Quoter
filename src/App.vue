<script setup>
import {ref, reactive, onMounted} from "vue";
import Alert from "./components/Alert.vue";

const currencies = ref([
  {code: "USD", text: "American Dollar"},
  {code: "EUR", text: "Euro"},
  {code: "GBP", text: "Pound"},
]);
const error = ref('')

const cryptocurrencies = ref([]);
const quotation = reactive({
  currency: '',
  cryptocurrency: ''
})


onMounted(() => {
  const url =
      "https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD";
  fetch(url)
      .then((response) => response.json())
      .then(({Data}) => {
        //destructuring for access to the Data Object
        cryptocurrencies.value = Data.LIST;
      });
});

const quoteCrypto = () => {

  if (Object.values(quotation).includes('')) {
    error.value = 'All fields must be filled'
    return
  }
  error.value = ''
  getCryptoQuotation()
}

const getCryptoQuotation = async () => {
  const {currency, cryptocurrency} = quotation
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}&sign=true`
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()

  console.log(data.DISPLAY[cryptocurrency])
}
</script>

<template>
  <div class="container">
    <h1 class="title"><span>Cryptocurrency</span> Quoter System</h1>

    <div class="content">
      <Alert v-if="error"
      >
        {{ error }}

      </Alert>
      <form class="form"
            @submit.prevent="quoteCrypto">
        <div class="field">
          <label for="currency">Currency:</label>
          <select id="currency"
                  v-model="quotation.currency">
            <option value="">-- Select --</option>

            <option v-for="currency in currencies" :value="currency.code">
              {{ currency.text }}
            </option>
          </select>
        </div>

        <div class="field">
          <label for="cryptocurrency">Crypto:</label>
          <select id="cryptocurrency"
                  v-model="quotation.cryptocurrency">
            <option value="">-- Select --</option>

            <option v-for="cryptocurrency in cryptocurrencies" :value="cryptocurrency.SYMBOL">
              {{ cryptocurrency.NAME }}
            </option>
          </select>
        </div>

        <input type="submit" value="Quote Crypto"/>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
