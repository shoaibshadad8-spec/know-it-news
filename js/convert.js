document.addEventListener("DOMContentLoaded", function () {
    const fromCurrency = document.querySelector("#from-currency");
    const toCurrency = document.querySelector("#to-currency");
    const amountInput = document.querySelector("#amount");
    const resultText = document.querySelector("#result-text");
    const loadingSpinner = document.querySelector("#loading-spinner");
    const swapBtn = document.querySelector("#swap-currencies");

    const apiKey = "7ad3e55738f214282749ac16"; // مفتاح ExchangeRate-API الخاص بك

    // دالة التحويل الرئيسية
    async function convertCurrency() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = parseFloat(amountInput.value);

        if (isNaN(amount) || amount <= 0) {
            resultText.innerText = "برجاء أدخل مبلغ صحيح";
            return;
        }

        // إظهار المؤشر
        loadingSpinner.classList.remove("d-none");

        try {
            const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) throw new Error("فشل الوصول إلى خادم أسعار العملات");

            const data = await response.json();
            const rate = data.conversion_rates[to];

            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                resultText.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
            } else {
                resultText.innerText = "العملة غير متوفرة حالياً";
            }
        } catch (error) {
            console.error("Error converting currency:", error);
            resultText.innerText = "حدث خطأ أثناء جلب أسعار العملات";
        } finally {
            loadingSpinner.classList.add("d-none");
        }
    }

    swapBtn.addEventListener("click", function () {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        convertCurrency();
    });

    amountInput.addEventListener("input", convertCurrency);
    fromCurrency.addEventListener("change", convertCurrency);
    toCurrency.addEventListener("change", convertCurrency);

    convertCurrency();
});