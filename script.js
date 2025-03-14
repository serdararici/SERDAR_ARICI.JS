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
        setEvents();
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
                <h2 class="product-title">${name}</h2>
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

    const buildCarouselHTML = (products) => {
        const carouselHTML = `
            <div class="carousel">
                <h2 class="carousel-title">You Might Also Like</h2>
                <div class="carousel-container">
                    <button class="carousel-nav prev">❮</button>
                    <div class="carousel-track">
                        ${products.map(product => `
                            <div class="carousel-item">
                                <div class="product-card">
                                    <div class="card-image">
                                        <a href="${product.url}" target="_blank">
                                            <img src="${product.img}" alt="${product.name}">
                                        </a>
                                        <button class="favorite" data-id="${product.id}">
                                            <svg viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="card-info">
                                        <h3 class="card-title">${product.name}</h3>
                                        <div class="card-price">${product.price} TL</div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-nav next">❯</button>
                </div>
            </div>
        `;

        $('.product-detail').after(carouselHTML);
        setEvents();
    };

    
    const buildCSS = () => {
        const css = `
            body {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                background: #fdfdfd;
                font-family: 'Helvetica Neue', Arial, sans-serif;
            }

            /* Product Detail Styles */
            .product-detail {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 60px;
            min-height: 100vh; /* Ekranı tamamen doldurmak için */
        }

        .main-image {
            margin-bottom: 20px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }

        .main-image img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 8px;
            object-fit: cover;
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
            transform: scale(1.05);
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
            box-shadow: 0 0 8px rgba(0, 102, 204, 0.4);
        }

        .add-to-cart {
            display: flex;
            gap: 20px;
            justify-content: space-between; /* Flex hizalama */
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
            width: auto;
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


            /* Carousel Styles */
            .carousel {
                margin-top: 40px;
            }

            .carousel-title {
                text-align: center;
                font-size: 24px;
                margin-bottom: 30px;
                color: #333;
            }

            .carousel-container {
                position: relative;
                padding: 0 40px;
                margin: 0 auto;
                margin-bottom: 50px;
                max-width: 1200px;
                overflow: hidden;
            }

            .carousel-track {
                display: flex;
                gap: 20px;
                transition: transform 0.3s ease-in-out;
                width: 100%;
            }

            .carousel-item {
                width: 20%;
                min-width: 200px;
                max-width: 250px;
                cursor: pointer;
            }

            .product-card {
                height: 100%;
                display: flex;
                flex-direction: column;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }

            .card-image {
                position: relative;
                overflow: hidden;
            }

            .card-image img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .card-info {
                padding: 15px;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .card-title {
                font-size: 14px;
                margin: 0 0 10px;
                color: #333;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                line-height: 20px;
                max-height: 40px;
            }

            .card-price {
                font-size: 16px;
                font-weight: bold;
                color: #0066cc;
            }

            .favorite {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 32px;
                height: 32px;
                border: none;
                background: white;
                border-radius: 50%;
                cursor: pointer;
                padding: 6px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                z-index: 2;
                transition: all 0.3s ease;
            }

            .favorite:hover {
                transform: scale(1.1);
            }

            .favorite svg {
                width: 100%;
                height: 100%;
                fill: #ddd;
                transition: fill 0.3s ease;
            }

            .favorite.active svg {
                fill: #0066cc;
            }

            .card-image {
                position: relative;
                padding-top: 133%;
                overflow: hidden;
            }

            .card-image a {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .carousel-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                height: 40px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 50%;
                cursor: pointer;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .carousel-nav.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .carousel-nav:not(.disabled):hover {
                background: #0066cc;
                color: white;
                border-color: #0066cc;
            }

            .prev {
                left: 0;
            }

            .next {
                right: 0;
            }

            /*Responsive Design*/
            @media screen and (max-width: 768px) {
                .product-detail {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }

                .main-image img {
                    max-height: none;
                    height: auto;
                    object-fit: cover;
                }

                .product-title {
                    font-size: 20px;
                    background: none;
                    color: #333;
                }

                .product-price {
                    font-size: 24px;
                }

                .product-description {
                    font-size: 0.9rem;
                }

                .size-options,
                .color-options {
                    flex-direction: row;
                }

                .add-to-cart {
                    flex-direction: column;
                    gap: 10px;
                }

                .quantity input {
                    width: 100%;
                }

                .add-cart-btn {
                    width: 100%;
                }


            }

            @media screen and (min-width: 769px) and (max-width: 1024px) {
                .product-detail {
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }

                .main-image img {
                    max-height: none;
                    height: auto;
                    object-fit: cover;
                }

                .product-title {
                    font-size: 22px;
                }

                .product-price {
                    font-size: 26px;
                }

                .product-description {
                    font-size: 1rem;
                }
}


        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const fetchProducts = () => {
        let storedProducts = localStorage.getItem(settings.STORAGE_KEYS.PRODUCTS);

        if (storedProducts) {
            let products = JSON.parse(storedProducts);
            console.log("Data came form localStorage", products);
            buildCarouselHTML(products);
        } else {
            $.ajax({
                url: settings.API_URL,
                method: "GET",
                dataType: "json",
                success: (data) => {
                    console.log("Products fetched from API:", data);
                    localStorage.setItem(settings.STORAGE_KEYS.PRODUCTS, JSON.stringify(data));
                    buildCarouselHTML(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    console.error("Could not fetch product list:", textStatus, errorThrown);
                }
            });
        }
    };

    const handleCarouselEvents = () => {
        let currentIndex = 0;
        const $track = $('.carousel-track');
        const $items = $('.carousel-item');
        const $prev = $('.prev');
        const $next = $('.next');

        $('.carousel-item').on('click', function(e) {
            if (!$(e.target).closest('.favorite').length) {
                const url = $(this).find('a').attr('href');
                if (url) {
                    window.open(url, '_blank');
                }
            }
        });

        const updateCarousel = () => {
            const containerWidth = $('.carousel-container').width();
            let itemsPerView;
            
            if (containerWidth >= 1200) itemsPerView = 6;
            else if (containerWidth >= 992) itemsPerView = 5;
            else if (containerWidth >= 768) itemsPerView = 4;
            else if (containerWidth >= 576) itemsPerView = 3;
            else itemsPerView = 2;

            const totalSlides = Math.ceil($items.length / itemsPerView);
            const itemWidth = containerWidth / itemsPerView;
            
            const translateX = currentIndex * (itemWidth * itemsPerView);
            $track.css('transform', `translateX(-${translateX}px)`);

            $prev.toggleClass('disabled', currentIndex <= 0);
            $next.toggleClass('disabled', currentIndex >= totalSlides - 1);
        };

        $next.on('click', () => {
            if (!$next.hasClass('disabled')) {
                currentIndex++;
                updateCarousel();
            }
        });

        $prev.on('click', () => {
            if (!$prev.hasClass('disabled')) {
                currentIndex--;
                updateCarousel();
            }
        });


        // Resets the carousel to the first item and updates it after a 250ms debounce on window resize.
        $(window).on('resize', debounce(() => {
            currentIndex = 0;
            updateCarousel();
        }, 250));

        updateCarousel();
    };


    const handleFavoriteEvents = () => {
        const favorites = new Set(JSON.parse(localStorage.getItem(settings.STORAGE_KEYS.FAVORITES) || '[]'));

        $('.favorite').each(function() {
            const productId = $(this).data('id');
            if (favorites.has(productId)) {
                $(this).addClass('active');
            }
        });

        $('.favorite').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const $btn = $(this);
            const productId = $btn.data('id');

            if (favorites.has(productId)) {
                favorites.delete(productId);
                $btn.removeClass('active');
            } else {
                favorites.add(productId);
                $btn.addClass('active');
            }

            localStorage.setItem(settings.STORAGE_KEYS.FAVORITES, JSON.stringify([...favorites]));
        });
    };

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const setEvents = () => {
        handleCarouselEvents();
        handleFavoriteEvents();
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