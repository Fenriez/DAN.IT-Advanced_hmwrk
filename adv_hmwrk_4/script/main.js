class Table {
    constructor(size) {
        this.size = size;
    };

    createTable() {
        this.table = document.createElement('table');
        document.body.appendChild(this.table);

        for (let i = 0; i < this.size; i++) {
            let tr = document.createElement('tr');
            this.table.appendChild(tr);
            for (let j = 0; j < this.size; j++) {
                let td = document.createElement('td');
                td.classList.add("no-white");
                tr.appendChild(td);
            };
        };
    };

    addCellEvent() {
        this.table.addEventListener('click', (event) => {
            if (event.target == this.table) {
                return;
            } else {
                event.target.classList.toggle("no-white");
            };
        });
    };

    addMainEvent() {
        document.body.addEventListener('click', (event) => {
            if (event.target != document.body) {
                return;
            } else {
                this.table.classList.toggle("invert");
            };
        });
    };
};


let new_table = new Table(30);
new_table.createTable();
new_table.addCellEvent();
new_table.addMainEvent();