#!/usr/bin/env node
import chalk from 'chalk';

const counts = {
    commits: 0,
    pulls: 0,
    issues: 0,
    reviews: 0,
    comments: 0,
    releases: 0
    
};



async function main(){
    let username = process.argv[2];
    const command = process.argv[3];
    const limit = process.argv[4];

    if(username === '--help'){
        help();
        return;
    }

    if(username.includes('github.com/')){
        username = username.split('github.com/')[1];
    }

    if(!username){
        console.log('Please enter a username');
        return;
    }

    if(!command){
        console.log('Please enter a command');
        return;
    }

    const req = await fetchRepoStats(username, limit);
    
    runCommand(command, req);


}

function runCommand(command, req ){
    switch(command){
        case '--help':
            help();
            break;
        case '--pulls':
            showPulls(req);
            break;
        case '--commits':
            showCommits(req);
            break;
        case '--issues':
            showIssues(req);
            break;
        case '--summary':
            showSummary(req);
            break;
        case '--activity':
                if (req && process.argv[4] === 'pulls') {
                    showPullsActivity(req);
                } else {
                    showActivity(req);
                }
                break;
    }
};

async function fetchRepoStats(user, limit){
     

    counts.commits = 0;
    counts.pulls = 0;
    counts.issues = 0;

    const request = await fetch(`https://api.github.com/users/${user}/events?per_page=${limit}`);

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

            switch(stuff.type){
                case 'PushEvent':
                    stuff.type = 'commit';
                    break;
                case 'PullRequestEvent':
                    stuff.type = 'pull';
                    break;
                case 'IssuesEvent':
                    stuff.type = 'issue';
                    break;
                case 'ReviewEvent':
                    stuff.type = 'review';
                    break;
                case 'CommentEvent':
                    stuff.type = 'comment';
                    break;
                case 'ReleaseEvent':
                    stuff.type = 'release';
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

    // console.log( counts );
    // console.log( events );
    // console.log(persons);



    return {
        counts,
        events,
        users: persons[0]
    }
   
 
  

}







///
function help(){
    console.log(`
        Welcome to Repo Pulse!

        Usage: repopulse <github-username> <command>

        Commands:
        --help                  Shows help
        --pulls                 Shows total Pulls
        --commits               Shows total Commits
        --issues                Shows total Issues
        --summary               Shows total Commits, Pulls, and Issues
        --activity              Shows activity
        --activity <limit>      Displays a specific amount 

        `);
}

function showPulls(req){
    console.log(`Your total Pulls: ${req.counts.pulls}`);
}

function showCommits(req){
    console.log(`Your total Commits: ${req.counts.commits}`);
}

function showIssues(req){
    console.log(`Your total Issues: ${req.counts.issues}`);
}

function showSummary(req){
    console.log(`🟢 ${chalk.green(`Your total Commits: ${req.counts.commits}`)}`);
    console.log(`🟣 ${chalk.blue(`Your total Pulls: ${req.counts.pulls}`)}`);
    console.log(`🚩 ${chalk.red(`Your total Issues: ${req.counts.issues}`)}`);
    console.log(`🔵 ${chalk.cyan(`Your total Reviews: ${req.counts.reviews}`)}`);
    console.log(`🔵 ${chalk.magenta(`Your total Comments: ${req.counts.comments}`)}`);
    console.log(`🟡 ${chalk.yellow(`Your total Releases: ${req.counts.releases}`)}`);
}

function showActivity(req){
    req.events.forEach(event => {
        console.log(`
${chalk.yellow(`================================= ` ) }   

${chalk.green(`📦 Type:`)} ${event.type}
${chalk.magenta(`🗂️ Repo:`)} ${event.repo}
${chalk.cyan(`📅 Date:`)} ${event.date}

${chalk.yellow(`=================================` ) }   
        `);
    });
}

function showPullsActivity(req){
    req.events.forEach(event => {
        if(event.type === 'pull'){
            console.log(`
${chalk.yellow(`================================= ` ) }   

${chalk.green(`📦 Type:`)} ${event.type}                                    
${chalk.magenta(`🗂️ Repo:`)} ${event.repo}
${chalk.cyan(`📅 Date:`)} ${event.date}

${chalk.yellow(`=================================` ) }   
            `);
        }
    });
}

main();
