//GLBOAL SELECTORS
let mainList = document.querySelectorAll('.main-menu-list .list-item');
let pages = document.querySelectorAll('.main-board-panel .pages');
const newProjectInput = document.querySelector('.modal-body input') as HTMLInputElement;
const ulProjectList = document.querySelector('.projects-list') as HTMLUListElement;
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


let projectsV: Project[]= [];


// BUTTONS
let saveBtn = document.querySelector('.modal-footer .save-btn') as HTMLButtonElement;

//Event Listeners
mainList.forEach(element => {
    element.addEventListener('click',callPages);
});
saveBtn.addEventListener('click',saveProjects);


// Functions
function saveProjects(){
    //Fazer validação de String
    //Apagar campo depois de apertar save
    //Fechar modal depois de apertar save
    let usertxt = newProjectInput.value;
    newProjectInput.value = '';
    saveBtn.setAttribute('data-dismiss','modal');
    createProjects(usertxt);

}
function callPages(event: any){
    let menuLinks =  event.target.id;
    
    pages.forEach(element =>{

        let pagesID = element.id;

        if(menuLinks == pagesID){
            element.setAttribute('style','display:block');
        }else{
            element.setAttribute('style','display:none');
        }
    });
}
function createProjects(usertxt: string){

    //CREATING NEW INSTANCE
    let model = new Project();
    model.name = usertxt;
    model.code = projectsV.length +1 ;
    
    //Creating the side PANEL projects
    const liTag = document.createElement('li');
    liTag.setAttribute('page-code',model.code.toString());
    const imgTag = document.createElement('img');
    const alinkTag = document.createElement('a');
    imgTag.src = './icons/dot_icon.png';
    imgTag.alt = 'icon-logo';
    alinkTag.href = '#';
    alinkTag.innerHTML = usertxt;
    liTag.append(imgTag);
    liTag.append(alinkTag);


    projectsV.push(model);

    console.log(projectsV);

    liTag.addEventListener('click',()=>{
        // remove new page before showing!
        let mainPage = document.getElementById('main-page');
        if(mainPage != null){
            mainPage.remove();
        }
        createPage(model);
    });

    ulProjectList.append(liTag);
}

function createPage(project: Project){

//Project Tittle
    let mainPageDiv = document.createElement('div');
    mainPageDiv.className = 'pages';
    mainPageDiv.id = 'main-page';
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
    addListPlusTag.className = "add-task-plus";
    addListPlusTag.href = '#';
    addListPlusTag.innerHTML = '+';
    spanInputList.append(addListPlusTag);
    let inputFieldListTag = document.createElement('input') as HTMLInputElement;
    inputFieldListTag.className = 'input-field-list';
    inputFieldListTag.setAttribute('type','text');
    inputFieldListTag.setAttribute('placeholder','Create new List..');
    spanInputList.append(inputFieldListTag);
    mainPageDiv.append(spanInputList);
    //mainBoardPanel.append(mainPageDiv);

    addListPlusTag.onclick = ()=>{
        
        project.list.name =  inputFieldListTag.value;
        mainPageDiv.remove();
        createPage(project);

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
        inputFieldTaskTag.setAttribute('placeholder','Add task..');
        spanInputTask.append(addTaskPlusTag);
        spanInputTask.append(inputFieldTaskTag);
        projectListDiv.append(spanInputTask);

       
        let mainDiv = document.querySelector('#main-page');
        mainDiv.append(projectListDiv);
        //mainBoardPanel.append(mainPageDiv);



    };

    mainBoardPanel.append(mainPageDiv);


}


