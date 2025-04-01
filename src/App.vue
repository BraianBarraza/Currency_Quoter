<script setup>
import {ref, reactive} from "vue";
import Alert from "./components/Alert.vue";
import Spinner from "./components/Spinner.vue";
import useCrypto from "./composable/useCrypto.js";
import Quote from "./components/Quote.vue";

const {currencies, cryptocurrencies, quotation, loading, getCryptoQuotation, showResult} = useCrypto()

const error = ref("");
const quote = reactive({
  currency: "",
  cryptocurrency: "",
});

const quoteCrypto = () => {
  if (Object.values(quote).includes("")) {
    error.value = "All fields must be filled";
    return;
  }
  error.value = "";
  getCryptoQuotation(quote);
};

</script>

<template>
  <div class="container">
    <h1 class="title"><span>Cryptocurrency</span> Quoter System</h1>

    <div class="content">
      <Alert v-if="error">
        {{ error }}
      </Alert>
      <form class="form" @submit.prevent="quoteCrypto">
        <div class="field">
          <label for="currency">Currency:</label>
          <select id="currency" v-model="quote.currency">
            <option value="">-- Select --</option>

            <option v-for="currency in currencies" :value="currency.code">
              {{ currency.text }}
            </option>
          </select>
        </div>

        <div class="field">
          <label for="cryptocurrency">Crypto:</label>
          <select id="cryptocurrency" v-model="quote.cryptocurrency">
            <option value="">-- Select --</option>

            <option
                v-for="cryptocurrency in cryptocurrencies"
                :value="cryptocurrency.SYMBOL"
            >
              {{ cryptocurrency.NAME }}
            </option>
          </select>
        </div>

        <input type="submit" value="Quote Crypto"/>
      </form>

      <Spinner v-if="loading"/>
      <Quote
          v-if="showResult"
          :quotation="quotation"
      />
      </div>
    </div>
</template>

<style scoped></style>
