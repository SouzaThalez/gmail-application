//GLBOAL SELECTORS
let mainList = document.querySelectorAll('.main-menu-list .list-item');
let pages = document.querySelectorAll('.main-board-panel .pages');
const newProjectInput = document.querySelector('.modal-body input') as HTMLInputElement;
const ulProjectList = document.querySelector('.projects-list') as HTMLUListElement;
let mainBoardPanel = document.querySelector('.main-board-panel') as HTMLDivElement;
console.log(mainBoardPanel);
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

    console.log(menuLinks);
}
function createProjects(usertxt: string){

    //CREATING NEW INSTANCE
    let model = new Project();
    model.name = usertxt;
    model.code = projectsV.length +1 ;
    
    //Creating de side PANEL projects
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
    let pageDiv = document.createElement('div');
    pageDiv.className = 'pages';
    pageDiv.id = 'main-page';
    let pageSpanTittle =  document.createElement('span');
    pageSpanTittle.className = 'p-tittle';
    let pageh3Tag = document.createElement('h3');
    pageh3Tag.innerHTML = project.name;
    pageSpanTittle.append(pageh3Tag);
    
//Project Input list
    let pageSpanInput = document.createElement('span');
    pageSpanInput.className = 'create-list-input';
    let atag = document.createElement('a');
    atag.className = "add-task-plus";
    atag.href = '#';
    atag.innerHTML = '+';
    let pageInput = document.createElement('input') as HTMLInputElement;
    pageInput.className = 'list-input';
    pageInput.setAttribute('type','text');
    pageInput.setAttribute('placeholder','Create new List..');

    atag.onclick = ()=>{

        project.list.name =  pageInput.value;
        pageDiv.remove();
        createPage(project);
    };
        // When user inputs the name of the list
        if(project.list.name){
          const pListDiv = document.createElement('div');
           pListDiv.className = 'project-list';
       
           const pListTittleDiv = document.createElement('div');
           pListDiv.className = 'list-tittle';

           const pageh5Tag = document.createElement('h5');
           pageh5Tag.innerHTML = project.list.name; 

           const spanTaskNumber = document.createElement('span');
           spanTaskNumber.className = 'task-number';
           const spanInputTask = document.createElement('span');
           spanInputTask.className = 'input-task';
           let addTaskATAG = document.createElement('a');
           addTaskATAG.className = "add-task-plus";
           addTaskATAG.href = '#';
           addTaskATAG.innerHTML = '+';

           addTaskATAG.onclick = ()=>{

            let listItem = inputField.value;

            if(project.list.items == null){
                project.list.items = [];
            }
            project.list.items.push(listItem);

            inputField.value = '';
            
            console.log(projectsV);

            pageDiv.remove();
            createPage(project);
            
        }

           let inputField = document.createElement('input');
           inputField.className = 'input-field';
           inputField.type= 'text';
           inputField.placeholder = 'add task..';
           spanInputTask.append(addTaskATAG);
           spanInputTask.append(inputField);
           pListTittleDiv.append(pageh5Tag);
           pListTittleDiv.append(spanTaskNumber);
           pListDiv.append(pListTittleDiv);
           pListDiv.append(spanInputTask);

           const ulListTag = document.createElement('ul');
           ulListTag.className = 'project-list';
           pListDiv.append(ulListTag);
           pageDiv.append(pListDiv);
           console.log(project);
        }
          
           
        if(project.list.items != null){
            
            project.list.items.forEach(element => {
                const pListDiv = document.querySelector('.project-list') as HTMLElement;
                const ulListTag = document.createElement('ul');
                ulListTag.className = 'project-list-items';
                const liTag = document.createElement('li');
                liTag.innerHTML = element;
                const btnTag = document.createElement('button');
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

