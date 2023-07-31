var dataManager = new ej.data.DataManager({ json: data, adaptor: new ej.data.JsonAdaptor, enablePersistence: true, id: 'id', ignoreOnPersist: ["onSortBy", "onSearch"] });

var query = new ej.data.Query();
var sortAndFilterQuery = new ej.data.Query();
var grid;
var pieChart;

const homeColumns = [
    { type: 'checkbox', allowFiltering: false, allowSorting: false, width: '60' },
    { field: 'ProductID', headerText: 'Product ID', width: '50', textAlign: 'Center', isPrimaryKey: true, template: '#template', },
    { field: 'ProductName', headerText: 'Product Name', width: '80' },
    { field: 'Description', headerText: 'Description', width: '100' },
    { field: 'Price', headerText: 'Price', format: 'C2', width: '150' },
];

const wishColumns = homeColumns.filter(column => column.type !== 'checkbox');

//Function to render grid and chart by passing required datasource as argument.
function renderGridAndChart(columns, dataSource) {
    if (grid && pieChart){
        grid.destroy();
        pieChart.destroy();
    }
    grid = new ej.grids.Grid({
        dataSource: dataSource,
        allowPaging: true,
        pageSettings: {pageSize: 10},
        selectionSettings: { persistSelection: true },
        columns: columns,
    })
    grid.appendTo('#Grid');

    pieChart = new ej.charts.AccumulationChart({
        dataSource: dataSource,
        id: "pie-chart",
        legendSettings: { visible: false },
        enableAnimation: true,
        title: "Customer Review statistics",
        enableSmartLabels: true,
        enableBorderOnMouseMove: false,
        series: [{
        xName: "ProductName",
        yName: "customerReviews",
        startAngle: 0,
        endAngle: 360,
        radius: "90%",
        innerRadius: "40%",
        dataLabel: {
            visible: true, position: 'Outside',
            connectorStyle: { type: 'Curve', length: '7px' }, name: 'text',
            font:  {fontWeight: '500', size: '12px' },
            template: '<div>${point.x}</div><div>Reviews: ${point.y}</div>'
        }
    }]
    }, '#chart');
}

var dropDownListObject = new ej.dropdowns.DropDownList({
    dataSource: ['Johndoe', 'Marysmith', 'Robertwilliams'],
    placeholder: "Select an User",
    change: handleChangeDropdown
});
dropDownListObject.appendTo('#ddlelement');

var sortButton1 = new ej.buttons.Button({ content: '<label id="sortActionLabel">Price - Low to High</label><img class="sortActionIcon" src="https://www.syncfusion.com/Content/en-US/Downloads/Images/MetroStudio/GraphicsPackage/IconPackage/application/Flat/Sort-Ascending.png" alt="AddtoWishlist Icon">' });
sortButton1.appendTo('#sortButton1');
sortButton1.element.setAttribute("title", "Price - Low to High");

var sortButton2 = new ej.buttons.Button({ content: '<label id="sortActionLabel">Price - High to Low</label><img class="sortActionIcon" src="https://www.syncfusion.com/Content/en-US/Downloads/Images/MetroStudio/GraphicsPackage/IconPackage/application/Flat/Sort-Descending.png" alt="AddtoWishlist Icon">' });
sortButton2.appendTo('#sortButton2');
sortButton2.element.setAttribute("title", "Price - High to Low");

var AddtoWishlistButton = new ej.buttons.Button({  content: '<img class="ButtonIcon" src="https://www.syncfusion.com/Content/en-US/Downloads/Images/MetroStudio/GraphicsPackage/IconPackage/application/Flat/Stack%20add.png" alt="AddtoWishlist Icon">' });
AddtoWishlistButton.appendTo('#AddtoWishlist');
AddtoWishlistButton.element.setAttribute("title", "Add to Wishlist");

var showWishListButton = new ej.buttons.Button({ content: '<img class="ButtonIcon" src="https://www.syncfusion.com/Content/en-US/Downloads/Images/MetroStudio/GraphicsPackage/IconPackage/application/Flat/Rating%20-%2003.png " alt="show wishlist Icon">' });
showWishListButton.appendTo('#showWishListButton');
showWishListButton.element.setAttribute("title", "Show WishList");

var logOutButton = new ej.buttons.Button({ content: '<img class="ButtonIcon" src="https://www.syncfusion.com/Content/en-US/Downloads/Images/MetroStudio/GraphicsPackage/IconPackage/application/Wireframe/Power%20Off-01-WF.png" alt="LogOut Icon">' });
logOutButton.appendTo('#logOutButton');
logOutButton.element.setAttribute("title", "Logout");

var clearButton = new ej.buttons.Button({ content: '<img class="ButtonIcon" src="https://www.syncfusion.com/Content/en-US/Downloads/Images/MetroStudio/GraphicsPackage/IconPackage/application/Flat/Garbage-Closed.png" alt="LogOut Icon">' });
clearButton.appendTo('#clearButton');
clearButton.element.setAttribute("title", "Clear Wishlist");

const categories = Array.from(new Set(data.map(item => item.Category)))

const filterDropdown = document.getElementById('filterDropdown');
// Initialize the multi-select category dropdown
const multiSelect = new ej.dropdowns.MultiSelect({
    dataSource: categories,
    placeholder: 'Select category',
    mode: 'CheckBox',
    showSelectAll: true,
    filterBarPlaceholder: 'Search category',
    popupHeight: '350px',
    change: handleMultiSelectChange
});
multiSelect.appendTo(filterDropdown);

function reloadPage() {
    window.location.reload();
}

function handleChangeDropdown(e) {
    const buttonContainer = document.querySelector('.button-container');
    const dropdownList = document.querySelector('.dropdown-container .e-ddl');
    const dropdownContainer = document.querySelector('.dropdown-container');
    const sortButtonContainer = document.querySelector('.Sortbutton-row');
    if (e.value) {
        const userSpan = document.createElement('span');
        userSpan.classList.add('userSpan');
        userSpan.innerHTML = e.value;
        dropdownContainer.replaceChild(userSpan, dropdownList);
        sortButtonContainer.style.display = '';
        buttonContainer.style.display = '';
        logOutButton.element.style.display = '';

        dataManager.dataSource.id = e.value;
        const persistedData = dataManager.getPersistedData(dataManager.dataSource.id);
        query = new ej.data.Query();
        if (persistedData && persistedData.queries && persistedData.queries.some(query => query.fn === 'onWhere')) {
            AddtoWishlistButton.element.style.display = 'none';
            showWishListButton.element.style.display = 'none';
            sortButtonContainer.style.display = 'none';
            renderGridAndChart(wishColumns, dataManager.executeLocal(query));
        }
        else {
            renderGridAndChart(homeColumns, dataManager.executeLocal(query));
        }
      } else {
        logOutButton.element.style.display = 'none';
        buttonContainer.style.display = 'none';
        sortButtonContainer.style.display = 'none';
      }
}

sortButton1.element.onclick = () => {
    if (sortButton1.element.classList.contains('clicked')) {
        sortButton1.element.classList.remove('clicked');
        sortAndFilterQuery = new ej.data.Query();
        renderGridAndChart(homeColumns, dataManager.executeLocal(sortAndFilterQuery));
    }
    else {
        sortButton2.element.classList.remove('clicked');
        sortButton1.element.classList.add('clicked');
        sortAndFilterQuery.queries = sortAndFilterQuery.queries.filter((q) => q.fn !== 'onSortBy');
        sortAndFilterQuery.sortBy('Price', 'ascending');
        renderGridAndChart(homeColumns, dataManager.executeLocal(sortAndFilterQuery));
    }
}

sortButton2.element.onclick = () => {
    if (sortButton2.element.classList.contains('clicked')) {
        sortButton2.element.classList.remove('clicked');
        sortAndFilterQuery = new ej.data.Query();
        renderGridAndChart(homeColumns, dataManager.executeLocal(sortAndFilterQuery));
    }
    else {
        sortButton1.element.classList.remove('clicked');
        sortButton2.element.classList.add('clicked');
        sortAndFilterQuery.queries = sortAndFilterQuery.queries.filter((q) => q.fn !== 'onSortBy');
        sortAndFilterQuery.sortBy('Price', 'descending');
        renderGridAndChart(homeColumns, dataManager.executeLocal(sortAndFilterQuery));
    }
}

logOutButton.element.onclick = () => {
    reloadPage();
}

clearButton.element.onclick = () => {
    const sortButtonContainer = document.querySelector('.Sortbutton-row');
    dataManager.clearPersistence();
    query = new ej.data.Query();
    AddtoWishlistButton.element.style.display = '';
    showWishListButton.element.style.display = '';
    sortButtonContainer.style.display = '';
    renderGridAndChart(homeColumns, dataManager.executeLocal(query));
}

AddtoWishlistButton.element.onclick = () => {
    const filteredProducts = grid.getSelectedRecords();
    if (filteredProducts.length) {
        query.queries = query.queries.filter((q) => q.fn !== 'onWhere');
        const filterPredicates = [];
        filteredProducts.forEach((product) => {
            const predicate = new ej.data.Predicate('ProductID', 'equal', product.ProductID);
            filterPredicates.push(predicate);
        });
        // Create the filter query using the filter predicates
        dataManager.dataSource.enablePersistence = true;
        const filterQuery = (filterPredicates.length > 0) ? query.where(ej.data.Predicate.or(filterPredicates)) : query;
        console.log(filterQuery);
        alert(filteredProducts.length + ' items added to wishlist successfully.')
    }
    else {
        alert("Select atleast one item to add to wishlist");
    }
}

showWishListButton.element.addEventListener('click', () => {
    const SelectedProducts = grid.getSelectedRecords();
    if (SelectedProducts.length) {
        const sortButtonContainer = document.querySelector('.Sortbutton-row');
        const userSpan = document.querySelector('.userSpan');
        AddtoWishlistButton.element.style.display = 'none';
        showWishListButton.element.style.display = 'none';
        sortButtonContainer.style.display = 'none';
        dataManager.dataSource.id = userSpan.innerHTML;
        renderGridAndChart(wishColumns, dataManager.executeLocal(query));
        query = new ej.data.Query();
    }
    else {
        alert('wishlist is empty');
    }
});


function handleMultiSelectChange() {
    const selectedCategories = multiSelect.value;

    if (selectedCategories.length) {
        const filterPredicates = selectedCategories.map(category => {
        return new ej.data.Predicate('Category', 'equal', category);
        });
        sortAndFilterQuery.queries = sortAndFilterQuery.queries.filter((q) => q.fn !== 'onWhere');
        sortAndFilterQuery.where(ej.data.Predicate.or(filterPredicates));
        dataManager.dataSource.enablePersistence = false;
        // Apply the filter based on the selected categories
        renderGridAndChart(homeColumns, dataManager.executeLocal(sortAndFilterQuery));
    }
    else {
        renderGridAndChart(homeColumns, dataManager.executeLocal(new Query()));
    }
}
