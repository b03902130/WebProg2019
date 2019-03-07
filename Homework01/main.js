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
    
    this.sortMode = "Time";
    this.modes = ["Time", "TimeInv", "Lexico", "LexicoInv"];

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
            keys = keys.filter(key => this.items[key].text.innerHTML.match(todo_input.value) !== null);
        }
        if (this.sortMode.match("Lexico") !== null) {
            keys = keys.sort((a, b) => {
                a = this.items[a].text.innerHTML;
                b = this.items[b].text.innerHTML;
                if (a < b) { return this.sortMode === "Lexico" ? 1 : -1; }
                else if (a > b) { return this.sortMode === "Lexico" ? -1 : 1; }
                return 0;
            });
        }
        if (this.sortMode === "TimeInv") { keys = keys.reverse(); }
        let nodes = keys.map(key => this.items[key].domNode);

        // render DOM list node
        todo_list.innerHTML = "";
        nodes.forEach((node) => { todo_list.prepend(node) });

        // render left active
        todo_footer.children[0].textContent = this.left.toString() + " left";
    }

    this.idcounter = 0;
    this.createNewNode = (text) => {
        let li = document.createElement("li");
        li.setAttribute("class", "todo-app__item")

        let checkbox = document.createElement("div");
        checkbox.setAttribute("class", "todo-app__checkbox")

        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", this.idcounter.toString());
        input.addEventListener("click", (e) => { this.click(e.target.id); });

        let label = document.createElement("label");
        label.setAttribute("for", this.idcounter.toString());

        let detail = document.createElement("h1");
        detail.setAttribute("class", "todo-app__item-detail");
        detail.innerHTML = text;

        let img = document.createElement("img");
        img.setAttribute("id", this.idcounter.toString());
        img.setAttribute("src", "./img/x.png");
        img.setAttribute("class", "todo-app__item-x");
        img.addEventListener("click", (e) => { this.remove([e.target.id]); });

        checkbox.appendChild(input);
        checkbox.appendChild(label);
        li.appendChild(checkbox);
        li.appendChild(detail);
        li.appendChild(img);

        let id = this.idcounter;
        this.idcounter += 1;
        return [id, li, detail];
    }
    this.push = (text) => {
        let [id, newNode, detail] = this.createNewNode(text);
        this.items[id.toString()] = {
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
        let checkbox = item.domNode.children[0].children[0];
        let detail = item.domNode.children[1];
        if (checkbox.checked) {
            detail.style.opacity = 0.5;
            detail.style.textDecoration = "line-through";
            this.left -= 1;
            item.completed = true;
        }
        else {
            detail.style.opacity = 1;
            detail.style.textDecoration = "none";
            this.left += 1;
            item.completed = false;
        }
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
    search.style.borderColor = list.searchMode ? "transparent" : "rgb(2, 160, 2)";
    list.searchMode = !list.searchMode;
    list.render();
});

// handle sorting mode toggle
sort.addEventListener("click", (e) => {
    let new_mode = list.modes[(list.modes.indexOf(list.sortMode) + 1) % list.modes.length];
    list.sortMode = new_mode;
    sort.innerHTML = "Sort / " + new_mode;
    list.render();
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
