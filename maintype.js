//GLBOAL SELECTORS
var mainList = document.querySelectorAll('.main-menu-list .list-item');
var pages = document.querySelectorAll('.main-board-panel .pages');
var newProjectInput = document.querySelector('.modal-body input');
var ulProjectList = document.querySelector('.projects-list');
var mainBoardPanel = document.querySelector('.main-board-panel');
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
}
function createProjects(usertxt) {
    //CREATING NEW INSTANCE
    var model = new Project();
    model.name = usertxt;
    model.code = projectsV.length + 1;
    //Creating the side PANEL projects
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
    liTag.addEventListener('click', function () {
        // remove new page before showing!
        var mainPage = document.getElementById('main-page');
        if (mainPage != null) {
            mainPage.remove();
        }
        createPage(model);
        listProject(model);
    });
    ulProjectList.append(liTag);
}
function createPage(project) {
    //Project Tittle
    var mainPageDiv = document.createElement('div');
    mainPageDiv.className = 'pages';
    mainPageDiv.id = 'main-page';
    var pageSpanTittle = document.createElement('span');
    pageSpanTittle.className = 'p-tittle';
    var pageh3Tag = document.createElement('h3');
    pageh3Tag.innerHTML = project.name;
    pageSpanTittle.append(pageh3Tag);
    mainPageDiv.append(pageSpanTittle);
    //Project Input list
    var spanInputList = document.createElement('span');
    spanInputList.className = 'input-list';
    var addListPlusTag = document.createElement('a');
    addListPlusTag.className = "add-task-plus";
    addListPlusTag.href = '#';
    addListPlusTag.innerHTML = '+';
    spanInputList.append(addListPlusTag);
    var inputFieldListTag = document.createElement('input');
    inputFieldListTag.className = 'input-field-list';
    inputFieldListTag.setAttribute('type', 'text');
    inputFieldListTag.setAttribute('placeholder', 'Create new List..');
    spanInputList.append(inputFieldListTag);
    mainPageDiv.append(spanInputList);
    addListPlusTag.onclick = function () {
        project.list.name = inputFieldListTag.value;
        mainPageDiv.remove();
        createPage(project);
        var projectListDiv = document.createElement('div');
        projectListDiv.className = 'project-list';
        var listTittleDiv = document.createElement('div');
        listTittleDiv.className = 'list-tittle';
        var h5ListTag = document.createElement('h5');
        h5ListTag.innerHTML = project.list.name;
        //const spanTaskNumberTag = document.createElement('span');
        //spanTaskNumberTag.className = 'task-number';
        //spanTaskNumberTag.innerHTML = 'number of tasks here..';
        listTittleDiv.append(h5ListTag);
        //listTittleDiv.append(spanTaskNumberTag);
        projectListDiv.append(listTittleDiv);
        //List Input task
        var spanInputTask = document.createElement('span');
        spanInputTask.className = 'input-task';
        var addTaskPlusTag = document.createElement('a');
        addTaskPlusTag.className = "add-task-plus";
        addTaskPlusTag.href = '#';
        addTaskPlusTag.innerHTML = '+';
        var inputFieldTaskTag = document.createElement('input');
        inputFieldTaskTag.className = 'input-field-task';
        inputFieldTaskTag.setAttribute('type', 'text');
        inputFieldTaskTag.setAttribute('placeholder', 'Add task..');
        spanInputTask.append(addTaskPlusTag);
        spanInputTask.append(inputFieldTaskTag);
        projectListDiv.append(spanInputTask);
        var mainDiv = document.querySelector('#main-page');
        mainDiv.append(projectListDiv);
        createProjectList(addTaskPlusTag, project);
    };
    mainBoardPanel.append(mainPageDiv);
}
function createProjectList(addTaskIcon, project) {
    var projectLsitDiv = document.querySelector('.project-list');
    var plusIconTag = addTaskIcon;
    if (projectLsitDiv == null) {
        return null;
    }
    // THIS else CODE WILL BE EXECUTED ONLY IF
    // THE USER CLICK ADD TASK ICON 
    else {
        plusIconTag.onclick = function () {
            var inputTask = document.querySelector('.input-field-task');
            var listItem = inputTask.value;
            //CHECK IF THE ARRAY IS CREATED BEFORE PASSING A VALUE
            // IF IS CRATED YOU WILL ADD TO IT !
            if (project.list.items == null) {
                project.list.items = [];
            }
            project.list.items.push(listItem);
            inputTask.value = '';
            //CREATE PROJECT LIST ELEMENTS
            var pListUL = document.querySelector('#p-list');
            if (!pListUL) {
                pListUL = document.createElement('ul');
                pListUL.id = 'p-list';
                projectLsitDiv.append(pListUL);
            }
            pListUL.innerHTML = '';
            for (var index = 0; index < project.list.items.length; index++) {
                var element = project.list.items[index];
                var itemsLi = document.createElement('li');
                var spanText = document.createElement('span');
                spanText.innerHTML = element;
                itemsLi.append(spanText);
                var btnBootstrap = document.createElement('button');
                btnBootstrap.type = 'button';
                btnBootstrap.className = 'btn btn-outline-secondary';
                btnBootstrap.innerHTML = 'Done';
                itemsLi.append(btnBootstrap);
                pListUL.append(itemsLi);
                var hrTag = document.createElement('hr');
                pListUL.append(hrTag);
            }
            //return console.log('this is my projectList Div' , projectLsitDiv);
        };
    }
}
function listProject(project) {
    //The first time this function  is called its
    // its going to hit the return and end the whole function!
    if (project.list.name == null) {
        return;
    }
    //Create Project list
    var mainDiv = document.querySelector('#main-page');
    var projectListDiv = document.createElement('div');
    projectListDiv.className = 'project-list';
    var listTittleDiv = document.createElement('div');
    listTittleDiv.className = 'list-tittle';
    var h5ListTag = document.createElement('h5');
    h5ListTag.innerHTML = project.list.name;
    listTittleDiv.append(h5ListTag);
    projectListDiv.append(listTittleDiv);
    //List Input task
    var spanInputTask = document.createElement('span');
    spanInputTask.className = 'input-task';
    var addTaskPlusTag = document.createElement('a');
    addTaskPlusTag.className = "add-task-plus";
    addTaskPlusTag.href = '#';
    addTaskPlusTag.innerHTML = '+';
    var inputFieldTaskTag = document.createElement('input');
    inputFieldTaskTag.className = 'input-field-task';
    inputFieldTaskTag.setAttribute('type', 'text');
    inputFieldTaskTag.setAttribute('placeholder', 'Add task..');
    addTaskPlusTag.onclick = function () {
        var listInput = inputFieldTaskTag.value;
        if (!project.list.items) {
            project.list.items = [];
            project.list.items.push(listInput);
        }
        else {
            pListUL.innerHTML = '';
            project.list.items.push(listInput);
        }
        for (var index = 0; index < project.list.items.length; index++) {
            var element = project.list.items[index];
            var itemsLi = document.createElement('li');
            var spanText = document.createElement('span');
            spanText.innerHTML = element;
            itemsLi.append(spanText);
            var btnBootstrap = document.createElement('button');
            btnBootstrap.type = 'button';
            btnBootstrap.className = 'btn btn-outline-secondary';
            btnBootstrap.innerHTML = 'Done';
            itemsLi.append(btnBootstrap);
            pListUL.append(itemsLi);
            var hrTag = document.createElement('hr');
            pListUL.append(hrTag);
        }
        mainDiv.append(projectListDiv);
        inputFieldTaskTag.value = '';
        console.log('MEU VETOR DE OBJECTO: ', projectsV);
        return;
    };
    spanInputTask.append(addTaskPlusTag);
    spanInputTask.append(inputFieldTaskTag);
    projectListDiv.append(spanInputTask);
    var pListUL = document.querySelector('#p-list');
    if (!pListUL) {
        pListUL = document.createElement('ul');
        pListUL.id = 'p-list';
        projectListDiv.append(pListUL);
    }
    if (project.list.items == null) {
        mainDiv.append(projectListDiv);
        return;
    }
    for (var index = 0; index < project.list.items.length; index++) {
        var element = project.list.items[index];
        var itemsLi = document.createElement('li');
        var spanText = document.createElement('span');
        spanText.innerHTML = element;
        itemsLi.append(spanText);
        var btnBootstrap = document.createElement('button');
        btnBootstrap.type = 'button';
        btnBootstrap.className = 'btn btn-outline-secondary';
        btnBootstrap.innerHTML = 'Done';
        itemsLi.append(btnBootstrap);
        pListUL.append(itemsLi);
        var hrTag = document.createElement('hr');
        pListUL.append(hrTag);
    }
    console.log(projectsV);
    mainDiv.append(projectListDiv);
}
