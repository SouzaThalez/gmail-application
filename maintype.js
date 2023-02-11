//GLBOAL SELECTORS
var mainList = document.querySelectorAll('.main-menu-list .list-item');
var pages = document.querySelectorAll('.main-board-panel .pages');
var ulProjectList = document.querySelector('.projects-list');
var newProjectInput = document.querySelector('.modal-body input');
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
//projectlistLi.forEach(element => {
//element.addEventListener('click',callPages);
//});
// Functions
function saveProjects() {
    var modal = new Project();
    //Fazer validação de String
    //Apagar campo depois de apertar save
    //Fechar modal depois de apertar save
    modal.name = newProjectInput.value;
    newProjectInput.value = '';
    saveBtn.setAttribute('data-dismiss', 'modal');
    createProjects(modal);
    var projectUlElements = ulProjectList.querySelectorAll('li');
    projectUlElements.forEach(function (element) {
        element.onclick = function () {
            createPage(modal);
            console.log('swswsw', element);
            //callPages(element);
        };
    });
}
function callPages(event) {
    //Second selection of pages 
    // Since when this function is called, new page div is created
    var pagess = document.querySelectorAll('.main-board-panel .pages');
    var menuLinks = event.target.id;
    pagess.forEach(function (element) {
        var pagesID = element.id;
        if (menuLinks == pagesID) {
            switch (menuLinks) {
                case 'inbox':
                    inboxPageHeaderCreation();
                    projectsV.forEach(function (element) {
                        var projectName = element.name;
                        var projectInfo = element.list.items;
                        inboxPageListCreation(element);
                        //console.log('projectName: ', projectName,'Project list: ', projectInfo);
                    });
                    element.setAttribute('style', 'display:block');
                    break;
                case 'today':
                    element.setAttribute('style', 'display:block');
                    break;
                case 'upcoming':
                    element.setAttribute('style', 'display:block');
                    break;
                case 'project-page':
                    element.setAttribute('style', 'display:block');
                    //createProjects(event.innerHTML);
                    var addTaskPlus = document.querySelector('.project-page .add-task-plus');
                    var addListPlus = document.querySelector('.project-page .add-list-plus');
                    console.log('addtask + addlist tgs', addListPlus, addTaskPlus);
                    break;
            }
        }
        else {
            element.setAttribute('style', 'display:none');
        }
    });
}
function createProjects(project) {
    project.code = projectsV.length + 1 - 1;
    //Creating the side PANEL projects
    var liTag = document.createElement('li');
    liTag.setAttribute('page-code', project.code.toString());
    liTag.setAttribute('id', 'project-page');
    var imgTag = document.createElement('img');
    var spanlinkTag = document.createElement('span');
    imgTag.src = './icons/dot_icon.png';
    imgTag.alt = 'icon-logo';
    spanlinkTag.innerHTML = project.name;
    liTag.append(imgTag);
    liTag.append(spanlinkTag);
    ulProjectList.append(liTag);
    //Storing data!!
    projectsV.push(project);
    console.log('projectV', projectsV);
    /*
        liTag.addEventListener('click',()=>{
            
            // remove new page before showing!
            let projectPage = document.getElementById('project-page');
    
            if(projectPage != null){
                projectPage.remove();
            }
            createPage(model);
            ShowProjectList(model);
    
        });
        */
}
function createPage(project) {
    //Project Tittle
    var mainPageDiv = document.createElement('div');
    mainPageDiv.className = 'pages';
    mainPageDiv.id = 'project-page';
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
    addListPlusTag.className = "add-list-plus";
    //addListPlusTag.href = 'myfunction()';
    addListPlusTag.setAttribute('onclick', 'addList(project)');
    addListPlusTag.innerHTML = '+';
    spanInputList.append(addListPlusTag);
    var inputFieldListTag = document.createElement('input');
    inputFieldListTag.className = 'input-field-list';
    inputFieldListTag.setAttribute('type', 'text');
    inputFieldListTag.setAttribute('placeholder', 'Create new List..');
    spanInputList.append(inputFieldListTag);
    mainPageDiv.append(spanInputList);
    mainBoardPanel.append(mainPageDiv);
    /*
        addListPlusTag.onclick = ()=>{
            
            project.list.name =  inputFieldListTag.value;
            inputFieldListTag.value = '';
            //createPage(project);
            //mainPageDiv.remove();
    
        //Project List div
            const projectListDiv = document.createElement('div');
            projectListDiv.className = 'project-list';
            const listTittleDiv = document.createElement('div');
            listTittleDiv.className = 'list-tittle';
            const h5ListTag = document.createElement('h5');
            h5ListTag.innerHTML = project.list.name;
            //const spanTaskNumberTag = document.createElement('span');
            //spanTaskNumberTag.className = 'task-number';
            //spanTaskNumberTag.innerHTML = 'number of tasks here..';
            listTittleDiv.append(h5ListTag);
            //listTittleDiv.append(spanTaskNumberTag);
            projectListDiv.append(listTittleDiv);
    
        //List Input task
            let spanInputTask = document.createElement('span');
            spanInputTask.className = 'input-task';
            let addTaskPlusTag = document.createElement('a');
            addTaskPlusTag.className = "add-task-plus";
            addTaskPlusTag.href = '#';
            addTaskPlusTag.innerHTML = '+';
            let inputFieldTaskTag = document.createElement('input') as HTMLInputElement;
            inputFieldTaskTag.className = 'input-field-task';
            inputFieldTaskTag.setAttribute('type','text');
            inputFieldTaskTag.setAttribute('placeholder','Create new task..');
            spanInputTask.append(addTaskPlusTag);
            spanInputTask.append(inputFieldTaskTag);
            projectListDiv.append(spanInputTask);
    
            mainPageDiv.append(projectListDiv);
           
            addTaskPlusTag.onclick = ()=>{
                let taskInput = inputFieldTaskTag.value;
                inputFieldTaskTag.value = '';
                //ProjectlistItems has to be created first
                //Before assign it a value
                if(project.list.items == null){
                    project.list.items = [];
                }
                //Store DATA
                project.list.items.push(taskInput);
    
    
                let projectListUL = document.querySelector('#p-list') as HTMLUListElement;
                //Project list will not exist, first time
                //If project list does not exist, create.
                if(projectListUL == null){
                    projectListUL = document.createElement('ul');
                    projectListUL.id = 'p-list';
                    projectListDiv.append(projectListUL);
                    for (let index = 0; index < project.list.items.length; index++) {
           
                        const element = project.list.items[index];
                        const itemsLi =  document.createElement('li');
                        const spanText = document.createElement('span');
                        spanText.innerHTML =  element;
                        itemsLi.append(spanText);
                        const btnBootstrap =  document.createElement('button');
                        btnBootstrap.type = 'button';
                        btnBootstrap.className = 'btn btn-outline-secondary';
                        btnBootstrap.innerHTML = 'Done';
                        itemsLi.append(btnBootstrap);
                        projectListUL.append(itemsLi);
                        const hrTag = document.createElement('hr');
                        projectListUL.append(hrTag);
                    }
    
                }else{
                    projectListUL.innerHTML = '';
                    for (let index = 0; index < project.list.items.length; index++) {
           
                        const element = project.list.items[index];
                        const itemsLi =  document.createElement('li');
                        const spanText = document.createElement('span');
                        spanText.innerHTML =  element;
                        itemsLi.append(spanText);
                        const btnBootstrap =  document.createElement('button');
                        btnBootstrap.type = 'button';
                        btnBootstrap.className = 'btn btn-outline-secondary';
                        btnBootstrap.innerHTML = 'Done';
                        itemsLi.append(btnBootstrap);
                        projectListUL.append(itemsLi);
                        const hrTag = document.createElement('hr');
                        projectListUL.append(hrTag);
                    }
                }
    
    
            }
    
    
        };
        */
}
//FUNCTION BEING CALLED FROM CREATEPAGE()
function addList(project) {
    console.log('w3w2w22w', project);
    //project.list.name =  input.value;
    //input.value = '';
    var mainPageDiv = document.querySelector('#project-page');
    //Project List div    
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
    inputFieldTaskTag.setAttribute('placeholder', 'Create new task..');
    spanInputTask.append(addTaskPlusTag);
    spanInputTask.append(inputFieldTaskTag);
    projectListDiv.append(spanInputTask);
    mainPageDiv.append(projectListDiv);
    console.log('iinput', project);
}
function ShowProjectList(project) {
    if (project.list.items == null) {
        console.log('no item in this project');
    }
    else {
        console.log('ITEM FOUND!');
        var projectPageDiv = document.querySelector('#project-page');
        //Project List div    
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
        inputFieldTaskTag.setAttribute('placeholder', 'Create new task..');
        spanInputTask.append(addTaskPlusTag);
        spanInputTask.append(inputFieldTaskTag);
        projectListDiv.append(spanInputTask);
        projectPageDiv.append(projectListDiv);
        var projectListUL = document.createElement('ul');
        projectListUL.id = 'p-list';
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
            projectListUL.append(itemsLi);
            var hrTag = document.createElement('hr');
            projectListUL.append(hrTag);
        }
        projectListDiv.append(projectListUL);
    }
}
function inboxPageHeaderCreation() {
    var inboxPage = document.querySelector('.pages[id="inbox"]');
    var pageContainerDiv = document.createElement('div');
    pageContainerDiv.className = 'page-container';
    var pageTittleDiv = document.createElement('div');
    pageTittleDiv.className = 'page-tittle';
    var pageTittleH3Tag = document.createElement('h3');
    pageTittleH3Tag.innerHTML = 'Inbox Page';
    pageTittleDiv.append(pageTittleH3Tag);
    //SELECT FORM CREATION   
    var selectForm = document.createElement('select');
    selectForm.className = 'custom-select mr-sm-2';
    selectForm.id = 'inlineFormCustomSelect';
    var optionFormDefault = document.createElement('option');
    optionFormDefault.setAttribute('selected', '');
    optionFormDefault.innerHTML = 'Filter...';
    var optionFormOne = document.createElement('option');
    optionFormOne.setAttribute('value', '1');
    optionFormOne.innerHTML = 'Project Name';
    var optionFormTwo = document.createElement('option');
    optionFormTwo.setAttribute('value', '2');
    optionFormTwo.innerHTML = 'Project Date';
    var optionFormThree = document.createElement('option');
    optionFormThree.setAttribute('value', '3');
    optionFormThree.innerHTML = 'Other';
    selectForm.append(optionFormDefault);
    selectForm.append(optionFormOne);
    selectForm.append(optionFormTwo);
    selectForm.append(optionFormThree);
    pageTittleDiv.append(selectForm);
    // END OF SELECTFORM ------   
    var pageSubTittleDiv = document.createElement('div');
    pageSubTittleDiv.className = 'page-sub-tittle';
    var pageSubTittleH6Tag = document.createElement('h6');
    pageSubTittleH6Tag.innerHTML = 'Your General Activities';
    pageSubTittleDiv.append(pageSubTittleH6Tag);
    pageContainerDiv.append(pageTittleDiv);
    pageContainerDiv.append(pageSubTittleDiv);
    inboxPage.append(pageContainerDiv);
}
function inboxPageListCreation(project) {
    var pageContainerDiv = document.querySelector('.page-container');
    var pageBodyDiv = document.createElement('div');
    pageBodyDiv.className = 'page-body';
    var ulInboxlist = document.createElement('ul');
    ulInboxlist.className = 'inbox-list';
    /*
     const liItem = document.createElement('li');
     const mediaDiv = document.createElement('div');
     mediaDiv.className = 'media';
     const imgTag = document.createElement('img');
     imgTag.className = 'mr-2 rounded';
     imgTag.src = '';
     imgTag.alt = 'image';
     mediaDiv.append(imgTag);
     const mediaBodyDiv = document.createElement('div');
     mediaBodyDiv.className = 'media-body';
     const listHeaderDiv = document.createElement('div');
     listHeaderDiv.className = 'list-header';
     const strongTag = document.createElement('strong');
     strongTag.className = 'd-block text-gray-dark';
     strongTag.innerHTML = project.name;
     const spanTagDate = document.createElement('span');
     spanTagDate.className = 'list-date';
     spanTagDate.innerHTML = '35-10-2022';
     const pTagListText = document.createElement('p');
     */
    for (var index = 0; index < project.list.items.length; index++) {
        var element = project.list.items[index];
        var liItem = document.createElement('li');
        var mediaDiv = document.createElement('div');
        mediaDiv.className = 'media';
        var imgTag = document.createElement('img');
        imgTag.className = 'mr-2 rounded';
        imgTag.src = '';
        imgTag.alt = 'image';
        mediaDiv.append(imgTag);
        var mediaBodyDiv = document.createElement('div');
        mediaBodyDiv.className = 'media-body';
        var listHeaderDiv = document.createElement('div');
        listHeaderDiv.className = 'list-header';
        var strongTag = document.createElement('strong');
        strongTag.className = 'd-block text-gray-dark';
        strongTag.innerHTML = project.name;
        var spanTagDate = document.createElement('span');
        spanTagDate.className = 'list-date';
        spanTagDate.innerHTML = '35-10-2022';
        listHeaderDiv.append(strongTag);
        listHeaderDiv.append(spanTagDate);
        mediaBodyDiv.append(listHeaderDiv);
        var pTagListText = document.createElement('p');
        pTagListText.innerHTML = element;
        mediaBodyDiv.append(pTagListText);
        mediaDiv.append(mediaBodyDiv);
        liItem.append(mediaDiv);
        ulInboxlist.append(liItem);
    }
    /*
    listHeaderDiv.append(strongTag);
    listHeaderDiv.append(spanTagDate);
    mediaBodyDiv.append(listHeaderDiv);
    mediaBodyDiv.append(pTagListText);
    mediaDiv.append(mediaBodyDiv);
    */
    //liItem.append(mediaDiv);
    //ulInboxlist.append(liItem);
    pageBodyDiv.append(ulInboxlist);
    pageContainerDiv.append(pageBodyDiv);
}
