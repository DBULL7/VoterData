# VoterData
[![CircleCI](https://circleci.com/gh/DBULL7/VoterData.svg?style=svg)](https://circleci.com/gh/DBULL7/VoterData)


### Hosted @ [Heroku](https://gentle-shelf-31018.herokuapp.com/api/v1/voters)

## Endpoints

All endpoints begin with <code>api/v1/</code>

#### Getting started

To make a post, patch, or delete request you must be authenticated.

#### Voters
**<code>GET</code> voters**

**<code>GET</code> voters/:voter**

Note: This voters/:voter is case sensitive and will return exact matches.
Here is a real example of what is being searched:

 ***<code>[
  "FENTON",
  "NANCY",
  "G",
  "FENTON, NANCY G",
  "A",
  "6304318204",
  "877908",
  "8369",
  "STONYBRIDGE",
  "CIR",
  "8369 STONYBRIDGE CIR",
  "HIGHLANDS RANCH",
  "CO",
  "80126",
  "7012",
  0.001365441906653426,
  0.000547536087605774,
  "Active",
  "1962",
  "Female",
  "6304318204",
  "01-3251",
  "1",
  "REP",
  "06/27/1997",
  "28428",
  "No",
  "Congressional 6",
  "State Senate 30",
  "State House 43"
]</code>***

Note that names/addresses are capitalized. The server will return the top 10 matches so for best results search by first name, last name, phone, or address.

**<code>POST</code> voters**

**<code>PATCH</code> voters/:id**

**<code>DELETE</code> voters/:id**

### District

**<code>GET</code> district**

**<code>GET</code> district/:num**

**<code>GET</code> district/:num/:gender/**

**<code>GET</code> district/:num/voters/**

**<code>GET</code> district/:num/party?party=""**

Party parameter examples: REP, DEM, UAF.

**<code>PATCH</code> district/:id**

**<code>POST</code> district**

**<code>DELETE</code> district/:id**


### Authentication

**<code>POST</code> authenticate**

Request body must include username and password.
