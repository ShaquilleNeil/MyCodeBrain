
const counts = {
    commits: 0,
    pulls: 0,
    issues: 0,
    reviews: 0,
    comments: 0,
    releases: 0
    
};

const imgSrc = {
  Commit: 'images/gitpush.png',
  Pull: 'images/gitpull.png',
  Issue: 'images/gitissue.png',
  Create: 'images/event.png',
  Member: 'images/member.png',
  Watch: 'images/watch.png',
  Public: 'images/public.png',
  Review: 'images/review.png',
  Comment: 'images/comment.png',
  Release: 'images/release.png'
};

window.onload = fetchRepoStats();


async function fetchRepoStats(user){

    // if(user.includes('github.com/')){
    //     user = user.split('github.com/')[1];
    // }

//     if (!user || user.trim() === '') {
//     user = 'ShaquilleNeil';
//   }

    counts.commits = 0;
    counts.pulls = 0;
    counts.issues = 0;
    counts.reviews = 0;
    counts.comments = 0;
    counts.releases = 0;

    const request = await fetch(`https://api.github.com/users/${user}/events?per_page=100`);

    const response = await request.json();

    response.forEach(event => {
        if(event.type === 'PushEvent'){
            counts.commits++
        }
        if(event.type === 'PullRequestEvent'){
            counts.pulls++
        }
        if(event.type === 'IssuesEvent'){
            counts.issues++
        }
        if(event.type.includes('Review')){
            counts.reviews++
        }
        if(event.type.includes('Comment')){
            counts.comments++
        }
        if(event.type === 'ReleaseEvent'){
            counts.releases++
        }
    })

    const events = response.map(
        stuff => {

            if (stuff.type.includes('Review')){
                    stuff.type = 'Review';
            } else if (stuff.type.includes('Comment')) {
                stuff.type = 'Comment';
            } else if (stuff.type.includes('Release')) {
                stuff.type = 'Release';
            }
            else {
                switch(stuff.type){
                    case 'PushEvent':
                        stuff.type = 'Commit';
                        break;
                    case 'PullRequestEvent':
                        stuff.type = 'Pull';
                        break;
                    case 'IssuesEvent':
                        stuff.type = 'Issue';
                        break;
                    case 'CreateEvent':
                        stuff.type = 'Create';
                        break;
                    case 'MemberEvent':
                        stuff.type = 'Member';
                        break;
                    case 'WatchEvent':
                        stuff.type = 'Watch';
                        break;
                    case 'PublicEvent':
                        stuff.type = 'Public';
                        break;
                }
            }
          

            const names = stuff.repo.name.split('/')[1];
            const dates = stuff.created_at;
            const newDate = new Date(dates).toLocaleString();
            const dateOnly = newDate.split(',')[0];
            const timeOnly = newDate.split(',')[1];
            let branch = '';
            let base = '';
            let member
            
            if (stuff.type === 'Pull') {
                branch = stuff.payload.pull_request?.head?.ref || '';
                base = stuff.payload.pull_request?.base?.ref || '';
            } 
            else if (stuff.type === 'Commit') {
                branch = stuff.payload.ref?.split('/')[2] || '';
            } 
            else if (stuff.type === 'Issue') {
                branch = stuff.payload.issue?.number || '';
            } 
            else if (stuff.type === 'Create') {
                branch = stuff.payload.ref || '';
            }
            else if (stuff.type === 'Release'){
                branch = stuff.payload.release?.target_commitish || '';
            }
            else if (stuff.type === 'Member') {
                branch = stuff.payload.member.login || '';
            }
            else if (stuff.type === 'Review') {
                branch = stuff.payload.pull_request?.head?.ref || '';
                base = stuff.payload.pull_request?.base?.ref || '';
            }
            else if (stuff.type === 'Comment') {
                if (stuff.payload.pull_request) {
                    branch = stuff.payload.pull_request?.head?.ref || '';
                    base = stuff.payload.pull_request?.base?.ref || '';
                } else if (stuff.payload.issue) {
                    branch = `#${stuff.payload.issue.number}` || '';
                }
            }
           


            return {
                type: stuff.type,
                repo: names,
                date: dateOnly,
                time: timeOnly,
                branch: branch,
                base: base
               
            

               
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
       <h3>Commits</h3>
       <img src="${imgSrc.Commit}" />
       </div>
       
       <p class="count">${counts.commits}<p>
       </div>

       <div class="stats">
       <div class="card-row">
       <h3>Pulls</h3> 
       <img src="${imgSrc.Pull}" />
       </div>
       
       <p class="count">${counts.pulls}</p>
       </div>

       <div class="stats">
       <div class="card-row">
       <h3>Issues</h3> 
       <img src="${imgSrc.Issue}" />
       </div>
   
       <p class="count">${counts.issues}</p>
       </div>

       <div class="stats">
       <div class="card-row">
       <h3>Reviews</h3> 
       <img src="${imgSrc.Review}" />
       </div>
   
       <p class="count">${counts.reviews}</p>
       </div>

       <div class="stats">
       <div class="card-row">
       <h3>Comments</h3> 
       <img src="${imgSrc.Comment}" />
       </div>
   
       <p class="count">${counts.comments}</p>
       </div>

       <div class="stats">
       <div class="card-row">
       <h3>Realeases</h3> 
       <img src="${imgSrc.Release}" />
       </div>
   
       <p class="count">${counts.releases}</p>
       </div>
    `;

    const feed = document.getElementById('feed');
    const feedContainer = document.querySelector('.feedContainer');
    feedContainer.style.display = 'block';

    feed.innerHTML = `${events.map(event => `
        <div class="activity-card">
            <div class="feedCard-row">
                <img class="feed-icon" src="${imgSrc[event.type]}" />
    
                <div class="feed-text">
                    <h3>${event.repo}</h3>
                    <p>Event: ${event.type}</p>
    
                    ${event.type === 'Pull' 
                        ? `<p>From: ${event.branch} → ${event.base}</p>`
                        : `<p>Branch: ${event.branch || ''}</p>`
                    }
    
                </div>
            </div>
    <div > 
    <p>${event.time}</p>
            <p>${event.date}</p>
    </div>
            
        </div>
    `).join('')}`;
    

}

function searchRepo(){
    const input = document.getElementById('search');
    const search = input.value;
   if(search.includes('github.com/')){
    const user = search.split('github.com/')[1];
    fetchRepoStats(user);
   } else {
    const user = search;
    fetchRepoStats(user);
   }
    
}

// fetchRepoStats();
// lucide.createIcons();