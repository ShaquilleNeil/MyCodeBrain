#!/usr/bin/env node
import chalk from 'chalk';

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



async function main(){
    const username = process.argv[2];
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
            showActivity(req);
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
        --help  Shows help
        --pulls Shows total Pulls
        --commits Shows total Commits
        --issues Shows total Issues
        --summary Shows total Commits, Pulls, and Issues
        --activity Shows activity
        --activity <limit> Shows activity with limit

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
}

function showActivity(req){
    req.events.forEach(event => {
        console.log(`
${chalk.green(`Type:`)} ${event.type}
${chalk.green(`Repo:`)} ${event.repo}
${chalk.green(`Date:`)} ${event.date}
        `);
    });
}

main();
