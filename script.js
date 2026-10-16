const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const swapBtn = document.getElementById("swapBtn");

translateBtn.addEventListener("click", translateText);

copyBtn.addEventListener("click", () => {

    const output =
        document.getElementById("outputText");

    navigator.clipboard.writeText(output.value);

    alert("Translation copied!");
});

swapBtn.addEventListener("click", () => {

    const source =
        document.getElementById("sourceLang");

    const target =
        document.getElementById("targetLang");

    let temp = source.value;
    source.value = target.value;
    target.value = temp;
});

async function translateText() {

    const input =
        document.getElementById("inputText").value;

    const source =
        document.getElementById("sourceLang").value;

    const target =
        document.getElementById("targetLang").value;

    const output =
        document.getElementById("outputText");

    if(input.trim() === ""){
        alert("Please enter text");
        return;
    }

    output.value = "Translating...";

    try {

        const response = await fetch(
            "https://libretranslate.de/translate",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify({
                    q: input,
                    source: source,
                    target: target,
                    format: "text"
                })
            }
        );

        const data = await response.json();

        output.value =
            data.translatedText;

    } catch(error) {

        console.error(error);

        output.value =
        "Unable to translate. Please try again.";

    }
}