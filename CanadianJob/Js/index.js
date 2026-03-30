let currentPage = 1;
let jobsPerPage = 8;
let alljobs = [];
let filteredJobs = [];
let isSearching = false;

async function fetchInternships() {
    const information = await fetch('https://raw.githubusercontent.com/negarprh/Canadian-Tech-Internships-2026/main/README.md');

    const convertedInformation = await information.text();
    
    const lines = convertedInformation.split('\n');
    
    const rows = lines.filter(line =>
        line.startsWith('|') && !line.includes('---') && !line.includes('Company')
    );
    

    let lastCompany = null;
    
    const jobs = rows.map(row => {
        const key = `pk_B06fu8i-SYyR6xP8rBeSSQ`;
        const columns = row.split('|').map(p => p.trim()).filter(p => p !== "");
        const rawlinks = columns[3];
        const url = rawlinks.includes('(') ? rawlinks.split('(')[2].replace(')', '') : null;
        const lowerCase = columns[0].toLowerCase().replaceAll(" ", "").concat('.com') ;

        let companyName = columns[0];

        if(companyName === '↳') {
            companyName = lastCompany;
        } else {
            lastCompany = companyName;
        }
    
        return {
            company: companyName,
            title: columns[1],
            location: columns[2],
            link: url,
            date: columns[4],
            logo : `https://img.logo.dev/${lowerCase}?token=${key}`
        }

        
        
    
    }); 

    return jobs
}

function renderPages(totalPages){
const pages = document.getElementById('pages');
pages.innerHTML = '';   

for (let i = 0; i < totalPages; i++){
    const btn = document.createElement('button');
    btn.textContent = i + 1;

    if(i + 1 === currentPage){
        btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
        const jobs = document.getElementById('jobs');

        jobs.classList.remove('fade-in');
        jobs.classList.add('fade-out');

        setTimeout(() => {
            jobs.classList.remove('fade-out');

            void jobs.offsetWidth;
            jobs.classList.add('fade-in');

            currentPage = i + 1;
            loadJobs();
        }, 450);
       
    })

    pages.appendChild(btn);

};
}

function isNewJob(datestring){
    const today = new Date();
    const jobdate = new Date(datestring);
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(today.getDate() - 5);

    return jobdate >= fiveDaysAgo;
}


async function loadJobs(){
  

    if (alljobs.length === 0) {
        alljobs = await fetchInternships();
    }

      
      const baseJobs = isSearching ? filteredJobs : alljobs;
      const openjobs = baseJobs.filter(job => job.link !== null);
    
      const start = (currentPage - 1) * jobsPerPage;
      const end = start + jobsPerPage;
      const currentJobs = openjobs.slice(start, end);
      
      const jobList = document.getElementById('jobs');

      console.log(currentJobs);



jobList.innerHTML = `

${currentJobs.length === 0 ? '<p class="no-jobs">No jobs found</p>' : ''}



${currentJobs.map(job => {
    const badge = isNewJob(job.date)
      ? '<span class="badge">NEW</span>'
      : '';
  
      console.log(job.company);
    return `
      <li class="job">
        <div class="content">
          <div class="top-row">
            <img class="logo" src="${job.logo}" onerror="this.onerror=null; this.src='../social4_04.jpg'" />
            ${badge}
          </div>
  
          <p class="title">${job.title}</p>
          <p class="company">${job.company}</p>
          <p class="location">${job.location}</p>
          <p class="date">${job.date}</p>
        </div>
  
        ${job.link 
          ? `<a href="${job.link}" target="_blank"><button class="apply">Apply</button></a>` 
          : '<button class="closed">Closed</button>'}
      </li>
    `;
  }).join('')}
`;

const totalPages = Math.ceil(openjobs.length / jobsPerPage);
renderPages(totalPages);
}

//handling keyboard click
var input = document.getElementById('searchInput');

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('searchButton').click();
    }
});

function searchJobs(){
    const search = document.getElementById('searchInput').value.toLowerCase();

    if(search === ''){
        filteredJobs = [];
        isSearching = false;
        currentPage = 1;
        loadJobs();
        return;
    }

    isSearching = true;

    filteredJobs = alljobs.filter(job => {
       
        return (
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search) ||
            job.location.toLowerCase().includes(search) || 
            job.date.toLowerCase().includes(search)
        );

        
    });

   currentPage = 1;
   loadJobs();
}

loadJobs();




