new Vue({
    el: '#app',
    data: {
        products: [
            {
                "id": 1,
                "name": "Intelligent Granite Table",
                "category": "Tools",
                "price": "787.00"
            },
            {
                "id": 2,
                "name": "Handcrafted Rubber Hat",
                "category": "Games",
                "price": "232.00"
            },
            {
                "id": 3,
                "name": "Rustic Concrete Salad",
                "category": "Jewelery",
                "price": "115.00"
            },
            {
                "id": 4,
                "name": "Gorgeous Concrete Pizza",
                "category": "Garden",
                "price": "250.00"
            },
            {
                "id": 5,
                "name": "Refined Plastic Shoes",
                "category": "Health",
                "price": "844.00"
            },
            {
                "id": 6,
                "name": "Awesome Metal Soap",
                "category": "Tools",
                "price": "326.00"
            },
            {
                "id": 7,
                "name": "Intelligent Fresh Mouse",
                "category": "Home",
                "price": "783.00"
            },
            {
                "id": 8,
                "name": "Licensed Soft Keyboard",
                "category": "Music",
                "price": "361.00"
            },
            {
                "id": 9,
                "name": "Fantastic Rubber Pants",
                "category": "Garden",
                "price": "786.00"
            },
            {
                "id": 10,
                "name": "Awesome Rubber Ball",
                "category": "Automotive",
                "price": "696.00"
            },
            {
                "id": 11,
                "name": "Handcrafted Soft Pizza",
                "category": "Health",
                "price": "31.00"
            },
            {
                "id": 12,
                "name": "Practical Soft Chips",
                "category": "Computers",
                "price": "795.00"
            },
            {
                "id": 13,
                "name": "Practical Frozen Shirt",
                "category": "Kids",
                "price": "879.00"
            },
            {
                "id": 14,
                "name": "Unbranded Plastic Car",
                "category": "Toys",
                "price": "454.00"
            },
            {
                "id": 15,
                "name": "Handcrafted Plastic Table",
                "category": "Shoes",
                "price": "189.00"
            },
            {
                "id": 16,
                "name": "Intelligent Plastic Car",
                "category": "Grocery",
                "price": "202.00"
            },
            {
                "id": 17,
                "name": "Ergonomic Wooden Pizza",
                "category": "Electronics",
                "price": "801.00"
            },
            {
                "id": 18,
                "name": "Refined Rubber Pants",
                "category": "Home",
                "price": "580.00"
            },
            {
                "id": 19,
                "name": "Small Frozen Hat",
                "category": "Music",
                "price": "654.00"
            },
            {
                "id": 20,
                "name": "Unbranded Cotton Chips",
                "category": "Tools",
                "price": "305.00"
            },
            {
                "id": 21,
                "name": "Unbranded Plastic Chicken",
                "category": "Baby",
                "price": "943.00"
            },
            {
                "id": 22,
                "name": "Rustic Fresh Pizza",
                "category": "Toys",
                "price": "647.00"
            },
            {
                "id": 23,
                "name": "Ergonomic Metal Tuna",
                "category": "Industrial",
                "price": "51.00"
            },
            {
                "id": 24,
                "name": "Unbranded Frozen Chicken",
                "category": "Movies",
                "price": "248.00"
            },
            {
                "id": 25,
                "name": "Ergonomic Cotton Table",
                "category": "Baby",
                "price": "4.00"
            },
            {
                "id": 26,
                "name": "Handmade Frozen Pants",
                "category": "Home",
                "price": "731.00"
            },
            {
                "id": 27,
                "name": "Rustic Cotton Bike",
                "category": "Jewelery",
                "price": "161.00"
            },
            {
                "id": 28,
                "name": "Licensed Metal Bacon",
                "category": "Books",
                "price": "331.00"
            },
            {
                "id": 29,
                "name": "Practical Cotton Soap",
                "category": "Books",
                "price": "861.00"
            },
            {
                "id": 30,
                "name": "Sleek Frozen Tuna",
                "category": "Electronics",
                "price": "375.00"
            }
        ],
        //Hold order direction
        order: {
            //Represents ascending order
            direction: 1,

            column: 'price'
        },
        filters: {
            //Which column to search by
            name: '',
        },
        perPage: 7,
        currentPage: 1,

        //Add new form data
        product: {
            id: null,
            name: '',
            category: '',
            price: ''
        }
    },
    computed: {
        productsPaginated() {
            let start = (this.currentPage - 1) * this.perPage;
            let end = this.currentPage * this.perPage;
            return this.productsSorted.slice(start, end);
        },
        productsSorted() {
            return this.productsFiltered.sort((product1, product2) =>
                //Change sort type from asc-desc & vice versa
            {
                //Retrieve data from any of the products table columns [name, price, category]
                let left = product1[this.order.column], right = product2[this.order.column];
                if (isNaN(left) && isNaN(right)) {
                    if (left < right) {
                        return -1 * (this.order.direction)
                    } else if (left > right) {
                        return (this.order.direction)
                    } else {
                        return 0;
                    }
                } else {
                    return (left - right) * this.order.direction
                }

            });
        },
        sortType() {
            return this.order.direction === 1 ? 'ascending' : 'descending';
        },
        whenSearching() {
            return this.filters.name.length > 0;
        },
        productsFiltered() {
            let products = this.products;

            if (this.filters.name) {
                let findName = new RegExp(this.filters.name, 'i');
                products = products.filter(product => product.name.match(findName))
            }
            return products;
        },
        isFirstPage() {
            return this.currentPage === 1;
        },
        isLastPage() {
            return this.currentPage >= this.pages;
        },
        pages() {
            return Math.ceil(this.productsFiltered.length / this.perPage);
        }
    },
    methods: {
        save() {
            if(this.product.name && this.product.category && this.product.price){
                this.product.id = this.products.length + 1

                //Add new product to product array
                this.products.unshift(this.product);

                //reset the product object for next item
                this.product = {
                    id: null,
                    name: '',
                    category: '',
                    price: ''
                }
                $(this.$refs.vuemodal).modal('hide');
            }else{
                alert('Please fill out all form fields');
            }
        },
        prev() {
            if (!this.isFirstPage) {
                this.currentPage--;
            }
        },
        next() {
            if (!this.isLastPage) {
                this.currentPage++;
            }
        },
        sort(column) {
            //Which column to sort
            this.order.column = column;
            this.order.direction *= -1;
        },
        classes(column) {
            return [
                'sort-control',
                column === this.order.column ? this.sortType : '',
            ]
        },
        clearSearch() {
            this.filters.name = '';
        },
        switchPage(page) {
            //For pagination/page click event
            this.currentPage = page;
        },
    },
});
