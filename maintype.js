//GLBOAL SELECTORS
var mainList = document.querySelectorAll('.main-menu-list .list-item');
var pages = document.querySelectorAll('.main-board-panel .pages');
var newProjectInput = document.querySelector('.modal-body input');
var ulProjectList = document.querySelector('.projects-list');
var mainBoardPanel = document.querySelector('.main-board-panel');
console.log(mainBoardPanel);
var projectsV = [];
// BUTTONS
var saveBtn = document.querySelector('.modal-footer .save-btn');
//Event Listeners
mainList.forEach(function (element) {
    element.addEventListener('click', callPages);
});
saveBtn.addEventListener('click', saveProjects);
// Functions
function saveProjects() {
    //Fazer validação de String
    //Apagar campo depois de apertar save
    //Fechar modal depois de apertar save
    var usertxt = newProjectInput.value;
    newProjectInput.value = '';
    saveBtn.setAttribute('data-dismiss', 'modal');
    createProjects(usertxt);
}
function callPages(event) {
    var menuLinks = event.target.id;
    pages.forEach(function (element) {
        var pagesID = element.id;
        if (menuLinks == pagesID) {
            element.setAttribute('style', 'display:block');
        }
        else {
            element.setAttribute('style', 'display:none');
        }
    });
    console.log(menuLinks);
}
function createProjects(usertxt) {
    //CREATING NEW INSTANCE
    var model = new Project();
    model.name = usertxt;
    model.code = projectsV.length + 1;
    //Creating de side PANEL projects
    var liTag = document.createElement('li');
    liTag.setAttribute('page-code', model.code.toString());
    var imgTag = document.createElement('img');
    var alinkTag = document.createElement('a');
    imgTag.src = './icons/dot_icon.png';
    imgTag.alt = 'icon-logo';
    alinkTag.href = '#';
    alinkTag.innerHTML = usertxt;
    liTag.append(imgTag);
    liTag.append(alinkTag);
    projectsV.push(model);
    console.log(projectsV);
    liTag.addEventListener('click', function () {
        // remove new page before showing!
        var mainPage = document.getElementById('main-page');
        if (mainPage != null) {
            mainPage.remove();
        }
        createPage(model);
    });
    ulProjectList.append(liTag);
}
function createPage(project) {
    //Project Tittle
    var pageDiv = document.createElement('div');
    pageDiv.className = 'pages';
    pageDiv.id = 'main-page';
    var pageSpanTittle = document.createElement('span');
    pageSpanTittle.className = 'p-tittle';
    var pageh3Tag = document.createElement('h3');
    pageh3Tag.innerHTML = project.name;
    pageSpanTittle.append(pageh3Tag);
    //Project Input list
    var pageSpanInput = document.createElement('span');
    pageSpanInput.className = 'create-list-input';
    var atag = document.createElement('a');
    atag.className = "add-task-plus";
    atag.href = '#';
    atag.innerHTML = '+';
    var pageInput = document.createElement('input');
    pageInput.className = 'list-input';
    pageInput.setAttribute('type', 'text');
    pageInput.setAttribute('placeholder', 'Create new List..');
    atag.onclick = function () {
        project.list.name = pageInput.value;
        pageDiv.remove();
        createPage(project);
    };
    // When user inputs the name of the list
    if (project.list.name) {
        var pListDiv = document.createElement('div');
        pListDiv.className = 'project-list';
        var pListTittleDiv = document.createElement('div');
        pListDiv.className = 'list-tittle';
        var pageh5Tag = document.createElement('h5');
        pageh5Tag.innerHTML = project.list.name;
        var spanTaskNumber = document.createElement('span');
        spanTaskNumber.className = 'task-number';
        var spanInputTask = document.createElement('span');
        spanInputTask.className = 'input-task';
        var addTaskATAG = document.createElement('a');
        addTaskATAG.className = "add-task-plus";
        addTaskATAG.href = '#';
        addTaskATAG.innerHTML = '+';
        addTaskATAG.onclick = function () {
            var listItem = inputField_1.value;
            if (project.list.items == null) {
                project.list.items = [];
            }
            project.list.items.push(listItem);
            inputField_1.value = '';
            console.log(projectsV);
            pageDiv.remove();
            createPage(project);
        };
        var inputField_1 = document.createElement('input');
        inputField_1.className = 'input-field';
        inputField_1.type = 'text';
        inputField_1.placeholder = 'add task..';
        spanInputTask.append(addTaskATAG);
        spanInputTask.append(inputField_1);
        pListTittleDiv.append(pageh5Tag);
        pListTittleDiv.append(spanTaskNumber);
        pListDiv.append(pListTittleDiv);
        pListDiv.append(spanInputTask);
        var ulListTag = document.createElement('ul');
        ulListTag.className = 'project-list';
        pListDiv.append(ulListTag);
        pageDiv.append(pListDiv);
        console.log(project);
    }
    if (project.list.items != null) {
        project.list.items.forEach(function (element) {
            var pListDiv = document.querySelector('.project-list');
            var ulListTag = document.createElement('ul');
            ulListTag.className = 'project-list-items';
            var liTag = document.createElement('li');
            liTag.innerHTML = element;
            var btnTag = document.createElement('button');
            btnTag.className = 'btn btn-outline-secondary';
            btnTag.innerHTML = 'done';
            liTag.append(btnTag);
            ulListTag.append(liTag);
            pListDiv.appendChild(ulListTag);
        });
    }
    pageSpanInput.append(atag);
    pageSpanInput.append(pageInput);
    pageSpanTittle.append(pageSpanInput);
    pageDiv.append(pageSpanTittle);
    mainBoardPanel.append(pageDiv);
    //Project List
    /*
    const pListDiv = document.createElement('div');
    pListDiv.className = 'project-list';

    const pListTittleDiv = document.createElement('div');
    pListDiv.className = 'list-tittle';
    const pageh5Tag = document.createElement('h5');
    pageh5Tag.innerHTML = 'list name here';
    const spanTaskNumber = document.createElement('span');
    spanTaskNumber.className = 'task-number';
    spanTaskNumber.innerHTML = '2';
    pListTittleDiv.append(pageh5Tag);
    pListTittleDiv.append(spanTaskNumber);
    const hrTag = document.createElement('hr');
    pListDiv.append(pListTittleDiv);
    pListDiv.append(hrTag);

    const ulListTag = document.createElement('ul');
    ulListTag.className = 'p-list-name';
    const liTag = document.createElement('li');
    liTag.innerHTML = 'Task name';
    const btnTag = document.createElement('button');
    btnTag.className = 'btn btn-outline-secondary';
    btnTag.innerHTML = 'done';
    liTag.append(btnTag);
    ulListTag.append(liTag);
    ulListTag.append(hrTag);
    pListDiv.append(ulListTag);
    pageDiv.append(pListDiv);
    */
}
var Project = /** @class */ (function () {
    function Project() {
        this.list = new List();
    }
    return Project;
}());
var List = /** @class */ (function () {
    function List() {
    }
    return List;
}());
