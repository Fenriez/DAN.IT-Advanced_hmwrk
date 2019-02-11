function Hamburger(size, stuffing) {
    try {
        if (!size || !stuffing) {
            throw new HamburgerException("One of two arguments is missing");
        } else if (size.type != "size" || !size.type) {
            throw new HamburgerException(`Invalid size: ${size.name}`);
        } else if (stuffing.type != "stuffing" || !stuffing.type) {
            throw new HamburgerException(`Invalid size: ${stuffing.name}`);
        };
    } catch (err) {
        if (err instanceof HamburgerException) {
            console.log(err.message);
        };
        return "Error";
    };
    this.size = size;
    this.stuffing = stuffing;
    this.topping = [];
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

/**
* Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* 
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании
*/
Hamburger.prototype.addTopping = function (topping) {
    try {
        if (!this.topping.includes(topping)) {
            this.topping.push(topping);
        } else {
            throw new HamburgerException(`Topping ${topping.name} has been already added`);
        };
    } catch (err) {
        if (err instanceof HamburgerException) {
            console.log(err.message);
        };
    };
};

/**
 * Убрать добавку, при условии, что она ранее была 
 * добавлена.
 * 
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
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

/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
    return this.topping;
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    try {
        if (!this.size) {
            throw new HamburgerException("Size argument is missing");
        } else if (this.size.type != "size" || !this.size.type) {
            throw new HamburgerException(`Invalid size: ${this.size.name}`);
        };
    } catch (err) {
        if (err instanceof HamburgerException) {
            console.log(err.message);
        };
        return "Error";
    };
    return this.size;
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    try {
        if (!this.stuffing) {
            throw new HamburgerException("Stuffing argument is missing");
        } else if (this.stuffing.type != "stuffing" || !this.stuffing.type) {
            throw new HamburgerException(`Invalid stuffing: ${this.stuffing.name}`);
        };
    } catch (err) {
        if (err instanceof HamburgerException) {
            console.log(err.message);
        };
        return "Error";
    };
    let stuffing = this.stuffing.name;
    for (elem of this.topping) {
        stuffing = stuffing + ", " + elem.name;
    };
    return stuffing;
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    let price = this.size.price + this.stuffing.price;
    for (elem of this.topping) {
        price += elem.price;
    };
    return price;
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    try {
        let calories = this.size.calories + this.stuffing.calories;
        if (calories != undefined) {
            for (elem of this.topping) {
                calories += elem.calories;
            };
            return calories;
        } else {
            throw new HamburgerException("Invalid calories value");
        }
    } catch (err) {
        if (err instanceof HamburgerException) {
            console.log(err.message);
        };
        return "Error";
    };
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * @constructor 
 */



function HamburgerException(message) {
    this.prototype = Error;
    this.name = "HamburgerException";
    this.message = `${this.name}: ${message}`;
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