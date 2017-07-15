# VoterData
[![CircleCI](https://circleci.com/gh/DBULL7/VoterData.svg?style=svg)](https://circleci.com/gh/DBULL7/VoterData)


### Hosted @ [Heroku](https://gentle-shelf-31018.herokuapp.com/api/v1/voters)

## Endpoints

All endpoints begin with <code>api/v1/</code>

#### Getting started

To make a post, patch, or delete request you must be authenticated.

#### Voters
**<code>GET</code> voters**

    Returns 100 voters 

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

    Creates new voter. Content-Type:application/json.
    Body requires: lastName, firstName, District, Gender, party, status

**<code>PATCH</code> voters/:id**

    Updates voter. Body requires: field, fieldValue, command. 
    command should either be $set to create/update a field or $unset to remove a field.
    fieldValue can be array, object, string, or int. 

**<code>DELETE</code> voters/:id**

    Deletes a voter by voter id. 

### District

**<code>GET</code> district**

    Returns the 7 districts of Colorado.

**<code>GET</code> district/:num**
    
    Returns single district as specified in url parameter

**<code>GET</code> district/:num/:gender/**

    Enter district number, and Male or Female to see 100 voters of specified gender within the district

**<code>GET</code> district/:num/voters/**

    Enter district number, returns 100 voters from that district.

**<code>GET</code> district/:num/party?party=""**
    
    Returns 100 voters of a specified district and party.
    Party parameter examples: REP, DEM, UAF.

**<code>PATCH</code> district/:id**

    Updates District. Body requires: field, fieldValue, command. 
    command should either be $set to create/update a field or $unset to remove a field.
    fieldValue can be array, object, string, or int. 

**<code>POST</code> district**

    Creates new District. POST body must include: id, state, district. id should correspond to district number. 

**<code>DELETE</code> district/:id**
    
    Delete district by id. 

### Authentication

**<code>POST</code> authenticate**

    Request body must include username and password.
