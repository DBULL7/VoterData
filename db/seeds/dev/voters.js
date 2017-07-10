const voters = require('../../../server/convertOutputToJSON')

let test = (knex) => {
  return voters.arr.map(voter => {
    return knex('voters').insert({
      VOTER_ID: voter[0],
      COUNTY_CODE: voter[1],
      COUNTY: voter[2],
      LAST_NAME: voter[3],
      FIRST_NAME: voter[4],
      MIDDLE_NAME: voter[5],
      NAME_SUFFIX: voter[6],
      VOTER_NAME: voter[7],
      STATUS_CODE: voter[8],
      PRECINCT_NAME: voter[9],
      ADDRESS_LIBRARY_ID: voter[10],
      HOUSE_NUM: voter[11],
      HOUSE_SUFFIX: voter[12],
      PRE_DIR: voter[13],
      STREET_NAME: voter[14],
      STREET_TYPE: voter[15],
      POST_DIR: voter[16],
      UNIT_TYPE: voter[17],
      UNIT_NUM: voter[18],
      RESIDENTIAL_ADDRESS: voter[19],
      RESIDENTIAL_CITY: voter[20],
      RESIDENTIAL_STATE: voter[21],
      RESIDENTIAL_ZIP_CODE: voter[22],
      RESIDENTIAL_ZIP_PLUS: voter[23],
      EFFECTIVE_DATE: voter[24],
      REGISTRATION_DATE: voter[25],
      STATUS: voter[26],
      STATUS_REASON: voter[27],
      BIRTH_YEAR: voter[28],
      GENDER: voter[29],
      PRECINCT: voter[30],
      SPLIT: voter[31],
      VOTER_STATUS_ID: voter[32],
      PARTY: voter[33],
      PARTY_AFFILIATION_DATE: voter[34],
      PHONE_NUM: voter[35],
      MAIL_ADDR1: voter[36],
      MAIL_ADDR2: voter[37],
      MAIL_ADDR3: voter[38],
      MAILING_CITY: voter[39],
      MAILING_STATE: voter[40],
      MAILING_ZIP_CODE: voter[41],
      MAILING_ZIP_PLUS: voter[42],
      MAILING_COUNTRY: voter[43],
      SPL_ID: voter[44],
      PERMANENT_MAIL_IN_VOTER: voter[45],
      CONGRESSIONAL: voter[46],
      STATE_SENATE: voter[47],
      STATE_HOUSE: voter[48]
    })
  })
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('voters').del()
    .then(function () {
      const voters = test(knex)
      return Promise.all([...voters]);
    });
};
