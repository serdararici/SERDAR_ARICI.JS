(() => {

    const settings = {
        API_URL: "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json",
        JQUERY_URL: "https://code.jquery.com/jquery-3.6.0.min.js",
        STORAGE_KEYS: {
            PRODUCTS: "products",
            FAVORITES: "favorites"
        },
        SAMPLE_PRODUCT: {
            name: "Slim Fit Cotton Shirt",
            price: "299.99",
            description: "Premium quality cotton shirt with modern slim fit design",
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["White", "Blue", "Black"],
            images: [
                "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20221/5593210/v1/l_20221-s26331z8-cvl_a.jpg",
                "https://picsum.photos/600/801",
                "https://picsum.photos/600/802",
                "https://picsum.photos/600/803"
            ]
        }
    };

    const init = () => {
        /*
        buildHTML();
        buildCSS();
        setEvents();
        */
    };

    /* 
    const buildHTML = () => {
        const html = `
            <div class="container">
                <h1></h1>
            </div>
        `;

        $('.product-detail').append(html);
    };

    const buildCSS = () => {
        const css = `
            .container {
                background-color: red;
                height: 100px;
                width: 100px;
            }
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        $('').on('click', () => {
            console.log('clicked');
        });
    };

    */

    const fetchProducts = () => {
        let storedProducts = localStorage.getItem(settings.STORAGE_KEYS.PRODUCTS);

        if (storedProducts) {
            let parsedData = JSON.parse(storedProducts);
            console.log("Data came form localStorage", parsedData);
        } else {
            $.ajax({
                url: settings.API_URL,
                method: "GET",
                dataType: "json",
                success: (data) => {
                    console.log("Products fetched:", data);
                    localStorage.setItem("products", JSON.stringify(data));
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    console.error("Could not fetch product list:", textStatus, errorThrown);
                }
            });
        }
    };

    const ensureJQuery = (callback) => {
        if (window.jQuery) {
            $(document).ready(callback);
        } else {
            let script = document.createElement("script");
            script.src = settings.JQUERY_URL;
            script.onload = () => $(document).ready(callback);
            document.head.appendChild(script);
        }
    };

    ensureJQuery(() => {
        init();
        fetchProducts();
    });
})();