class Hamburger {
    constructor(size, stuffing) {        
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
    };

    set size(value) {
        try {
            if (!value) {
                throw new HamburgerException("Size argument is missing");
            } else if (value.type != "size" || !value.type) {
                throw new HamburgerException(`Invalid size: ${value.name}`);
            };
        } catch (err) {
            if (err instanceof HamburgerException) {
                console.log(err.message);
            };
            return "Error";
        };
        this._size = value;
        return;
    };

    set stuffing(value) {
        try {
            if (!value) {
                throw new HamburgerException("Stuffing argument is missing");
            } else if (value.type != "stuffing" || !value.type) {
                throw new HamburgerException(`Invalid stuffing: ${value.name}`);
            };
        } catch (err) {
            if (err instanceof HamburgerException) {
                console.log(err.message);
            };
            return "Error";
        };
        this._stuffing = value;
        return;
    };

    set topping(value) {
        try {
            if (typeof(value) != "Object" || value.type != "topping" || !value.type) {
                throw new HamburgerException(`Invalid topping value`);
            } else {
                if (!this.topping.includes(value)) {
                    this._topping.push(value);
                } else {
                    throw new HamburgerException(`Topping ${value.name} has been already added`);
                };
            };
        } catch (err) {
            if (err instanceof HamburgerException) {
                console.log(err.message);
            };
        };
    };

    get topping() {
        try {
            if (this._topping.length > 0) {
                return this._topping;
            } else {
                throw new HamburgerException("There are no toppings in your hamburger");
            }
        } catch (err) {
            if (err instanceof HamburgerException) {
                console.log(err.message);
            };
        };
    };

    get stuffing() {
        try {
            if (this._topping.length > 0) {
                return this._topping;
            } else {
                throw new HamburgerException("There are no toppings in your hamburger");
            }
        } catch (err) {
            if (err instanceof HamburgerException) {
                console.log(err.message);
            };
        };
    };

    addTopping(topping) {
        this.topping = topping;
    };

    removeTopping(topping) {
        try {
            if (this.topping.includes(topping)) {
                delete this.topping.splice(this.topping.indexOf(topping), 1);
            } else {
                throw new HamburgerException(`There is no ${topping.name} in your hamburger`);
            }
        } catch (err) {
            if (err instanceof HamburgerException) {
                console.log(err.message);
            };
        };
    };

    getToppings() {
        return this.topping;
    };

    getSize() {        
        return this.size;
    };

    getStuffing() {
        let stuffing = this.stuffing.name;
        for (elem of this.topping) {
            stuffing = stuffing + ", " + elem.name;
        };
        return stuffing;
    };

    calculatePrice() {
        let price = this.size.price + this.stuffing.price;
        for (elem of this.topping) {
            price += elem.price;
        };
        return price;
    };

    calculateCalories() {
        let calories = this.size.calories + this.stuffing.calories;
        if (calories != undefined) {
            for (elem of this.topping) {
                calories += elem.calories;
            };
            return calories;
        };
    };
};

Hamburger.SIZE_SMALL = {
    type: "size",
    name: "small",
    price: 50,
    calories: 20,
};
Hamburger.SIZE_LARGE = {
    type: "size",
    name: "small",
    price: 100,
    calories: 40,
};
Hamburger.STUFFING_CHEESE = {
    type: "stuffing",
    name: "cheese",
    price: 10,
    calories: 20,
};
Hamburger.STUFFING_SALAD = {
    type: "stuffing",
    name: "salad",
    price: 20,
    calories: 5,
};
Hamburger.STUFFING_POTATO = {
    type: "stuffing",
    name: "potato",
    price: 15,
    calories: 10,
};
Hamburger.TOPPING_MAYO = {
    type: "stuffing",
    name: "mayo",
    price: 20,
    calories: 5,
};
Hamburger.TOPPING_SPICE = {
    type: "stuffing",
    name: "spice",
    price: 15,
    calories: 0,
};

class HamburgerException extends Error {
    constructor(message) {
        super(message);
        this.name = "HamburgerException";
        this.message = `${this.name}: ${message}`;
    };
};


let hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
let hamburger2 = new Hamburger();
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.removeTopping(Hamburger.TOPPING_MAYO);
hamburger.removeTopping(Hamburger.TOPPING_MAYO);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// узнаем всю начинку
console.log("Stuffing: %s", hamburger.getStuffing());
// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// узнаем всю начинку
console.log("Stuffing: %s", hamburger.getStuffing());
// А сколько теперь стоит? 
console.log("Price with sauce: %f", hamburger.calculatePrice());
// Проверить, большой ли гамбургер? 
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length);