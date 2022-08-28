var col = document.querySelector(".col");

col.innerHTML =
  `
<h1 id="title">Pagination</h1>
<p id="description">This is information about page</p>
<div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr id="first-row">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
    </table>
</div>

<div id="buttons" class="d-flex justify-content-center">
    <nav aria-label="Page navigation example text-center">
        <ul class="pagination text-center">
        <li class="page-link" id="prevButton"><button class="prevPage mx-2">Prev</butt></li>
            <li class="page-link" id="nextButton"><button class="nextPage mx-2">Next</button></li>
        </ul>
    </nav>
</div>
`;

let coinsData = [];

async function getData() {
  const response = await fetch("https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json");
  coins = await response.json();
  coinsData = coins;
};

const pageSize = 5;
let curPage = 1;

var table = document.querySelector("table");
var tbody = document.createElement("tbody");
table.append(tbody);

async function renderTable() {
  await getData();

  console.log(coinsData);
  var tr = "";
  coinsData.filter((row, index) => {
    let start = (curPage - 1) * pageSize;
    let end = curPage * pageSize;

    if (index >= start && index < end) return true;
  }).forEach((coin) => {
    tr +=
  `<tr>
    <td>${coin.id}</td>
    <td>${coin.name}</td>
    <td>${coin.email}</td>
  </tr>`;
  })
  tbody.innerHTML = tr;
};

renderTable();

function previousPage() {
  if(curPage > 1){
    curPage--;
    renderTable();
  }
};

function nextPage() {
  if((curPage * pageSize) < coinsData.length) {
    curPage++;
    renderTable();
  }
};

function numberOfPages() {
  return Math.ceil(coinsData.length/pageSize);
}

document.querySelector("#prevButton").addEventListener('click', previousPage, false);
document.querySelector("#nextButton").addEventListener('click', nextPage, false);

let page_link = document.querySelector(".page-link");
