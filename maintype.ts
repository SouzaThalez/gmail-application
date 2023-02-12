//GLBOAL SELECTORS
let mainList = document.querySelectorAll('.main-menu-list .list-item');
let pages = document.querySelectorAll('.main-board-panel .pages');
const ulProjectList = document.querySelector('.projects-list') as HTMLUListElement;
const newProjectInput = document.querySelector('.modal-body input') as HTMLInputElement;



let mainBoardPanel = document.querySelector('.main-board-panel') as HTMLDivElement;



class Project{

    name: string;
    code: number;
    list: List;

    constructor () {
        this.list = new List();
    }

}
class List{
    name: string;
    items: Array<string>;
}


let projectsV: any []= [];


// BUTTONS
let saveBtn = document.querySelector('.modal-footer .save-btn') as HTMLButtonElement;

//Event Listeners
mainList.forEach(element => {
    element.addEventListener('click',callPages);
});
saveBtn.addEventListener('click',saveProjects);
 
//projectlistLi.forEach(element => {
    //element.addEventListener('click',callPages);
//});

// Functions
function saveProjects(){

    let modal = new Project();
    //Fazer validação de String
    //Apagar campo depois de apertar save
    //Fechar modal depois de apertar save
    modal.name = newProjectInput.value;
    newProjectInput.value = '';
    saveBtn.setAttribute('data-dismiss','modal');
    
    createProjects(modal);

    const projectUlElements = ulProjectList.querySelectorAll('li');

    projectUlElements.forEach(element => {

        element.onclick = ()=>{

            //referecing my object through code!!!!
            let pageCodeAttr = element.getAttribute('page-code') as any;
            let code = parseInt(pageCodeAttr,10);
            let cleanp = mainBoardPanel.querySelector('#project-page') as HTMLElement;

            //remove projects class before adding
            if(cleanp != null){
                cleanp.remove();
            }

           if(projectsV[code].name){
                //console.log('has name: ',projectsV[code].name);
                projectTittle(projectsV[code]);
                if(projectsV[code].list.name){
                    //console.log('has listName: ',projectsV[code].list.name);
                    addList(projectsV[code]);
                    if(projectsV[code].list.items == null){
                        console.log('list item is null: ',projectsV[code].list.items)
                    }else{
                        //console.log('list item is full: ',projectsV[code].list.items)
                        let projectListUL = document.querySelector('#p-list') as HTMLUListElement;
                        let projectListDiv = mainBoardPanel.querySelector('#project-page .project-list') as HTMLElement

                        if(projectListUL == null){
                            projectListUL = document.createElement('ul');
                            projectListUL.id = 'p-list';
                            projectListDiv.append(projectListUL);
                        }

                        projectsV[code].list.items.forEach(listElement => {

                            const itemsLi =  document.createElement('li');
                            const spanText = document.createElement('span');
                            spanText.innerHTML =  listElement;
                            itemsLi.append(spanText);
                            const btnBootstrap =  document.createElement('button');
                            btnBootstrap.type = 'button';
                            btnBootstrap.className = 'btn btn-outline-secondary';
                            btnBootstrap.innerHTML = 'Done';
                            itemsLi.append(btnBootstrap);
                            projectListUL.append(itemsLi);
                            const hrTag = document.createElement('hr');
                            projectListUL.append(hrTag);
                        });
                    }
                }
           }
           else{
                console.log('project doesnt have name nor listName');
           }
        }

    });
}

function createProjects(project: Project){

    project.code = projectsV.length + 1 - 1 ;

    
    //Creating the side PANEL projects
    const liTag = document.createElement('li');
    liTag.setAttribute('page-code',project.code.toString());
    liTag.setAttribute('id','project-page');
    liTag.setAttribute('data-bs-toggle','tooltip');
    liTag.setAttribute('data-bs-placement','top');
    liTag.setAttribute('title',project.name + '!');
    const imgTag = document.createElement('img');
    const spanlinkTag = document.createElement('span');
    imgTag.src = './icons/dot_icon.png';
    imgTag.alt = 'icon-logo';
    spanlinkTag.innerHTML = project.name;
    liTag.append(imgTag);
    liTag.append(spanlinkTag);
    ulProjectList.append(liTag);

    //Storing data!!
    projectsV.push(project);

    console.log('projectV',projectsV);  

/*
    liTag.addEventListener('click',()=>{
        
        // remove new page before showing!
        let projectPage = document.getElementById('project-page');

        if(projectPage != null){ 
            projectPage.remove();
        }
        projectTittle(model);
        ShowProjectList(model);

    });
    */
    
}


function projectTittle(project: Project){

    //Project Tittle
        let mainPageDiv = document.createElement('div');
        mainPageDiv.className = 'pages';
        mainPageDiv.id = 'project-page';
        let pageSpanTittle =  document.createElement('span');
        pageSpanTittle.className = 'p-tittle';
        let pageh3Tag = document.createElement('h3');
        pageh3Tag.innerHTML = project.name;
        pageSpanTittle.append(pageh3Tag);
        mainPageDiv.append(pageSpanTittle);
        
    //Project Input list
        let spanInputList = document.createElement('span');
        spanInputList.className = 'input-list';
        let addListPlusTag = document.createElement('a');
        addListPlusTag.className = "add-list-plus";
        addListPlusTag.innerHTML = '+';
        spanInputList.append(addListPlusTag);
        let inputFieldListTag = document.createElement('input') as HTMLInputElement;
        inputFieldListTag.className = 'input-field-list';
        inputFieldListTag.setAttribute('type','text');
        inputFieldListTag.setAttribute('placeholder','Create new List..');
        spanInputList.append(inputFieldListTag);
        mainPageDiv.append(spanInputList);
    
        mainBoardPanel.append(mainPageDiv);
        
       addListPlusTag.onclick = () =>{

            project.list.name = inputFieldListTag.value;
            inputFieldListTag.value = '';
            addList(project);

       }     


    /*
        addListPlusTag.onclick = ()=>{
            
            project.list.name =  inputFieldListTag.value;
            inputFieldListTag.value = '';
            //projectTittle(project);
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

//FUNCTION BEING CALLED FROM projectTittle()
function addList(project: Project){
    
    let mainPageDiv = document.querySelector('.main-board-panel #project-page');

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
      
     addTaskPlusTag.onclick = () =>{
        let taskInput = inputFieldTaskTag.value;
        inputFieldTaskTag.value = '';

    //My projectList.itemsV model has to be created first
    //Before assign it a value
        if(project.list.items == null){
            project.list.items = [];
        }
        project.list.items.push(taskInput);
        
    // ADDIG ITEMS TO THE LIST 
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
     


}


function callPages(event: any){

    //Second selection of pages 
    // Since when this function is called, new page div is created
    let pagess = document.querySelectorAll('.main-board-panel .pages');
    let menuLinks =  event.target.id;

    pagess.forEach(element =>{

        let pagesID = element.id;

        if(menuLinks == pagesID){
            switch (menuLinks) {
                case 'inbox':
                    
                    let cleanp = mainBoardPanel.querySelector('#project-page') as HTMLElement;
                    if(cleanp == null){
                        inboxPageHeaderCreation();
                    }
                    //cleanp.innerHTML = '';
                    inboxPageHeaderCreation();
                    projectsV.forEach(element => {
                        inboxPageListCreation(element);
                    });
                    element.setAttribute('style','display:block');
                    break
                case 'today':
                    element.setAttribute('style','display:block');
                    break
                case 'upcoming': 
                   
                    element.setAttribute('style','display:block');
                    break 
                case 'project-page': 
                    element.setAttribute('style','display:block');
                    break  
            }
            
        }else{
            element.setAttribute('style','display:none');
        }
    });
}
/*
function ShowProjectList(project: Project){

        if(project.list.items == null){
            console.log('no item in this project');
        }else{

            console.log('ITEM FOUND!');

                    const projectPageDiv = document.querySelector('#project-page');
              //Project List div    
                    const projectListDiv = document.createElement('div');
                    projectListDiv.className = 'project-list';
                    const listTittleDiv = document.createElement('div');
                    listTittleDiv.className = 'list-tittle';
                    const h5ListTag = document.createElement('h5');
                    h5ListTag.innerHTML = project.list.name;
                    listTittleDiv.append(h5ListTag);
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

                    projectPageDiv.append(projectListDiv);
  
                    let projectListUL = document.createElement('ul') as HTMLUListElement;
                    projectListUL.id = 'p-list';

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


                projectListDiv.append(projectListUL);
                
        }
        
}
*/
function inboxPageHeaderCreation(){

    const inboxPage = document.querySelector('.pages[id="inbox"]') as any;
    let pageContainer = document.querySelector('.page-container');

    if(pageContainer == null ){
        const pageContainerDiv = document.createElement('div');
        pageContainerDiv.className = 'page-container';
    }
    else{
       pageContainer.innerHTML = '';
        const pageTittleDiv = document.createElement('div');
        pageTittleDiv.className = 'page-tittle';
        const pageTittleH3Tag = document.createElement('h3');
        pageTittleH3Tag.innerHTML = 'Inbox Page';
        pageTittleDiv.append(pageTittleH3Tag);
    
     //SELECT FORM CREATION   
        const selectForm =  document.createElement('select');
        selectForm.className = 'custom-select mr-sm-2';
        selectForm.id = 'inlineFormCustomSelect';
    
        const optionFormDefault = document.createElement('option');
        optionFormDefault.setAttribute('selected','');
        optionFormDefault.innerHTML = 'Filter...';
    
        const optionFormOne = document.createElement('option');
        optionFormOne.setAttribute('value','1');
        optionFormOne.innerHTML = 'Project Name';
    
        const optionFormTwo = document.createElement('option');
        optionFormTwo.setAttribute('value','2');
        optionFormTwo.innerHTML = 'Project Date';
    
        const optionFormThree = document.createElement('option');
        optionFormThree.setAttribute('value','3');
        optionFormThree.innerHTML = 'Other';
    
        selectForm.append(optionFormDefault);
        selectForm.append(optionFormOne);
        selectForm.append(optionFormTwo);
        selectForm.append(optionFormThree);
        pageTittleDiv.append(selectForm);
    
    // END OF SELECTFORM ------   
    
        const pageSubTittleDiv = document.createElement('div');
        pageSubTittleDiv.className = 'page-sub-tittle';
        const pageSubTittleH6Tag = document.createElement('h6');
        pageSubTittleH6Tag.innerHTML = 'All your tasks: ';
        pageSubTittleDiv.append(pageSubTittleH6Tag);
        
    
    
        pageContainer.append(pageTittleDiv);
        pageContainer.append(pageSubTittleDiv);
        inboxPage.append(pageContainer);
    }
 
}

function inboxPageListCreation(project: Project){

    const pageContainerDiv = document.querySelector('.page-container') as any;

    let pageBody = pageContainerDiv.querySelector('.page-body');
    let inBoxList = document.querySelector('.page-container .inbox-list') as any;

    if(pageBody == null){
    
        const pageBodyDiv = document.createElement('div');
        pageBodyDiv.className = 'page-body';
        const ulInboxlist = document.createElement('ul') as HTMLUListElement;
        ulInboxlist.className = 'inbox-list';
        pageBodyDiv.append(ulInboxlist);
    
        for (let index = 0; index < project.list.items.length; index++) {

            const element = project.list.items[index];

            const liItem = document.createElement('li');
            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'media';
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
            listHeaderDiv.append(strongTag);
            listHeaderDiv.append(spanTagDate);
            mediaBodyDiv.append(listHeaderDiv);
            const pTagListText = document.createElement('p');
            pTagListText.innerHTML = element;
            mediaBodyDiv.append(pTagListText);
            mediaDiv.append(mediaBodyDiv);
            liItem.append(mediaDiv);
            ulInboxlist.append(liItem);
        
        }
        pageContainerDiv.append(pageBodyDiv);

    }else{

        for (let index = 0; index < project.list.items.length; index++) {

            const element = project.list.items[index];
            const liItem = document.createElement('li');
            
            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'media';
            /*
            const imgTag = document.createElement('img');
            imgTag.className = 'mr-2 rounded';
            imgTag.src = '';
            imgTag.alt = 'image';
            mediaDiv.append(imgTag);
            */
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
            listHeaderDiv.append(strongTag);
            listHeaderDiv.append(spanTagDate);
            mediaBodyDiv.append(listHeaderDiv);
            const pTagListText = document.createElement('p');
            pTagListText.innerHTML = element;
            mediaBodyDiv.append(pTagListText);
            mediaDiv.append(mediaBodyDiv);
            liItem.append(mediaDiv);
            inBoxList.append(liItem);
        
        }
        pageBody.append(inBoxList);
        pageContainerDiv.append(pageBody);
    }

   
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
   /*
    for (let index = 0; index < project.list.items.length; index++) {

        const element = project.list.items[index];
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
        listHeaderDiv.append(strongTag);
        listHeaderDiv.append(spanTagDate);
        mediaBodyDiv.append(listHeaderDiv);
        const pTagListText = document.createElement('p');
        pTagListText.innerHTML = element;
        mediaBodyDiv.append(pTagListText);
        mediaDiv.append(mediaBodyDiv);
        liItem.append(mediaDiv);
        inBoxList.append(liItem);
    
    }
    */
    //listHeaderDiv.append(strongTag);
    //listHeaderDiv.append(spanTagDate);
    //mediaBodyDiv.append(listHeaderDiv);
    //mediaBodyDiv.append(pTagListText);
    //mediaDiv.append(mediaBodyDiv);

    //liItem.append(mediaDiv);
    //ulInboxlist.append(liItem);
    //pageBody.append(inBoxList);
    //pageContainerDiv.append(pageBody);
}