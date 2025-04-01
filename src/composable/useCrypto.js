import {computed, onMounted, ref} from "vue";

export default function useCryptoCurrency() {

    const cryptocurrencies = ref([]);
    const currencies = ref([
        {code: "USD", text: "American Dollar"},
        {code: "EUR", text: "Euro"},
        {code: "GBP", text: "Pound"},
    ]);
    const quotation = ref({});
    const loading = ref(false);

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

    const getCryptoQuotation = async (quote) => {
        loading.value = true;
        quotation.value = {};
        try {
            const {currency, cryptocurrency} = quote;
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}&sign=true`;
            const response = await fetch(url);
            const data = await response.json();

            quotation.value = data.DISPLAY[cryptocurrency][currency];
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false;
        }
    };


    const showResult = computed(() => {
        return Object.values(quotation.value).length > 0;
    });


    return {
        currencies,
        cryptocurrencies,
        quotation,
        loading,
        getCryptoQuotation,
        showResult
    }
}