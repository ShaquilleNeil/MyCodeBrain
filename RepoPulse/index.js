
const counts = {
    commits: 0,
    pulls: 0,
    issues: 0
    
};

const imgSrc = {
  commit: 'images/code.png',
  pull: 'images/push.png',
  issue: 'images/warning.png'
};

document.onload = fetchRepoStats();


async function fetchRepoStats(user){

    if (!user || user.trim() === '') {
    user = 'ShaquilleNeil';
}

    counts.commits = 0;
    counts.pulls = 0;
    counts.issues = 0;

    const request = await fetch(`https://api.github.com/users/${user}/events?per_page=100`);

    const response = await request.json();

    response.forEach(event => {
        if(event.type === 'PushEvent'){
            counts.commits++
        }
        if(event.type === 'PullRequestEvent'){
            counts.pulls++
        }
        if(event.type === 'IssueEvent'){
            counts.issues++
        }
    })

    const events = response.map(
        stuff => {

            switch(stuff.type){
                case 'PushEvent':
                    stuff.type = 'commit';
                    break;
                case 'PullRequestEvent':
                    stuff.type = 'pull';
                    break;
                case 'IssueEvent':
                    stuff.type = 'issue';
                    break;
            }

            const names = stuff.repo.name.split('/')[1];
            const dates = stuff.created_at;
            const newDate = new Date(dates).toLocaleString();
           


            return {
                type: stuff.type,
                repo: names,
                date: newDate
               
            }
        }
    );
    
   const persons = response.map(person => {
        
       return {
        name: person.actor.login,
        image:person.actor.avatar_url

       };
   });

    console.log( counts );
    console.log( events );
    console.log(persons);


    const profile = document.getElementById('profile');

    profile.innerHTML = `
       <img class="avatar" src="${persons[0].image}">
       <h2>${persons[0].name}</h2>
    `;
   

    const stats = document.getElementById('stats-cards');

    stats .innerHTML = `
       
       <div class="stats">
       <div class="card-row">
       <img src="${imgSrc.commit}" />
       <p class="badge"> Active</p>
       </div>
       <p>Commits</p> <br> 
       <p class="count">${counts.commits}<p>
       </div>

       <div class="stats">
       <div class="card-row">
       <img src="${imgSrc.pull}" />
       <p class="badge"> Active</p>
       </div>
       <p>Pulls<p> <br> 
       <p class="count">${counts.pulls}</p>
       </div>

       <div class="stats">
       <div class="card-row">
       <img src="${imgSrc.issue}" />
       <p class="badge"> Active</p>
       </div>
       <p>Issues</p> <br> 
       <p class="count">${counts.issues}</p>
       </div>
    `;

    const feed = document.getElementById('feed');

    feed.innerHTML = ` ${events.map(event => `
           <div class="activity-card">
           <div class="feedCard-row">
           <img class="feed-icon" src="${imgSrc[event.type]}" />

           <div class="feed-text">
           <p>${event.type}</p>
           <p>${event.repo}</p>
           </div>
           
           </div>
           
              
              
               <p>${event.date}</p>
           </div>

    `).join('')}
    
    
    `;
    

}

function searchRepo(){
    const input = document.getElementById('search');
    const search = input.value;
   
    const user = search.split('/')[3];
    fetchRepoStats(user);
}

// fetchRepoStats();
// lucide.createIcons();