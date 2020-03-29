const IndexedArray = new Proxy(Array, {
  construct(target, [args]) {
    const index = {};
    args.forEach(item => (index[item.id] = item));

    return new Proxy(new target(...args), {
      get(arr, prop) {
        switch (prop) {
          case "push":
            return item => {
              index[item.id] = item;
              arr[prop].call(arr, item);
            };
          case "findById":
            return id => index[id];
          default:
            return arr[prop];
        }
      }
    });
  }
});

const users = new IndexedArray([
  { id: 1, name: "Gordey", job: "Frontend", age: 18 },
  { id: 2, name: "Vladislav", job: "Fullstack", age: 27 },
  { id: 3, name: "Anton", job: "Backend", age: 22 },
  { id: 4, name: "Helen", job: "Student", age: 20 }
]);
