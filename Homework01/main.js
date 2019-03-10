const todo_list = document.getElementById("todo-list");
const todo_footer = document.getElementById("todo-footer");
const todo_input = document.getElementById("todo-input");
const search = document.getElementById("search");
const clear = document.getElementById("clear");
const sort = document.getElementById("sort");

function List() {
    this.items = {};
    this.left = 0;
    this.searchMode = false;

    this.sortMode = "Latest";
    this.modes = ["Latest", "Oldest", "a - Z", "Z - a"];

    this.renderMode = "All";
    this.view = {
        All: id => true,
        Active: id => !this.items[id].completed,
        Completed: id => this.items[id].completed
    };

    this.render = () => {
        let keys = Object.keys(this.items);
        keys = keys.filter(this.view[this.renderMode]);
        if (this.searchMode) {
            keys = keys.filter(key => this.items[key].text.value.toUpperCase().match(todo_input.value.toUpperCase()) !== null);
        }

        keys_pinned = keys.filter(key => this.items[key].pinned);
        keys_normal = keys.filter(key => !this.items[key].pinned);

        todo_list.innerHTML = "";
        [keys_normal, keys_pinned].forEach((keys) => {
            if (this.sortMode.match("-") !== null) {
                keys = keys.sort((a, b) => {
                    a = this.items[a].text.value;
                    b = this.items[b].text.value;
                    let result = a.localeCompare(b, 'en', {sensitivity: 'case'})
                    return this.sortMode === "a - Z" ? -result : result;
                });
            }
            if (this.sortMode === "Oldest") { keys = keys.reverse(); }
            let nodes = keys.map(key => this.items[key].domNode);

            // render DOM list node
            nodes.forEach((node) => { todo_list.prepend(node) });
        });

        // render left active
        todo_footer.children[0].textContent = this.left.toString() + " left";
    }

    this.idcounter = 0;
    this.createNewNode = (text) => {
        let li = document.createElement("li");
        li.setAttribute("class", "todo-app__item")

        let checkbox = document.createElement("div");
        checkbox.setAttribute("class", "todo-app__checkbox");

        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", this.idcounter.toString());
        input.addEventListener("click", (e) => { this.click(e.target.id); });

        let label = document.createElement("label");
        label.setAttribute("for", this.idcounter.toString());

        let detail = document.createElement("input");
        detail.value = text;
        detail.dataset["pinned"] = false;
        detail.setAttribute("type", "text");
        detail.setAttribute("class", "todo-app__item-detail");
        detail.setAttribute("readOnly", true);
        detail.addEventListener("dblclick", (e) => { e.target.readOnly = false; });
        detail.addEventListener("focusout", (e) => {
            e.target.readOnly = true;
            this.render();
        });
        detail.addEventListener("keyup", (e) => {
            if (e.keyCode === 13 || e.keyCode === 27) {
                e.target.readOnly = true;
                e.target.blur();
                this.render();
            }
        });

        let star = document.createElement("img");
        star.setAttribute("id", this.idcounter.toString());
        star.setAttribute("src", "./img/star-red.png");
        star.setAttribute("class", "todo-app__item-x");
        star.addEventListener("click", (e) => {
            let item = this.items[e.target.id];
            item.text.dataset["pinned"] = !item.pinned;
            item.pinned = !item.pinned;
            this.render();
        });
        let img = document.createElement("img");
        img.setAttribute("id", this.idcounter.toString());
        img.setAttribute("src", "./img/x.png");
        img.setAttribute("class", "todo-app__item-x");
        img.addEventListener("click", (e) => { this.remove([e.target.id]); });

        checkbox.appendChild(input);
        checkbox.appendChild(label);
        li.appendChild(checkbox);
        li.appendChild(detail);
        li.appendChild(star);
        li.appendChild(img);

        let id = this.idcounter;
        this.idcounter += 1;
        return [id, li, detail];
    }
    this.push = (text) => {
        let [id, newNode, detail] = this.createNewNode(text);
        this.items[id.toString()] = {
            pinned: false,
            completed: false,
            domNode: newNode,
            text: detail
        };
        this.left += 1;
        this.render();
    };
    this.remove = (ids) => {
        ids.forEach((id) => {
            if (!this.items[id].completed) {
                this.left -= 1;
            }
            delete this.items[id];
        });
        this.render();
    };
    this.click = (id) => {
        let item = this.items[id];
        item.completed = !item.completed;
        let shift = item.completed ? -1 : 1;
        this.left += shift;
        item.text.dataset.completed = item.completed;
        this.render();
    }
}
let list = new List();

// handle keystrokes
todo_input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 && !list.searchMode && todo_input.value !== "") {
        list.push(todo_input.value);
        todo_input.value = "";
    }
    else if (list.searchMode) {
        list.render();
    }
});

// handle search mode click
search.addEventListener("click", (e) => {
    list.searchMode = !list.searchMode;
    if (list.searchMode) {
        search.style.borderColor = "rgb(2, 160, 2)";
        search.style.backgroundColor = "rgba(2, 160, 2, 0.1)";
        todo_input.placeholder = "What do you want to search?";
    }
    else {
        search.style.borderColor = "transparent";
        search.style.backgroundColor = "transparent";
        todo_input.placeholder = "What needs to be done?";
    }
    
    list.render();
    todo_input.focus();
});

// handle sorting mode toggle
["click", "contextmenu"].forEach((event) => {
    sort.addEventListener(event, (e) => {
        e.preventDefault();
        let shift = e.type === "click" ? 1 : -1;
        let length = list.modes.length;
        let new_mode = list.modes[(list.modes.indexOf(list.sortMode) + shift + length) % length];
        list.sortMode = new_mode;
        sort.innerHTML = "Sort / " + new_mode;
        list.render();
    });
});

// handle view filter
let views = Array.prototype.slice.call(todo_footer.children[1].children);
function viewHandler(e) {
    let button = e.target;
    views.forEach((button) => { button.style.borderColor = "transparent" });
    button.style.borderColor = "gray";
    list.renderMode = button.innerHTML;
    list.render();
}
views.forEach((button) => {
    button.addEventListener("click", viewHandler);
});
// initialize view to All
views[0].style.borderColor = "gray";

// handle clear completed
clear.addEventListener("click", (e) => {
    let keys = Object.keys(list.items);
    keys = keys.filter(list.view["Completed"]);
    list.remove(keys);
});
