(() => {

    const settings = {
        API_URL: "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json",
        JQUERY_URL: "https://code.jquery.com/jquery-3.6.0.min.js",
        STORAGE_KEYS: {
            PRODUCTS: "products",
            FAVORITES: "favorites"
        },
        SAMPLE_PRODUCT: {
            name: "Siyah Bisiklet Yaka Düz Kısa Kollu Kadın Bodycon Elbise",
            price: "299.99",
            description: "Ana Kumaş: %3 ELASTAN %35 VİSKOZ %62 Polyester",
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["White", "Blue", "Black"],
            image: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20221/5593210/v1/l_20221-s26331z8-cvl_a.jpg",
        }
    };

    const init = () => {
        buildHTML();
        buildCSS();
        /*
        setEvents();
        */
        fetchProducts();
    };

 
    const buildHTML = () => {
        const productDetailHTML = `
            <div class="product-detail">
                ${buildProductDetailHTML()}
            </div>
        `;
        $('body').append(productDetailHTML);
    };

    const buildProductDetailHTML = () => {
        const { name, price, description, sizes, colors, image } = settings.SAMPLE_PRODUCT;
        
        return `
            <div class="main-image">
                <img src="${image}" alt="${name}">
            </div>
            <div class="product-info">
                <h1 class="product-title">${name}</h1>
                <div class="product-price">${price} TL</div>
                <p class="product-description">${description}</p>
                
                <div class="product-options">
                    <div class="size-selector">
                        <label>Size</label>
                        <div class="size-options">
                            ${sizes.map(size => `
                                <button class="size-btn">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="color-selector">
                        <label>Color</label>
                        <div class="color-options">
                            ${colors.map(color => `
                                <button class="color-btn" style="background-color: ${color.toLowerCase()}" 
                                        title="${color}"></button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="add-to-cart">
                    <div class="quantity">
                        <button class="qty-decrease">-</button>
                        <input type="number" value="1" min="1" max="10">
                        <button class="qty-increase">+</button>
                    </div>
                    <button class="add-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;
    };

    
    const buildCSS = () => {
        const css = `
            .body {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                font-family: 'Helvetica Neue', Arial, sans-serif;
            }

            /* Product Detail Styles */
            .product-detail {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
                margin-bottom: 60px;
            }


            .main-image {
                margin-bottom: 20px;
                border-radius: 8px;
                overflow: hidden;
                position: relative;
            }

            .main-image img {
                width: 100%;
                max-width: 70%;
                max-height: 70%;
                height: auto;
                display: block;
            }

            .product-info {
                padding: 20px;
            }

            .product-title {
                font-size: 24px;
                margin: 0 0 15px;
                color: #333;
            }

            .product-price {
                font-size: 28px;
                font-weight: bold;
                color: #0066cc;
                margin-bottom: 20px;
            }

            .product-description {
                font-size: 1rem;
                color: #666;
                line-height: 1.6;
                margin-bottom: 30px;
            }

            .product-options {
                margin-bottom: 30px;
            }

            .size-selector,
            .color-selector {
                margin-bottom: 20px;
            }

            .size-selector label,
            .color-selector label {
                display: block;
                margin-bottom: 10px;
                font-weight: 500;
            }

            .size-options {
                display: flex;
                gap: 10px;
            }

            .size-btn {
                padding: 10px 20px;
                border: 1px solid #ddd;
                background: white;
                cursor: pointer;
                transition: all 0.3s;
            }

            .size-btn:hover,
            .size-btn.active {
                border-color: #0066cc;
                color: #0066cc;
            }

            .color-options {
                display: flex;
                gap: 10px;
            }

            .color-btn {
                width: 30px;
                height: 30px;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                transition: transform 0.3s;
            }

            .color-btn:hover {
                transform: scale(1.1);
            }

            .add-to-cart {
                display: flex;
                gap: 20px;
            }

            .quantity {
                display: flex;
                align-items: center;
                border: 1px solid #ddd;
                border-radius: 4px;
            }

            .quantity button {
                padding: 10px 15px;
                border: none;
                background: none;
                cursor: pointer;
            }

            .quantity input {
                width: 50px;
                text-align: center;
                border: none;
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
            }

            .add-cart-btn {
                flex: 1;
                padding: 15px 30px;
                background: #0066cc;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background 0.3s;
            }

            .add-cart-btn:hover {
                background: #0052a3;
            }
        `;

        $('<style>').addClass('lcw-carousel-style').html(css).appendTo('head');
    };

    /*

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
                    console.log("Products fetched from API:", data);
                    localStorage.setItem(settings.STORAGE_KEYS.PRODUCTS, JSON.stringify(data));
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
    });
})();