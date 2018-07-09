let list = []
function Inventory() {
 this.save = function (product, index) {
  if(index > 0) {
    list.splice(index, 0, ...product.productDetails())
    return list
  }
  if(index === 0) {
    list = [...product.productDetails(), ...list]
    return list;
  }
  else if(!index) {
    list = [...list, ...product.productDetails()]
    return list
  }
 }
 this.removeAndSave = function (index,product) {
  this.removeProduct(index)
  return this.save(product, index);
 }
 this.removeProduct = function(index){
  list.splice(index, 1);
  return list
 }
}
function Product(name, amount, price) {
 this.name = name;
 this.amount = parseInt(amount);
 this.price = price;
 this.productDetails = function() {
    return [{ [`${name}`] : { amount: this.amount, price }}];
 }
  this.increase = function() {
    let newAmount = this.amount;
    this.amount = newAmount + 1;
    return this.amount;
 };
 this.decrease = function () {
   let subtractAmount = this.amount;
   this.amount = this.amount === 0 ? 0 : subtractAmount - 1;
   return this.amount;
 }
}

function createNewProduct() {
 const name = document.getElementById("input-name").value;
 const amount = document.getElementById("input-amount").value;
 const price = document.getElementById("input-price").value;
 return new Product(name, amount, price)
} 

function renderList(listRender) {
 return (function(){
     return listRender.apply(null, renderList);
 })
}
function listRender(productList) {
  if (document.querySelectorAll('product--list')) {
  let container = document.getElementById("list--container")
  let listItems = document.getElementsByClassName("product--list--display") //.forEach(e => e.parentNode.removeChild(e))
  while(listItems.length > 0 ) {
     listItems[0].remove()
  }
  }
  if(!productList) {
        let div = document.createElement('div');
        let text = document.createTextNode('Please Add a product')
        let inventory = document.getElementById('list--container')
        div.appendChild(text)
        inventory.prepend(div)
    }
 if(productList) {
 for (let index = 0; index < productList.length; index++) {
    const element = productList[index]
    const productName = Object.keys(element)[0];
    let displayDiv = document.createElement('div');
    displayDiv.setAttribute('id','product--list');
    displayDiv.classList.add('product--list--display');
    let displayName = document.createElement('div');
    let lineDiv = document.createElement('div');
    lineDiv.classList.add('line');
    let secondLineDiv = document.createElement('div');
    secondLineDiv.classList.add('nextLine');
    displayName.setAttribute('id','product--list');
    displayName.classList.add('product--list--name');
    let displayAmount = document.createElement('div');
    displayAmount.classList.add('product--list--amount');
    displayAmount.setAttribute('id','product--list')
    let displayPrice = document.createElement('div');
    displayPrice.classList.add('product--list--price');
    displayPrice.setAttribute('id','product--list')
    let addBtn = document.createElement('button');
    addBtn.setAttribute('id', `add-btn`)
    addBtn.innerHTML = `&#8634`;
    addBtn.addEventListener('click', add, false);
    let subtractBtn = document.createElement('button');
    subtractBtn.setAttribute('id', `subtract-btn`);
    subtractBtn.innerHTML = `&#8635`;
    subtractBtn.addEventListener('click', subtract, false)
    let p = document.createElement('p');
    let name = document.createTextNode(productName);
    let amount = document.createTextNode(`Current Amount: ${element[productName].amount}`)
    let price = document.createTextNode(`Price: ${element[productName].price}`)
    let inventoryDisplay = document.getElementById('list--container')
    displayName.appendChild(name)
    displayName.appendChild(lineDiv)
    displayName.appendChild(secondLineDiv)
    displayAmount.appendChild(amount);
    displayAmount.appendChild(addBtn);
    displayAmount.appendChild(subtractBtn);
    displayPrice.appendChild(price);
    displayDiv.appendChild(displayName);
    displayDiv.appendChild(displayAmount);
    displayDiv.appendChild(displayPrice);
    inventoryDisplay.appendChild(displayDiv)
    
 }
}
}
const listInit = renderList(function(array) {
    return listRender(array)
})
listInit(list)
function takeInput() {
    let newProduct = createNewProduct()
    let makeNewList = new Inventory().save(newProduct)
    return listRender(makeNewList);
  }
  function add(e) {
    let name = getTargetName(e);
    let toEdit = findInArray(name);
    let index = toEdit.location;
    let addToAmount = new Product(name, toEdit.item[name].amount, toEdit.item[name].price)
    let increasedAmount = addToAmount.increase()
    let sheetUpdate = new Inventory().removeAndSave(index, addToAmount);
    listRender(sheetUpdate)
}
function findInArray(name) {
 let location;   
 let item = list.find((product, index) => (location = index , product[name]))
 return {item, location}
}
function subtract(e) {
 let name = getTargetName(e);
 let toEdit = findInArray(name);
 let index = toEdit.location;
 let subToAmount = new Product(name, toEdit.item[name].amount, toEdit.item[name].price)
 let runSubtract = subToAmount.decrease();
 let sheetUpdate = new Inventory().removeAndSave(index, subToAmount);
 listRender(sheetUpdate)
}
function getTargetName(e) {
    console.log(e)
    return e.target.parentElement.previousSibling.innerText;
}