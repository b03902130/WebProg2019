const todo_list = document.getElementById("todo-list");
const todo_footer = document.getElementById("todo-footer");
const todo_input = document.getElementById("todo-input");

function List() {
    this.items = {};
    this.left = 0;
    this.renderMode = "All";

    this.view = {
        All: id => true,
        Active: id => !this.items[id].completed,
        Completed: id => this.items[id].completed
    };

    this.render = () => {
        let keys = Object.keys(this.items);
        keys = keys.filter(this.view[this.renderMode]);
        let nodes = keys.map(key => this.items[key].domNode);

        // render DOM list node
        todo_list.innerHTML = "";
        nodes.forEach((node) => { todo_list.appendChild(node) });

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
        img.addEventListener("click", (e) => { this.remove(e.target.id); });

        checkbox.appendChild(input);
        checkbox.appendChild(label);
        li.appendChild(checkbox);
        li.appendChild(detail);
        li.appendChild(img);

        let id = this.idcounter;
        this.idcounter += 1;
        return [id, li];
    }
    this.push = (text) => {
        let [id, newNode] = this.createNewNode(text);
        this.items[id.toString()] = {
            completed: false,
            domNode: newNode
        };
        this.left += 1;
        this.render();
    };
    this.remove = (id) => {
        if (!this.items[id].completed) {
            this.left -= 1;
        }
        delete this.items[id];
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

todo_input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 && todo_input.value !== "") {
        list.push(todo_input.value);
        todo_input.value = "";
    }
});

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
views[0].style.borderColor = "gray";

let clearCompleted = todo_footer.children[2].children[0];
clearCompleted.addEventListener("click", (e) => {
    let keys = Object.keys(list.items);
    keys = keys.filter(list.view["Completed"]);
    keys.forEach((key) => { list.remove(key) });
});
