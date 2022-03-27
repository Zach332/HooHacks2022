# Conguess

Play now at [zach332.github.io/HooHacks2022](https://zach332.github.io/HooHacks2022/)!

## Inspiration
We all know public understanding of government activities is fundamental to democracy. But it's easy to feel disconnected from the day-to-day debates and decisions on Capitol Hill. Conguess aims to provide a fun and interactive way to learn about what your representatives are doing and understand how their values align with yours.

## What it does
Once you select your district, Conguess presents you with bills that your representative recently voted on. It gives you a chance to guess whether they voted "yea" or "nay", and then tells you whether you were right.

## How we built it
We used Python to process data on bill summaries and voting records and serve it with Flask. The frontend is a single-page React app. The backend is hosted on Google App Engine and the frontend is hosted on GitHub Pages.

## Challenges we ran into
The data we needed for this project was not available in a convenient form, so we had to extract data from multiple webpages and combine it programmatically to power our API. It also took several tries (and eventually a change of web framework) to get our backend to deploy correctly.

## Accomplishments that we're proud of
We're proud of the graphics and animations throughout our app. We're also proud that we were able to integrate data and services that we hadn't worked with before, including DeSo, congressional data, and MUI. 

## What we learned
We learned how to use MUI to design our frontend, how to use new React functionality including hooks, and how to gather and parse congressional voting data.

## What's next for Conguess
This app could be expanded to:
* Include senators
* Provide more detail about the votes on a bill (for example, how many Republicans and Democrats voted for the bill, and what comments the chosen representative made on the bill)
* Provide more incentives for completing the quiz (for example, awarding an NFT at the end of the quiz)
* Allow players to guess the results of future votes and earn DeSo based on accuracy, acting as a kind of prediction market and motivating players to learn more about their representatives
* Add additional social features, like the ability to share a score with friends and to see how politically aligned you are with representatives
